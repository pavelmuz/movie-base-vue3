<template>
  <n-modal :show="showModal" @update:show="updateShowEditProfile">
    <n-card :bordered="false" role="dialog" aria-modal="true" class="edit-modal">
      <n-flex vertical :size="1">
        <h2>Редактировать профиль</h2>
        <p>Имя пользователя:</p>
        <n-input
          v-model:value="profile.username"
          type="text"
          placeholder=""
          maxlength="30"
          show-count
        />
        <p>Полное имя:</p>
        <n-input
          v-model:value="profile.name"
          type="text"
          placeholder=""
          maxlength="30"
          show-count
        />
        <p>Дата рождения:</p>
        <n-date-picker v-model:formatted-value="profile.birthday" type="date" placeholder="" />
        <p>Электронная почта:</p>
        <n-input v-model:value="profile.email" type="text" placeholder="" />
        <div>
          <p>Фото профиля:</p>
          <n-upload @change="handleFileChange">
            <n-button color="#C3EDC0" text-color="#0b666a" class="select-button"
              ><i class="fa-regular fa-image"></i>Выбрать файл</n-button
            >
          </n-upload>
        </div>
        <n-flex align="center" :size="20">
          <n-button
            color="#C3EDC0"
            text-color="#0b666a"
            @click="emitCloseModal"
            class="cancel-button"
            >Омена</n-button
          >
          <n-button
            color="#C3EDC0"
            text-color="#0b666a"
            @click="emitUpdateProfile(profile)"
            class="save-button"
            ><i class="fa-solid fa-floppy-disk"></i> Сохранить</n-button
          >
        </n-flex>
      </n-flex>
    </n-card>
  </n-modal>
</template>

<script setup>
import { NButton, NCard, NDatePicker, NFlex, NInput, NModal, NUpload } from 'naive-ui'
import { ref, watch } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
})

const profile = ref({})
const showModal = ref(props.show)
const emit = defineEmits(['update:show', 'closeModal', 'updateProfile'])
const avatar = ref(null)

function handleFileChange(file) {
  avatar.value = file
}

function updateShowEditProfile(newValue) {
  emit('update:show', newValue)
}

function emitCloseModal() {
  emit('closeModal')
}

function emitUpdateProfile(profile) {
  showModal.value = false
  console.log(avatar.value)
  emit('updateProfile', { profile, avatar: avatar.value })
}

watch(
  () => props.profile,
  (newValue, oldValue) => {
    if (newValue) {
      profile.value = newValue
    }
  }
)

watch(
  () => props.show,
  (newVal) => {
    showModal.value = newVal
  }
)
</script>

<style scoped>
.cancel-button,
.select-button,
.save-button {
  width: 150px;
  border-radius: 6px;
}

.select-button {
  margin-bottom: 10px;
}

.fa-image,
.fa-floppy-disk {
  margin-right: 8px;
}

.edit-modal {
  width: 550px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.edit-modal h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.edit-modal p {
  font-size: medium;
  margin: 5px;
}
</style>
