<template>
  <div class="bg-primary fullscreen text-white">
    <div flex flex-end class="q-pa-sm">
      <TranslateSelector></TranslateSelector>
    </div>
    <div class="bg-primary text-white text-center q-pa-md flex flex-center">
      <div>
        <div style="font-size: 30vh">404</div>

        <div class="text-h2" style="opacity: 0.4">
          {{ t('notFound.error') }}
        </div>

        <q-btn
          class="q-mt-xl"
          color="white"
          text-color="primary"
          unelevated
          to="/"
          :label="t('notFound.back')"
          no-caps
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// COMPONENTS
import TranslateSelector from '@/components/translate/TranslateSelector.vue';
// LIBS
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
</script>
