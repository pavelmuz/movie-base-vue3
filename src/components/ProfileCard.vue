<template>
  <div class="container card profile-card mx-auto mb-2">
    <div class="row py-3 px-3">
      <!-- Profile avatar -->
      <div class="col-auto">
        <img src="@/assets/images/test_avatar.png" class="avatar-img-lg" />
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
            <p class="card-text my-0 fw-light">{{ movieCount }}</p>
            <p class="card-txt my-0 fw-light">фильмы</p>
          </div>
          <!-- Followers count + modal button -->
          <div
            class="col-auto text-center modal-link"
            data-bs-toggle="modal"
            data-bs-target="#followers"
          >
            <p class="card-text my-0 fw-light">{{ followers.length }}</p>
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
                  <div v-for="follower in followers" :key="follower" class="row">
                    <!-- Profile avatar -->
                    <div class="col-auto my-auto pe-0">
                      <router-link
                        :to="{ name: 'profile', params: { id: follower.follower.id } }"
                        class="card-link text-decoration-none"
                      >
                        <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
                      </router-link>
                    </div>
                    <!-- Profile info -->
                    <div class="col-6 my-auto">
                      <router-link
                        :to="{ name: 'profile', params: { id: follower.follower.id } }"
                        class="card-link text-decoration-none"
                      >
                        <div class="card-body">
                          <h5 class="card-title">{{ follower.follower.username }}</h5>
                          <p class="card-subtitle">{{ follower.follower.name }}</p>
                        </div>
                      </router-link>
                    </div>
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
            <p class="card-text my-0 fw-light">{{ followings.length }}</p>
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
                  <div v-for="following in followings" :key="following" class="row">
                    <!-- Profile avatar -->
                    <div class="col-auto my-auto pe-0">
                      <router-link
                        :to="{ name: 'profile', params: { id: following.following.id } }"
                        class="card-link text-decoration-none"
                      >
                        <img src="@/assets/images/test_avatar.png" class="avatar-img-md" />
                      </router-link>
                    </div>
                    <!-- Profile info -->
                    <div class="col-6 my-auto">
                      <router-link
                        :to="{ name: 'profile', params: { id: following.following.id } }"
                        class="card-link text-decoration-none"
                      >
                        <div class="card-body">
                          <h5 class="card-title">{{ following.following.username }}</h5>
                          <p class="card-subtitle">{{ following.following.name }}</p>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Follow button section -->
        <div v-if="showProfileButtons" class="row pt-2">
          <div class="col-auto my-auto">
            <!-- Unfollow action -->
            <button class="btn following-btn">Подписан</button>
            <!-- Follow action -->
            <!-- <button class="btn follow-btn">Подписаться</button> -->
          </div>
          <!-- Link to chat -->
          <div class="col-auto">
            <a class="btn edit-btn" href="#" role="button">
              <i class="fa-solid fa-pen-to-square"></i> Сообщение
            </a>
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
              <a class="dropdown-item delete-link" href="#">
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
import apiMoviebase from '@/includes/apiMoviebase'
import { ref, watch } from 'vue'
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

const followers = ref({})
const followings = ref({})
const profileId = ref('')

async function fetchFollow() {
  profileId.value = props.profile.id
  try {
    followers.value = await apiMoviebase.getFollowers(profileId.value)
    followings.value = await apiMoviebase.getFollowings(profileId.value)
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => props.profile.id,
  async (newValue, oldValue) => {
    if (newValue) {
      await fetchFollow()
    }
  }
)
</script>

<style scoped>
body {
  background-color: #c3edc0;
  padding-top: 5rem;
  padding-bottom: 3rem;
}

.navbar {
  background-color: #1b3333;
}

.nav-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-link,
.navbar-brand,
.card-link,
.modal-close,
.footer-text,
.footer-link,
.notification-btn {
  color: #c3edc0;
}

.nav-link:hover,
.navbar-brand:hover,
.modal-close:hover,
.notification-btn:hover {
  color: #9cbd99;
}

.link-active {
  color: #9cbd99;
}

.navbar-toggler {
  color: #c3edc0;
  border-color: #c3edc0;
}

.movie-card,
.auth-card,
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

.movie-card-poster {
  max-width: 220px;
}

.movie-poster-search {
  max-width: 120px;
}

.card-button {
  color: #c3edc0;
}

.auth-btn,
.edit-btn {
  background-color: #c3edc0;
}

.auth-btn:hover,
.edit-btn:hover {
  background-color: #9cbd99;
}

.social-btn {
  background-color: #c3edc0;
  width: 130px;
}

.social-btn:hover {
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

.avatar-img-sm {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-img-lg {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

.search-user-card,
.chats-card {
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

.search-user {
  max-width: 600px;
}

.search-user-btn {
  background-color: transparent;
  border-color: #0b666a;
  color: #0b666a;
  width: 120px;
}

.search-user-btn:hover {
  background-color: #0b666a;
  color: #c3edc0;
}

.search-user-input::placeholder {
  color: #0b666a;
}

.alert {
  max-width: 700px;
}

.modal-link {
  cursor: pointer;
}

.modal-header {
  border-bottom: 2px solid #c3edc0;
}

.chat-feed {
  background-color: #edf9ec;
}

.message-bubble {
  max-width: 220px;
}

.message-sender {
  background-color: #cff0cc;
}

.message-recipient {
  background-color: #afd5ac;
}

.message-input {
  background-color: #edf9ec;
}

.message-input:focus {
  background-color: #edf9ec;
  color: #0b666a;
}

::placeholder {
  color: #0b666a;
}
</style>
