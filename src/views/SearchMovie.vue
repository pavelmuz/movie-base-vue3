<template>
  <div class="container card movie-card">
    <div class="row p-2">
      <!-- Title -->
      <h4 class="card-title">Найти фильм</h4>
      <!-- Search movie form -->
      <div class="mb-3">
        <label class="form-label">Название:</label>
        <input
          type="text"
          v-model="movieTitle"
          class="form-control mb-3"
          name="movie-title"
          style="color: #0b666a"
        />
        <!-- Search button -->
        <router-link
          v-if="movieTitle !== ''"
          :to="{ name: 'search-results', params: { title: movieTitle } }"
          class="btn auth-btn"
          ><i class="fa-solid fa-magnifying-glass"></i> Найти</router-link
        >
        <button v-else class="btn auth-btn">
          <i class="fa-solid fa-magnifying-glass"></i> Найти
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const movieTitle = ref('')
</script>

<style scoped>
.movie-card {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
}

.auth-btn {
  background-color: #c3edc0;
  width: 130px;
}

.auth-btn:hover {
  background-color: #9cbd99;
}
</style>
