import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL

async function getProfiles() {
  try {
    const response = await axios.get(`${API_URL}/profiles/`)
    const profileId = localStorage.getItem('profileId')
    const filteredProfiles = response.data.filter((profile) => profile.id !== profileId)
    return filteredProfiles
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getAccount() {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.get(`${API_URL}/account/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
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

async function deleteAccount() {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.delete(`${API_URL}/account/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('isAuthenticated')
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default {
  getProfiles,
  getProfile,
  getAccount,
  deleteAccount
}
