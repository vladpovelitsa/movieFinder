<script setup>
import TheHeader from "@/components/common/TheHeader";
import TheFooter from "@/components/common/TheFooter";
</script>

<template>
  <div class="wrapper grid min-h-screen grid-cols-1 bg-gray-800 text-white">
    <TheHeader />
    <div class="container mx-auto my-8">
      <NuxtPage />
    </div>
    <TheFooter />
  </div>
</template>

<style>
.wrapper {
  grid-template-rows: auto 1fr auto;
}
</style>
