<template>
  <div>
    <div class="home" id="container">
      <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
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

  mounted() {
    this.map = drawMap("container");
    drawMiniMap("overviewMap", this.map);
    // this.listenPage();
    // this.requestData("cluster_net").then((res) => {
    //   console.log(res);
    //   drawMap.drawClusterNet(this.map, res);
    // });
  },
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 1000px;
}

#overviewMap {
  width: 160px;
  height: 160px;
  position: absolute;
  right: 20px;
  bottom: 250px;
  border: 2px solid gray;
}
.mapboxgl-ctrl-attrib {
  display: none;
}
</style>
