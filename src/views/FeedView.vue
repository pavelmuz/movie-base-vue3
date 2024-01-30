<template>
  <movie-card v-for="movie in feedData" :key="movie" :movie="movie" />
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import apiMovibase from '@/includes/apiMoviebase'
export default {
  name: 'MainFeed',
  components: {
    MovieCard
  },
  data() {
    return {
      feedData: {}
    }
  },
  async mounted() {
    try {
      this.feedData = await apiMovibase.getFeed()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped></style>
