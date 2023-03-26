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

    // 更新数据源
    updatePoint() {
      if (!this.map.getSource("line")) {
        return alert("请先添加");
      }
      this.map.getSource("line").setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { width: 3, color: "red" },
            geometry: {
              type: "LineString",
              coordinates: [
                [120, 20],
                [122, 21],
                [124, 22],
                [126, 23],
              ],
            },
          },
          {
            type: "Feature",
            properties: { width: 2, color: "green" },
            geometry: {
              type: "LineString",
              coordinates: [
                [110, 20],
                [112, 21],
                [114, 22],
                [116, 23],
              ],
            },
          },
          {
            type: "Feature",
            properties: { width: 1, color: "red" },
            geometry: {
              type: "LineString",
              coordinates: [
                [100, 20],
                [102, 21],
                [104, 22],
                [106, 23],
              ],
            },
          },
        ],
      });
    },

    // 隐藏
    hidePoint() {
      if (!this.map.getSource("line")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("line", "visibility", "none");
    },

    // 显示
    showPoint() {
      if (!this.map.getSource("line")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("line", "visibility", "visible");
    },

    // 修改点位大小
    editPointSize() {
      if (!this.map.getSource("line")) {
        return alert("请先添加");
      }
      this.map.setPaintProperty("line", "line-width", 10);
    },

    // 修改点位颜色
    editPointColor() {
      if (!this.map.getSource("line")) {
        return alert("请先添加");
      }
      this.map.setPaintProperty("line", "line-color", "green");
    },

    // 删除点位
    deletePoint() {
      if (!this.map.getSource("line")) {
        return alert("请先添加");
      }
      this.map.removeLayer("line");
      this.map.removeSource("line");
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
