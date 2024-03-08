<template>
  <div class="profile-container">
    <n-card class="profile-card">
      <n-flex>
        <!-- Avatar image -->
        <div class="profile-avatar">
          <img :src="profile.profile_image" class="avatar-img-lg" />
        </div>
        <!-- User info and followers -->
        <n-flex vertical>
          <!-- Info -->
          <h3>{{ profile.username }}</h3>
          <p>{{ profile.name }} {{ profile.birthday }}</p>
          <n-flex>
            <!-- Movie Count -->
            <div class="movie-count">
              <n-flex vertical :size="1" align="center">
                <div>
                  <h6>{{ movieCount || 0 }}</h6>
                </div>
                <div>
                  <h6>фильмы</h6>
                </div>
              </n-flex>
            </div>
            <!-- Followers -->
            <n-button text text-color="#C3EDC0" @click.prevent="showFollowers = true">
              <n-flex vertical :size="1" align="center">
                <div>
                  <h6>{{ followersCount }}</h6>
                </div>
                <div>
                  <h6>подписчики</h6>
                </div>
              </n-flex>
            </n-button>
            <n-modal v-model:show="showFollowers">
              <n-card
                class="followers-modal"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
              >
                <n-flex vertical :size="1">
                  <h4 class="modal-header">Подписчики:</h4>
                  <div
                    v-for="follower in profile.followers"
                    :key="follower"
                    @click="goToProfile(follower.follower.id)"
                    class="follower"
                  >
                    <n-flex :size="30">
                      <img :src="follower.follower.profile_image" class="avatar-img-md" />
                      <n-flex vertical :size="1">
                        <h5>{{ follower.follower.username }}</h5>
                        <p>{{ follower.follower.name }}</p>
                      </n-flex>
                    </n-flex>
                  </div>
                </n-flex>
              </n-card>
            </n-modal>
            <!-- Followings -->
            <n-button text text-color="#C3EDC0" @click.prevent="showFollowings = true">
              <n-flex vertical :size="1" align="center">
                <div>
                  <h6>{{ followingsCount }}</h6>
                </div>
                <div>
                  <h6>подписки</h6>
                </div>
              </n-flex>
            </n-button>
            <n-modal v-model:show="showFollowings">
              <n-card
                class="followings-modal"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
              >
                <n-flex vertical :size="1">
                  <h4>Подписки:</h4>
                  <div
                    v-for="following in profile.followings"
                    :key="following"
                    @click="goToProfile(following.following.id)"
                    class="follow"
                  >
                    <n-flex :size="30">
                      <img :src="following.following.profile_image" class="avatar-img-md" />
                      <n-flex vertical :size="1">
                        <h5>{{ following.following.username }}</h5>
                        <p>{{ following.following.name }}</p>
                      </n-flex>
                    </n-flex>
                  </div>
                </n-flex>
              </n-card>
            </n-modal>
          </n-flex>

          <!-- Follow & Chat buttons -->
          <n-flex v-if="showProfileButtons && authStore.isAuthenticated" justify="space-between">
            <!-- <n-button size="large" color="#C3EDC0" text-color="#0b666a">Подписан</n-button> -->
            <n-button size="large" color="#C3EDC0" ghost text-color="#C3EDC0">Подписаться</n-button>
            <n-button
              size="large"
              color="#C3EDC0"
              text-color="#0b666a"
              @click.prevent="goToChat(profile.id)"
              ><i class="fa-solid fa-pen-to-square"></i> Сообщение
            </n-button>
          </n-flex>
        </n-flex>
        <!-- Profile options -->
        <n-button
          v-if="showOptions"
          :bordered="false"
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

.profile-avatar {
  margin-right: 3%;
}

.profile-dropdown-btn {
  margin-left: auto;
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

.follower,
.follow {
  cursor: pointer;
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
}

.modal-header {
  border-bottom: 2px solid #c3edc0;
  padding-bottom: 10px;
}
</style>
