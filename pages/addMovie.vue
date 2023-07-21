<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// do not use same name with ref
const form = reactive({
  title: "",
  year: "",
  type: "",
});

const onSubmit = () => {
  alert("Thank You! After moderation movie will be added!");
  form.title = "";
  form.year = "";
  form.type = "";
  let addMore = confirm("Do you want add another movie?");
  if (!addMore) {
    router.push({ path: "/" });
  }
};
</script>
<template>
  <h1 class="mb-4 text-6xl">Can't find movie?</h1>
  <p class="text-2xl">
    Enter data about the film and we will add it to the site!
  </p>

  <el-form :model="form" label-width="120px" label-position="left" class="mt-8">
    <el-form-item label="Movie title">
      <el-input
        style="
          --el-input-bg-color: transparent;
          --el-input-border-color: gray;
          --el-input-text-color: white;
        "
        v-model="form.title"
        placeholder="Enter title"
      />
    </el-form-item>
    <el-form-item label="Year of release">
      <el-date-picker
        style="
          --el-input-bg-color: transparent;
          --el-input-border-color: gray;
          --el-input-text-color: white;
        "
        v-model="form.year"
        type="year"
        placeholder="Pick a year"
      />
    </el-form-item>
    <el-form-item label="Type of movie">
      <el-radio-group v-model="form.type" class="ml-4">
        <el-radio label="1" size="large">Movie</el-radio>
        <el-radio label="2" size="large">Series</el-radio>
        <el-radio label="3" size="large">Episode</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Send</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
