<script setup lang="ts">
import { ref } from 'vue'
import {BcButton}  from '@denisibanez/design-system-ui';

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <BcButton />


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
