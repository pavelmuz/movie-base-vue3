import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL

async function getFeed() {
  try {
    const response = await axios.get(`${API_URL}/feed/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getProfiles() {
  try {
    const response = await axios.get(`${API_URL}/profiles/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getProfile(pk) {
  try {
    const response = await axios.get(`${API_URL}/profile/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getProfileFeed(pk) {
  try {
    const response = await axios.get(`${API_URL}/profile-feed/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getMovieLikes(pk) {
  try {
    const response = await axios.get(`${API_URL}/likes/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getMovieComments(pk) {
  try {
    const response = await axios.get(`${API_URL}/comments/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getMovieCardComments(pk) {
  try {
    const response = await axios.get(`${API_URL}/card-comments/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getFollowers(pk) {
  try {
    const response = await axios.get(`${API_URL}/followers/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getFollowings(pk) {
  try {
    const response = await axios.get(`${API_URL}/followings/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getNotifications(pk) {
  try {
    const response = await axios.get(`${API_URL}/notifications/${pk}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default {
  getFeed,
  getProfiles,
  getProfile,
  getProfileFeed,
  getMovieLikes,
  getMovieComments,
  getMovieCardComments,
  getFollowers,
  getFollowings,
  getNotifications
}
