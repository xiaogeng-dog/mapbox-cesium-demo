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
      this.addRotateIcon();
    });
  },
  methods: {
    addRotateIcon() {
      this.map.addImage(
        "rotate-img",
        this.createRotateIconByStaticDiagram("/typhoon.png", this.map)
      );
      this.map.addSource("rotate", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [114, 35] },
            },
          ],
        },
      });
      this.map.addLayer({
        id: "rotate",
        type: "symbol",
        source: "rotate",
        layout: {
          "icon-image": "rotate-img",
          "icon-size": 1,
          "icon-offset": [0, 0],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
        },
      });
    },
    // 传入一个png图片 创建一个动态图标
    createRotateIconByStaticDiagram(url, map) {
      const size = 40;
      return {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        onAdd: function () {
          const canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },
        render: function () {
          const context = this.context;
          context.clearRect(0, 0, this.width, this.height);
          const img = new Image();
          img.src = url;
          context.drawImage(img, 0, 0);
          img.onload = function () {
            context.clearRect(0, 0, 40, 40);
            context.translate(20, 20);
            context.rotate(Math.PI / 45);
            context.translate(-20, -20);
            context.drawImage(img, 0, 0);
          };
          this.data = context.getImageData(0, 0, this.width, this.height).data;
          map.triggerRepaint();
          return true;
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
