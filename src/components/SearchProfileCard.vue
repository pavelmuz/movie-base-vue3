<template>
  <div class="container card search-user-card mx-auto my-1">
    <div class="row">
      <!-- User Avatar -->
      <div class="col-1 my-auto">
        <router-link
          :to="{ name: 'profile', params: { id: profile.id } }"
          class="card-link text-decoration-none"
        >
          <img :src="profile.profile_image" class="avatar-img-md" />
        </router-link>
      </div>
      <!-- User info -->
      <div class="col-8 my-auto">
        <router-link
          :to="{ name: 'profile', params: { id: profile.id } }"
          class="card-link text-decoration-none"
        >
          <div class="card-body">
            <h5 class="card-title">{{ profile.username }}</h5>
            <p class="card-subtitle">{{ profile.name }}</p>
          </div>
        </router-link>
      </div>
      <!-- Follow-unfollow buttons -->
      <div v-if="authStore.isAuthenticated" class="col-3 my-auto">
        <!-- Unfollow action -->
        <button class="btn following-btn" name="unfollow" v-if="isFollowing">Подписан</button>
        <!-- Follow action -->
        <button class="btn follow-btn" name="follow" v-if="!isFollowing">Подписаться</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref, watch } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const authStore = useAuthStore()

const isFollowing = ref(true)

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
.card-link {
  color: #c3edc0;
}
.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.search-user-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 600px;
}

.follow-btn {
  background-color: transparent;
  border-color: #c3edc0;
  color: #c3edc0;
  width: 130px;
}

.follow-btn:hover {
  background-color: #c3edc0;
  color: #0b666a;
}

.following-btn {
  background-color: #c3edc0;
  width: 130px;
}

.following-btn:hover {
  background-color: transparent;
  border-color: #c3edc0;
}
</style>
