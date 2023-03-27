<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
import drawMap from "@/assets/js/drawMapFigure";
import { mapboxToken, UNDERLAY, NOTE } from "@/assets/js/mapToken";
export default {
  name: "HomeView",
  data() {
    return {};
  },
  mounted() {
    mapboxgl.accessToken = mapboxToken;
    let style = this.getStyle();
    this.map = new mapboxgl.Map({
      container: "container", // container ID
      style: style,
      // style: "mapbox://styles/mapbox/streets-v12", // style URL
      // center,
      zoom: 2, // starting zoom
      minZoom: 0,
      maxZoom: 18,
      // hash: true,//路由hash
      // dragRotate: false,
      doubleClickZoom: false,
      projection: "globe",
    });
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });

    this.map.on("load", () => {
      this.addMapLayers(this.map);
    });
    this.map.on("style.load", () => {
      // flyTo(map);
      this.map.setFog({}); // 设置天气
    });
  },
  methods: {
    getStyle() {
      let style = {
        version: 8,
        name: "Basic-my",
        metadata: {
          "mapbox:autocomposite": true,
          "mapbox:type": "template",
        },
        sprite: this.getSprites(),
        // glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        // center: center,
        zoom: 3,
        bearing: 0,
        pitch: 0,
        sources: {},
        layers: [],
        created: "2023-03-17T18:36:38.832Z",
        id: "cj7pjk1qrc3k92so5dn7vp6yc",
        modified: "2023-03-17T18:36:38.832Z",
        owner: "小耿先森",
        // visibility: "private",
        draft: false,
      };
      return style;
    },
    getSprites() {
      const size = 35;
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const icons = ["abc", "cbc", "cmbc", "icbc", "cbc1"];
      let json = {};
      let promises = [];
      let w = 0;
      let h = 0;
      icons.forEach((icon, index) => {
        const img = new Image();
        img.src = `icons/${icon}.png`;
        const y = index * size;
        promises.push(
          new Promise((resolve) => {
            img.onload = () => {
              w = img.width > w ? img.width : w;
              h += img.height;
              resolve(img);
            };
          })
        );
      });
      Promise.all(promises).then((imgs) => {
        canvas.width = w;
        canvas.height = h;
        let y = 0;
        imgs.forEach((img, index) => {
          json[icons[index]] = {
            x: 0,
            y: y,
            width: img.width,
            height: img.height,
            pixelRatio: 1,
          };
          ctx.drawImage(img, 0, y);
          y += img.height;
        });
        console.log(JSON.stringify(json));
        return JSON.stringify(json);
      });
    },
    addMapLayers(map) {
      //添加3857天地图矢量source
      var source_vec = {
        type: "raster",
        tiles: UNDERLAY,
        tileSize: 256,
      };
      if (!map.getSource("TDT_VEC")) {
        map.addSource("TDT_VEC", source_vec);
      }

      //添加3857天地图矢量图层
      var Layer_vec = {
        id: "tdtvec",
        type: "raster",
        source: "TDT_VEC",
        minzoom: 0,
        maxzoom: 18,
      };
      if (!map.getLayer("tdtvec")) {
        map.addLayer(Layer_vec);
      }
      //添加3857天地图矢量注记source
      var source_cva = {
        type: "raster",
        tiles: NOTE,
        tileSize: 256,
      };
      if (!map.getSource("TDT_CVA")) {
        map.addSource("TDT_CVA", source_cva);
      }
      // 添加3857天地图矢量注记图层
      var Layer_cva = {
        id: "tdtcva",
        type: "raster",
        source: "TDT_CVA",
        minzoom: 0,
        maxzoom: 18,
      };
      if (!map.getLayer("tdtcva")) {
        map.addLayer(Layer_cva);
      }
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
