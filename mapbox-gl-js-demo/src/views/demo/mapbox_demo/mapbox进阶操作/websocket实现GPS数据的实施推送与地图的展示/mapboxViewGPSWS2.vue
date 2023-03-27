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
import * as turf from "@turf/turf";
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
      const icon =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD+SURBVFhH7ZahDsIwFEUbFB5PMJgJHEFg8GDxfAAeyT4EQ8CA5DNQkPA/4zQ8yMsCC13bIehNTpYtffe2b1s3k5SUVFZhTA5DOY2ulhy1enBmEhdYQvtxuSER2IeixB4mMiS+CDuocM0NVtCRoXFEwEACqzjCVErCC/OdCqvCdmUNXSkNIwxHEuCC7cpcLPyF2UaZu/DsSiZW9YTBUAx98OsKxVdl5oPtSi62L73biMoK+XAxBwcxeiaz96H+LaDwpIxc8H8IKa6z+nCvIUbfrj78RoTZWMyriLcVY/xp9Xa1cT9GmGcSpmnuc0zQVkJ/9kOygMZ+yZKS/l3G3AESgItFg3XtsAAAAABJRU5ErkJggg==";
      const arrow =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAnElEQVQ4T63TsQ0CMQyF4f/NgMQQ0CBR0FIx190cFIiWhhFoKdgEiRUeSoF0gO8cjkub+Evs2OLPpc9422dgBRwlNZn/BtjeApdOUJsh0QuuwKYWiYAFcAKWHaSR1EbpfAHlkO0ICdMJgV+QXmAAmUu6v9IZA8wkPVKgtg7TF7H25t4UbN+A9ahGmqqVD8AO2GdzUF45+I3ZJJb9JxbwRhEhB66xAAAAAElFTkSuQmCC";
      this.map.loadImage(icon, (error1, image1) => {
        if (error1) throw error1;
        this.map.addImage("red-arrow", image1);
        this.map.loadImage(arrow, (error, image) => {
          if (error) throw error;
          this.map.addImage("white-arrow", image);

          // 精度
          this.map.addSource("accuracy", {
            type: "geojson",
            data: this.getGeojson([]),
          });
          this.map.addLayer({
            id: "accuracy",
            type: "fill",
            source: "accuracy",
            paint: {
              "fill-color": "red",
              "fill-opacity": 0.1,
            },
          });

          // 轨迹
          this.map.addSource("route", {
            type: "geojson",
            data: this.getGeojson([]),
          });
          this.map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#09801a",
              "line-width": 8,
            },
          });
          this.map.addLayer({
            id: "route-arrow",
            source: "route",
            type: "symbol",
            layout: {
              "symbol-placement": "line",
              "symbol-spacing": 50,
              "icon-image": "white-arrow",
              "icon-size": 0.5,
              "icon-allow-overlap": true,
            },
          });

          // GPS 位置
          this.map.addSource("points", {
            type: "geojson",
            data: this.getGeojson([]),
          });
          this.map.addLayer({
            id: "circle",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "red-arrow",
              "icon-size": 0.8,
              "icon-rotate": ["get", "rotate"],
              "icon-allow-overlap": true,
            },
          });

          this.ws = new WebSocket("ws://localhost:3000");
          this.ws.onopen = function () {
            console.log("当前客户端已经连接到websocket服务器");
          };

          let routeCoords = {};

          this.ws.onmessage = function (evt) {
            const data = JSON.parse(evt.data);
            let accuracyFeatures = [];
            let routeFeatures = [];
            let features = data.map((d) => {
              const pt = {
                type: "Feature",
                properties: d,
                geometry: {
                  type: "Point",
                  coordinates: d.coords,
                },
              };
              if (!routeCoords[d.code]) routeCoords[d.code] = [];
              routeCoords[d.code].push(d.coords);
              if (routeCoords[d.code].length > 1)
                routeFeatures.push(turf.lineString(routeCoords[d.code]));
              const circle = turf.buffer(pt, d.accuracy / 1000);
              accuracyFeatures.push(circle);
              return pt;
            });
            this.map
              .getSource("accuracy")
              .setData(this.getGeojson(accuracyFeatures));
            this.map.getSource("route").setData(this.getGeojson(routeFeatures));
            this.map.getSource("points").setData(this.getGeojson(features));
          };

          this.ws.onclose = function () {
            alert("连接已关闭...");
          };
        });
      });
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
