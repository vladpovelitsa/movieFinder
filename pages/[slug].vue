<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
let route = useRoute();
const config = useRuntimeConfig();

let { data: movie } = await useFetch(
  `http://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&t=${route.params.slug}&plot=full`
);
</script>

<template>
  <div class="flex w-full flex-col gap-10 px-4 md:flex-row">
    <img :src="movie.Poster" alt="" />
    <div class="w-full">
      <h1 class="mb-8 w-full border-b-2 pb-8 text-6xl font-bold">
        {{ route.params.slug }}
      </h1>
      <p class="mb-2">Genre: {{ movie.Genre }}</p>
      <p class="mb-2">Language: {{ movie.Language }}</p>
      <p class="mb-2">Country: {{ movie.Country }}</p>

      <hr class="mb-2" />
      <p class="mb-2">Director: {{ movie.Director }}</p>
      <p class="mb-2">Writer: {{ movie.Writer }}</p>
      <p class="mb-2">Actors: {{ movie.Actors }}</p>
      <hr class="mb-2" />
      <p class="mb-2">Released: {{ movie.Released }}</p>
      <p class="mb-2">BoxOffice: {{ movie.BoxOffice }}</p>
      <p class="mb-2">Runtime: {{ movie.Runtime }}</p>
    </div>
  </div>

  <h2 class="mb-4 mt-8 border-t-2 border-gray-400 px-4 pt-8 text-4xl">
    About:
  </h2>
  <p class="px-4">
    {{ movie.Plot }}
  </p>
</template>
