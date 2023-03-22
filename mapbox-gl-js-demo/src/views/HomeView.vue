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
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });
    // this.map.on("style.load", () => {
    //   this.rotate();
    // });

    // this.map.on("moveend", () => {
    //   this.rotate();
    // });
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
  },
  methods: {
    rotate() {
      let center = this.map.getCenter();
      this.map.easeTo({
        center: [center.lng + 40, center.lat],
        easing: (n) => n,
        duration: 6000,
        // zoom: 2,
        // speed: 0.5,
      });
      this.rotateFlag = requestAnimationFrame(this.rotate);
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
