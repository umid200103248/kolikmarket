<template>
  <div class="card">
    <FileUpload
      name="file"
      :multiple="false"
      accept="image/*"
      :max-file-size="1000000"
      :show-upload-button="false"
      choose-label="Выберите файл"
      cancel-label="Удалить файл"
      invalid-file-type-message="Некорректный формат изображения"
      custom-upload
      @select="onSelect"
    >
      <template #empty>
        <p>Перетащите файл в эту область для загрузки</p>
      </template>
    </FileUpload>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:model-value']);

const onSelect = async (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  const blob = await fetch(file.objectURL).then((r) => r.blob());

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    const base64data = reader.result;
    emit('update:model-value', base64data);
  };
};
</script>
