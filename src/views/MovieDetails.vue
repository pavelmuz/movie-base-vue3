<template>
  <div class="container card movie-card mx-auto">
    <!-- Card back button -->
    <div class="row pb-2">
      <div class="col-auto pt-2">
        <a href="#" @click="goBack" class="card-link text-decoration-none"
          ><i class="fa-solid fa-chevron-left fa-xl"></i> Назад</a
        >
      </div>
    </div>
    <!-- Card owner info if not current user -->
    <a class="card-link text-decoration-none">
      <div class="row py-2">
        <div class="col-auto">
          <img :src="movie.owner?.profile_image" class="avatar-img-sm" />
        </div>
        <div class="col ps-0">
          <p class="card-text">{{ movie.owner?.username }}</p>
        </div>
      </div>
    </a>

    <div class="row">
      <div class="col-4">
        <!-- Movie poster -->
        <img :src="movie.poster_url" class="rounded movie-card-poster" />
        <!-- Like and unlike buttons -->
        <div class="row py-0">
          <form class="col-auto my-auto px-0">
            <button v-if="likedMovie" @click.prevent="removeLike" class="btn card-button">
              <i class="fa-solid fa-heart fa-xl card-button"></i>
            </button>
            <button
              v-if="!likedMovie"
              @click.prevent="addLike"
              type="submit"
              class="btn card-button"
            >
              <i class="fa-regular fa-heart fa-xl card-button"></i>
            </button>
          </form>
        </div>
        <div class="row">
          <!-- Show liked users modal button -->
          <p
            class="card-text modal-link mb-0"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <strong>Нравится: </strong>{{ movie.likes?.length }}
          </p>
          <!-- Liked users modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- Modal title -->
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Нравится:</h1>
                  <button class="btn modal-close" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- List of users liked -->
                  <div v-for="like in movie.likes" :key="like" class="row">
                    <!-- User avatar -->
                    <div class="col-auto my-auto pe-0">
                      <a href="#" class="card-link text-decoration-none">
                        <img :src="like.owner.profile_image" class="avatar-img-md" />
                      </a>
                    </div>
                    <!-- User info -->
                    <div class="col-6 my-auto">
                      <a href="#" class="card-link text-decoration-none">
                        <div class="card-body">
                          <h5 class="card-title">{{ like.owner.username }}</h5>
                          <p class="card-subtitle">{{ like.owner.name }}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Movie info -->
      <div class="col-8 pb-4">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text"><strong>Рейтинг: </strong>{{ movie.user_rating }}</p>
        <p class="card-text"><strong>Описание: </strong>{{ movie.description }}</p>
        <p class="card-text"><strong>Обзор: </strong>{{ movie.user_review }}</p>
        <a class="btn edit-btn" :href="movie.kinopoisk_url" role="button" target="_blank">
          <i class="fa-solid fa-clapperboard"></i> Открыть на Кинопоиск
        </a>
      </div>
    </div>
    <!-- Movie comments -->
    <div class="row pb-2">
      <p class="card-text mb-0"><strong>Комментарии:</strong></p>
      <p v-for="comment in movie.comments" :key="comment" class="card-text mb-0">
        <strong>{{ comment.owner.username }}</strong> {{ comment.body }}
      </p>
    </div>
    <!-- Add comment form -->
    <div class="row mb-2">
      <form class="pb-2">
        <textarea
          v-model="commentMsg"
          class="form-control mb-2"
          rows="3"
          style="color: #0b666a"
        ></textarea>
        <button @click.prevent="addComment" class="btn edit-btn">Добавить</button>
      </form>
      <!-- <a class="btn edit-btn ms-2" href="#" role="button" style="max-width: 350px">
        Войдите, чтобы оставить комментарий
      </a> -->
    </div>
  </div>
</template>

<script setup>
import apiMovies from '@/services/apiMovies'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const movieId = route.params.movieId

const movie = ref({})
const commentMsg = ref('')

const likedMovie = computed(() => {
  let profileId = localStorage.getItem('profileId')
  return movie.value.likes?.some((like) => like.owner.id === profileId)
})

async function fetchMovie() {
  try {
    movie.value = await apiMovies.getMovie(movieId)
  } catch (error) {
    console.log(error)
  }
}

function goBack() {
  router.back()
}

async function addLike() {
  try {
    await apiMovies.postLike(movieId)
    await fetchMovie()
  } catch (error) {
    console.log(error)
  }
}

async function removeLike() {
  try {
    await apiMovies.deleteLike(movieId)
    await fetchMovie()
  } catch (error) {
    console.log(error)
  }
}

async function addComment() {
  try {
    let comment = {
      comment: commentMsg.value
    }
    await apiMovies.postComment(comment, movieId)
    commentMsg.value = ''
    await fetchMovie()
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(async () => {
  await fetchMovie()
})
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
