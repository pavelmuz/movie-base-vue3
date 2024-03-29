<template>
  <div class="profile-container">
    <n-card :bordered="false" class="profile-card">
      <n-flex>
        <!-- Avatar image -->
        <profile-avatar size="large" :image="profile.profile_image" />
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
        <options-dropdown
          :show="showOptionsDropdown"
          @open-edit="showEditModal = true"
          @open-delete="showDeleteModal = true"
        />
        <!-- Edit profile modal -->
        <edit-profile-modal
          :show="showEditModal"
          :profile="profile"
          @update:show="showEditModal = $event"
          @close-modal="showEditModal = false"
          @update-profile="$emit('updateProfile', profile), (showEditModal = false)"
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
import OptionsDropdown from '@/components/OptionsDropdown.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import ProfileCounter from '@/components/ProfileCounter.vue'
import { NCard, NFlex } from 'naive-ui'
import { ref, watch } from 'vue'

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

watch(
  () => props.profile,
  (newValue, oldValue) => {
    if (newValue) {
      profile.value = newValue
      showFollowers.value = false
      showFollowings.value = false
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
</style>
