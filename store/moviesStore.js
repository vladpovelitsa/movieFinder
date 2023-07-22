import { defineStore } from 'pinia';

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        movies: [],
        error: null
    }),
    actions: {
        setMovies(data) {
            this.movies= data
        },
        setError(Error) {
            this.error = Error 
        },
        addMoviesNewPage(data) {
            if(data) this.movies= [...this.movies, ...data]
        }
    },
    
  })