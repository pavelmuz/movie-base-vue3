<template>
  <div class="container card profile-card mx-auto mb-2">
    <div class="row py-3 px-3">
      <!-- Profile avatar -->
      <div class="col-auto">
        <img :src="profile.profile_image" class="avatar-img-lg" />
      </div>
      <!-- Profile info -->
      <div class="col-6 me-auto">
        <h3 class="card-title">{{ profile.username }}</h3>
        <p class="card-text">
          {{ profile.name }}
          {{ profile.birthday }}
        </p>
        <div class="row">
          <!-- Movies count -->
          <div class="col-auto text-center">
            <p class="card-text my-0 fw-light">{{ movieCount || 0 }}</p>
            <p class="card-txt my-0 fw-light">фильмы</p>
          </div>
          <!-- Followers count + modal button -->
          <div
            class="col-auto text-center modal-link"
            data-bs-toggle="modal"
            data-bs-target="#followers"
          >
            <p class="card-text my-0 fw-light">{{ followersCount }}</p>
            <p class="card-txt my-0 fw-light">подписчики</p>
          </div>
          <!-- Followers modal -->
          <div class="modal fade" id="followers" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- Modal title -->
                  <h1 class="modal-title fs-5">Подписчики:</h1>
                  <button class="btn modal-close" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- Followers list -->
                  <div v-for="follower in profile.followers" :key="follower" class="row">
                    <router-link
                      :to="{ name: 'profile', params: { id: follower.follower.id } }"
                      @click="closeFollowerModal"
                      class="row text-decoration-none"
                    >
                      <!-- Profile avatar -->
                      <div class="col-auto my-auto pe-0">
                        <img :src="follower.follower.profile_image" class="avatar-img-md" />
                      </div>
                      <!-- Profile info -->
                      <div class="col-6 my-auto card-link">
                        <div class="card-body">
                          <h5 class="card-title">{{ follower.follower.username }}</h5>
                          <p class="card-subtitle">{{ follower.follower.name }}</p>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Follow count + modal button -->
          <div
            class="col-auto text-center modal-link"
            data-bs-toggle="modal"
            data-bs-target="#following"
          >
            <p class="card-text my-0 fw-light">{{ followingsCount }}</p>
            <p class="card-txt my-0 fw-light">подписки</p>
          </div>

          <!-- Follow modal -->
          <div class="modal fade" id="following" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- Modal title -->
                  <h1 class="modal-title fs-5">Подписки:</h1>
                  <button class="btn modal-close" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- Follow list -->
                  <div v-for="following in profile.followings" :key="following" class="row">
                    <router-link
                      :to="{ name: 'profile', params: { id: following.following.id } }"
                      @click="closeFollowingModal"
                      class="row text-decoration-none"
                    >
                      <!-- Profile avatar -->
                      <div class="col-auto my-auto pe-0">
                        <img :src="following.following.profile_image" class="avatar-img-md" />
                      </div>
                      <!-- Profile info -->
                      <div class="col-6 my-auto card-link">
                        <div class="card-body">
                          <h5 class="card-title">{{ following.following.username }}</h5>
                          <p class="card-subtitle">{{ following.following.name }}</p>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Follow button section -->
        <div v-if="showProfileButtons && authStore.isAuthenticated" class="row pt-2">
          <div class="col-auto my-auto">
            <!-- Unfollow action -->
            <button class="btn following-btn">Подписан</button>
            <!-- Follow action -->
            <!-- <button class="btn follow-btn">Подписаться</button> -->
          </div>
          <!-- Link to chat -->
          <div class="col-auto">
            <router-link
              :to="{ name: 'chat', params: { recipientId: profile.id } }"
              class="btn edit-btn"
              role="button"
            >
              <i class="fa-solid fa-pen-to-square"></i> Сообщение
            </router-link>
          </div>
        </div>
      </div>
      <!-- Profile options dropdown -->
      <div v-if="showOptions" class="col-auto ms-auto">
        <div class="dropdown dropstart">
          <!-- Open dropdown button -->
          <button
            class="btn dropdown-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-ellipsis fa-xl"></i>
          </button>
          <!-- Dropdown menu -->
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item edit-link" href="#">
                <i class="fa-solid fa-pen-to-square"></i> Изменить
              </a>
            </li>
            <li>
              <a class="dropdown-item delete-link" href="#" @click.prevent="deleteAccount">
                <i class="fa-solid fa-trash-can"></i> Удалить аккаунт
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiProfiles from '@/services/apiProfiles'
import { useAuthStore } from '@/stores/authStore'
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

const profile = ref({})
const movieCount = ref()
const followersCount = ref()
const followingsCount = ref()
const router = useRouter()

function closeFollowingModal() {
  const modal = document.getElementById('following')
  modal?.classList.remove('show')
  modal?.setAttribute('aria-hidden', 'true')
  modal?.setAttribute('style', 'display: none')
  document.body.classList.remove('modal-open')
  const backdrop = document.querySelector('.modal-backdrop')
  backdrop?.parentNode?.removeChild(backdrop)
}

function closeFollowerModal() {
  const modal = document.getElementById('followers')
  modal?.classList.remove('show')
  modal?.setAttribute('aria-hidden', 'true')
  modal?.setAttribute('style', 'display: none')
  document.body.classList.remove('modal-open')
  const backdrop = document.querySelector('.modal-backdrop')
  backdrop?.parentNode?.removeChild(backdrop)
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
.modal-close,
.card-link {
  color: #c3edc0;
}

.modal-close:hover {
  color: #9cbd99;
}

.profile-card,
.modal-content {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.edit-movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.edit-btn {
  background-color: #c3edc0;
}

.edit-btn:hover {
  background-color: #9cbd99;
}
.dropdown-btn {
  color: #c3edc0;
  border-color: transparent;
}

.dropdown-menu {
  border-color: #c3edc0;
  background-color: #0b666a;
}

.dropdown-item {
  color: #c3edc0;
}

.dropdown-item:hover {
  background-color: #0b666a;
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

.modal-link {
  cursor: pointer;
}

.modal-header {
  border-bottom: 2px solid #c3edc0;
}
</style>
