<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
import drawMap from "@/assets/js/drawMapFigure";
import animationRoute from "./animationRoute";
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
      const route1 = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [106.669, 22.5785],
            [106.6374, 22.5974],
            [106.6206, 22.608],
            [106.6037, 22.5553],
            [106.5784, 22.4858],
            [106.5595, 22.4373],
            [106.5637, 22.3804],
            [106.5827, 22.3298],
            [106.6543, 22.313],
            [106.6859, 22.2561],
            [106.7006, 22.195],
            [106.688, 22.1613],
            [106.6943, 22.0897],
            [106.6964, 22.018],
            [106.6838, 21.9717],
            [106.7386, 21.9864],
            [106.7554, 22.0138],
            [106.8334, 21.9759],
            [106.9008, 21.9738],
            [106.9261, 21.9422],
            [106.9767, 21.9316],
            [107.0209, 21.9485],
            [107.0609, 21.919],
            [107.0125, 21.8705],
            [107.0104, 21.8305],
            [107.0609, 21.8031],
            [107.1031, 21.7862],
            [107.1473, 21.7483],
            [107.2063, 21.7125],
            [107.2611, 21.6935],
            [107.2927, 21.7251],
          ],
        },
      };
      new animationRoute(this.map, route1);
    });
  },
  methods: {},
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
</style>
