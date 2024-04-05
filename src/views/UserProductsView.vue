<template>
  <div class="container px-4 py-8">
    <div class="text-2xl font-bold mb-8">Мои товары</div>
    <div class="flex align-items-center justify-content-between">
      <div class="font-medium">Всего {{ products.length }} товаров</div>
      <RouterLink to="/product/create">
        <Button icon="pi pi-plus" label="Добавить товар" />
      </RouterLink>
    </div>
    <div class="grid mt-6">
      <div v-for="product in products" :key="product.product_id" class="col-6">
        <div class="bg-gray-50 flex gap-3 border-round p-3">
          <img
            :src="product.photo || noPhotoImage"
            alt="product photo"
            class="border-round"
            width="240px"
            :class="$style.img"
          />
          <div>
            <div class="font-bold mb-2">{{ product.product_name }}</div>
            <div class="mb-2">{{ product.product_category }}</div>
            <div class="mb-2">{{ HelpersUtil.priceFormat(product.price) }}</div>
            <div class="mb-2 text-gray-400">{{ product.product_description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import noPhotoImage from '@/assets/images/no-photo.png';
import UserModel from '@/api/models/UserModel.js';
import { HelpersUtil } from '../helpers/index.js';

const products = ref([]);

async function getProducts() {
  const res = await UserModel.getProducts();
  products.value = res.data;
}

onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" module>
.img {
  aspect-ratio: 237 / 139;
}
</style>
