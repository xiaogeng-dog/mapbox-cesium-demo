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
      this.addMarkerRipplePoint();
    });
  },
  methods: {
    // 绘制marker类型的波纹点位
    addMarkerRipplePoint() {
      const dom = document.createElement("div");
      dom.className = "ripple-marker";
      const el1 = document.createElement("p");
      el1.className = "animate";
      const el2 = document.createElement("p");
      el2.className = "center";
      el2.style.width = el1.style.width = "20px";
      el2.style.height = el1.style.height = "20px";
      el2.style.backgroundColor = "unset";
      el1.style.backgroundColor = "red";
      el1.style.opacity = "0.4";
      // el1.style.boxShadow = '0 0 2px #000'
      el2.style.position = "absolute";
      el2.style.left = "0";
      el2.style.opacity = "0.8";
      dom.appendChild(el1);
      dom.appendChild(el2);
      const tipsOption = {
        element: dom,
        anchor: "left",
        offset: [10, 20],
      };
      // eslint-disable-next-line no-undef
      new mapboxgl.Marker(tipsOption).setLngLat([130, 20]).addTo(this.map);
    },
  },
};
</script>
<style lang="less">
.ripple-marker {
  background-position: center center;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.ripple-marker .animate {
  border-radius: 50%;
  animation: myfirst 1.5s infinite;
}
.ripple-marker .center {
  border-radius: 100%;
}
.ripple-marker span {
  display: inline-block;
}
@keyframes myfirst {
  10% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.2);
  }
  30% {
    transform: scale(1.4);
  }
  40% {
    transform: scale(1.6);
  }
  50% {
    transform: scale(1.8);
  }
  55% {
    transform: scale(2);
  }
  60% {
    transform: scale(1.8);
  }
  70% {
    transform: scale(1.6);
  }
  80% {
    transform: scale(1.4);
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

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
