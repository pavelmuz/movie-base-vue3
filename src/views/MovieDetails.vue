<template>
  <div class="container card movie-card mx-auto">
    <!-- Card back button -->
    <div class="row pb-2">
      <div class="col-auto pt-2">
        <a href="#" @click.prevent="goBack" class="card-link text-decoration-none"
          ><i class="fa-solid fa-chevron-left fa-xl"></i> Назад</a
        >
      </div>
    </div>

    <!-- Card owner info -->
    <router-link
      :to="movieOwner ? { name: 'account' } : { name: 'profile', params: { id: movie.owner?.id } }"
      class="card-link text-decoration-none"
    >
      <div class="row py-2">
        <div class="col-auto">
          <img :src="movie.owner?.profile_image" class="avatar-img-sm" />
        </div>
        <div class="col ps-0">
          <p class="card-text">{{ movie.owner?.username }}</p>
        </div>
      </div>
    </router-link>

    <div class="row">
      <div class="col-4">
        <!-- Movie poster -->
        <img :src="movie.poster_url" class="rounded movie-card-poster" />
        <!-- Like and unlike buttons -->
        <div v-if="authStore.isAuthenticated" class="row py-0">
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
    <div v-if="authStore.isAuthenticated" class="row mb-2">
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
import { useAuthStore } from '@/stores/authStore'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const movieId = route.params.movieId

const authStore = useAuthStore()

const movie = ref({})
const commentMsg = ref('')
let profileId = localStorage.getItem('profileId')

const likedMovie = computed(() => {
  return movie.value.likes?.some((like) => like.owner.id === profileId)
})

const movieOwner = computed(() => {
  return movie.value.owner?.id === profileId
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
.card-link,
.modal-close {
  color: #c3edc0;
}

.modal-close:hover {
  color: #9cbd99;
}

.movie-card,
.modal-content {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.movie-card-poster {
  max-width: 220px;
}

.card-button {
  color: #c3edc0;
}

.edit-btn {
  background-color: #c3edc0;
}

.edit-btn:hover {
  background-color: #9cbd99;
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

.modal-link {
  cursor: pointer;
}

.modal-header {
  border-bottom: 2px solid #c3edc0;
}
</style>
