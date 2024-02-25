import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL

async function getNotifications() {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.get(`${API_URL}/notifications/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function deleteNotification(id) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.delete(`${API_URL}/notification/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default {
  getNotifications,
  deleteNotification
}
