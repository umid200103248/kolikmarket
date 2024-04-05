<template>
  <div>
    <div class="text-xl font-bold">Отзывы о товаре</div>
    <Rating v-model="rating.score" :cancel="false" class="my-3" />
    <InputGroup class="w-8">
      <InputText v-model="rating.content" placeholder="Напишите свое мнение о товаре" />
      <Button
        label="Поделиться"
        icon="pi pi-arrow-right"
        icon-pos="right"
        :loading="loading"
        @click="sendFeedback"
      />
    </InputGroup>
    <div class="text-xl font-bold my-4">{{ feedbacks.length }} отзывов</div>
    <ul class="flex flex-column gap-3">
      <li
        v-for="feedback in feedbacks"
        :key="feedback.feedback_id"
        class="flex justify-content-between max-w-30rem"
      >
        <p class="">{{ feedback.content }}</p>
        <Rating :model-value="feedback.score" readonly :cancel="false" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductsModel from '@/api/models/ProductsModel.js';
import useAsyncHandler from '@/composables/useAsyncHandler.js';
import { useToast } from 'primevue/usetoast';
import InputGroup from 'primevue/inputgroup';

const toast = useToast();

const props = defineProps({
  productId: {
    type: Number,
    required: true
  },
  feedbacks: {
    type: Array,
    default: () => []
  }
});

const { loading, executeAsyncOperation } = useAsyncHandler();
const rating = ref({ score: 0, content: '' });

// const feedbacks = ref([]);
// async function getFeedback() {
//   const res = await ProductsModel.getFeedbacks(props.productId);
//   feedbacks.value = res.data;
// }
//
// onMounted(() => {
//   getFeedback();
// });
async function sendFeedback() {
  const data = { ...rating.value, product_id: props.productId, service_id: 1 };

  const onCatch = () => {
    toast.add({
      severity: 'error',
      summary: `Не удалось оставить отзыв`,
      life: 4000
    });
  };

  const onSuccess = () => {
    toast.add({
      severity: 'success',
      summary: `Ваш отзыв успешно отправлен`,
      life: 4000
    });
  };

  await executeAsyncOperation(ProductsModel.sendFeedback, [data], { onSuccess, onCatch });
}
</script>

<style lang="scss" scoped></style>
