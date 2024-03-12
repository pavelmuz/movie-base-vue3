<template>
  <profile-card :profile="profile" :movie-count="movieCount" />
  <movie-card
    v-for="movie in feedData"
    :movie="movie"
    :show-options="false"
    :show-owner="false"
    @add-like="addLike"
    @remove-like="removeLike"
    @add-comment="addComment"
  />
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import apiMovies from '@/services/apiMovies'
import apiProfiles from '@/services/apiProfiles'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const profileId = route.params.id

const profile = ref({})
const feedData = ref([])
const movieCount = ref(0)

async function fetchProfileData() {
  try {
    profile.value = await apiProfiles.getProfile(profileId)
  } catch {
    console.log(error)
  }
}

async function fetchMovieFeed() {
  try {
    feedData.value = await apiMovies.getProfileFeed(profileId)
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

onMounted(async () => {
  await fetchProfileData()
  await fetchMovieFeed()
})
</script>
