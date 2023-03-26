<template>
  <div class="chart-wrap">
    <ul class="legend-list">
      <li
        v-for="(item, index) in legend"
        :key="index"
        :class="['legend', item.selected ? '' : 'un-active']"
        @mouseenter="enterHandler(item)"
        @mouseleave="leaveHandler(item)"
        @click="clickHandler(item)"
      >
        <img :src="item.url" :alt="item.title" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <div id="chart01" class="chart" />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "echartsLine",
  data() {
    return {
      chart: null,
      data: {
        dates: ["2017", "2018", "2019", "2020", "2021"],
        values: [
          [100, 75, 125, 37, 10],
          [40, 15, 20, 30, 11],
          [40, 55, 23, 30, 12],
          [0, 24, 20, 19, 12],
        ],
      },
      legend: [
        {
          url: require("@/assets/images/czrk.png"),
          title: "常驻人口",
          selected: true,
        },
        {
          url: require("@/assets/images/wlrk.png"),
          title: "外来人口",
          selected: true,
        },
        {
          url: require("@/assets/images/70ys.png"),
          title: "70岁以上",
          selected: true,
        },
        {
          url: require("@/assets/images/14yx.png"),
          title: "14岁以下",
          selected: true,
        },
      ],
    };
  },
  mounted() {
    this.createChartHandler();
  },
  methods: {
    // 创建图表
    createChartHandler() {
      this.chart = echarts.init(document.getElementById("chart01"));
      this.chart.setOption(this.getChartOption(this.data, this.legend));
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.chart.resize();
        });
      });
    },
    // 获取图表配置项
    getChartOption(data, legend) {
      return {
        legend: {
          show: false,
          data: legend.map((i) => i.title),
        },
        tooltip: {
          trigger: "axis",
          // position: [10, 10],
          extraCssText:
            "color:#fff;background: rgba(0, 38, 118, 0.5);border:none; box-shadow: 0px 0px 8px 1px rgba(0, 145, 255, 0.5);border-radius: 2px;z-index:99",
          formatter: function (e) {
            let str = `<div><span>${e[0].name}</span><ul>`;
            e.forEach((it) => {
              str += `<li>${it.marker} ${it.seriesName} ${it.value}人</li>`;
            });
            str += "</ul></div>";
            return str;
          },
        },
        textStyle: {
          color: "#fff",
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(0,219,255,0.4000)",
              type: "dashed",
            },
          },
        },
        xAxis: {
          type: "category",
          data: data.dates,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(0,219,255,0.2000)",
            },
          },
        },
        grid: {
          top: "5%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        series: [
          {
            name: "常驻人口",
            data: data.values[0],
            type: "line",
            smooth: true,
            color: "#3C7CFF",
          },
          {
            name: "外来人口",
            data: data.values[1],
            type: "line",
            smooth: true,
            color: "#42E0FC",
          },
          {
            name: "70岁以上",
            data: data.values[2],
            type: "line",
            smooth: true,
            color: "#3AE4A2",
          },
          {
            name: "14岁以下",
            data: data.values[3],
            type: "line",
            smooth: true,
            color: "#359983",
          },
        ],
      };
    },
    // 鼠标移入图例触发
    enterHandler(item) {
      if (!this.chart) return;
      this.chart.dispatchAction({
        type: "highlight",
        seriesName: item.title,
      });
    },
    // 鼠标移出图例触发
    leaveHandler(item) {
      if (!this.chart) return;
      this.chart.dispatchAction({
        type: "downplay",
        name: item.title,
      });
    },
    // 选中切换
    clickHandler(item) {
      if (!this.chart) return;
      item.selected = !item.selected;
      this.chart.dispatchAction({
        type: "legendToggleSelect",
        name: item.title,
      });
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.chart-wrap {
  width: 460px;
  height: 350px;
  background-color: #000;
  margin-bottom: 10px;
  margin-right: 10px;
  .legend-list {
    // width: 100%;
    height: 50px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-right: 20px;
    display: flex;

    & li {
      display: flex;
      display: -webkit-box;
      display: -ms-flexbox;
      align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
    }

    & li {
      margin-left: 20px;
      cursor: pointer;
    }
    & li.un-active {
      opacity: 0.5;
    }
    & li span {
      color: #fff;
      font-size: 14px;
    }
  }

  .chart {
    width: 460px;
    height: 250px;
  }
}
</style>
