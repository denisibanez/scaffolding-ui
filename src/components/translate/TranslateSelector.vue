<template>
  <div class="translate__wrapper q-mb-sm">
    <div class="row">
      <div class="col flex justify-end">
        <div class="home__selectLanguage flex items-center">
          <img
            src="@/assets/img/br.png"
            outlined
            @click="changeLocale('pt'), (active = 'active-br')"
            class="cursor-pointer q-mr-sm"
            style="max-width: 25px"
            :class="{ 'active-br': active == 'active-br' }"
          />

          <img
            src="@/assets/img/en.png"
            outlined
            @click="changeLocale('en'), (active = 'active-en')"
            class="cursor-pointer"
            style="max-width: 25px"
            :class="{ 'active-en': active == 'active-en' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import i18n from '@/locales';
import { onMounted, ref } from 'vue';

const active = ref('');

onMounted(() => {
  const conditional: any = localStorage.getItem('language');
  i18n.global.locale.value = conditional
    ? conditional
    : 'pt';
  active.value = i18n.global.locale.value === 'pt' ? 'active-br' : 'active-en';
});

function changeLocale(event: any) {
  i18n.global.locale.value = event;
  localStorage.setItem('language', event);
}
</script>

<style scoped lang="scss">
.active-br {
  border-bottom: 2px solid green;
}

.active-en {
  border-bottom: 2px solid green;
}
</style>
