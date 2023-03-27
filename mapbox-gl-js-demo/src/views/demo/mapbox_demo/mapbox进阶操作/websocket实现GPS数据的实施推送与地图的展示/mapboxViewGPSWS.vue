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
import webSocket from "./websocket";
export default {
  name: "HomeView",
  data() {
    return {
      ws: null,
    };
  },
  mounted() {
    this.map = drawMap("container");
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });

    this.map.on("load", () => {
      webSocket();
      this.map.addSource("points", {
        type: "geojson",
        data: this.getGeojson([]),
      });
      this.map.addLayer({
        id: "circle",
        type: "circle",
        source: "points",
        paint: {
          "circle-color": "red",
          "circle-radius": 4,
          "circle-stroke-color": "white",
          "circle-stroke-width": 2,
        },
      });
      this.ws = new WebSocket("ws://localhost:3000");
      this.ws.onopen = function () {
        console.log("当前客户端已经连接到websocket服务器");
      };
      this.ws.onmessage = function (evt) {
        const data = JSON.parse(evt.data);
        let features = data.map((d) => {
          return {
            type: "Feature",
            properties: d,
            geometry: {
              type: "Point",
              coordinates: d.coords,
            },
          };
        });
        this.map.getSource("points").setData(this.getGeojson(features));
      };
      this.ws.onclose = function () {
        alert("连接已关闭...");
      };
    });
  },
  methods: {
    getGeojson(features) {
      return {
        type: "FeatureCollection",
        features: features,
      };
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
</style>
