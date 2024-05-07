<template>
  <div class="grid">
    <div
      v-for="card in cards"
      :key="card.title"
      class="col-4 border-round relative text-center cursor-pointer p-3"
      :class="$style.card"
    >
      <img :src="card.img" :alt="card.title" class="w-full border-round" :class="$style.img" />
      <div class="text-xl transition-duration-300 w-full px-2 font-bold centerBlock text-white">
        {{ card.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import carPartsImage from '@/assets/images/car-parts/car-parts.jpeg';
import carAccessoriesImage from '@/assets/images/car-parts/car-accessories.webp';
import carOilsImage from '@/assets/images/car-parts/car-oils.webp';
import carGlassesImage from '@/assets/images/car-parts/car-glass.webp';
import carTiresImage from '@/assets/images/car-parts/car-tires.jpeg';
import carElectronicsImage from '@/assets/images/car-parts/car-electronics.jpeg';
import { computed } from 'vue';

const cards = computed(() => [
  {
    title: 'Кузовные детали',
    img: carPartsImage,
    to: ''
  },
  {
    title: 'Аксессуары',
    img: carAccessoriesImage,
    to: ''
  },
  {
    title: 'Масла и автохимия',
    img: carOilsImage,
    to: ''
  },
  {
    title: 'Автостекла',
    img: carGlassesImage,
    to: ''
  },
  {
    title: 'Шины и диски',
    img: carTiresImage,
    to: ''
  },
  {
    title: 'Электроника',
    img: carElectronicsImage,
    to: ''
  }
]);
</script>

<style lang="scss" module>
.card {
  height: 200px;
  overflow: hidden;
}

.img {
  height: 100%;
  filter: brightness(40%);
}
</style>
