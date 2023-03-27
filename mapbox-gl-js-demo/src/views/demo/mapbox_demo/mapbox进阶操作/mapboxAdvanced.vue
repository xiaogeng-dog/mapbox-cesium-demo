<template>
  <div>
    <!-- <mapboxViewFilter /> -->
    <!-- <mapboxViewRoute /> -->
    <!-- <mapboxViewSprites /> -->
    <mapboxViewAnimationRoute />
  </div>
</template>

<script>
import mapboxViewFilter from "@/views/demo/mapbox_demo/mapbox进阶操作/paint和filter/mapboxViewFilter";
import mapboxViewRoute from "./mapbox和高德API结合实现路径规划/mapboxViewRoute.vue";
import mapboxViewSprites from "./mapbox中sprite的前端生成（可能是生成json）/mapboxViewSprites.vue";
import mapboxViewAnimationRoute from "@/views/demo/mapbox_demo/mapbox进阶操作/mapbox轨迹展示与播放/mapboxViewAnimationRoute";
export default {
  components: {
    mapboxViewFilter,
    mapboxViewRoute,
    mapboxViewSprites,
    mapboxViewAnimationRoute,
  },
  name: "index",
};
</script>

<style lang="less" scoped></style>
