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
        <q-input
          v-model="user"
          label="Usuário"
          lazy-rules
          outlined
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        />

        <q-input
          type="password"
          v-model="password"
          label="Senha"
          lazy-rules
          outlined
          :rules="[
            (val) => (val !== null && val !== '') || 'Campo obrigatório',
          ]"
        />

        <div>
          <q-btn
            label="Entrar"
            type="submit"
            color="primary"
            :loading="loading"
          />
          <q-btn
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
import { QcSnackbar } from '@denisibanez/design-system-ui';

// STORE
import { storeToRefs } from 'pinia';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

// ROUTER
import { useRouter, useRoute } from 'vue-router';

// TYPES
import QcSnackbarInterface from '@/stores/snackbar/snackbar';

// VARIABLES
const user = ref(null);
const password = ref(null);
const myForm = ref();
let loading = ref(false);

const router = useRouter();
const route = useRoute();

const { SNACKBAR_DISPATCH } = useSnackbarStore();
const { SNACKBAR_STATE } = storeToRefs(useSnackbarStore());

// LIFECYCLE
onMounted(() => {
  SNACKBAR_DISPATCH({
    model: false,
    bgColor: 'negative',
    text: 'Erro no request!',
    icon: 'warning',
    actionLabelColor: 'white',
    textColor: 'white',
  } as QcSnackbarInterface);
});

// METHODS
function onSubmit() {
  loading = ref(true);
  myForm.value.validate().then((success: any) => {
    if (success) {
      loading = ref(false);
      localStorage.setItem('ACCESS_TOKEN', 'teste');
      router.push('/');
    }
  });
}

function onReset() {
  user.value = null;
  password.value = null;
}
</script>
