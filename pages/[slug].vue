<script setup>
import { useRoute } from "vue-router";
let route = await useRoute();
const config = useRuntimeConfig();
const imagePlaceholder =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

let { data: movie } = await useFetch(
  `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&t=${route.params.slug}&plot=full`
);

useSeoMeta({
  title: route.params.slug,
  ogTitle: route.params.slug,
  description:
    "This is amazing page, let me tell you all about " + route.params.slug,
  ogDescription:
    "This is amazing page, let me tell you all about " + route.params.slug,
  ogImage: movie.Poster,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="flex w-full flex-col gap-10 px-4 align-top md:flex-row">
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : imagePlaceholder"
      alt=""
      class="w-full self-start md:w-96"
    />
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
