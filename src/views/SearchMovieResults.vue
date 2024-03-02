<template>
  <!-- Title card -->
  <div class="container card movie-card mx-auto mb-3">
    <div class="row pt-2">
      <h4 class="card-title">Выберите фильм</h4>
    </div>
  </div>

  <!-- Movie card -->
  <div v-for="movie in movieList" :key="movie" class="container card movie-card mx-auto my-1">
    <router-link
      :to="{ name: 'add-movie', params: { id: movie.kinopoiskId } }"
      class="card-link row py-2 text-decoration-none"
      role="button"
    >
      <!-- Movie poster -->
      <div class="col-auto my-auto">
        <img :src="movie.posterUrlPreview" class="rounded movie-poster-search" />
      </div>
      <!-- Movie info -->
      <div class="col-7 my-auto">
        <h4 class="card-title">{{ movie.nameRu }}</h4>
        <p class="card-text">{{ movie.year }}</p>
      </div>
      <!-- Next button -->
      <div class="col-auto my-auto ms-auto me-3">
        <i class="fa-solid fa-chevron-right fa-2xl"></i>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import apiMovibase from '@/services/apiMovies'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const movieList = ref([])
const route = useRoute()
const movieTitle = ref(route.params.title || '')

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
.card-link {
  color: #c3edc0;
}

.movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.movie-poster-search {
  max-width: 120px;
}
</style>
