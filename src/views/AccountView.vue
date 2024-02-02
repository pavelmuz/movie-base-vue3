<template>
  <profile-card :profile="profile" :movie-count="movieCount" />
  <movie-card v-for="movie in feedData" :key="movie" :movie="movie" />
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import apiMovibase from '@/includes/apiMoviebase'
import { onMounted, ref } from 'vue'

const profile = ref({})
const feedData = ref({})
const movieCount = ref(0)

async function fetchProfileData() {
  try {
    profile.value = await apiMovibase.getProfile('477aed47-d388-46c9-9375-e21f8896a5ba')
  } catch {
    console.log(error)
  }
}

async function fetchMovieFeed() {
  try {
    feedData.value = await apiMovibase.getProfileFeed('477aed47-d388-46c9-9375-e21f8896a5ba')
    movieCount.value = feedData.value.length
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchProfileData()
  await fetchMovieFeed()
})
</script>

<style scoped>
.card-link,
.modal-close,
.notification-btn {
  color: #c3edc0;
}

.modal-close:hover {
  color: #9cbd99;
}

.link-active {
  color: #9cbd99;
}

.profile-card,
.modal-content {
  background-color: #0b666a;
  color: #c3edc0;
  max-width: 700px;
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

.modal-link {
  cursor: pointer;
}

.modal-header {
  border-bottom: 2px solid #c3edc0;
}
</style>
