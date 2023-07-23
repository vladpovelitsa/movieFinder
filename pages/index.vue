<script setup>
import { useRoute } from "vue-router";
import { ref, onUnmounted } from "vue";
import { useMoviesStore } from "@/store/moviesStore";
import MovieCard from "@/components/cards/MovieCard";
import TheChat from "@/components/common/TheChat.vue";
const config = useRuntimeConfig();
const store = useMoviesStore();
const route = await useRoute();
console.log(route.hash.slice(1));
const query = ref(route.hash.slice(1) || "");
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

onBeforeMount(() => {
  fetchNewPage();
});

const fetchNewPage = async () => {
  let res = await fetch(
    `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=${
      query.value
    }&page=${store.movies.length / 10 + 1}`
  );

  let data = await res.json();
  store.addMoviesNewPage(data.Search);
};

onUnmounted(() => {
  store.setMovies([]);
});

useSeoMeta({
  title: "Movie finder",
  ogTitle: "Movie finder",
  description:
    "Here you can find your favorite movies, and get know more about them",
  ogDescription:
    "Here you can find your favorite movies, and get know more about them",
  ogImage: "",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <ClientOnly fallback-tag="span" fallback="Loading chat...">
    <TheChat />
  </ClientOnly>
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
