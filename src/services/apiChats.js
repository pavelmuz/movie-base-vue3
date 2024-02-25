import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL

async function getActiveChats(pk) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.get(`${API_URL}/active-chats/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getChat(recipientId) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.get(`${API_URL}/chat/${recipientId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function sendMessage(recipientId, message) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.post(`${API_URL}/message/${recipientId}/`, message, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.message.data.error)
  }
}

export default {
  getActiveChats,
  getChat,
  sendMessage
}
