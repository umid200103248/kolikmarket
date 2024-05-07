<template>
  <div>
    <div class="text-2xl font-semibold mb-6 text-center">Искать по марке автомобиля</div>
    <div class="grid">
      <RouterLink
        v-for="manufacturer in manufacturers"
        :key="manufacturer.manufacturer_id"
        class="col-2 text-primary-500 uppercase"
        :to="{ path: '/products', query: { manufacturer_id: manufacturer.manufacturer_id } }"
      >
        {{ manufacturer.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ProductsModel from '@/api/models/ProductsModel.js';

const manufacturers = ref([]);

async function getManufacturers() {
  const res = await ProductsModel.getProductResources();
  manufacturers.value = res.data.manufacturer;
}

onMounted(() => {
  getManufacturers();
});
</script>

<style lang="scss" scoped></style>
