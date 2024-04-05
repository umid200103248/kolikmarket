<template>
  <div class="container px-4 py-8">
    <AppFilter />
    <div class="grid">
      <div class="col-3 relative">
        <ProductsCategories class="sticky top-0 left-0" />
      </div>
      <div class="col">
        <ProductsList />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductsCategories from '@/components/ProductsCategories.vue';
import AppFilter from '@/components/AppFilter.vue';
import ProductsList from '@/components/ProductsList.vue';
</script>

<style lang="scss" scoped></style>
