<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button class="open-btn" type="primary" size="mini"
        >开始测面</el-button
      >
      <el-button class="close-btn" type="primary" size="mini"
        >结束测面</el-button
      >
    </div>
  </div>
</template>

<script>
import drawMap from "@/assets/js/drawMapFigure";
import { measureArea, closeMeasureArea } from "./measure-area.js";
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
      this.btnBindingEventHandler();
    });
  },
  methods: {
    // 地图创建后按钮绑定事件
    btnBindingEventHandler() {
      const openBtn = document.querySelector(".open-btn");
      const closeBtn = document.querySelector(".close-btn");
      openBtn.addEventListener("click", () => {
        measureArea(this.map);
      });
      closeBtn.addEventListener("click", () => {
        closeMeasureArea(this.map);
      });
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
