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
      this.add();
    });

    // 鼠标移入点位图层显示手型
    this.map.on("mouseenter", "circle", () => {
      this.map.getCanvas().style.cursor = "pointer";
    });
    // 鼠标移出点位图层还原
    this.map.on("mouseleave", "circle", () => {
      this.map.getCanvas().style.cursor = "";
    });
    // 绑定点位图层的点击事件 获取当前点击的要素
    this.map.on("click", "circle", this.clickEventCallback);
  },
  methods: {
    // 点击事件绑定的回调函数
    clickEventCallback(e) {
      const features = this.map.queryRenderedFeatures(e.point);
      if (features.length > 0) {
        console.log(features);
      }
      // 点击一次之后对点击事件进行解绑
      this.map.off("click", "circle", this.clickEventCallback);
    },

    add() {
      this.map.addSource("circle", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { id: "1", size: 10, color: "green" },
              geometry: { type: "Point", coordinates: [104, 35] },
            },
            {
              type: "Feature",
              properties: { id: "2", size: 10, color: "green" },
              geometry: { type: "Point", coordinates: [110, 35] },
            },
            {
              type: "Feature",
              properties: { id: "3", size: 10, color: "green" },
              geometry: { type: "Point", coordinates: [116, 35] },
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
          "circle-stroke-color": ["get", "color"],
          "circle-stroke-opacity": 1,
        },
      });
      this.map.addLayer({
        id: "circle-highlight",
        type: "circle",
        source: "circle",
        paint: {
          "circle-radius": ["get", "size"],
          "circle-color": "red",
          "circle-opacity": 1,
          "circle-stroke-color": "red",
          "circle-stroke-opacity": 1,
        },
        filter: ["in", "id", "-10000"],
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
