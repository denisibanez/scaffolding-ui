<template>
  <div class="bg-primary fullscreen">
    <div flex flex-end class="q-pa-sm">
      <TranslateSelector></TranslateSelector>
    </div>
    <div
      class="denisibanez__wrapper bg-primary text-white text-center q-pa-md flex flex-center column"
    >
      <div class="denisibanez__brand">
        <img src="@/assets/img/logo.png" alt="" />
      </div>

      <div class="q-pa-md bg-white rounded-borders" style="width: 400px">
        <div>
          <p class="q-pa-lg denisibanez__title">{{ t('login.welcome') }}</p>
        </div>

        <div class="denisibanez__boxcontent">
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
              :label="t('login.form.signIn.user')"
              types="text"
              @onInputChange="user = $event"
            />

            <QcTextfield
              :value="password"
              :rules="[
              (val: any) => (val !== null && val !== '') || t('login.form.feedback.required'),
            ]"
              :label="t('login.form.signIn.password')"
              :types="types"
              :icon="icon"
              @onInputChange="password = $event"
              @onChangePasswordVisibility="
                (types = $event.type), (icon = $event.icon)
              "
            />

            <div class="row">
              <div class="col">
                <QcButton
                  size="md"
                  :label="t('login.form.signIn.changePassword')"
                  type="reset"
                  color="white"
                  text-color="black"
                  icon="change_circle"
                  @click="openDialog()"
                />
              </div>
              <div class="col justify-end flex">
                <QcButton
                  size="md"
                  :label="t('login.form.signIn.signin')"
                  type="submit"
                  color="primary"
                  icon="login"
                  :loading="loading"
                />
              </div>
            </div>

            <div class="row">
              <div class="col flex justify-start">
                <p class="denisibanez__text" @click="forgetPassword()">
                  {{ t('login.form.signIn.forgetPassword') }}
                </p>
              </div>

              <div class="col flex justify-end">
                <button
                  type="reset"
                  class="denisibanez__text denisibanez__reset"
                >
                  {{ t('login.form.signIn.clean') }}
                </button>
              </div>
            </div>
          </q-form>
        </div>
      </div>

      <QcSnackbar
        :model="SNACKBAR_STATE.model"
        :bgColor="SNACKBAR_STATE.bgColor"
        :text="SNACKBAR_STATE.text"
        :icon="SNACKBAR_STATE.icon"
        :actionLabelColor="SNACKBAR_STATE.actionLabelColor"
        :textColor="SNACKBAR_STATE.textColor"
      />

      <DialogChangePassword />
    </div>
  </div>
</template>

<script setup lang="ts">
// VUE
import { computed, ref } from 'vue';

// DESIGN SYSTEM
import {
  QcSnackbar,
  QcTextfield,
  QcButton,
} from '@denisibanez/design-system-ui';

// COMPONENTS
import DialogChangePassword from '@/components/dialogs/dialogChagePassword/DialogChangePassword.vue';

// STORE
import { storeToRefs } from 'pinia';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';
import { useDialogsStore } from '@/stores/dialogs/dialogs.store';

// ROUTER
import { useRouter, useRoute } from 'vue-router';

// TYPES
import QcSnackbarInterface from '@/stores/snackbar/snackbar';

// AXIOS
import axios from 'axios';

// COMPONENTS
import TranslateSelector from '@/components/translate/TranslateSelector.vue';

// LIBS
import { useI18n } from 'vue-i18n';

// VARIABLES
let user = ref(null);
let password = ref(null);
const myForm = ref();
let loading = ref(false);

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const icon = ref('visibility');
const types = ref();

const router = useRouter();
const route = useRoute();

const { SNACKBAR_DISPATCH } = useSnackbarStore();
const { SNACKBAR_STATE } = storeToRefs(useSnackbarStore());
const { DIALOGS_DISPATCH } = useDialogsStore();

// METHODS
function onSubmit() {
  loading = ref(true);
  myForm.value.validate().then((success: any) => {
    if (success) {
      const payload = {
        user: user.value,
        password: password.value,
      };
      axios
        .post(`${process.env.VITE__BASE_PATH_EXAMPLE}/api/v1/test`, payload)
        .then(function (response) {
          // handle success
          console.log(response);
          localStorage.setItem('ACCESS_TOKEN', 'teste');
          router.push('/');
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
          loading = ref(false);
        });
    }
  });
}

function onReset() {
  user.value = null;
  password.value = null;
}

function openDialog() {
  DIALOGS_DISPATCH({
    key: 'DIALOG_CHANGE_PASSWORD_STATE',
    value: true,
  });
}

function forgetPassword() {
  if (user.value) {
    const payload = {
      user,
    };
    axios
      .post(`${process.env.VITE__BASE_PATH_EXAMPLE}/api/v1/test`, payload)
      .then(function (response) {
        // handle success
        console.log(response);
        SNACKBAR_DISPATCH({
          model: true,
          closeLabel: t('login.form.close'),
          bgColor: 'positive',
          text: t('login.form.feedback.receiveMail'),
          icon: 'warning',
          actionLabelColor: 'white',
          textColor: 'white',
        } as QcSnackbarInterface);
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
      .finally(function () {});
  } else {
    SNACKBAR_DISPATCH({
      model: true,
      closeLabel: t('login.form.close'),
      bgColor: 'negative',
      text: t('login.form.feedback.notHaveUser'),
      icon: 'warning',
      actionLabelColor: 'white',
      textColor: 'white',
    } as QcSnackbarInterface);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global';

.denisibanez {
  &__wrapper {
    min-height: 90vh;
  }

  &__brand {
    img {
      max-width: 200px;
    }
  }

  &__title {
    @include font-format(
      $transform: 'none',
      $color: $black,
      $size: 24px,
      $weight: 500
    );
  }

  &__text {
    @include font-format(
      $transform: 'none',
      $color: $black,
      $size: 14px,
      $weight: 500
    );
    cursor: pointer;
  }

  &__reset {
    background: transparent;
    border: 0;
    height: 5px;
    @include font-format(
      $transform: 'none',
      $color: $black,
      $size: 14px,
      $weight: 500
    );
    cursor: pointer;
  }
}
</style>
