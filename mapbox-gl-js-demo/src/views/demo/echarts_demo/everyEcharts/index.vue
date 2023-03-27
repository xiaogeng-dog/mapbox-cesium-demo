<template>
  <div class="echarts-container">
    <echarts-line></echarts-line>
    <echarts2 />
    <echarts3 />
  </div>
</template>

<script>
import echartsLine from "./echarts1.vue";
import echarts2 from "./echarts2.vue";
import echarts3 from "./highcharts3.vue";
export default {
  components: {
    echartsLine,
    echarts2,
    echarts3,
  },
  name: "index",
};
</script>

<style lang="less" scoped>
.echarts-container {
  display: flex;
}
</style>
