/**
 * 加载控件
 */

import { mapboxToken } from "@/assets/js/mapToken";
import "@/assets/css/mapbox-gl-controls.less";

const MapboxLanguage = require("@mapbox/mapbox-gl-language"); // 引入语言包
const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder"); // 搜索控件
const mapboxgl = require("mapbox-gl");
import customMiniMap from "@/assets/js/customMiniMap";

export default function addControls(map) {
  // 添加搜索控件
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxToken,
      mapboxgl,
    })
  );
  // 加载全屏控件
  map.addControl(new mapboxgl.FullscreenControl(), "top-right");
  // 添加导航控件
  map.addControl(new mapboxgl.NavigationControl(), "top-right");
  // 加载比例尺
  map.addControl(
    new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: "metric",
    }),
    "bottom-left"
  );
  // 获取当前位置定位控件(trigger()触发定位)
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  // 右下角个人属性控件
  map.addControl(
    new mapboxgl.AttributionControl({
      compact: false,
      customAttribution: "Map design by xiaogeng",
    })
  );

  // 自定义的control (鹰眼)
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

  //  中文设置 （天地图不支持）If using MapboxLanguage with a Mapbox style, the style must be based on vector tile version 8, e.g. "streets-v11"
  // map.addControl(
  //   new MapboxLanguage({
  //     defaultLanguage: "zh-Hans", // zh-Hant
  //   })
  // );
}
