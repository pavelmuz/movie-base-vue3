<template>
  <div class="container">
    <n-card :bordered="false" class="movie-card">
      <n-flex vertical size="small">
        <h1>Добавить фильм</h1>
        <n-flex align="center" size="small" @click="goBack" class="back-button">
          <i class="fa-solid fa-chevron-left fa-xl"></i>
          <p>Назад</p>
        </n-flex>
        <n-flex class="movie-info" :wrap="false" align="start">
          <movie-poster :image="movie.posterUrl" size="large" />
          <n-flex vertical>
            <h2>{{ movie.nameRu }}</h2>
            <h3>{{ movie.year }}</h3>
            <p>{{ movie.shortDescription }}</p>
            <p class="card-text">Ваш обзор:</p>
            <n-input
              v-model:value="userReview"
              type="textarea"
              placeholder=""
              :rows="3"
              class="message-input"
            />
            <p class="card-text">Ваша оценка:</p>
            <n-rate
              :count="10"
              :allow-half="true"
              :on-update:value="handleRating"
              size="large"
              color="#FDFFAE"
            />
            <n-button
              :disabled="buttonDisabled"
              size="large"
              color="#C3EDC0"
              text-color="#0b666a"
              @click="addMovie"
              class="save-button"
              ><i class="fa-solid fa-floppy-disk"></i>Сохранить</n-button
            >
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import MoviePoster from '@/components/MoviePoster.vue'
import apiMovies from '@/services/apiMovies'
import { NButton, NCard, NFlex, NInput, NRate } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const movie = ref({})
const userRating = ref(0.0)
const userReview = ref('')

const route = useRoute()
const router = useRouter()
const kinopoiskId = route.params.id

const buttonDisabled = computed(() => {
  return userRating.value === 0.0 || userReview.value === ''
})

function handleRating(value) {
  userRating.value = value
}

async function fetchMovieData() {
  try {
    movie.value = await apiMovies.getKinopoiskMovie(kinopoiskId)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function addMovie() {
  try {
    await apiMovies.postMovie({
      title: movie.value.nameRu,
      user_rating: userRating.value,
      user_review: userReview.value,
      description: movie.value.description,
      poster_url: movie.value.posterUrl,
      kinopoisk_url: movie.value.webUrl
    })
    router.push({ name: 'account' })
  } catch (error) {
    console.error('Error:', error.message)
  }
}

function goBack() {
  router.back()
}

onMounted(async () => {
  await fetchMovieData()
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
  border-radius: 10px;
}

.movie-card h1 {
  margin: 0;
}

.back-button {
  cursor: pointer;
  margin-right: auto;
}

.movie-info h2,
.movie-info h3,
.movie-info p {
  margin: 0;
}

.movie-card-poster {
  max-width: 220px;
  border-radius: 5px;
}

.save-button {
  width: 170px;
  margin-top: 10px;
  margin-right: auto;
  border-radius: 6px;
}

.save-button:hover {
  background-color: #9cbd99;
}

.fa-floppy-disk {
  padding-right: 5px;
}

.card-text {
  font-size: medium;
}
</style>
