<template>
  <profile-card
    :profile="profile"
    :movie-count="movieCount"
    :show-options="false"
    :show-profile-buttons="true"
  />
  <movie-card v-for="movie in feedData" :movie="movie" :show-options="false" :show-owner="false" />
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

onMounted(async () => {
  await fetchProfileData()
  await fetchMovieFeed()
})
</script>
