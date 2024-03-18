<template>
  <account-card :profile="profile" :movie-count="movieCount" @update-profile="updateProfile" />
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
import { useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'

const profile = ref({})
const feedData = ref([])
const movieCount = ref(0)
const message = useMessage()

async function fetchProfileData() {
  try {
    profile.value = await apiProfiles.getAccount()
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

async function updateProfile(profile) {
  const profileData = new FormData()
  profileData.append('username', profile.username)
  profileData.append('name', profile.name)
  profileData.append('email', profile.email)
  profileData.append('birthday', profile.birthday)

  try {
    await apiProfiles.patchAccount(profileData)
    await fetchProfileData()
    message.success('Аккаунт успешно изменен', {
      closable: true,
      duration: 5e3
    })
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

async function fetchMovieFeed() {
  try {
    feedData.value = await apiMovies.getAccountFeed()
    movieCount.value = feedData.value.length
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

async function addLike(movieId) {
  try {
    await apiMovies.postLike(movieId)
    await fetchMovieFeed()
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

async function removeLike(movieId) {
  try {
    await apiMovies.deleteLike(movieId)
    await fetchMovieFeed()
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

async function addComment({ commentMsg, movie }) {
  try {
    const commentData = {
      comment: commentMsg
    }
    await apiMovies.postComment(commentData, movie.id)
    await fetchMovieFeed()
  } catch (error) {
    console.log(error)
  }
}

async function editMovie(movie) {
  try {
    let content = {
      user_rating: movie.user_rating,
      user_review: movie.user_review
    }
    await apiMovies.patchMovie(content, movie.id)
    await fetchMovieFeed()
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

async function removeMovie(movie) {
  try {
    await apiMovies.deleteMovie(movie.id)
    await fetchMovieFeed()
  } catch (error) {
    message.error(error.message, {
      closable: true,
      duration: 5e3
    })
  }
}

onMounted(async () => {
  await fetchProfileData()
  await fetchMovieFeed()
})
</script>
