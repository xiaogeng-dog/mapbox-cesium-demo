<template>
  <div id="chart"></div>
</template>

<script>
/**
 * npm install echarts
    注意版本号，echarts5.0.0对应的echarts-woedcloud2.0.0版本
   npm install echarts-wordcloud@2.0.0
 */

// shape ：词云的形状，默认是 circle，可选的参数有cardioid 、 diamond 、 triangle-forward 、 triangle 、 star。
// left top right bottom ：词云的位置，默认是 center center。
// width height ：词云的宽高，默认是 75% 80%。
// sizeRange ：词云的文字字号范围，默认是[12, 60] ，词云会根据提供原始数据的 value 对文字的字号进行渲染。以默认值为例， value 最小的渲染为 12px ，最大的渲染为 60px ，中间的值按比例计算相应的数值。
// rotationRange rotationStep ：词云中文字的角度，词云中的文字会随机的在 rotationRange 范围内旋转角度，渲染的梯度就是 rotationStep ，这个值越小，词云里出现的角度种类就越多。以上面参数为例，可能旋转的角度就是 -90 -45 0 45 90 。
// gridSize ：词云中每个词的间距。
// drawOutOfBound ：是否允许词云在边界外渲染，直接使用默认参数 false 就可以，否则容易造成词重叠。
// textStyle ：词云中文字的样式， normal 是初始的样式， emphasis 是鼠标移到文字上的样式。

import * as echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
  name: "echarts-wordcloud",
  data() {
    return {
      msg: "",
      data: [
        {
          name: "中国",
          value: 10000,
        },
        {
          name: "泰国",
          value: 600,
        },
        {
          name: "新加坡",
          value: 500,
        },
        {
          name: "印度尼西亚",
          value: 400,
        },
        {
          name: "日本",
          value: 100,
        },
        {
          name: "澳大利亚",
          value: 300,
        },
        {
          name: "韩国",
          value: 200,
        },
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const option = {
        backgroundColor: "#fff",
        series: [
          {
            type: "wordCloud",
            shape: "triangle",
            gridSize: 10,
            sizeRange: [20, 50],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfBound: false,
            // 遇到颜色不会随即变的问题
            // 开始时我textStyle是这样的，然后字体颜色不会生效
            // 后面发现echart 版本的问题
            // 实际上新版本的echarts的设置都不需要用到normal字段，
            // 例如柱状图、饼状图的的itemStyle等等
            // textStyle: {
            //   normal: {
            //     color: function () {
            //       return (
            //         "rgb(" +
            //         Math.round(Math.random() * 255) +
            //         ", " +
            //         Math.round(Math.random() * 255) +
            //         ", " +
            //         Math.round(Math.random() * 255) +
            //         ")"
            //       );
            //     },
            //   },
            // },
            textStyle: {
              fontFamily: "微软雅黑",
              color: () => {
                return this.randomColor();
              },
            },
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            data: this.data,
          },
        ],
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart"));
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
      //点击事件
      myChart.on("click", function (e) {
        alert(e);
      });

      window.onresize = function () {
        myChart.resize();
      };
    },
    // 生成随机颜色
    randomColor() {
      return (
        "rgb(" +
        [
          Math.round(Math.random() * 255),
          Math.round(Math.random() * 255),
          Math.round(Math.random() * 255),
        ].join(",") +
        ")"
      );
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
