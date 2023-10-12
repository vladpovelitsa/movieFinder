<script setup>
import { onUnmounted } from "vue";
import MovieCard from "@/components/cards/MovieCard";
import TheChat from "@/components/common/TheChat.vue";
import { useMoviesStore } from "@/store/moviesStore";
import { fetchMovies, resetMovies } from "@/composables/fetchMoviesBySearch";
import getQuery from "@/composables/getQuery";
import { useRoute } from "vue-router";

const store = reactive(useMoviesStore());
let query = reactive(getQuery());
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
  fetchMovies(query);
});

onUnmounted(() => {
  resetMovies();
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
  <div class="flex flex-col md:flex-row md:gap-8">
    <main class="md:w-2/3">
      <h1 class="mb-8 text-3xl font-bold" v-if="getQuery()">
        Search result for request: <span class="underline">{{ getQuery() }}</span>
      </h1>
      <Swiper
        :modules="[SwiperAutoplay, SwiperEffectCreative]"
        :breakpoints="swiperBreakpoints"
        :loop="false"
        @reachEnd="fetchMovies(store.query)"
        :key="store.query"
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
    </main>
    <aside class="md:w-1/3">
      <ClientOnly>
        <TheChat />
      </ClientOnly>
    </aside>
  </div>
</template>
