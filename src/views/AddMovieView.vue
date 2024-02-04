<template>
  <div class="container card edit-movie-card">
    <div class="row py-2">
      <h4 class="card-title">Добавить фильм</h4>
    </div>
    <div class="row pb-2">
      <!-- Movie poster -->
      <div class="col-auto">
        <img :src="movie.posterUrlPreview" class="rounded movie-card-poster" />
      </div>
      <!-- Movie description -->
      <div class="col-7">
        <h4 class="card-title">{{ movie.nameRu }}</h4>
        <p class="card-text">{{ movie.year }}</p>
        <p v-if="movie.shortDescription" class="card-text">{{ movie.shortDescription }}</p>

        <!-- Form for personal review and rating -->
        <label class="form-label">Ваш обзор:</label>
        <textarea class="form-control" rows="3" v-model="movieReview"></textarea>
        <label class="form-label">Ваша оценка:</label>
        <input type="text" class="form-control" v-model="movieRating" />
        <button @click.prevent="addToDB" class="btn edit-btn mt-2">
          <i class="fa-solid fa-floppy-disk"></i> Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiKinopoisk from '@/includes/apiKinopoisk'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const movie = ref({})
const movieRating = ref('')
const movieReview = ref('')

const route = useRoute()
const router = useRouter()
const routeParam = route.params.id

const fetchMovieData = async () => {
  try {
    movie.value = await apiKinopoisk.getMovie(routeParam)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const addToDB = () => {
  console.log('Movie saved to DB')
  router.push({ name: 'feed' })
}

onMounted(fetchMovieData)
</script>

<style scoped>
.edit-movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.movie-card-poster {
  max-width: 220px;
}

.edit-btn {
  background-color: #c3edc0;
}

.edit-btn:hover {
  background-color: #9cbd99;
}
</style>
