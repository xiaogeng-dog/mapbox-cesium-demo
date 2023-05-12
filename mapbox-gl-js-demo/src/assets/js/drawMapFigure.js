const mapboxgl = require("mapbox-gl");
import "@/assets/css/mapbox-gl.css";
mapboxgl.accessToken = mapboxToken;

// 导入控件
import mapboxControls from "@/assets/js/mapboxControls";
import { mapboxToken, UNDERLAY, NOTE } from "@/assets/js/mapToken";
import { center } from "@/assets/js/mapBasis";

/**
 * 初始化地图
 * @param {*} container  容器
 * @returns map对象
 */
export function initMap(container) {
  let style = getStyle();
  const map = new mapboxgl.Map({
    container, // container ID
    style: style,
    // style: "amap://styles/8c82102538dbf44b27ea935b620fe284", // style URL
    center,
    zoom: 2, // starting zoom
    minZoom: 0,
    maxZoom: 18,
    // hash: true,//路由hash
    // dragRotate: false,
    doubleClickZoom: false,
    projection: "globe",
  });
  map.on("load", () => {
    //添加底图
    addMapLayers(map);
    // 加载控件
    mapboxControls(map);
  });

  map.on("style.load", () => {
    // flyTo(map);
    map.setFog({}); // 设置天气
  });

  return map;
}

function getStyle() {
  let style = {
    version: 8,
    name: "Basic-my",
    metadata: {
      "mapbox:autocomposite": true,
      "mapbox:type": "template",
    },
    sprite: "mapbox://sprites/mapbox/streets-v8",
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
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
}

//添加底图
function addMapLayers(map) {
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
}
// 地图漫游
function flyTo(map) {
  map.flyTo({
    center,
    zoom: 12, // 放大级别
    // speed: 0.2,
    // curve: 1,
  });
}
export default initMap;
