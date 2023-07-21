<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import { useMoviesStore } from "@/store/moviesStore";
import MovieCard from "@/components/cards/MovieCard";
const config = useRuntimeConfig();
const store = useMoviesStore();
const route = useRoute();
const query = ref(route.hash?.slice(1) || "");
const swiperBreakpoints = {
  768: {
    slidesPerView: 1,
  },
  992: {
    slidesPerView: 2,
  },
  1200: {
    slidesPerView: 3,
  },
};
definePageMeta({
  layout: "default",
});

let fetchNewPage = async () => {
  if (store.movies?.length) {
    let res = await fetch(
      `http://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=${
        query.value
      }&page=${store.movies.length / 10 + 1}`
    );

    let data = await res.json();
    store.addMoviesNewPage(data.Search);
  }
};

onBeforeMount(() => {
  store.setMovies([]);
});
</script>

<template>
  <h1 class="mb-8 text-3xl font-bold" v-if="query.value">
    Search result for: <span class="underline">{{ query.value }}</span>
  </h1>

  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :breakpoints="swiperBreakpoints"
    :loop="false"
    @reachEnd="fetchNewPage()"
    :key="query.value"
    v-if="store.movies?.length"
  >
    <SwiperSlide
      v-for="movie in store.movies"
      :key="movie.imdbID"
      class="w-96 px-4"
    >
      <MovieCard :movie-info="movie" />
    </SwiperSlide>
  </Swiper>
  <div class="v-else">
    <h2 class="mb-8 text-3xl font-bold">
      {{ store.error }}
    </h2>
  </div>
</template>
