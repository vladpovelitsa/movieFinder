<script setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { useMoviesStore } from "@/store/moviesStore";
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const store = useMoviesStore();
// Search //

let query = ref(route.hash.slice(1) || "");

let searchMovie = useDebounceFn(async () => {
  if (query.value) {
    let res = await fetch(
      `https://www.omdbapi.com/?apikey=${config.public.omdbApiKey}&s=${query.value}&plot=full`
    );

    let data = await res.json();
    data.Search?.length
      ? (store.setMovies(data.Search), store.setError(null))
      : (store.setError(data.Error), store.setMovies([]));

    router.push({ name: "index", hash: "#" + query.value });
    query.value = "";
  }
}, 1000);
onMounted(() => searchMovie());

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
