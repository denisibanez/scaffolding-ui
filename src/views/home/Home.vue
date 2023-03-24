<template>
  <div class="home__wrapper q-pa-md" v-if="!LOADING_STATE">
    <BcButton
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
import { BcButton } from '@denisibanez/design-system-ui';

// STORE
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

const { LOADING_DISPATCH } = useLoadingStore();
const { SNACKBAR_DISPATCH } = useSnackbarStore();
const { LOADING_STATE } = storeToRefs(useLoadingStore());
const { SNACKBAR_STATE } = storeToRefs(useSnackbarStore());

// VARIABLES
const loadingBtn: Ref<boolean> = ref(false);

onMounted(() => {
  getExample();
});

async function getExample() {
  const payload = {};
  LOADING_DISPATCH(true);
  await example.getExample(
    payload,
    (response: any) => {
      console.log(response.data, 'SUCCESS');
    },
    (e: any) => {
      console.log(e, 'ERROR');
      SNACKBAR_DISPATCH({
        model: true,
        timeout: 3000,
        bgColor: '#ca850e',
        fontColor: '#047C00',
        text: 'Erro no request!',
      })
    },
    () => {
      console.log('DONE');
      LOADING_DISPATCH(false);
    }
  );
}
</script>
