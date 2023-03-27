<template>
  <div>
    <!-- <mapboxViewFilter /> -->
    <mapboxViewRoute />
  </div>
</template>

<script>
import mapboxViewFilter from "@/views/demo/mapbox_demo/mapbox进阶操作/paint和filter/mapboxViewFilter";
import mapboxViewRoute from "./mapbox和高德API结合实现路径规划/mapboxViewRoute.vue";
export default {
  components: {
    mapboxViewFilter,
    mapboxViewRoute,
  },
  name: "index",
};
</script>

<style lang="less" scoped></style>
