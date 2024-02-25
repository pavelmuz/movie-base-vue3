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
import apiMovies from '@/services/apiMovies'
import { onMounted, ref } from 'vue'

const feedData = ref([])

async function fetchMainFeed() {
  try {
    feedData.value = await apiMovies.getMainFeed()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchMainFeed()
})
</script>
