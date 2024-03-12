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
        <edit-profile-modal
          :show="showEditModal"
          :profile="profile"
          @update:show="showEditModal = $event"
          @close-modal="showEditModal = false"
        />
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
import EditProfileModal from '@/components/EditProfileModal.vue'
import FollowersModal from '@/components/FollowersModal.vue'
import FollowingsModal from '@/components/FollowingsModal.vue'
import ProfileCounter from '@/components/ProfileCounter.vue'
import { NButton, NCard, NDropdown, NFlex } from 'naive-ui'
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

.profile-dropdown-btn {
  margin-left: auto;
  margin-bottom: auto;
  margin-top: 15px;
}

.avatar-img-lg {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}
</style>
