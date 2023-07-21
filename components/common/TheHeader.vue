<script setup>
import SearchForm from "@/components/forms/SearchForm";
import { CirclePlus } from "@element-plus/icons-vue";
</script>
<template>
  <header
    class="align-center container mx-auto flex items-center justify-between border-b-2 border-gray-400 py-4"
  >
    <nuxt-link to="/" class="text-2xl"> Movie Finder </nuxt-link>
    <search-form />
    <nuxt-link to="/addMovie">
      <el-button round type="primary" :icon="CirclePlus"
        >Can't find movie?</el-button
      >
    </nuxt-link>
  </header>
</template>
