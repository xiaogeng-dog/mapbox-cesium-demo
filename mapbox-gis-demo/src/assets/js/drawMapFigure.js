// let center = [116.39, 39.91];
const token =
  "pk.eyJ1IjoieGlhb2dlbmciLCJhIjoiY2xmY2hwazU2MGJpOTN5bGxjancyYWQ0MyJ9.kobS8uu_eYtfNiEvwL_Xbw";

import "@/assets/css/mapbox-gl.css";
function initMap(container) {
  const mapboxgl = require("mapbox-gl");
  mapboxgl.accessToken = token;

  let style = getStyle();
  const map = new mapboxgl.Map({
    container: container, // container ID
    style: style,
    // style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [118.9993, 33.00389],
    zoom: 12, // starting zoom
    hash: true,
    dragRotate: false,
    doubleClickZoom: false,
  });
  const navigation_control = new mapboxgl.NavigationControl();
  map.addControl(navigation_control, "top-left");

  const scale = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: "metric",
  });
  map.addControl(scale, "bottom-left");
  //设置边界
  //   const bounds = [
  //     [117.882223, 24.366902],
  //     [118.373857, 24.80727],
  //   ];
  //   map.setMaxBounds(bounds);

  // map.showTileBoundaries = true
  map.on("load", function () {
    //添加天地图底图
    addTDTLayers(map);
    // map.addLayer({
    //   type: 'circle',
    //   source: 'test',
    //   paint: {
    //     'circle-color': 'red',
    //     'circle-radius': 4,
    //   },
    //   'source-layer': 'points',
    //   maxzoom: 14,
    //   id: '1',
    // })
    // map.addLayer({
    //   type: 'line',
    //   source: 'test',
    //   'source-layer': 'line',
    //   maxzoom: 14,
    //   id: '2',
    //   layout: {
    //     'line-join': 'miter',
    //     'line-miter-limit': 2,
    //     'line-round-limit': 1.05,
    //   },
    //   paint: { 'line-color': '#5028D5' },
    // })
    // map.addLayer({
    //   type: 'fill',
    //   source: 'test',
    //   'source-layer': 'polygon',
    //   maxzoom: 14,
    //   id: '3',
    //   paint: { 'fill-color': '#60D330', 'fill-outline-color': '#000000' },
    // })
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
    // center: center,
    zoom: 3,
    bearing: 0,
    pitch: 0,
    sources: {
      // "test": {
      //     "type": "vector",
      //     "tiles": ["http://localhost:9080/pg_postgis_mvt/api/v1/jcb_cd/{z}/{x}/{y}"]
      // }
    },
    layers: [],
    created: "2023-03-17T18:36:38.832Z",
    id: "cj7pjk1qrc3k92so5dn7vp6yc",
    modified: "2023-03-17T18:36:38.832Z",
    owner: "小耿先森",
    visibility: "private",
    draft: false,
  };
  return style;
}

//添加3857坐标系天地图
function addTDTLayers(map) {
  //添加3857天地图矢量source
  var source_vec = {
    type: "raster",
    tiles: [
      "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=7b06bd204544a8631beccd5fd56ad8c1",
    ],

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
    maxzoom: 22,
  };
  if (!map.getLayer("tdtvec")) {
    map.addLayer(Layer_vec);
  }
  //添加3857天地图矢量注记source
  var source_cva = {
    type: "raster",
    tiles: [
      "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=7b06bd204544a8631beccd5fd56ad8c1",
    ],

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
    maxzoom: 22,
  };
  if (!map.getLayer("tdtcva")) {
    map.addLayer(Layer_cva);
  }
}

export default initMap;
