<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="getAllLayers()"
        >获取</el-button
      >
    </div>
  </div>
</template>

<script>
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
      this.point();
      this.line();
      this.polygon();
    });
  },
  methods: {
    // 绘制点位
    point() {
      if (this.map && this.map.getSource("circle")) {
        this.map.removeLayer("circle");
        this.map.removeSource("circle");
      }
      this.map.addSource("circle", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { size: 10, color: "red" },
              geometry: { type: "Point", coordinates: [104, 35] },
            },
            {
              type: "Feature",
              properties: { size: 5, color: "green" },
              geometry: { type: "Point", coordinates: [110, 35] },
            },
            {
              type: "Feature",
              properties: { size: 5, color: "red" },
              geometry: { type: "Point", coordinates: [116, 35] },
            },
          ],
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
    },
    // 绘制线
    line() {
      if (this.map && this.map.getSource("line")) {
        this.map.removeLayer("line");
        this.map.removeSource("line");
      }
      this.map.addSource("line", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { width: 3, color: "red" },
              geometry: {
                type: "LineString",
                coordinates: [
                  [120, 30],
                  [122, 31],
                  [124, 32],
                  [126, 33],
                ],
              },
            },
            {
              type: "Feature",
              properties: { width: 2, color: "green" },
              geometry: {
                type: "LineString",
                coordinates: [
                  [110, 30],
                  [112, 31],
                  [114, 32],
                  [116, 33],
                ],
              },
            },
            {
              type: "Feature",
              properties: { width: 1, color: "red" },
              geometry: {
                type: "LineString",
                coordinates: [
                  [100, 30],
                  [102, 31],
                  [104, 32],
                  [106, 33],
                ],
              },
            },
          ],
        },
      });
      this.map.addLayer({
        id: "line",
        type: "line",
        source: "line",
        paint: {
          "line-color": ["get", "color"],
          "line-width": ["get", "width"],
          "line-opacity": 1,
        },
      });
    },
    // 绘制面
    polygon() {
      if (this.map && this.map.getSource("surface")) {
        this.map.removeLayer("surface");
        this.map.removeSource("surface");
      }
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
                [120, 30],
                [124, 32],
                [126, 34],
                [130, 30],
                [128, 28],
                [120, 30],
              ],
            ],
          },
        },
      });
      this.map.addLayer({
        id: "surface",
        type: "fill",
        source: "surface",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 1,
          "fill-outline-color": ["get", "color"],
        },
      });
    },
    getAllLayers() {
      console.log(this.map.getStyle().layers);
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
