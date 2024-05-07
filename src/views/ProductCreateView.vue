<template>
  <div class="container px-4 py-8">
    <div class="text-2xl font-bold mb-8">Создание товара</div>
    <Accordion multiple :active-index="[0, 1, 2, 3]" class="flex flex-column gap-5">
      <AccordionTab header="Основная информация">
        <div class="grid">
          <div class="col-12 flex flex-column">
            <label for="product_name" class="font-bold mb-2">Название товара</label>
            <InputText
              id="product_name"
              v-model="form.product_name"
              placeholder="Введите название товара"
            />
          </div>
          <div class="col-6 flex flex-column">
            <label for="manufacturer_id" class="font-bold mb-2">Марка автомобиля</label>
            <AppSelect
              id="manufacturer_id"
              v-model="form.manufacturer_id"
              placeholder="Выберите марку"
              option-label="name"
              option-value="manufacturer_id"
              :custom-options="resources.manufacturer"
            />
          </div>
          <div class="col-6 flex flex-column">
            <label for="model_id" class="font-bold mb-2">Модель</label>
            <AppSelect
              id="model_id"
              v-model="form.model_id"
              placeholder="Выберите модель авто"
              option-label="model_name"
              option-value="model_id"
              :custom-options="car_models"
            />
          </div>
          <div class="col-12 flex flex-column">
            <label for="description" class="font-bold mb-2">Описание товара</label>
            <Textarea
              id="description"
              v-model="form.description"
              auto-resize
              placeholder="Введите описание товара"
            />
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="Изображения">
        <AppFileUpload v-model="form.photo" />
        <div class="border-round bg-gray-100 p-3 mt-3">
          <i class="pi pi-info-circle mr-3" style="font-size: 1.25rem" />Допустимые форматы
          изображения: jpg, jpeg, png
        </div>
      </AccordionTab>
      <AccordionTab header="Категория и цена">
        <div class="grid">
          <div class="flex flex-column col-6">
            <label for="category_id" class="font-bold mb-2">Категория</label>
            <AppSelect
              id="category_id"
              v-model="form.category_id"
              placeholder="Выберите категорию"
              option-label="name"
              option-value="category_id"
              :custom-options="resources.categories"
            />
          </div>
          <div class="col-6 flex flex-column">
            <label for="price" class="font-bold mb-2">Цена товара</label>
            <InputText id="price" v-model="form.price" placeholder="Введите цену" type="number" />
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="Контакты">
        <div class="flex flex-column mb-5">
          <label for="your_city" class="font-bold mb-2">Ваш город</label>
          <AppSelect
            id="your_city"
            v-model="form.your_city"
            placeholder="Выберите страну"
            option-label="city_name"
            option-value="city_name"
            :custom-options="kzCities"
          />
        </div>
        <div class="flex flex-column">
          <label for="phone_number" class="font-bold mb-2">Контактный телефон</label>
          <InputMask
            id="phone_number"
            v-model="form.phone_number"
            mask="+7-(999)-999-99-99"
            placeholder="Введите номер телефона"
          />
        </div>
      </AccordionTab>
    </Accordion>
    <Button
      class="mt-5"
      label="Создать товар"
      :loading="loading"
      icon="pi pi-plus"
      @click="createProduct"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import AppFileUpload from '@/components/AppFileUpload.vue';
import useAsyncHandler from '@/composables/useAsyncHandler.js';
import { useRouter } from 'vue-router';
import ProductsModel from '@/api/models/ProductsModel.js';
import { useToast } from 'primevue/usetoast';
import AppSelect from '@/components/AppSelect.vue';
import kzCities from '@/api/kz_cities.json';

const toast = useToast();
const router = useRouter();

const form = ref({
  category_id: null,
  product_name: '',
  description: '',
  model_id: '',
  manufacturer_id: '',
  your_city: '',
  photo: '',
  phone_number: '',
  price: null,
  is_used: false,
  count: 1
});

const { loading, executeAsyncOperation } = useAsyncHandler();

async function createProduct() {
  const onSuccess = () => {
    toast.add({
      severity: 'success',
      summary: `Товар успешно создан`,
      life: 4000
    });

    router.push('/profile/products');
  };
  const onCatch = (e) => {
    toast.add({
      severity: 'error',
      summary: e.response?.data?.message || `Не удалось создать товар`,
      life: 4000
    });
  };

  await executeAsyncOperation(ProductsModel.createProduct, [form.value], { onSuccess, onCatch });
}

const resources = ref({});

const car_models = computed(() =>
  resources.value.car_models
    ? form.value.manufacturer_id
      ? resources.value.car_models.filter((i) => i.manufacturer_id === form.value.manufacturer_id)
      : resources.value.car_models
    : []
);

async function getProductResources() {
  const res = await ProductsModel.getProductResources();
  resources.value = res.data;
}

onMounted(() => {
  getProductResources();
});
</script>

<style lang="scss" scoped></style>
