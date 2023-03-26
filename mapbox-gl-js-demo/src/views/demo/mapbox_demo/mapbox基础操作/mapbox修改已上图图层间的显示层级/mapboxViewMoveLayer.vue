<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="moveCircle()"
        >移动点图层到面图层之上</el-button
      >
      <el-button type="primary" size="mini" @click="moveSurface()"
        >移动面图层到点图层之上</el-button
      >
    </div>
  </div>
</template>

<script>
//TODO:貌似点永远在面之上
import drawMap from "@/assets/js/drawMapFigure";
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
      this.drawCircle();
      this.drawSurface();
    });
  },
  methods: {
    // 绘制点图层
    drawCircle() {
      this.map.addSource("circle", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { size: 15, color: "green" },
              geometry: { type: "Point", coordinates: [104, 35] },
            },
            {
              type: "Feature",
              properties: { size: 15, color: "green" },
              geometry: { type: "Point", coordinates: [110, 35] },
            },
            {
              type: "Feature",
              properties: { size: 15, color: "green" },
              geometry: { type: "Point", coordinates: [116, 35] },
            },
          ],
        },
      });
    },
    // 绘制面图层
    drawSurface() {
      this.map.addSource("surface", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            color: "red",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [78, 50],
                [130, 50],
                [130, 20],
                [78, 20],
                [78, 50],
              ],
            ],
          },
        },
      });
      this.map.addLayer({
        id: "circle",
        type: "circle",
        source: "circle",
        paint: {
          "circle-radius": ["get", "size"],
          "circle-color": ["get", "color"],
          "circle-opacity": 1,
          "circle-stroke-color": "red",
          "circle-stroke-opacity": 1,
        },
      });
      this.map.addLayer({
        id: "surface",
        type: "fill",
        source: "surface",
        paint: {
          "fill-color": ["get", "color"],
          // "fill-opacity": 0.5,
          "fill-outline-color": ["get", "color"],
        },
      });
    },
    // 移动点图层到面图层之上
    moveCircle() {
      console.log(111);
      this.map.moveLayer("surface", "circle"); // 将circle移动到surface的图层之上
    },
    // 移动点图层到面图层之上
    moveSurface() {
      console.log(111);
      this.map.moveLayer("circle", "surface"); // 将surface移动到circle的图层之上
    },
  },
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
.btn-list {
  position: fixed;
  top: 100px;
  left: 100px;
}
</style>
