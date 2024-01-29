import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL

async function getFeed() {
  try {
    const response = await axios.get(`${API_URL}/feed`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getProfiles() {
  try {
    const response = await axios.get(`${API_URL}/profiles`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getProfile(pk) {
  try {
    const response = await axios.get(`${API_URL}/account/${pk}`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getProfileFeed(pk) {
  try {
    const response = await axios.get(`${API_URL}/profile-feed/${pk}`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default {
  getFeed,
  getProfiles,
  getProfile,
  getProfileFeed
}
