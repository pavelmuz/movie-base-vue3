<template>
  <div class="movie-container">
    <n-card :bordered="false" class="movie-card">
      <n-flex vertical>
        <n-button text color="#c3edc0" @click="goBack" class="back-button"
          ><i class="fa-solid fa-chevron-left fa-xl"></i>Назад</n-button
        >
        <n-flex :wrap="false">
          <n-flex vertical>
            <movie-poster :image="movie.poster_url" size="large" />
            <n-button
              v-if="likedMovie && authStore.isAuthenticated"
              text
              size="large"
              text-color="#C3EDC0"
              @click="removeLike"
              class="like-button"
            >
              <i class="fa-solid fa-heart fa-xl"></i>
            </n-button>
            <n-button
              v-if="!likedMovie && authStore.isAuthenticated"
              text
              size="large"
              text-color="#C3EDC0"
              @click="addLike"
              class="like-button"
            >
              <i class="fa-regular fa-heart fa-xl card-button"></i>
            </n-button>
            <n-button
              text
              text-color="#C3EDC0"
              @click.prevent="showLikesModal = true"
              class="likes-modal-open"
            >
              <strong>Нравится:</strong>{{ movie.likes?.length }}
            </n-button>
            <likes-modal
              :likes="movie.likes"
              :show="showLikesModal"
              @update:show="showLikesModal = $event"
            />
          </n-flex>
          <n-flex vertical class="movie-info">
            <n-flex :wrap="false" x>
              <h2>{{ movie.title }}</h2>
            </n-flex>
            <n-flex align="center">
              <p><strong>Рейтинг: </strong></p>
              <n-rate :count="10" :allow-half="true" :value="movie.user_rating" readonly />
            </n-flex>
            <p><strong>Описание:</strong>{{ movie.description }}</p>
            <p><strong>Обзор:</strong>{{ movie.user_review }}</p>
            <n-button
              tag="a"
              :href="movie.kinopoisk_url"
              target="_blank"
              color="#C3EDC0"
              text-color="#0b666a"
              class="kinopoisk-button"
              ><i class="fa-solid fa-clapperboard"></i>Открыть на Кинопоиск</n-button
            >
          </n-flex>
        </n-flex>
        <h3>Комментарии:</h3>
        <p v-for="comment in movie.comments" :key="comment" class="comment">
          <strong>{{ comment.owner.username }}</strong
          >{{ comment.body }}
        </p>
        <n-input
          v-if="authStore.isAuthenticated"
          v-model:value="commentMsg"
          type="textarea"
          placeholder=""
          :rows="2"
          class="comment-input"
        />
        <n-button
          v-if="authStore.isAuthenticated"
          color="#C3EDC0"
          text-color="#0b666a"
          @click="addComment"
          class="add-comment-button"
          >Добавить</n-button
        >
        <n-button
          v-if="!authStore.isAuthenticated"
          color="#C3EDC0"
          text-color="#0b666a"
          @click="goToLogin"
          class="login-button"
          >Войдите, чтобы оставить комментарий</n-button
        >
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import LikesModal from '@/components/LikesModal.vue'
import MoviePoster from '@/components/MoviePoster.vue'
import apiMovies from '@/services/apiMovies'
import { useAuthStore } from '@/stores/authStore'
import { NButton, NCard, NFlex, NInput, NRate } from 'naive-ui'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const movieId = route.params.movieId

const authStore = useAuthStore()

const movie = ref({})
const commentMsg = ref('')
const showLikesModal = ref(false)
const profileId = localStorage.getItem('profileId')

const likedMovie = computed(() => {
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

function goToLogin() {
  router.push({ name: 'login' })
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
.movie-container {
  display: flex;
  justify-content: center;
}

.movie-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.back-button {
  margin-right: auto;
  margin-bottom: 10px;
}

.back-button i {
  margin-right: 7px;
}

.like-button {
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.likes-modal-open {
  margin-right: auto;
  font-size: medium;
}

.likes-modal-open strong {
  margin-right: 5px;
}

.movie-info h2,
.movie-info p,
.comment {
  margin: 0;
}

.movie-info p {
  font-size: medium;
}

.movie-info p strong {
  margin-right: 5px;
}

.kinopoisk-button {
  width: 200px;
  border-radius: 6px;
}

.kinopoisk-button i {
  margin-right: 7px;
}

.movie-card h3 {
  margin: 0;
}

.comment {
  font-size: medium;
}

.comment strong {
  margin-right: 7px;
}

.add-comment-button {
  width: 170px;
  border-radius: 6px;
}

.login-button {
  border-radius: 6px;
}
</style>
