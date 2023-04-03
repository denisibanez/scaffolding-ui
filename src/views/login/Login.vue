<template>
  <div
    class="master__wrapper fullscreen text-white text-center q-pa-md flex flex-center column"
  >
    <div class="master__brand">
      <img src="@/assets/img/logo.png" alt="">
    </div>

    <div class="q-pa-md bg-white rounded-borders" style="width: 310px">
      <div>
        <p class="q-pa-lg master__title">Seja bem-vindo</p>
      </div>
     
      <div class="master__boxcontent">
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
import { ref } from 'vue';

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

<style lang="scss" scoped>
@import '@/assets/scss/global';

  .master {
    &__wrapper{
      background: $primary;
    }

    &__brand  {
      img{
        max-width: 200px;
      }
    }

    &__title {
      @include font-format($transform: 'none', $color: $black, $size: 24px,  $weight: 500)
    }
  }
</style>
