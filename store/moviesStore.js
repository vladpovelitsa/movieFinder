import { defineStore } from 'pinia';

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        query: '',
        movies: [],
        error: null
    }),
    actions: {
        setQuery(str) {
            this.query = str
        },
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