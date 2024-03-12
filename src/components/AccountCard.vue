<template>
  <div class="profile-container">
    <n-card :bordered="false" class="profile-card">
      <n-flex>
        <!-- Avatar image -->
        <img :src="profile.profile_image" class="avatar-img-lg" />
        <!-- User info and followers -->
        <n-flex vertical>
          <!-- Info -->
          <h1 class="profile-username">{{ profile.username }}</h1>
          <h4 class="profile-name">{{ profile.name }} {{ profile.birthday }}</h4>
          <n-flex>
            <!-- Movie Count -->
            <profile-counter :counter="movieCount || 0" text="фильмы" />
            <!-- Followers -->
            <profile-counter
              :counter="followersCount"
              text="подписчики"
              @click.prevent="showFollowers = true"
              class="modal-open-button"
            />
            <!-- Followers Modal -->
            <followers-modal
              :show="showFollowers"
              :followers="profile.followers"
              @update:show="showFollowers = $event"
            />
            <!-- Followings -->
            <profile-counter
              :counter="followingsCount"
              text="подписки"
              @click.prevent="showFollowings = true"
              class="modal-open-button"
            />
            <!-- Followings Modal -->
            <followings-modal
              :show="showFollowings"
              :followings="profile.followings"
              @update:show="showFollowings = $event"
            />
          </n-flex>
        </n-flex>
        <!-- Profile options -->
        <n-dropdown
          :show="showOptionsDropdown"
          placement="left-start"
          size="large"
          :options="profileOptions"
          style="background-color: #237578; border-radius: 6px"
        >
          <n-button
            :bordered="false"
            text
            text-color="#C3EDC0"
            size="large"
            @click="showOptionsDropdown = !showOptionsDropdown"
            class="profile-dropdown-btn"
          >
            <i class="fa-solid fa-ellipsis fa-xl dropdown-btn"></i>
          </n-button>
        </n-dropdown>
        <!-- Edit profile modal -->
        <n-modal v-model:show="showEditModal">
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
              <n-date-picker
                v-model:formatted-value="profile.birthday"
                type="date"
                placeholder=""
              />
              <p>Электронная почта:</p>
              <n-input v-model:value="profile.email" type="text" placeholder="" />
              <div>
                <p>Фото профиля:</p>
                <n-upload>
                  <n-button color="#C3EDC0" text-color="#0b666a" class="select-button"
                    ><i class="fa-regular fa-image"></i>Выбрать файл</n-button
                  >
                </n-upload>
              </div>
              <n-flex align="center" :size="20">
                <n-button
                  color="#C3EDC0"
                  text-color="#0b666a"
                  @click="showEditModal = false"
                  class="cancel-button"
                  >Омена</n-button
                >
                <n-button color="#C3EDC0" text-color="#0b666a" class="save-button"
                  ><i class="fa-solid fa-floppy-disk"></i> Сохранить</n-button
                >
              </n-flex>
            </n-flex>
          </n-card>
        </n-modal>
        <!-- Delete profile modal -->
        <delete-profile-modal
          :show="showDeleteModal"
          @update:show="showDeleteModal = $event"
          @close-modal="showDeleteModal = false"
        />
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import DeleteProfileModal from '@/components/DeleteProfileModal.vue'
import FollowersModal from '@/components/FollowersModal.vue'
import FollowingsModal from '@/components/FollowingsModal.vue'
import ProfileCounter from '@/components/ProfileCounter.vue'
import { NButton, NCard, NDatePicker, NDropdown, NFlex, NInput, NModal, NUpload } from 'naive-ui'
import { h, ref, watch } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  movieCount: {
    type: Number,
    required: false
  }
})

const profile = ref({})
const movieCount = ref()
const followersCount = ref()
const followingsCount = ref()
const showFollowers = ref(false)
const showFollowings = ref(false)
const showOptionsDropdown = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

function handleEdit() {
  showOptionsDropdown.value = false
  showEditModal.value = true
}

function handleDelete() {
  showOptionsDropdown.value = false
  showDeleteModal.value = true
}

function renderEditOption() {
  return h(
    'div',
    {
      style: {
        margin: '5px 15px',
        color: '#c3edc0',
        cursor: 'pointer'
      },
      onClick: handleEdit
    },
    [h('i', { class: 'fa-solid fa-pen-to-square', style: { 'margin-right': '5px' } }), 'Изменить']
  )
}

function renderDeleteOption() {
  return h(
    'div',
    {
      style: {
        margin: '5px 15px',
        color: '#c3edc0',
        cursor: 'pointer'
      },
      onClick: handleDelete
    },
    [h('i', { class: 'fa-solid fa-trash-can', style: { 'margin-right': '5px' } }), 'Удалить']
  )
}

const profileOptions = [
  {
    key: 'edit',
    type: 'render',
    render: renderEditOption
  },
  {
    key: 'delete',
    type: 'render',
    render: renderDeleteOption
  }
]

watch(
  () => props.profile,
  (newValue, oldValue) => {
    if (newValue) {
      profile.value = newValue
      followersCount.value = newValue.followers.length
      followingsCount.value = newValue.followings.length
    }
  }
)

watch(
  () => props.movieCount,
  (newValue, oldValue) => {
    if (newValue) {
      movieCount.value = newValue
    }
  }
)
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.profile-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.profile-username {
  margin: 0;
}

.profile-name {
  margin-top: 0;
}

.modal-open-button {
  cursor: pointer;
  margin-left: 10px;
}

.cancel-button,
.select-button,
.save-button {
  width: 150px;
  border-radius: 6px;
}

.select-button {
  margin-bottom: 10px;
}

.profile-dropdown-btn {
  margin-left: auto;
  margin-bottom: auto;
  margin-top: 15px;
}

.fa-pen-to-square,
.fa-image,
.fa-floppy-disk {
  margin-right: 8px;
}

.avatar-img-lg {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
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
