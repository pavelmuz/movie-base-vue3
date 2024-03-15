<template>
  <div class="container">
    <n-card :bordered="false" class="title-card">
      <n-flex>
        <h1 class="card-title">Выберите фильм</h1>
      </n-flex>
    </n-card>
  </div>

  <div v-for="movie in movieList" :key="movie" class="movie-container">
    <n-card :bordered="false" class="movie-card">
      <n-flex align="center" :wrap="false">
        <movie-poster :image="movie.posterUrl" :width="120" />
        <n-flex vertical>
          <h2 class="card-title">{{ movie.nameRu }}</h2>
          <h3 class="card-text">{{ movie.year }}</h3>
        </n-flex>
        <n-button
          text
          text-color="#C3EDC0"
          class="next-button"
          @click="goToAddMovie(movie.kinopoiskId)"
          ><i class="fa-solid fa-chevron-right fa-2xl"></i
        ></n-button>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import MoviePoster from '@/components/MoviePoster.vue'
import apiMovibase from '@/services/apiMovies'
import { NButton, NCard, NFlex } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const movieList = ref([])
const route = useRoute()
const router = useRouter()
const movieTitle = ref(route.params.title || '')

function goToAddMovie(id) {
  router.push({ name: 'add-movie', params: { id: id } })
}

async function fetchMovies() {
  try {
    movieList.value = await apiMovibase.getKinopoiskMovies(movieTitle.value)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

onMounted(async () => {
  await fetchMovies()
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.movie-container {
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

.title-card {
  max-width: 700px;
  background-color: #0b666a;
  color: #c3edc0;
  border-radius: 10px;
}

.card-title {
  margin-top: 0;
  margin-bottom: 0;
}

.movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
  border-radius: 10px;
}

.movie-poster-search {
  max-width: 120px;
  border-radius: 5px;
}

.next-button {
  margin-left: auto;
}
</style>
