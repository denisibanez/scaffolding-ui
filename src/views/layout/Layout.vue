<template>
  <div>
    <QcLayout
      @logoff="onLogoff"
      @navigate="onNavigate($event)"
      :menu="menu"
      :optionsMenu="optionsMenu"
      :appName="'Nome da sua app'"
      :logoffLabel="t('layout.optionsMenu.logoff')"
    >
      <TranslateSelector></TranslateSelector>
      <RouterView></RouterView>

      <QcLoading
        :loading="LOADING_STATE"
        size="xl"
        :text="t('layout.waiting')"
      />
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

// COMPONENTS
import TranslateSelector from '@/components/translate/TranslateSelector.vue';

// ROUTER
import { useRouter, useRoute } from 'vue-router';

// STORE
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';
import { computed, reactive } from 'vue';

// LIBS
import { useI18n } from 'vue-i18n';

//VARIABLES

const { LOADING_STATE } = storeToRefs(useLoadingStore());
const { SNACKBAR_STATE } = storeToRefs(useSnackbarStore());

const router = useRouter();
const route = useRoute();

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const translates: any = {
  menu: {
    home: computed(() => t('layout.menu.home')),
  },
  optionsMenu: {
    logoff: computed(() => t('layout.optionsMenu.logoff')),
    subLevel: computed(() => t('layout.optionsMenu.subLevel')),
    test: computed(() => t('layout.optionsMenu.test')),
  },
};

const optionsMenu = reactive([
  {
    separator: true,
    router: '/',
    id: 1,
    label: translates.optionsMenu.test,
    icon: 'home',
  },
  {
    separator: true,
    router: '/',
    id: 2,
    label: translates.optionsMenu.test,
    icon: 'settings',
  },
  {
    separator: false,
    router: '/',
    id: 3,
    icon: 'menu',
    submenu: [
      {
        separator: true,
        router: '/',
        id: 4,
        label: translates.optionsMenu.subLevel,
        icon: 'download',
        items: [
          {
            separator: true,
            router: '/',
            id: 5,
            label: translates.optionsMenu.test,
            icon: 'settings',
          },
          {
            separator: true,
            router: '/',
            id: 6,
            label: translates.optionsMenu.test,
            icon: 'settings',
          },
        ],
      },
    ],
  },
]);

const menu = reactive([
  {
    label: translates.menu.home,
    route: '/teste',
    icon: 'home',
    separator: true,
  },
  {
    label: translates.menu.home,
    route: '/',
    icon: 'home',
    separator: true,
  },
  {
    label: translates.menu.home,
    route: '/',
    icon: 'home',
    separator: true,
  },
]);

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
