<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import getQuery from "@/composables/getQuery";
import { fetchMovies, resetMovies } from "@/composables/fetchMoviesBySearch";
const router = useRouter();
// Search //

let query = ref(getQuery() || "");

let searchMovie = useDebounceFn(async () => {
  if (query.value) {
    resetMovies();
    fetchMovies(query.value);
    router.push({ name: "index", hash: "#" + query.value });
    query.value = "";
  }
}, 1000);

// end Search //
</script>
<template>
  <div class="flex w-80 gap-2 align-middle">
    <el-input
      style="
        --el-input-bg-color: transparent;
        --el-input-border-color: gray;
        --el-input-text-color: white;
      "
      v-model="query"
      plain
      placeholder="Find movie..."
      @input="searchMovie()"
    >
      <template #suffix>
        <el-icon size="16px" color="white">
          <Search />
        </el-icon> </template
    ></el-input>
  </div>
</template>
