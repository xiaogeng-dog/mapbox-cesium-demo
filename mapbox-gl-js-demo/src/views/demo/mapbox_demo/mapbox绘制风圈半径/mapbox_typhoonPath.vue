<template>
  <div id="map"></div>
</template>

<script>
/**
 * TODO 引用的proj4js做了投影的转换
 * npm install proj4
 *
 */

const mapboxgl = require("mapbox-gl");
import axios from "axios";
import drawMap from "@/assets/js/drawMapFigure";
import proj4 from "proj4";
export default {
  name: "mapbox_typhoonPath",
  data() {
    return {
      typhoonData: {
        201929: {},
      },
      typhoonPlay: "201929",
    };
  },
  mounted() {
    this.map = drawMap("map");
    this.map.on("load", async () => {
      const { data: TyphoonData } = await axios.get("/typhoon/201929.json");
      // 绘制风圈
      this.typhoonData = {
        201929: {
          data: {
            ...TyphoonData,
          },
          playIndex: 0,
          playFlag: null,
        },
      };
      this.addTyphoonCircle(TyphoonData);
      // 添加台风编号和名称到地图
      this.addTyphoonLabel(TyphoonData);
      // // 绘制路径
      this.addTyphoonPath(TyphoonData);
      // 添加点
      this.addTyphoonPoints(TyphoonData);
      this.play();
    });
  },
  methods: {
    //添加风圈 说明：添加的顺序分别为风圈、路径和实况点，目的是为了让三者按照顺序叠加展示。
    addTyphoonCircle(data) {
      let points = data.points;
      let geojson = {
        type: "FeatureCollection",
        features: [],
      };
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        let center = [p.lng, p.lat];
        // 7级风圈
        if (p.radius7 > 0) {
          let coords = this.getCircleCoords(center, p.radius7_quad);
          geojson.features.push({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: coords,
            },
            properties: {
              index: i,
              radius: "7",
            },
          });
        }
        // 10级风圈
        if (p.radius10 > 0) {
          let coords = this.getCircleCoords(center, p.radius10_quad);
          geojson.features.push({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: coords,
            },
            properties: {
              index: i,
              radius: "10",
            },
          });
        }
        // 12级风圈
        if (p.radius12 > 0) {
          let coords = this.getCircleCoords(center, p.radius12_quad);
          geojson.features.push({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: coords,
            },
            properties: {
              index: i,
              radius: "12",
            },
          });
        }
      }
      console.log(geojson);
      this.map.addSource("circle-source-" + data.tfbh, {
        type: "geojson",
        data: geojson,
      });
      this.map.addLayer({
        id: "circle-layer-" + data.tfbh,
        type: "fill",
        source: "circle-source-" + data.tfbh,
        paint: {
          "fill-color": [
            "match",
            ["get", "radius"],
            "7",
            "#00bab2",
            "10",
            "#ffff00",
            "#da7341",
          ],
          "fill-opacity": 0.2,
          "fill-outline-color": [
            "match",
            ["get", "radius"],
            "7",
            "#00bab2",
            "10",
            "#ffff00",
            "#da7341",
          ],
        },
      });
    },
    // 里面用到了一个生成风圈的方法，方法如下:
    // 说明：由于没有找到坐标转换的方法，所以就引用的proj4js做了投影的转换。
    getCircleCoords(center, radiusData) {
      center = proj4(proj4("EPSG:4326"), proj4("EPSG:3857"), center);
      let _coords = [];
      let _angInterval = 6;
      let _pointNums = 360 / (_angInterval * 4);
      let quadrant = {
        // 逆时针算角度
        0: "ne",
        1: "nw",
        2: "sw",
        3: "se",
      };
      for (let i = 0; i < 4; i++) {
        let _r = parseFloat(radiusData[quadrant[i]]) * 1000; // 单位是km
        if (!_r) _r = 0;
        for (let j = i * _pointNums; j <= (i + 1) * _pointNums; j++) {
          let _ang = _angInterval * j;
          let x = center[0] + _r * Math.cos((_ang * Math.PI) / 180);
          let y = center[1] + _r * Math.sin((_ang * Math.PI) / 180);
          let coord = proj4(proj4("EPSG:3857"), proj4("EPSG:4326"), [x, y]);
          _coords.push(coord);
        }
      }

      return [_coords];
    },
    // 添加台风编号和名称到地图
    addTyphoonLabel(data) {
      const ele = document.createElement("div");
      ele.setAttribute("class", "typhoon-label");
      ele.innerHTML = data.tfbh + data.name;
      var r = data.points[0];
      const option = {
        element: ele,
        anchor: "left",
        offset: [10, 0],
      };
      var marker = new mapboxgl.Marker(option)
        .setLngLat([r.lng, r.lat])
        .addTo(this.map);
      // this.typhoonData[data.tfbh]["label"] = marker;
    },
    // 添加路径
    // 路径的添加包括实况和预报路径的添加，由于line-dasharray自身的BUG，在实现的时候就添加了两层，实现代码如下：
    addTyphoonPath(data) {
      var points = data.points;
      var geojsonLive = {
        type: "FeatureCollection",
        features: [],
      };
      var geojsonForc = {
        type: "FeatureCollection",
        features: [],
      };
      var pts = [[points[0].lng, points[0].lat]];
      for (var i = 1; i < points.length; i++) {
        var p = points[i];
        pts.push([p.lng, p.lat]);
        geojsonLive.features.push({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: pts.concat([]),
          },
          properties: {
            index: i,
            type: "live",
          },
        });
        // 预报路径
        var _p = points[i - 1];

        var _pts = [[_p.lng, _p.lat]];
        // 判断有没有预报路径
        if (!(_p.forecast && _p.forecast.length)) continue;
        var _points = _p.forecast[0]["points"];
        for (var j = 0; j < _points.length; j++) {
          var _fp = _points[j];
          _pts.push([_fp.lng, _fp.lat]);
        }
        geojsonForc.features.push({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: _pts,
          },
          properties: {
            index: i - 1,
            type: "forc",
          },
        });
      }
      // 实况线
      this.map.addSource("path-source-live-" + data.tfbh, {
        type: "geojson",
        data: geojsonLive,
      });
      this.map.addLayer({
        id: "path-layer-live-" + data.tfbh,
        type: "line",
        source: "path-source-live-" + data.tfbh,
        paint: {
          "line-color": "#ffffff",
          "line-width": 3,
        },
      });

      // 预报线
      this.map.addSource("path-source-forc-" + data.tfbh, {
        type: "geojson",
        data: geojsonForc,
      });
      this.map.addLayer({
        id: "path-layer-forc-" + data.tfbh,
        type: "line",
        source: "path-source-forc-" + data.tfbh,
        paint: {
          "line-color": "#ec5d72",
          "line-width": 1,
          "line-dasharray": [5, 3],
        },
      });
    },
    // 添加点
    // 点包括：实况点和预报点。由于涉及到后面播放的控制，此处将两者分别添加了。
    addTyphoonPoints(data) {
      var points = data.points;
      var geojsonLive = {
        type: "FeatureCollection",
        features: [],
      };
      var geojsonForc = {
        type: "FeatureCollection",
        features: [],
      };
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.index = i;
        geojsonLive.features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [p.lng, p.lat],
          },
          properties: p,
        });
        // 预报点
        // 判断有没有预报路径
        if (!(p.forecast && p.forecast.length)) continue;
        var forcPoints = p.forecast[0]["points"];
        for (var j = 0; j < forcPoints.length; j++) {
          var _p = forcPoints[j];
          _p.index = i;
          geojsonForc.features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [_p.lng, _p.lat],
            },
            properties: _p,
          });
        }
      }

      var paint = {
        "circle-color": [
          "step",
          ["get", "speed"],
          "rgba(153, 255, 153, .9)",
          17.2,
          "rgba(102, 204, 255, .9)",
          24.5,
          "rgba(255, 255, 102, .9)",
          32.7,
          "rgba(253, 139, 0, .9)",
          41.5,
          "rgba(255, 51, 0, .9)",
          50.1,
          "rgba(255, 0, 255, .9)",
        ],
        "circle-radius": 6,
        "circle-stroke-width": 0,
      };
      // 实况点
      this.map.addSource("points-source-live-" + data.tfbh, {
        type: "geojson",
        data: geojsonLive,
      });
      this.map.addLayer({
        id: "points-layer-live-" + data.tfbh,
        type: "circle",
        source: "points-source-live-" + data.tfbh,
        paint: paint,
      });

      // 预报点
      this.map.addSource("points-source-forc-" + data.tfbh, {
        type: "geojson",
        data: geojsonForc,
      });
      this.map.addLayer({
        id: "points-layer-forc-" + data.tfbh,
        type: "circle",
        source: "points-source-forc-" + data.tfbh,
        paint: paint,
      });
    },
    //6、播放与播放控制
    playTyphoon() {
      var tfbh = this.typhoonPlay;
      var index = this.typhoonData[tfbh]["playIndex"];
      // 台风风圈
      this.map.setPaintProperty("circle-layer-" + tfbh, "fill-opacity", [
        "match",
        ["get", "index"],
        index,
        0.2,
        0,
      ]);
      // 实况线
      this.map.setPaintProperty("path-layer-live-" + tfbh, "line-opacity", [
        "match",
        ["get", "index"],
        index,
        0.65,
        0,
      ]);
      // 预报线
      this.map.setPaintProperty("path-layer-forc-" + tfbh, "line-opacity", [
        "match",
        ["get", "index"],
        index,
        1,
        0,
      ]);
      // 实况点
      this.map.setPaintProperty("points-layer-live-" + tfbh, "circle-opacity", [
        "step",
        ["get", "index"],
        1,
        index + 0.1,
        0,
      ]);
      // 预报点
      this.map.setPaintProperty("points-layer-forc-" + tfbh, "circle-opacity", [
        "match",
        ["get", "index"],
        index,
        1,
        0,
      ]);
    },
    play() {
      var tfbh = this.typhoonPlay;
      this.typhoonData[tfbh]["playFlag"] = setInterval(() => {
        this.typhoonData[tfbh]["playIndex"]++;
        var len = this.typhoonData[tfbh]["data"]["points"].length;
        if (this.typhoonData[tfbh]["playIndex"] === len) {
          this.stop();
        } else {
          this.playTyphoon();
        }
      }, 100);
    },
    stop() {
      var tfbh = this.typhoonPlay;
      window.clearInterval(this.typhoonData[tfbh]["playFlag"]);
    },
  },
};
</script>

<style lang="less">
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
/* 对应的样式为： */
.typhoon-label {
  background-color: rgba(255, 255, 255, 0.65);
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: black;
}
.typhoon-label:after {
  top: 6px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.typhoon-label:after {
  border-right-color: rgba(255, 255, 255, 0.65);
  border-width: 5px;
  left: -10px;
}
</style>
