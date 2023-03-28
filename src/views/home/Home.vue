<template>
  <div class="home__wrapper q-pa-md" v-if="!LOADING_STATE">
    <div class="row">
      <div class="col q-pa-md">
        <QcButton
          label="Botao do Design System"
          color="primary"
          size="md"
          :loading="loadingBtn"
          @click.capture="loadingBtn = !loadingBtn"
        />
      </div>
      <div class="col q-pa-md">
        <q-select
          outlined
          v-model="selected"
          :options="languages"
          :option-value="'language'"
          :option-label="'title'"
          @update:model-value="changeLocale()"
          label="Selecione a linguagem desejada"
        />
      </div>
      <div class="col q-pa-md">
        {{ t('test') }}
      </div>
    </div>
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

// LIBS
import { useI18n } from 'vue-i18n';
import i18n from '@/locales';

// VARIABLES
const { LOADING_DISPATCH } = useLoadingStore();
const { SNACKBAR_DISPATCH } = useSnackbarStore();
const { LOADING_STATE } = storeToRefs(useLoadingStore());

const loadingBtn: Ref<boolean> = ref(false);
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
const selected = ref();

const languages = ref([
  { language: 'en', title: 'English' },
  { language: 'pt-BR', title: 'Portugues' },
]);

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

function changeLocale() {
  i18n.global.locale.value = selected.value.language;
}
</script>
