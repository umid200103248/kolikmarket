<template>
  <div class="container px-4 py-8">
    <div class="grid">
      <div class="col-6">
        <img
          :src="product?.photo || noPhotoImage"
          alt="product photo"
          class="block border-round-2xl"
          :class="$style.img"
        />
      </div>
      <div v-if="product != null" class="col">
        <div class="mb-3 flex align-items-center justify-content-between">
          <h1 class="font-bold text-3xl inline-block m-0">
            {{ product.product_name }}
          </h1>
          <span class="text-gray-400 flex align-items-center justify-content-between">
            <i class="pi pi-eye mr-1" style="font-size: 1.25rem" />
            <span>{{ product.views }}</span>
          </span>
        </div>
        <div class="font-semibold text-xl mb-3">{{ product.product_category }}</div>
        <div class="font-semibold text-2xl">{{ HelpersUtil.priceFormat(product.price) }}</div>
        <p class="text-gray-400">{{ product.product_description }}</p>
        <div class="grid">
          <!--          <div class="col">-->
          <!--            <Button class="w-full" label="Купить" @click="addToCart()" />-->
          <!--          </div>-->
          <!--          <div class="col">-->
          <!--            <Button-->
          <!--              class="w-full"-->
          <!--              severity="secondary"-->
          <!--              label="Добавить в корзину"-->
          <!--              icon="pi pi-cart-arrow-down"-->
          <!--              @click="addToCart()"-->
          <!--            />-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <ProductFeedbacks
      :product-id="product?.product_id || 0"
      :feedbacks="product?.feedbacks || []"
      class="mt-6"
    />
  </div>
</template>

<script setup>
import noPhotoImage from '@/assets/images/no-photo.png';
import { HelpersUtil } from '@/helpers/index.js';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ProductsModel from '@/api/models/ProductsModel.js';
import ProductFeedbacks from '@/components/ProductFeedbacks.vue';

const toast = useToast();
const route = useRoute();

const product = ref(null);

async function addToCart() {
  toast.add({
    severity: 'success',
    summary: `Продукт ${product.value?.product_name} добавлен в корзину`,
    life: 4000
  });
}

async function getProductById() {
  const res = await ProductsModel.getProductById(route.params.productId);
  product.value = res.data;
}

onMounted(() => {
  getProductById();
});
</script>

<style lang="scss" module>
.img {
  width: 85%;
  aspect-ratio: 4 / 3;
}
</style>
