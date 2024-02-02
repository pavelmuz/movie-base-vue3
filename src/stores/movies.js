import { defineStore } from 'pinia'

export default defineStore('movies', {
  state: () => ({
    movieList: {}
  }),
  actions: {
    setMovieList(value) {
      this.movieList = value
    }
  }
})
