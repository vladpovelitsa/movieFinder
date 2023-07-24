import { useMoviesStore } from "@/store/moviesStore";
export const fetchMovies = async (query) => {
    const store = useMoviesStore();    
    const config = useRuntimeConfig();
    let res = await fetch(
    `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=${
        query
    }&page=${store.movies.length / 10 + 1}`
  );

  let data = await res.json();
  store.addMoviesNewPage(data.Search);
  store.setQuery(query)
};

export const resetMovies = async () => {
    const store = useMoviesStore();
    store.setMovies([]); 
}