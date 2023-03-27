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
        <i class="rect" :style="{ backgroundColor: item.color }" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <div id="chart02" class="chart" />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Index",
  data() {
    return {
      chart: null,
      data: [10, 10, 70, 10],
      legend: [
        { color: "rgba(0, 80, 179, 1)", title: "订餐", selected: true },
        { color: "rgba(9, 109, 217, 1)", title: "体育健身", selected: true },
        { color: "rgba(51, 157, 255, 1)", title: "上门服务", selected: true },
        { color: "rgba(6, 200, 140, 1)", title: "代购物", selected: true },
      ],
    };
  },
  mounted() {
    this.createChartHandler();
  },
  methods: {
    // 创建图表
    createChartHandler() {
      this.chart = echarts.init(document.getElementById("chart02"));
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
        tooltip: {
          trigger: "item",
          position: "right",
          extraCssText:
            "color:#fff;background: rgba(0, 38, 118, 0.5);border:none; box-shadow: 0px 0px 8px 1px rgba(0, 145, 255, 0.5);border-radius: 2px;z-index:99",
          formatter: function (e) {
            return e.data.name + ": " + e.data.value;
          },
        },
        legend: {
          show: false,
          data: legend.map((i) => i.title),
        },
        color: legend.map((i) => i.color), // 对应数据饼状颜色
        series: [
          {
            type: "pie",
            radius: ["20%", "90%"],
            center: ["50%", "50%"],
            label: {
              alignTo: "edge",
              formatter: "{name|{d}%}\n",
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 30,
              rich: {
                name: {
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "PingFangReg",
                  fontWeight: "400",
                },
              },
            },
            roseType: "area",
            data: [
              { value: data[0], name: "订餐" },
              { value: data[1], name: "体育健身" },
              { value: data[2], name: "上门服务" },
              { value: data[3], name: "代购物" },
            ],
          },
        ],
      };
    },
    // 鼠标移入图例触发
    enterHandler(item) {
      if (!this.chart) return;
      this.chart.dispatchAction({
        type: "highlight",
        name: item.title,
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
