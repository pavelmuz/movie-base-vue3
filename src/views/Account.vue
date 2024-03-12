<template>
  <account-card :profile="profile" :movie-count="movieCount" />
  <movie-card
    v-for="movie in feedData"
    :key="movie"
    :movie="movie"
    :show-options="true"
    :show-owner="false"
    @add-like="addLike"
    @remove-like="removeLike"
    @add-comment="addComment"
    @edit-movie="editMovie"
    @remove-movie="removeMovie"
  />
</template>

<script setup>
import AccountCard from '@/components/AccountCard.vue'
import MovieCard from '@/components/MovieCard.vue'
import apiMovies from '@/services/apiMovies'
import apiProfiles from '@/services/apiProfiles'
import { onMounted, ref } from 'vue'

const profile = ref({})
const feedData = ref([])
const movieCount = ref(0)

async function fetchProfileData() {
  try {
    profile.value = await apiProfiles.getAccount()
  } catch {
    console.log(error)
  }
}

async function fetchMovieFeed() {
  try {
    feedData.value = await apiMovies.getAccountFeed()
    movieCount.value = feedData.value.length
  } catch (error) {
    console.log(error)
  }
}

async function addLike(movieId) {
  try {
    await apiMovies.postLike(movieId)
    await fetchMovieFeed()
  } catch (error) {
    console.log(error)
  }
}

async function removeLike(movieId) {
  try {
    await apiMovies.deleteLike(movieId)
    await fetchMovieFeed()
  } catch (error) {
    console.log(error)
  }
}

async function addComment(movieId, commentMsg) {
  try {
    let comment = {
      comment: commentMsg
    }
    await apiMovies.postComment(comment, movieId)
    commentMsg = ''
    await fetchMovieFeed()
  } catch (error) {
    console.log(error)
  }
}

async function editMovie(movieId, userReview, userRating) {
  try {
    let content = {
      user_rating: userRating,
      user_review: userReview
    }
    await apiMovies.patchMovie(content, movieId)
    await fetchMovieFeed()
  } catch (error) {
    console.log(error)
  }
}

async function removeMovie(movieId) {
  try {
    await apiMovies.deleteMovie(movieId)
    await fetchMovieFeed()
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchProfileData()
  await fetchMovieFeed()
})
</script>
