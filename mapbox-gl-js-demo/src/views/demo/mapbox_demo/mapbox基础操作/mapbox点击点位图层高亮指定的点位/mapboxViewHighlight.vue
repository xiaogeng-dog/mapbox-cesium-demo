<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="addPoint()">添加</el-button>
      <el-button type="primary" size="mini" @click="highlight()"
        >高亮id=2的要素</el-button
      >
      <el-button type="primary" size="mini" @click="removeHighlight()"
        >移除高亮</el-button
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

    this.map.on("load", () => {});
    this.map.on("click", "circle", (e) => {
      const features = this.map.queryRenderedFeatures(e.point);
      if (features.length > 0) {
        this.map.setFilter("circle-highlight", [
          "==",
          ["string", ["get", "id"]],
          features[0].properties.id,
        ]);
      }
    });
  },
  methods: {
    // 添加点位图层
    addPoint() {
      if (this.map && this.map.getSource("circle")) {
        this.map.removeLayer("circle");
        this.map.removeLayer("circle-highlight");
        this.map.removeSource("circle");
      }
      this.map.addSource("circle", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { id: "1", size: 5, color: "green" },
              geometry: { type: "Point", coordinates: [104, 35] },
            },
            {
              type: "Feature",
              properties: { id: "2", size: 5, color: "green" },
              geometry: { type: "Point", coordinates: [110, 35] },
            },
            {
              type: "Feature",
              properties: { id: "3", size: 5, color: "green" },
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
          "circle-stroke-color": ["get", "color"],
          "circle-stroke-opacity": 1,
        },
      });
      this.map.addLayer({
        id: "circle-highlight",
        type: "circle",
        source: "circle",
        paint: {
          "circle-radius": ["get", "size"],
          "circle-color": "red",
          "circle-opacity": 1,
          "circle-stroke-color": "red",
          "circle-stroke-opacity": 1,
        },
        filter: ["in", "id", "-10000"],
      });
    },

    // 高亮指定id的要素
    highlight() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.setFilter("circle-highlight", [
        "==",
        ["string", ["get", "id"]],
        "2",
      ]);
    },

    // 移除高亮
    removeHighlight() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.setFilter("circle-highlight", [
        "==",
        ["string", ["get", "id"]],
        "-10000",
      ]);
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
