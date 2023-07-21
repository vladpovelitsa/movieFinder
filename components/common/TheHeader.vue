<script setup>
import SearchForm from "@/components/forms/SearchForm";
import { CirclePlus } from "@element-plus/icons-vue";
</script>
<template>
  <header
    class="align-center container mx-auto flex flex-wrap items-center justify-between gap-3 border-b-2 border-gray-400 px-4 py-4 md:flex-row"
  >
    <nuxt-link to="/" class="order-1 text-2xl"> Movie Finder </nuxt-link>
    <search-form class="order-3 w-full md:order-2 md:w-auto" />
    <nuxt-link class="order-2 md:order-3" to="/addMovie">
      <el-button round type="primary" :icon="CirclePlus"
        >Can't find movie?</el-button
      >
    </nuxt-link>
  </header>
</template>
