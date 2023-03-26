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
        >修改面颜色</el-button
      >
      <el-button type="primary" size="mini" @click="editPointColor()"
        >修改面边界颜色</el-button
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

    // 更新数据源
    updatePoint() {
      if (!this.map.getSource("surface")) {
        return alert("请先添加");
      }
      this.map.getSource("surface").setData({
        type: "Feature",
        properties: {
          color: "green",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [110.10937500000074, 36.285607744174015],
              [146.84765624999983, 35.71678108829262],
              [146.14453125000034, 12.003498241279189],
              [112.0429687500008, 13.546316937477897],
            ],
          ],
        },
      });
    },

    // 隐藏
    hidePoint() {
      if (!this.map.getSource("surface")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("surface", "visibility", "none");
    },

    // 显示
    showPoint() {
      if (!this.map.getSource("surface")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("surface", "visibility", "visible");
    },

    // 修改面颜色
    editPointSize() {
      if (!this.map.getSource("surface")) {
        return alert("请先添加");
      }
      this.map.setPaintProperty("surface", "fill-color", "blue");
    },

    // 修改边框颜色
    editPointColor() {
      if (!this.map.getSource("surface")) {
        return alert("请先添加");
      }
      this.map.setPaintProperty("surface", "fill-outline-color", "blue");
    },

    // 删除点位
    deletePoint() {
      if (!this.map.getSource("surface")) {
        return alert("请先添加");
      }
      this.map.removeLayer("surface");
      this.map.removeSource("surface");
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
