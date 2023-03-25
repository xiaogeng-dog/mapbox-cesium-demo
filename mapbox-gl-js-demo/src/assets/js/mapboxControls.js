/**
 * 加载控件
 */
const mapboxgl = require("mapbox-gl");
import { mapboxToken } from "@/assets/js/mapToken";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
// TODO:语言包
const MapboxLanguage = require("@mapbox/mapbox-gl-language"); // 引入语言包
// TODO:搜索控件
const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder"); // 搜索控件
import "@/assets/css/mapbox-gl-geocoder.css";
// TODO:第三方控件
import { RulerControl, StylesControl } from "mapbox-gl-controls";

export default function addControls(map) {
  //TODO 添加搜索控件
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxToken,
      mapboxgl,
    })
  );
  //TODO 加载全屏控件
  map.addControl(new mapboxgl.FullscreenControl(), "top-right");
  //TODO 添加导航控件
  map.addControl(new mapboxgl.NavigationControl(), "top-right");
  //TODO 加载比例尺
  map.addControl(
    new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: "metric",
    }),
    "bottom-left"
  );
  //TODO 获取当前位置定位控件(trigger()触发定位)
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  //TODO 右下角个人属性控件
  map.addControl(
    new mapboxgl.AttributionControl({
      compact: false,
      customAttribution: "Map design by xiaogeng",
    })
  );

  //TODO 自定义的control (鹰眼)
  class OverviewMapControl {
    onAdd(map) {
      this._map = map;

      this._container = document.createElement("div");
      this._container.className = "overview-map";
      //   let w = map.getCanvas().width * 0.15;
      //   let h = map.getCanvas().height * 0.15;
      //   this._container.style.width = w + "px";
      //   this._container.style.height = h + "px";
      //   this._container.textContent = "Hello, world";
      customMiniMap(this._container, map);
      return this._container;
    }

    onRemove() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
  }
  //   map.addControl(new OverviewMapControl(), "bottom-right");
  // map.addControl(
  //   new MapboxDraw({
  //     displayControlsDefault: false,
  //     // Select which mapbox-gl-draw control buttons to add to the map.
  //     controls: {
  //       polygon: true,
  //       trash: true,
  //     },
  //     // Set mapbox-gl-draw to draw by default.
  //     // The user does not have to click the polygon control button first.
  //     defaultMode: "draw_polygon",
  //   })
  // );

  // TODO 中文设置 （天地图不支持）If using MapboxLanguage with a Mapbox style, the style must be based on vector tile version 8, e.g. "streets-v11"
  // map.addControl(
  //   new MapboxLanguage({
  //     defaultLanguage: "zh-Hans", // zh-Hant
  //   })
  // );

  //TODO 尺子控件
  map.addControl(
    new RulerControl({
      mainColor: "#FFF",
      secondaryColor: "black",
      // textAllowOverlap: true,
    }),
    "top-right"
  );
  map.on("ruler.on", () => console.log("ruler: on"));
  map.on("ruler.off", () => console.log("ruler: off"));
  // with miles:
  // map.addControl(
  //   new RulerControl({
  //     units: "miles",
  //     mainColor: "#FFF",
  //     labelFormat: (n) => `${n.toFixed(2)} ml`,
  //   }),
  //   "top-right"
  // );

  //
}
