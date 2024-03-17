import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL
const accessToken = localStorage.getItem('accessToken')

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

async function patchAccount(profileData) {
  try {
    await axios.patch(`${API_URL}/account/`, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function deleteAccount() {
  try {
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

async function postFollow(profileId) {
  try {
    await axios.post(`${API_URL}/follow/${profileId}/`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function deleteFollow(profileId) {
  try {
    await axios.delete(`${API_URL}/follow/${profileId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default {
  getProfiles,
  getProfile,
  getAccount,
  patchAccount,
  deleteAccount,
  postFollow,
  deleteFollow
}
