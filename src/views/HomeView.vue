<script setup>
import HomeCarousel from '@/components/home/HomeCarousel.vue';
import HomeCategories from '@/components/home/HomeCategories.vue';
import HomeCarBrands from '@/components/home/HomeCarBrands.vue';
import carSellerImage from '@/assets/images/banners/car-seller.jpeg';
</script>

<template>
  <div class="container">
    <HomeCarousel class="my-8" />
    <HomeCategories class="mb-8" />
    <HomeCarBrands />
    <div class="flex justify-content-center gap-8 align-items-center my-8">
      <img :src="carSellerImage" width="500px" alt="car seller" class="border-round" />
      <div class="w-30rem">
        <div class="text-3xl font-bold">Увеличьте свою клиентскую базу с нами!</div>
        <div class="text-lg my-5">
          Станьте частью нашего маркетплейса и получите доступ к тысячам потенциальных покупателей.
        </div>
        <Button>Стать продвацом</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
