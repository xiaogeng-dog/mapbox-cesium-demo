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
/**
 * npm install @turf/turf
 * 下次研究下按需引入
 */
import circle from "@turf/circle";
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
      this.drawRectangle();
    });
  },
  methods: {
    // 绘制矩形
    drawRectangle() {
      const point = [108, 35];
      const lineGeoJson = {
        type: "FeatureCollection",
        features: [this.getRectLatLngHandler(point)],
      };
      this.map.addSource("circle", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { size: 5, color: "red" },
              geometry: { type: "Point", coordinates: [108, 35] },
            },
          ],
        },
      });
      this.map.addLayer({
        id: "circle",
        type: "circle",
        source: "circle",
        paint: {
          "circle-radius": ["get", "size"],
          "circle-color": ["get", "color"],
          "circle-opacity": 1,
          "circle-stroke-color": "red",
          "circle-stroke-opacity": 1,
        },
      });
      this.map.addSource("line", {
        type: "geojson",
        data: lineGeoJson,
      });
      this.map.addLayer({
        id: "line",
        type: "line",
        source: "line",
        paint: {
          "line-color": "red",
          "line-width": 1,
          "line-opacity": 1,
        },
      });
    },
    // 根据传入的经纬度点获取 长1500km 宽1000km的矩形geojson数据
    getRectLatLngHandler(latlng) {
      const rectWidth = 1500 / 2; // 矩形宽度公里数
      const rectHeight = 1000 / 2; // 矩形高度公里数
      const center = latlng;
      const maxRadius = rectWidth;
      const minRadius = rectHeight;
      const options = {
        steps: 4,
        units: "kilometers",
      };
      // eslint-disable-next-line no-undef
      const maxCircle = circle(center, maxRadius, options);
      // eslint-disable-next-line no-undef
      const minCircle = circle(center, minRadius, options);
      const leftLon = maxCircle.geometry.coordinates[0][1][0];
      const rightLon = maxCircle.geometry.coordinates[0][3][0];
      const topLat = minCircle.geometry.coordinates[0][0][1];
      const bottomLat = minCircle.geometry.coordinates[0][2][1];
      return {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [leftLon, topLat],
              [rightLon, topLat],
              [rightLon, bottomLat],
              [leftLon, bottomLat],
              [leftLon, topLat],
            ],
          ],
        },
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
.btn-list {
  position: fixed;
  top: 100px;
  left: 100px;
}
</style>
