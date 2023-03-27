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
import { GD_WebService_key } from "@/assets/js/mapToken";
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      points: [],
      key: "",
      isDraw: false,
    };
  },
  mounted() {
    this.map = drawMap("container");
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });

    this.map.on("load", () => {
      var geojson = {
        type: "FeatureCollection",
        features: [],
      };
      this.map.addSource("path", {
        type: "geojson",
        data: geojson,
      });
      this.map.addSource("points", {
        type: "geojson",
        data: geojson,
      });

      this.map.addLayer({
        id: "path",
        type: "line",
        source: "path",
        paint: {
          "line-color": "#4ddc26",
          "line-width": 5,
        },
      });
      this.map.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        paint: {
          "circle-color": [
            "match",
            ["get", "type"],
            "起",
            "#62b500",
            "#f54336", // 无匹配值
          ],
          "circle-radius": 13,
        },
      });
      this.map.addLayer({
        id: "label",
        type: "symbol",
        source: "points",
        layout: {
          "text-field": ["get", "type"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });
      this.startDraw();
    });
    this.map.on("click", (e) => {
      var lngLat = e.lngLat;
      if (this.isDraw) {
        this.points.push([lngLat.lng, lngLat.lat]);
        this.drawPoints();
        if (this.points.length === 2) {
          this.getRoute();
        }
      }
    });
  },
  methods: {
    startDraw() {
      this.isDraw = true;
      this.points = [];
      this.map.getCanvas().style.cursor = "crosshair";
      var geojson = {
        type: "FeatureCollection",
        features: [],
      };
      this.map.getSource("path").setData(geojson);
      this.map.getSource("points").setData(geojson);
    },
    getRoute() {
      this.isDraw = false;
      this.map.getCanvas().style.cursor = "";
      const url = "https://restapi.amap.com/v3/direction/walking";
      var start = this.points[0].map((res) => {
        return res.toFixed(5);
      });
      var end = this.points[1].map((res) => {
        return res.toFixed(5);
      });
      console.log(start, end);
      var params = {
        key: GD_WebService_key,
        origin: start.join(","),
        destination: end.join(","),
      };
      axios.get(url, { params }).then((res) => {
        this.paths = res.data.route.paths;
        var geojson = {
          type: "FeatureCollection",
          features: [],
        };
        for (var i = 0; i < this.paths.length; i++) {
          var steps = this.paths[i].steps;
          console.log(steps);
          for (var j = 0; j < steps.length; j++) {
            var step = steps[j];
            var polyline = step.polyline;
            polyline = polyline.split(";");
            polyline = polyline.map((p) => {
              return p.split(",").map(Number);
            });
            var feat = {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: polyline,
              },
            };
            geojson.features.push(feat);
          }
        }
        this.map.getSource("path").setData(geojson);
      });
    },
    drawPoints() {
      var geojson = {
        type: "FeatureCollection",
        features: [],
      };
      for (var i = 0; i < this.points.length; i++) {
        var type = i === 0 ? "起" : "终";
        var p = this.points[i];
        geojson.features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: p,
          },
          properties: {
            type: type,
          },
        });
      }
      this.map.getSource("points").setData(geojson);
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
