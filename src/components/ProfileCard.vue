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
            <n-flex vertical :size="1" align="center">
              <p class="card-counter">{{ movieCount || 0 }}</p>
              <p class="card-text">фильмы</p>
            </n-flex>
            <!-- Followers -->
            <n-flex
              vertical
              :size="1"
              align="center"
              @click.prevent="showFollowers = true"
              class="modal-open-button"
            >
              <p class="card-counter">{{ followersCount }}</p>
              <p class="card-text">подписчики</p>
            </n-flex>
            <!-- Followers Modal -->
            <n-modal v-model:show="showFollowers">
              <n-card
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
                class="followers-modal"
              >
                <n-flex vertical :size="10">
                  <h2 class="modal-header">Подписчики:</h2>
                  <n-flex
                    v-for="follower in profile.followers"
                    :key="follower"
                    align="center"
                    :size="17"
                    @click="goToProfile(follower.follower.id)"
                    class="follower"
                  >
                    <img :src="follower.follower.profile_image" class="avatar-img-md" />
                    <n-flex vertical :size="1">
                      <h3>{{ follower.follower.username }}</h3>
                      <p>{{ follower.follower.name }}</p>
                    </n-flex>
                  </n-flex>
                </n-flex>
              </n-card>
            </n-modal>
            <!-- Followings -->
            <n-flex
              vertical
              :size="1"
              align="center"
              @click.prevent="showFollowings = true"
              class="modal-open-button"
            >
              <p class="card-counter">{{ followingsCount }}</p>
              <p class="card-text">подписки</p>
            </n-flex>
            <!-- Followings Modal -->
            <n-modal v-model:show="showFollowings">
              <n-card
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
                class="followings-modal"
              >
                <n-flex vertical :size="10">
                  <h2 class="modal-header">Подписки:</h2>
                  <n-flex
                    v-for="following in profile.followings"
                    :key="following"
                    align="center"
                    :size="17"
                    @click="goToProfile(following.following.id)"
                    class="follow"
                  >
                    <img :src="following.following.profile_image" class="avatar-img-md" />
                    <n-flex vertical :size="1">
                      <h3>{{ following.following.username }}</h3>
                      <p>{{ following.following.name }}</p>
                    </n-flex>
                  </n-flex>
                </n-flex>
              </n-card>
            </n-modal>
          </n-flex>
          <!-- Follow & Chat buttons -->
          <n-flex v-if="showProfileButtons && authStore.isAuthenticated" justify="space-between">
            <n-button ghost color="#c3edc0" class="unfollow-button">Подписан</n-button>
            <!-- <n-button ghost color="#c3edc0" class="follow-button">Подписаться</n-button> -->
            <n-button
              color="#C3EDC0"
              text-color="#0b666a"
              @click.prevent="goToChat(profile.id)"
              class="chat-button"
              ><i class="fa-solid fa-pen-to-square"></i> Сообщение
            </n-button>
          </n-flex>
        </n-flex>
        <!-- Profile options -->
        <n-button
          v-if="showOptions"
          :bordered="false"
          text
          text-color="#C3EDC0"
          size="large"
          class="profile-dropdown-btn"
        >
          <i class="fa-solid fa-ellipsis fa-xl dropdown-btn"></i>
        </n-button>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import apiProfiles from '@/services/apiProfiles'
import { useAuthStore } from '@/stores/authStore'
import { NButton, NCard, NFlex, NModal } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  movieCount: {
    type: Number,
    required: true
  },
  showOptions: {
    type: Boolean,
    required: true
  },
  showProfileButtons: {
    type: Boolean,
    required: true
  }
})

const authStore = useAuthStore()
const profileId = localStorage.getItem('profileId')
const router = useRouter()

const profile = ref({})
const movieCount = ref()
const followersCount = ref()
const followingsCount = ref()
const showFollowers = ref(false)
const showFollowings = ref(false)

function goToChat(profileId) {
  router.push({ name: 'chat', params: { recipientId: profileId } })
}

function goToProfile(id) {
  if (id === profileId) {
    router.push({ name: 'account' })
  } else {
    router.push({ name: 'profile', params: { id: id } })
  }
  showFollowers.value = false
  showFollowings.value = false
}

async function deleteAccount() {
  try {
    await apiProfiles.deleteAccount()
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}

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

.card-counter {
  margin: 0;
  font-size: medium;
}

.card-text {
  margin: 0;
  font-size: medium;
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
  width: 130px;
  border-radius: 6px;
}

.profile-dropdown-btn {
  margin-left: auto;
  margin-bottom: auto;
  margin-top: 15px;
}

.fa-pen-to-square {
  margin-right: 8px;
}

.followers-modal,
.followings-modal {
  width: 500px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.modal-header {
  border-bottom: 1px solid #c3edc0;
  padding-bottom: 10px;
  margin-top: 0;
}

.follower,
.follow {
  cursor: pointer;
}

.follower h3,
.follower p,
.follow h3,
.follow p {
  margin: 0;
}

.follower p,
.follow p {
  font-size: medium;
}

.avatar-img-md {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-img-lg {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.edit-link {
  color: #ffff00;
}

.edit-link:hover {
  color: #cccc00;
}

.delete-link {
  color: #fa1e0e;
}

.delete-link:hover {
  color: #c8180b;
}
</style>
