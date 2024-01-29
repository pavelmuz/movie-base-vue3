import axios from 'axios'

const apiKey = import.meta.env.VITE_KINOPOISK_API_KEY
const apiUrl = import.meta.env.VITE_KINOPOISK_API_URL

async function getMovies(title) {
  const config = {
    headers: {
      'X-API-KEY': apiKey
    },
    params: {
      keyword: title
    }
  }
  try {
    const response = await axios.get(apiUrl, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getMovie(id) {
  const config = {
    headers: {
      'X-API-KEY': apiKey
    }
  }
  try {
    const response = await axios.get(`${apiUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default {
  getMovies,
  getMovie
}
