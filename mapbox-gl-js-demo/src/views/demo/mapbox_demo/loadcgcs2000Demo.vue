<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import "@cgcs2000/mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "@cgcs2000/mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoieGlhb2dlbmciLCJhIjoiY2xmY2hwazU2MGJpOTN5bGxjancyYWQ0MyJ9.kobS8uu_eYtfNiEvwL_Xbw";
export default {
  mounted() {
    this.initMapbox();
  },
  methods: {
    initMapbox() {
      //添加天地图
      var mapStyle = {
        version: 8,
        name: "Map",
        sources: {
          "world-vec": {
            type: "raster",
            tiles: [
              "http://t0.tianditu.gov.cn/vec_c/wmts?tk=a42a5cc72ceffa83582cc329ed0d156f",
            ],
            scheme: "xyz",
            maxzoom: 9,
            tileSize: 256,
          },
          layers: [
            {
              id: "world-vec",
              source: "world-vec",
              type: "raster",
              layout: {
                visibility: "visible",
              },
            },
          ],
          // glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
          transition: {
            duration: 300,
            delay: 0,
          },
        },
      };

      var map = new mapboxgl.Map({
        container: "map",
        zoom: 7,
        center: [118.8, 36.3],
        style: mapStyle,
      });

      /**CGCS2000投影坐标系（4490）**/
      map.on("load", function loaded() {
        //添加geoserver矢量切片
        // map.addSource("custom-go-vector-tile-source", {
        //   type: "vector",
        //   scheme: "tms",
        //   tiles: [
        //     "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/MyWork%3Acounty@EPSG%3A4490@pbf/{z}/{x}/{y}.pbf",
        //   ], //GeoServer发布的矢量切片地图
        //   zoomOffset: -1,
        // });
        //配置矢量切片图层样式
        // map.addLayer({
        //   id: "custom-go-vector-tile-layer",
        //   type: "circle", // 符号化样式 [fill,line,symbol,circle,heatmap]
        //   source: "custom-go-vector-tile-source",
        //   "source-layer": "county", //添加矢量图层名
        //   minzoom: 5,
        //   maxzoom: 13,
        //   paint: {
        //     "circle-radius": 1,
        //     "circle-color": "#000000",
        //     "circle-opacity": 0.8,
        //   },
        // });
      });
    },
  },
};
</script>

<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
