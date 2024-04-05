<template>
  <div class="container px-4 py-8">
    <div class="text-2xl font-bold mb-8">Профиль пользователя</div>
    <div class="flex gap-8 mb-3">
      <div class="w-10rem font-bold">Фото</div>
      <Image :src="form.photo || noPhotoImage" alt="avatar" width="200px" :class="$style.avatar" />
      <FileUpload
        mode="basic"
        accept="image/*"
        :max-file-size="1000000"
        choose-label="Выбрать"
        @select="onSelect"
      />
    </div>
    <div class="flex gap-8 mb-5 align-items-center">
      <label for="name" class="w-10rem font-bold">Имя</label>
      <InputText id="name" v-model="form.name" class="flex-grow-1" placeholder="Имя" />
    </div>
    <div class="flex gap-8 mb-5 align-items-center">
      <label for="address" class="w-10rem font-bold">Адрес</label>
      <InputText id="address" v-model="form.address" class="flex-grow-1" placeholder="Адрес" />
    </div>
    <div class="flex gap-8 mb-5 align-items-center">
      <label for="email" class="w-10rem font-bold">E-mail</label>
      <InputText id="email" v-model="form.email" class="flex-grow-1" placeholder="E-mail" />
    </div>
    <!--    <div class="flex gap-8 mb-5 align-items-center">-->
    <!--      <label for="address" class="w-10rem font-bold">Имя пользователя</label>-->
    <!--      <InputText-->
    <!--        id="address"-->
    <!--        v-model="form.address"-->
    <!--        class="flex-grow-1"-->
    <!--        placeholder="Имя пользователя"-->
    <!--      />-->
    <!--    </div>-->
    <div class="flex gap-8 mb-5 align-items-center">
      <label for="birthday" class="w-10rem font-bold">Дата рождения</label>
      <InputText
        id="birthday"
        v-model="form.email_verified_at"
        class="flex-grow-1"
        placeholder="Дата рождения"
      />
    </div>
    <Button
      label="Сохранить изменения"
      class="mt-6"
      icon="pi pi-user-edit"
      :loading="loading"
      @click="saveChanges"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import noPhotoImage from '@/assets/images/no-photo.png';
import UserModel from '@/api/models/UserModel.js';
import useAsyncHandler from '@/composables/useAsyncHandler.js';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const { loading, executeAsyncOperation } = useAsyncHandler();

const form = ref({
  name: '',
  email: '',
  address: '',
  photo: '',
  email_verified_at: ''
});

async function getProfileInfo() {
  const res = await UserModel.getProfileInfo();
  form.value = res.data;
}

async function saveChanges() {
  const onSuccess = (res) => {
    toast.add({
      severity: 'success',
      summary:
        res.message || `На вашу почту было отправлено письмо с ссылкой для восстановления доступа`,
      life: 3000
    });
  };

  const onCatch = (e) => {
    toast.add({
      severity: 'error',
      summary: e.response?.data?.message || `Не удалось сохранить изменения`,
      life: 3000
    });
  };
  executeAsyncOperation(UserModel.updateProfileInfo, [form.value], { onSuccess, onCatch });
}

const onSelect = async (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  const blob = await fetch(file.objectURL).then((r) => r.blob());

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    form.value.photo = reader.result;
  };
};

onMounted(() => {
  getProfileInfo();
});
</script>

<style lang="scss" module>
.avatar {
  aspect-ratio: 1 / 1;
}
</style>
