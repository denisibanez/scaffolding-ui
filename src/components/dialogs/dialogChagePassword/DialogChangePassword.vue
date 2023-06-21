<template>
  <QcDialog
    :model="DIALOG_CHANGE_PASSWORD_STATE"
    @close="onClose()"
    :title="t('login.form.changePassword.title')"
  >
    <div class="q-pa-md" style="min-width: 300px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="myForm"
      >
        <QcTextfield
          :value="user"
          :rules="[
      (val: any) => (val !== null && val !== '') || t('login.form.feedback.required'),
    ]"
          :label="t('login.form.changePassword.user')"
          types="text"
          @onInputChange="user = $event"
        />

        <QcTextfield
          :value="password"
          :rules="[
          (val: any) => (val !== null && val !== '') || t('login.form.feedback.required'),
        ]"
          :label="t('login.form.changePassword.password')"
          :types="typesPassword"
          :icon="iconPassword"
          @onInputChange="password = $event"
          @onChangePasswordVisibility="
            (typesPassword = $event.type), (iconPassword = $event.icon)
          "
        />

        <QcTextfield
          :value="newPassword"
          :rules="[
        (val: any) => (val !== null && val !== '') || t('login.form.feedback.required'),
      ]"
          :label="t('login.form.changePassword.newPassword')"
          :types="typesNewPassword"
          :icon="iconNewPassword"
          @onInputChange="newPassword = $event"
          @onChangePasswordVisibility="
            (typesNewPassword = $event.type), (iconNewPassword = $event.icon)
          "
          @blur.capture="onValidate()"
        />
        <QcTextfield
          :value="confirmPassword"
          :rules="[
      (val: any) => (val !== null && val !== '') || t('login.form.feedback.required'), validatePasswordMatch
    ]"
          :label="t('login.form.changePassword.confirmPassword')"
          :types="typesConfirmPassword"
          :icon="iconConfirmPassword"
          @onInputChange="(confirmPassword = $event), onValidate()"
          @onChangePasswordVisibility="
            (typesConfirmPassword = $event.type),
              (iconConfirmPassword = $event.icon)
          "
          @blur.capture="onValidate()"
        />

        <div class="row">
          <div class="col">
            <QcButton
              size="md"
              :label="t('login.form.changePassword.clean')"
              type="reset"
              color="white"
              text-color="black"
            />
          </div>
          <div class="col justify-end flex">
            <QcButton
              size="md"
              :label="t('login.form.changePassword.save')"
              type="submit"
              color="primary"
              icon="save"
              :loading="loading"
            />
          </div>
        </div>
      </q-form>
    </div>
  </QcDialog>
</template>

<script lang="ts" setup>
// DESIGN SYSTEM
import { QcDialog, QcTextfield, QcButton } from '@denisibanez/design-system-ui';

// STORE
import { storeToRefs } from 'pinia';
import { useDialogsStore } from '@/stores/dialogs/dialogs.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

import { ref } from 'vue';
import axios from 'axios';

// TYPES
import QcSnackbarInterface from '@/stores/snackbar/snackbar';

// LIBS
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

// VARIABLES
const { DIALOG_CHANGE_PASSWORD_STATE } = storeToRefs(useDialogsStore());
const { DIALOGS_DISPATCH } = useDialogsStore();
const { SNACKBAR_DISPATCH } = useSnackbarStore();

const myForm = ref();
let loading = ref(false);
const user = ref();
let password = ref();
let newPassword = ref();
let confirmPassword = ref();
const iconNewPassword = ref('visibility');
const typesNewPassword = ref();
const iconPassword = ref('visibility');
const typesPassword = ref();
const iconConfirmPassword = ref('visibility');
const typesConfirmPassword = ref();

const validatePasswordMatch = () =>
  !(newPassword.value !== confirmPassword.value) ||
  t('login.form.feedback.passwordNotMatch');

// METHODS
function onSubmit() {
  loading.value = true;
  myForm.value.validate().then((success: any) => {
    if (success) {
      const payload = {
        user: user.value,
        password: password.value,
      };
      axios
        .post(`${process.env.VITE__BASE_PATH_EXAMPLE}/api/v1/test`, payload)
        .then(async function (response) {
          // handle success
          await SNACKBAR_DISPATCH({
            model: true,
            closeLabel: t('login.form.close'),
            bgColor: 'positive',
            text: t('login.form.feedback.passwordChanged'),
            icon: 'warning',
            actionLabelColor: 'white',
            textColor: 'white',
          } as QcSnackbarInterface);

          console.log(response);

          await onClose();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          SNACKBAR_DISPATCH({
            model: true,
            closeLabel: t('login.form.close'),
            bgColor: 'negative',
            text: t('login.form.feedback.genericError'),
            icon: 'warning',
            actionLabelColor: 'white',
            textColor: 'white',
          } as QcSnackbarInterface);
        })
        .finally(function () {
          loading.value = false;
        });
    }
  });
}

function onClose() {
  onReset();
  DIALOGS_DISPATCH({
    key: 'DIALOG_CHANGE_PASSWORD_STATE',
    value: false,
  });
}

function onReset() {
  user.value = null;
  password.value = null;
  newPassword.value = null;
  confirmPassword.value = null;
}

function onValidate() {
  myForm.value.validate();
}
</script>

<style lang="scss" scoped></style>
