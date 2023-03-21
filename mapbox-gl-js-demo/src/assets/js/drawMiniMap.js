import { mapboxToken, TDT_Underlay, TDT_Note } from "@/assets/js/mapToken";
import { center } from "@/assets/js/mapBasis";

function initMiniMap(container, map) {
  const mapboxgl = require("mapbox-gl");
  mapboxgl.accessToken = mapboxToken;

  let style = getStyle();
  const ovmap = new mapboxgl.Map({
    container,
    // style: "mapbox://styles/mapbox/streets-v12", // style URL
    style: style,
    center,
    zoom: 2,
  });
  var map_x; //地图的x坐标
  var map_y; //地图的y坐标
  var overview_x; //鹰眼的x坐标
  var overview_y; //鹰眼的y坐标
  var map_zoom; //地图的比例尺
  var overview_zoom; //鹰眼的比例尺
  ovmap.on("load", function () {
    //添加天地图底图
    addTDTLayers(ovmap);
  });
  // 拖拽
  function mapdrag() {
    map_x = map.getCenter().lng;
    map_y = map.getCenter().lat;
    ovmap.setCenter([map_x, map_y]);
  }
  function overviewdrag() {
    overview_x = ovmap.getCenter().lng;
    overview_y = ovmap.getCenter().lat;
    map.setCenter([overview_x, overview_y]);
  }
  //   放大缩小
  function mapzoom() {
    map_zoom = map.getZoom();
    ovmap.setZoom(map_zoom - 4);
  }
  function overviewzoom() {
    overview_zoom = ovmap.getZoom();
    map.setZoom(overview_zoom + 4);
  }

  map.on("drag", mapdrag);
  map.on("zoom", mapzoom);
  let overview = document.getElementById("overviewMap");
  overview.addEventListener("mouseover", function () {
    //移除地图的拖拽监听
    map.off("drag", mapdrag);
    map.off("zoom", mapzoom);
    //添加鹰眼的拖拽监听
    ovmap.on("drag", overviewdrag);
    ovmap.on("zoom", overviewzoom);
  });
  overview.addEventListener("mouseout", function () {
    //添加地图的拖拽监听
    map.on("drag", mapdrag);
    map.on("zoom", mapzoom);
    //移除鹰眼的拖拽监听
    ovmap.off("drag", overviewdrag);
    ovmap.off("zoom", overviewzoom);
  });
}

function getStyle() {
  let style = {
    version: 8,
    name: "Basic-my",
    metadata: {
      "mapbox:autocomposite": true,
      "mapbox:type": "template",
    },
    center,
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
  console.log(1111111111);
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
}

export default initMiniMap;
