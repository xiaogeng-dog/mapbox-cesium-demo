<template>
  <div id="chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "echarts-wordcloud",
  data() {
    return {};
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const option = {
        backgroundColor: "#035254",
        // color:'#ff8000',
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["邮件营销", "视频广告", "直接访问"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            symbolSize: [12, 12],
            lineStyle: {
              color: "#78abff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            symbolSize: [12, 12],
            lineStyle: {
              color: "#78abff",
            },
          },
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            symbol: "circle", //折线点设置为实心点
            symbolSize: 12, //折线点的大小
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              color: "#5cfbff",
              shadowColor: "#5cfbff",
              shadowBlur: 20,
            },
            lineStyle: {
              shadowColor: "#5cfbff",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
              shadowBlur: 8,
              type: "solid",
              width: 4,
            },
          },
          {
            name: "视频广告",
            type: "line",
            smooth: true,
            stack: "总量",
            symbol: "circle", //折线点设置为实心点
            symbolSize: 12, //折线点的大小
            data: [150, 232, 201, 154, 190, 330, 410],
            itemStyle: {
              color: "#ecf390",
              shadowColor: "#ecf390",
              shadowBlur: 9.5,
            },
            lineStyle: {
              shadowColor: "#ecf390",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
              shadowBlur: 8,
              type: "solid",
              width: 4,
            },
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            smooth: true,
            symbol: "", //折线点设置为实心点
            symbolSize: 0, //折线点的大小
            data: [320, 332, 301, 334, 390, 330, 320],
            itemStyle: {
              color: "#bbffce",
              shadowColor: "#9bfeff",
              shadowBlur: 9.5,
            },
            lineStyle: {
              width: 4,
              shadowColor: "#bbffce",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
              shadowBlur: 8,
              type: "solid",
            },
          },
        ],
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart"));
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);

      window.onresize = function () {
        myChart.resize();
      };
    },
  },
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
#chart {
  width: 500px;
  height: 500px;
}
</style>
