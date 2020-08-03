<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { getTop250Movies } from "@/api/submodule";
export default {
  name: "Top250",
  data() {
    return {
      movies: []
    };
  },
  async created() {
    // 调用 API 资源
    const { subjects } = await getTop250Movies({
      start: 0,
      count: 20
    });

    this.movies = subjects;
  }
};
</script>
