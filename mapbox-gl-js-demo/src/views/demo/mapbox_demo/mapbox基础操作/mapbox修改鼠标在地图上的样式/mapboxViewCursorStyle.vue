<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="editCursor('default')"
        >default</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('pointer')"
        >pointer</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('auto')"
        >auto</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('crosshair')"
        >crosshair</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('move')"
        >move</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('text')"
        >text</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('help')"
        >help</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('wait')"
        >wait</el-button
      >
      <el-button type="primary" size="mini" @click="editCursor('')"
        >手</el-button
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
    editCursor(cursor) {
      this.map.getCanvas().style.cursor = cursor;
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
