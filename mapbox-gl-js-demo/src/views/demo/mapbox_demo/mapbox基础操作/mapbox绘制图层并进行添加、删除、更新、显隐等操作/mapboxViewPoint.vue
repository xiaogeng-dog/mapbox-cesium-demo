<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="addPoint()">添加</el-button>
      <el-button type="primary" size="mini" @click="updatePoint()"
        >更新数据</el-button
      >
      <el-button type="primary" size="mini" @click="hidePoint()"
        >隐藏</el-button
      >
      <el-button type="primary" size="mini" @click="showPoint()"
        >显示</el-button
      >
      <el-button type="primary" size="mini" @click="editPointSize()"
        >修改点位大小</el-button
      >
      <el-button type="primary" size="mini" @click="editPointColor()"
        >修改点位颜色</el-button
      >
      <el-button type="primary" size="mini" @click="deletePoint()"
        >删除</el-button
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
  },
  methods: {
    // 添加点位图层
    addPoint() {
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

    // 更新数据源
    updatePoint() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.getSource("circle").setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { size: 4, color: "red" },
            geometry: { type: "Point", coordinates: [124, 35] },
          },
          {
            type: "Feature",
            properties: { size: 6, color: "yellow" },
            geometry: { type: "Point", coordinates: [128, 35] },
          },
          {
            type: "Feature",
            properties: { size: 8, color: "red" },
            geometry: { type: "Point", coordinates: [132, 35] },
          },
        ],
      });
    },

    // 隐藏
    hidePoint() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("circle", "visibility", "none");
    },

    // 显示
    showPoint() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("circle", "visibility", "visible");
    },

    // 修改点位大小
    editPointSize() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.setPaintProperty("circle", "circle-radius", 10);
    },

    // 修改点位颜色
    editPointColor() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.setPaintProperty("circle", "circle-color", "green");
    },

    // 删除点位
    deletePoint() {
      if (!this.map.getSource("circle")) {
        return alert("请先添加");
      }
      this.map.removeLayer("circle");
      this.map.removeSource("circle");
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
