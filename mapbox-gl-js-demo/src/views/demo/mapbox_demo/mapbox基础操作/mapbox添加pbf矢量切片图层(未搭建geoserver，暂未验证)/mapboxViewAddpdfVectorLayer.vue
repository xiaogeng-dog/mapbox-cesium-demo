<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="add()">添加</el-button>
      <el-button type="primary" size="mini" @click="remove()">删除</el-button>
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
      this.drawCircle();
      this.drawSurface();
    });
  },
  methods: {
    // 添加
    add() {
      if (this.map.getSource("railway_source")) return;
      this.map.addSource("railway_source", {
        type: "vector",
        tiles: [
          // 切片服务地址tagola切片
          `http://xxxx/tagola/maps/railway-maps/railway/{z}/{x}/{y}.pbf`,
        ],
        minzoom: 3,
        maxzoom: 16,
      });
      this.map.addLayer({
        id: "railway_bg",
        type: "line",
        source: "railway_source",
        "source-layer": "railway",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#94928C",
          "line-width": {
            stops: [
              [3, 1],
              [11, 3],
              [22, 4],
            ],
          },
        },
      });
      this.map.addLayer({
        id: "railway",
        type: "line",
        source: "railway_source",
        "source-layer": "railway",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-width": {
            stops: [
              [3, 0.5],
              [11, 2],
              [22, 3],
            ],
          },
          "line-dasharray": [2, 7],
        },
      });
    },
    // 删除
    remove() {
      if (!this.map.getSource("railway_source")) {
        return alert("请先添加");
      }
      this.map.removeLayer("railway_bg");
      this.map.removeLayer("railway");
      this.map.removeSource("railway_source");
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
