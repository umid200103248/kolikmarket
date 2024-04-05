<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <Toast />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Toast from 'primevue/toast';
</script>

<style lang="scss" scoped></style>
