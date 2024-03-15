<template>
  <div class="container">
    <n-card :bordered="false" class="profile-card">
      <n-flex align="center">
        <n-flex align="center" @click="goToProfile(profile.id)" class="profile-link">
          <profile-avatar size="medium" :image="profile.profile_image" />
          <n-flex vertical :size="1">
            <h2 class="text-username">{{ profile.username }}</h2>
            <p class="text-name">{{ profile.name }}</p>
          </n-flex>
        </n-flex>
        <n-button
          v-if="authStore.isAuthenticated && isFollowing"
          ghost
          color="#c3edc0"
          class="unfollow-button"
          >Подписан</n-button
        >
        <n-button
          v-if="authStore.isAuthenticated && !isFollowing"
          ghost
          color="#c3edc0"
          class="follow-button"
          >Подписаться</n-button
        >
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import { useAuthStore } from '@/stores/authStore'
import { NButton, NCard, NFlex } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const authStore = useAuthStore()
const router = useRouter()

const isFollowing = ref(false)

function goToProfile(id) {
  router.push({ name: 'profile', params: { id: id } })
}

watch(
  () => props.profile,
  (newValue, oldValue) => {
    if (newValue) {
      const profileId = localStorage.getItem('profileId')
      isFollowing.value = newValue.followers.some((follower) => follower.follower.id === profileId)
    }
  }
)
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.profile-card {
  max-width: 600px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.profile-link {
  cursor: pointer;
}

.text-username {
  margin: 0;
}

.text-name {
  font-size: medium;
  margin: 0;
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
</style>
