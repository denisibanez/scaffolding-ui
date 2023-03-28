<template>
  <div>
    <QcLayout @logoff="onLogoff" @navigate="onNavigate($event)">
      <RouterView></RouterView>

      <QcLoading :loading="LOADING_STATE" size="xl" text="Aguarde" />
      <QcSnackbar
        :model="SNACKBAR_STATE.model"
        :bgColor="SNACKBAR_STATE.bgColor"
        :text="SNACKBAR_STATE.text"
        :icon="SNACKBAR_STATE.icon"
        :actionLabelColor="SNACKBAR_STATE.actionLabelColor"
        :textColor="SNACKBAR_STATE.textColor"
      />
    </QcLayout>
  </div>
</template>

<script setup lang="ts">
// DESIGN SYSTEM
import { QcLoading, QcSnackbar, QcLayout } from '@denisibanez/design-system-ui';

// ROUTER
import { useRouter, useRoute } from 'vue-router';

// STORE
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

//VARIABLES

const { LOADING_STATE } = storeToRefs(useLoadingStore());
const { SNACKBAR_STATE } = storeToRefs(useSnackbarStore());

const router = useRouter();
const route = useRoute();

// METHODS
function onLogoff() {
  localStorage.removeItem('ACCESS_TOKEN');
  router.push('/login');
}

function onNavigate(item: any) {
  router.push(item.route);
}
</script>

<style lang="scss">
// Css components Design system
@import '../../../node_modules/@denisibanez/design-system-ui/dist/index.css';
</style>
