<template>
  <profile-card
    :profile="profile"
    :movie-count="movieCount"
    :show-options="true"
    :show-profile-buttons="false"
  />
  <movie-card
    v-for="movie in feedData"
    :key="movie"
    :movie="movie"
    :show-options="true"
    :show-owner="false"
  />
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
