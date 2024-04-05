<template>
  <header class="border-bottom-1 border-gray-300">
    <div class="container flex align-items-center justify-content-between p-4">
      <RouterLink to="/">
        <img src="@/assets/images/logo.png" alt="logo" height="63" class="h-2rem" />
      </RouterLink>
      <nav>
        <ul class="flex align-items-center gap-5 list-none">
          <li v-for="link in navLinks" :key="link.id">
            <RouterLink
              :to="link.to"
              exact-active-class="text-primary"
              class="text-black-alpha-90 hover:text-primary"
            >
              {{ link.text }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <HeaderUserButton />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import HeaderUserButton from '@/components/HeaderUserButton.vue';

const navLinks = computed(() => [
  { id: 1, text: 'Главная', to: '/' },
  { id: 2, text: 'Каталог продуктов', to: '/products' },
  { id: 3, text: 'Стать продавцом', to: '/register' },
  { id: 4, text: 'Контакты', to: '/contacts' }
]);
</script>

<style lang="scss" scoped></style>
