<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
import drawMap from "@/assets/js/drawMapFigure";
import chinaMap from "@/assets/mapData/china.geojson";
export default {
  name: "HomeView",
  data() {
    return {};
  },
  mounted() {
    this.map = drawMap("container");
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });

    this.map.on("load", () => {
      this.map.addSource("interestingPoint", {
        type: "geojson",
        data: chinaMap,
      });
      this.map.addLayer({
        type: "fill",
        source: "interestingPoint",
        maxzoom: 14,
        id: "10",
        // ==========================filter======================================
        // ==和!=可实现根据某个字段图层的过滤展示
        // filter: ["==", "name", "江苏省"],// 只在地图上展示江苏省
        // filter: ["!=", "name", "江苏省"],
        // >、>=、<、<=是通过比较大小的方式，实现图层的过滤，所以此处需要的字段得是数字类型或者通过to-number将字段转换成数字类型。
        // filter: [">=", "childrenNum", 12],
        // in和match都可实现对图层根据某个字段进行多值过滤。
        // filter: ["in", "name", "北京市", "江苏省"],
        // filter: ["match", ["get", "name"], ["北京市", "江苏省"], true, false],
        // 如果我们要实现在地图中展示除外的其他区域，我们可以直接用!in和将match的条件互换的方式来实现，如下：
        // filter: ["!in", "name", "北京市", "江苏省"],
        // filter: ["match", ["get", "name"], ["北京市", "江苏省"], false, true],
        // 有时候，会存在多条件的过滤，例如：我们选择type==1并且count>10的区域，我们可以这么写：
        // filter: [
        //   "all",
        //   [">=", "childrenNum", 11],
        //   ["==", "subFeatureIndex", 2],
        // ],
        // 有时我们会存在根据几何类型来进行过滤，此时，我们可用：Point, LineString or Polygon.
        // filter: ["==", ["geometry-type"], "Polygon"],
        // ==========================paint================================================
        // match通常用于枚举型的字段渲染，如唯一值渲染。
        // paint: {
        //   "fill-color": [
        //     "match",
        //     ["get", "childrenNum"],
        //     21,
        //     "#FFD273",
        //     16,
        //     "#E86D68",
        //     "#A880FF",
        //   ],
        //   "fill-outline-color": "#000000",
        // },
        // case通常用于分段数值型的字段渲染，值域是前关后开，如分级渲染。第一个的判断是<;中间的判断是>= 和 <;最后一个判断是>=;
        // paint: {
        //   "fill-color": [
        //     "case",
        //     ["<", ["get", "speed"], 10.8],
        //     "rgba(0,0,0,0)", //<10.8
        //     ["<", ["get", "speed"], 17.2],
        //     "rgba(153, 255, 153, .9)", //>=10.8 & <17.2
        //     ["<", ["get", "speed"], 24.5],
        //     "rgba(102, 204, 255, .9)",
        //     ["<", ["get", "speed"], 32.7],
        //     "rgba(255, 255, 102, .9)",
        //     ["<=", ["get", "speed"], 41.5],
        //     "rgba(253, 139, 0, .9)",
        //     ["<=", ["get", "speed"], 50.1],
        //     "rgba(255, 51, 0, .9)", //>=41.5 & <50.1
        //     "rgba(255, 0, 255, .9)", // 默认值, >=50.1
        //   ],
        //   "fill-outline-color": "#000000",
        // },
        // step和上面的case很类似，只是值域是前开后关的。
        // paint: {
        //   // <=100, 100-500, >500
        //   // "circle-color": [
        //   //   "step",
        //   //   ["get", "count"],
        //   //   "#51bbd6",
        //   //   100,
        //   //   "#f1f075",
        //   //   500,
        //   //   "#f28cb1", // other
        //   // ],
        //   //对于非数值型的字段，我们可以用to-number对字段进行转换。
        //   "circle-color": [
        //     "step",
        //     ["to-number", ["get", "CID"]],
        //     "#0098A3",
        //     10,
        //     "#00CA8D",
        //     20,
        //     "#37C508",
        //     30,
        //     "#98F300",
        //     40,
        //     "#EFFF85",
        //   ],
        //   "fill-outline-color": "#000000",
        // },
        // interpolate，中文的翻译是“插值”，在mapbox GL中，我们可通过interpolate实现按照比例的插值渲染。
        background: {
          // <=8, 8-10, >10
          "background-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            "rgba(0, 0, 255, 0.2)",
            10,
            "rgba(255, 0, 0, 0.2)",
          ],
        },
        paint: {
          // linear 线性
          // <=20, 20-60, 60-100, >100
          // "fill-extrusion-color": [
          //   "interpolate",
          //   ["linear"],
          //   ["get", "height"],
          //   20,
          //   "rgba(255,255,191, 0.65)",
          //   60,
          //   "rgba(253,174,97, 0.65)",
          //   100,
          //   "rgba(215,25,28, 0.65)",
          // ],
          // exponential，指数
          "fill-opacity": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            2,
            0.3,
            7,
            0,
          ],
          "fill-outline-color": "#000000",
        },
        layout: {
          "fill-sort-key": 100000,
        },
      });
      this.map.addLayer({
        id: "points",
        type: "symbol",
        source: "interestingPoint",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 22,
        },
        paint: {
          "text-color": "#000000",
        },
      });
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 800px;
}

.mapboxgl-ctrl-attrib {
  display: none;
}

#coordinate_div {
  position: absolute;
  bottom: 80px;
  left: 20px;
  color: white;
  z-index: 100;
}

#coordinate_div > p {
  margin: 2px;
}
</style>
