<template>
  <div>
    <div class="home" id="container">
      <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div id="overviewMap" class="overviewMap"></div>
  </div>
</template>

<script>
// @ is an alias to /src

import drawMap from "@/assets/js/drawMapFigure";
import drawMiniMap from "@/assets/js/drawMiniMap";
export default {
  name: "HomeView",
  data() {
    return {
      rotateFlag: false,
      initFlag: true,
      startTime: null,
    };
  },
  mounted() {
    this.map = drawMap("container");
    drawMiniMap("overviewMap", this.map);
    // this.listenPage();
    // this.requestData("cluster_net").then((res) => {
    //   console.log(res);
    //   drawMap.drawClusterNet(this.map, res);
    // });
    this.map.on("load", () => {
      this.rotate();
    });

    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });
    this.map.on("click", (e) => {
      console.log(this.initFlag, this.rotateFlag);
      if (!this.initFlag && this.rotateFlag) {
        if (this.rotateFlag) {
          cancelAnimationFrame(this.rotateFlag);
          this.rotateFlag = null;
        } else {
          this.startTime = Date.now();
          this.rotateCamera(Date.now());
        }
      }
    });
    this.map.on("move", (e) => {});

    setTimeout(() => {
      cancelAnimationFrame(this.rotateFlag);
      this.map.flyTo({
        center: [118.9853, 33.00679],
        zoom: 14,
        speed: 0.4,
        pitch: 60,
      });
      this.map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      this.map.setTerrain({
        source: "mapbox-dem",
        exaggeration: 2,
      });
      setTimeout(() => {
        this.initFlag = false;
        this.startTime = Date.now();
        this.rotateCamera(Date.now());
      }, 14000);
    }, 20000);
  },
  methods: {
    // TODO自动旋转 这里的旋转是指按照经纬度进行移动
    rotate() {
      let center = this.map.getCenter();
      this.map.easeTo({
        center: [center.lng + 40, center.lat],
        zoom: 2,
        speed: 0.5,
      });
      this.rotateFlag = requestAnimationFrame(this.rotate);
    },
    // TODO相机转动 这里的相机转动是一种视角的转动，使用rotateTo函数实现
    rotateCamera(timestrip) {
      this.map.rotateTo((timestrip / 100) % 360, { duration: 0 });
      this.rotateFlag = requestAnimationFrame(this.rotateCamera);
    },
  },
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 800px;
}

#overviewMap {
  width: 200px;
  height: 200px;
  position: absolute;
  right: 20px;
  bottom: 50px;
  border: 2px solid gray;
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
