<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div @click="logoff" style="cursor: pointer">Sair</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen.value" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <QcLoading :loading="LOADING_STATE" size="xl" text="Aguarde" />
    </q-page-container>

    <QcSnackbar
      :model="SNACKBAR_STATE.model"
      :bgColor="SNACKBAR_STATE.bgColor"
      :text="SNACKBAR_STATE.text"
      :icon="SNACKBAR_STATE.icon"
      :actionLabelColor="SNACKBAR_STATE.actionLabelColor"
      :textColor="SNACKBAR_STATE.textColor"
    />
  </q-layout>
</template>

<script setup lang="ts">
// VUE
import { reactive } from 'vue';

// DESIGN SYSTEM
import { QcLoading, QcSnackbar } from '@denisibanez/design-system-ui';

// ROUTER
import { useRouter, useRoute } from 'vue-router'

// STORE
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

// VARIABLES
let leftDrawerOpen = reactive({ value: false });

const { LOADING_STATE } = storeToRefs(useLoadingStore());
const { SNACKBAR_STATE } = storeToRefs(useSnackbarStore());

const router = useRouter()
const route = useRoute()

// METHODS
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logoff() {
  localStorage.removeItem('ACCESS_TOKEN')
  router.push('/login')
}
</script>

<style lang="scss">
// Css components Design system
@import '../../../node_modules/@denisibanez/design-system-ui/dist/index.css';
</style>
