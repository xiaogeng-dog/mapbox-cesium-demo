import "@/assets/css/mapbox-gl.css";
import { mapboxToken, TDT_Underlay, TDT_Note } from "@/assets/js/mapToken";
import { center } from "@/assets/js/mapBasis";
import unitGrid from "@/assets/mapData/单元网格.geojson";
import interestingPoint from "@/assets/mapData/兴趣点.geojson";
import axios from "axios";

function axiosData(map) {
  axios.get("/地形图（点）.geojson").then((res) => {
    console.log(res.data);
    map.addSource("maps", {
      type: "geojson",
      data: res.data,
    });

    map.addLayer({
      id: "markers11",
      type: "raster",
      source: "maps",
      // paint: {
      //   "circle-radius": 2,
      //   "circle-color": "#f3f",
      // },
    });
  });
}

function initMap(container) {
  const mapboxgl = require("mapbox-gl");
  mapboxgl.accessToken = mapboxToken;

  let style = getStyle();
  const map = new mapboxgl.Map({
    container, // container ID
    style: style,
    // style: "mapbox://styles/mapbox/streets-v12", // style URL
    center,
    zoom: 3, // starting zoom
    // hash: true,
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
    // 添加jeojson
    map.addLayer({
      id: "china_map",
      type: "fill",
      source: "unitGrid",
      paint: {
        "fill-color": "#0080ff",
        "fill-outline-color": "#4f4f4f",
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.4,
        ],
      },
    });
    // axiosData(map);
    map.addLayer({
      id: "markers",
      type: "circle",
      source: "interestingPoint",
      paint: {
        "circle-radius": 2,
        "circle-color": "#f3f",
      },
    });
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
    flyTo(map);
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
    tiles: [TDT_Underlay],
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
    tiles: [TDT_Note],
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

  map.addSource("unitGrid", {
    type: "geojson",
    data: unitGrid,
  });
  map.addSource("interestingPoint", {
    type: "geojson",
    data: interestingPoint,
  });
}

function flyTo(map) {
  map.flyTo({
    center,
    zoom: 12, // 放大级别
    // speed: 0.2,
    // curve: 1,
  });
}

export default initMap;
