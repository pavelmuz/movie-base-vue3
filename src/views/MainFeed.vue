<template>
  <movie-card
    v-for="movie in feedData"
    :key="movie"
    :movie="movie"
    :show-options="false"
    :show-owner="true"
    @add-like="addLike"
    @remove-like="removeLike"
    @add-comment="addComment"
  />
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import apiMovies from '@/services/apiMovies'
import { onMounted, ref } from 'vue'

const feedData = ref([])

async function fetchMainFeed() {
  try {
    feedData.value = await apiMovies.getFeed()
  } catch (error) {
    console.log(error)
  }
}

async function addLike(movieId) {
  try {
    await apiMovies.postLike(movieId)
    await fetchMainFeed()
  } catch (error) {
    console.log(error)
  }
}

async function removeLike(movieId) {
  try {
    await apiMovies.deleteLike(movieId)
    await fetchMainFeed()
  } catch (error) {
    console.log(error)
  }
}

async function addComment(movieId, commentMsg) {
  try {
    let comment = {
      comment: commentMsg
    }
    await apiMovies.addComment(comment, movieId)
    commentMsg = ''
    await fetchMainFeed()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchMainFeed()
})
</script>
