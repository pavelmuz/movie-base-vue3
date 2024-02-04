<template>
  <movie-card
    v-for="movie in feedData"
    :key="movie"
    :movie="movie"
    :show-options="false"
    :show-owner="true"
  />
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import apiMoviebase from '@/includes/apiMoviebase'
import { onMounted, ref } from 'vue'

const feedData = ref({})

const fetchData = async () => {
  try {
    feedData.value = await apiMoviebase.getFeed()
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchData)
</script>

<style scoped></style>
