<script setup>
defineProps(["movieInfo"]);
</script>

<template>
  <nuxt-link :to="movieInfo.Title" class="movie-card">
    <img :src="movieInfo.Poster" alt="" class="mb-2 w-full" />
    <div
      class="movie-card__info flex w-full items-center justify-between gap-2"
    >
      <p>{{ movieInfo.Year }}</p>
      <p>{{ movieInfo.Type }}</p>
    </div>
    <h2 class="mt-2 border-t-2 border-gray-400 text-2xl">
      {{ movieInfo.Title }}
    </h2>
  </nuxt-link>
</template>
