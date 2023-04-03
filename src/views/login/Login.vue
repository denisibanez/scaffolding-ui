<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div class="q-pa-md bg-white rounded-borders" style="max-width: 400px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="myForm"
      >
        <QcTextfield
          :value="user"
          :rules="[
          (val: any) => (val !== null && val !== '') || 'Campo obrigatório',
        ]"
          label="Usuário"
          types="text"
          @onInputChange="user = $event"
        />

        <QcTextfield
          :value="password"
          :rules="[
              (val: any) => (val !== null && val !== '') || 'Campo obrigatório',
            ]"
          label="Senha"
          types="password"
          @onInputChange="password = $event"
        />

        <div class="row">
          <QcButton
            size="md"
            label="Entrar"
            type="submit"
            color="primary"
            :loading="loading"
          />
          <QcButton
            size="md"
            label="Cancelar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>

    <QcSnackbar
      :model="SNACKBAR_STATE.model"
      :bgColor="SNACKBAR_STATE.bgColor"
      :text="SNACKBAR_STATE.text"
      :icon="SNACKBAR_STATE.icon"
      :actionLabelColor="SNACKBAR_STATE.actionLabelColor"
      :textColor="SNACKBAR_STATE.textColor"
    />
  </div>
</template>

<script setup lang="ts">
// VUE
import { onMounted, ref } from 'vue';
// DESIGN SYSTEM
import {
  QcSnackbar,
  QcTextfield,
  QcButton,
} from '@denisibanez/design-system-ui';
// STORE
import { storeToRefs } from 'pinia';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';
// ROUTER
import { useRouter, useRoute } from 'vue-router';
// TYPES
import QcSnackbarInterface from '@/stores/snackbar/snackbar';

// AXIOS
import axios from 'axios';


// VARIABLES
let user = ref(null);
let password = ref(null);
const myForm = ref();
let loading = ref(false);
const router = useRouter();
const route = useRoute();
const { SNACKBAR_DISPATCH } = useSnackbarStore();
const { SNACKBAR_STATE } = storeToRefs(useSnackbarStore());
// METHODS
function onSubmit() {
  loading = ref(true);
  myForm.value.validate().then((success: any) => {
    if (success) {
      axios.post(`${process.env.VITE__BASE_PATH_EXAMPLE}/api/v1/test`)
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
            bgColor: 'negative',
            text: 'Erro no request!',
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
</script>