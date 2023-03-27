<template>
  <div class="chart-wrap">
    <div id="chart20" class="chart" />
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import Highmaps from "highcharts/modules/map";
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

export default {
  name: "Index",
  data() {
    return {
      chart: null,
      data: [
        { name: "规上企业", value: 26 },
        { name: "规下/小微企业", value: 150 },
      ],
    };
  },
  mounted() {
    this.createChartHandler();
  },
  methods: {
    // 创建图表
    createChartHandler() {
      const options = this.getChartOption(this.data);
      this.chart && this.chart.destroy();
      this.chart = new Highcharts.Chart("chart20", options);
    },
    // 获取图表配置项
    getChartOption(pieData) {
      const data = [
        {
          name: "规上企业",
          y: 13,
          color: "#00D7E9",
          sliced: true,
          selected: true,
        },
        {
          name: "规下/小微企业",
          y: 8,
          color: "#1FB5FF",
        },
      ];
      data.forEach((item) => {
        const temp = pieData.filter((elm) => elm.name === item.name);
        item.y = temp[0].value;
      });
      return {
        chart: {
          type: "pie",
          backgroundColor: "transparent",
          options3d: {
            enabled: true,
            alpha: 65,
            beta: 0,
          },
        },
        title: {
          text: null,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "<b>{point.y}</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 20,
            size: 160,
            distance: 1,
            zIndex: 1,
          },
        },
        series: [
          {
            type: "pie",
            name: "企业占比",
            data: data,
            dataLabels: {
              style: {
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "normal",
                textOutline: "none",
              },
              useHTML: true,
            },
          },
        ],
      };
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
