<template>
  <div class="home__wrapper q-pa-md" v-if="!LOADING_STATE">
    <QcButton
      label="Botao do Design System"
      color="primary"
      :loading="loadingBtn"
      @click.capture="loadingBtn = !loadingBtn"
    />
  </div>
</template>

<script lang="ts" setup>
// VUE
import { onMounted, ref, Ref } from 'vue';

// SERVICE
import { example } from '@/services/index';

// DESIGN SYSTEM
import { QcButton } from '@denisibanez/design-system-ui';

// STORE
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

// TYPES
import QcSnackbarInterface from '@/stores/snackbar/snackbar';

// VARIABLES
const { LOADING_DISPATCH } = useLoadingStore();
const { SNACKBAR_DISPATCH } = useSnackbarStore();
const { LOADING_STATE } = storeToRefs(useLoadingStore());

const loadingBtn: Ref<boolean> = ref(false);

// LIFECYCLE
onMounted(() => {
  getExample();
});

// METHODS
async function getExample() {
  const payload = {};

  LOADING_DISPATCH(true);
  await example.getExample(
    payload,
    (response: any) => {
      console.log(response.data, 'SUCCESS');
      SNACKBAR_DISPATCH({
        model: true,
        bgColor: 'positive',
        text: 'Sucesso no request!',
        icon: 'check_circle',
        actionLabelColor: 'white',
        textColor: 'white',
      } as QcSnackbarInterface);
    },
    (e: any) => {
      console.log(e, 'ERROR');
      SNACKBAR_DISPATCH({
        model: true,
        bgColor: 'negative',
        text: 'Erro no request!',
        icon: 'warning',
        actionLabelColor: 'white',
        textColor: 'white',
      } as QcSnackbarInterface);
    },
    () => {
      console.log('DONE');
      LOADING_DISPATCH(false);
    }
  );
}
</script>
