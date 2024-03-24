<template>
  <n-modal :show="showModal" @update:show="updateShowEditProfile">
    <n-card :bordered="false" role="dialog" aria-modal="true" class="edit-modal">
      <n-flex>
        <n-flex>
          <n-upload @change="changeProfileImage" :show-file-list="false" :multiple="false">
            <n-flex vertical>
              <n-button tag="img" :src="profile.profile_image" class="select-avatar-button" />
              <n-button text color="#c3edc0">Выбрать фото</n-button>
            </n-flex>
          </n-upload>
        </n-flex>
        <n-flex vertical :size="1">
          <h2>Редактировать профиль</h2>
          <p>Имя пользователя:</p>
          <n-input v-model:value="profile.username" type="text" />
          <p>Полное имя:</p>
          <n-input v-model:value="profile.name" type="text" />
          <p>Дата рождения:</p>
          <n-date-picker
            v-model:formatted-value="profile.birthday"
            type="date"
            class="date-input"
          />
          <p>Электронная почта:</p>
          <n-input v-model:value="profile.email" type="text" />
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
      </n-flex>
    </n-card>
  </n-modal>
</template>

<script setup>
import apiProfiles from '@/services/apiProfiles'
import { NButton, NCard, NDatePicker, NFlex, NInput, NModal, NUpload, useMessage } from 'naive-ui'
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
const message = useMessage()

async function changeProfileImage(file) {
  avatar.value = file
  const profileData = new FormData()
  profileData.append('image', avatar.value)
  try {
    await apiProfiles.patchAccount(profileData)
    profile.value = await apiProfiles.getAccount()
    message.success('Аккаунт успешно изменен', {
      closable: true,
      duration: 5e3
    })
    avatar.value = null
    file = null
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

function updateShowEditProfile(newValue) {
  emit('update:show', newValue)
}

function emitCloseModal() {
  emit('closeModal')
}

function emitUpdateProfile(profile) {
  showModal.value = false
  emit('updateProfile', profile)
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
.save-button {
  width: 150px;
  border-radius: 6px;
  margin-top: 10px;
}

.select-avatar-button {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 8px;
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
