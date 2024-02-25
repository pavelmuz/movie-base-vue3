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

async function getKinopoiskMovies(title) {
  try {
    const response = await axios.get(`${API_URL}/kinopoisk-movies/${title}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getKinopoiskMovie(kinopoiskId) {
  try {
    const response = await axios.get(`${API_URL}/kinopoisk-movie/${kinopoiskId}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

async function getAccountFeed() {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.get(`${API_URL}/account-feed/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
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

async function postMovie(movieData) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.post(`${API_URL}/add-movie/`, movieData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.message.data.error)
  }
}

async function deleteMovie(id) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.delete(`${API_URL}/movie/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.message.data.error)
  }
}

async function addComment(comment, movieId) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.post(`${API_URL}/comment/${movieId}/`, comment, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.message.data.error)
  }
}

async function postLike(movieId) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.post(`${API_URL}/like/${movieId}/`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.message.data.error)
  }
}

async function deleteLike(movieId) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.delete(`${API_URL}/like/${movieId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.message.data.error)
  }
}

async function patchMovie(content, movieId) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    await axios.patch(`${API_URL}/movie/${movieId}/`, content, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    throw new Error(error.message.data.error)
  }
}

export default {
  getFeed,
  getKinopoiskMovies,
  getKinopoiskMovie,
  getAccountFeed,
  getProfileFeed,
  postMovie,
  deleteMovie,
  addComment,
  postLike,
  deleteLike,
  patchMovie
}
