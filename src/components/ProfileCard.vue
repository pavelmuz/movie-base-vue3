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
              @update:show="showFollowers = $event"
              :followers="profile.followers"
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
              @update:show="showFollowings = $event"
              :followings="profile.followings"
            />
          </n-flex>
          <!-- Follow & Chat buttons -->
          <n-flex v-if="authStore.isAuthenticated" justify="space-between">
            <n-button
              v-if="isFollowing"
              ghost
              color="#c3edc0"
              @click="emitRemoveFollow(profile.id)"
              class="unfollow-button"
              >Подписан</n-button
            >
            <n-button
              v-if="!isFollowing"
              ghost
              color="#c3edc0"
              @click="emitAddFollow(profile.id)"
              class="follow-button"
              >Подписаться</n-button
            >
            <n-button
              color="#C3EDC0"
              text-color="#0b666a"
              @click.prevent="goToChat(profile.id)"
              class="chat-button"
              ><i class="fa-solid fa-pen-to-square"></i> Сообщение
            </n-button>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import FollowersModal from '@/components/FollowersModal.vue'
import FollowingsModal from '@/components/FollowingsModal.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import ProfileCounter from '@/components/ProfileCounter.vue'
import { useAuthStore } from '@/stores/authStore'
import { NButton, NCard, NFlex } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  profile: {
    type: Object,
    required: false
  },
  movieCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['addFollow', 'removeFollow'])

const authStore = useAuthStore()
const router = useRouter()

const profile = ref({})
const movieCount = ref()
const followersCount = ref()
const followingsCount = ref()
const showFollowers = ref(false)
const showFollowings = ref(false)
const isFollowing = ref(false)
const profileId = localStorage.getItem('profileId')

function emitAddFollow(profileId) {
  emit('addFollow', profileId)
}

function emitRemoveFollow(profileId) {
  emit('removeFollow', profileId)
}

function goToChat(profileId) {
  router.push({ name: 'chat', params: { recipientId: profileId }, query: { from: 'profile' } })
}

watch(
  () => props.profile,
  (newValue, oldValue) => {
    if (newValue) {
      profile.value = newValue
      showFollowers.value = false
      showFollowings.value = false
      followersCount.value = newValue.followers.length
      followingsCount.value = newValue.followings.length
      isFollowing.value = newValue.followers.some((follower) => follower.follower.id === profileId)
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

.follow-button {
  margin-left: auto;
  border-radius: 6px;
  width: 130px;
}

.follow-button:hover {
  background-color: #c3edc0;
  color: #0b666a;
}

.unfollow-button {
  background-color: #c3edc0;
  width: 130px;
  margin-left: auto;
  color: #0b666a;
  border-radius: 6px;
}

.chat-button {
  width: 150px;
  border-radius: 6px;
}

.select-button {
  margin-bottom: 10px;
}

.fa-pen-to-square {
  margin-right: 8px;
}
</style>
