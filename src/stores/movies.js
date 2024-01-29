import { defineStore } from 'pinia'

export default defineStore('movies', {
  state: () => ({
    movieList: {}
  })
})
