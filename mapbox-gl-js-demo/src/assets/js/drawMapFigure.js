import "@/assets/css/mapbox-gl.css";
import "@/assets/css/mapbox-gl-geocoder.css";
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
  // 搜索控件
  const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");
  // 引入语言包
  const MapboxLanguage = require("@mapbox/mapbox-gl-language");
  mapboxgl.accessToken = mapboxToken;

  let style = getStyle();
  const map = new mapboxgl.Map({
    container, // container ID
    style: style,
    // style: "mapbox://styles/mapbox/streets-v12", // style URL
    center,
    zoom: 3, // starting zoom
    // hash: true,//路由hash
    dragRotate: false,
    doubleClickZoom: false,
    // projection: "mercator",
  });
  /**
   * 加载控件
   */
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
  // 获取当前位置定位控件
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );
  //  中文设置 （天地图不支持）If using MapboxLanguage with a Mapbox style, the style must be based on vector tile version 8, e.g. "streets-v11"
  // map.addControl(
  //   new MapboxLanguage({
  //     defaultLanguage: "zh-Hans", // zh-Hant
  //   })
  // );
  //TODO设置边界
  //   const bounds = [
  //     [117.882223, 24.366902],
  //     [118.373857, 24.80727],
  //   ];
  //   map.setMaxBounds(bounds);

  // map.showTileBoundaries = true
  map.on("load", () => {
    //添加天地图底图
    addTDTLayers(map);

    // TODO加载地图的底图 （指定样式图层中布局属性的值。）
    /**
     * layer 要设置布局属性的图层的ID。 (string)
     *  name 要设置的布局属性的名称。 (string)
     * value 布局的值。必须是适合该属性的类型，如Mapbox样式规范中所定义 。 (any)
     *
     */
    // this.map.setLayoutProperty("", "visibility", "visible");
    // TODO加载地形
    // map.addSource("mapbox-dem", {
    //   type: "raster-dem",
    //   url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    //   tileSize: 512,
    //   maxzoom: 14,
    // });
    // // add the DEM source as a terrain layer with exaggerated height
    // map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

    // TODO在底图之上绘制
    // map.addSource("myCity", {
    //   type: "geojson",
    //   // data:`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`
    //   // data:`https://geo.datav.aliyun.com/areas_v3/bound/${city_code}_full.json`
    //   data: "https://geo.datav.aliyun.com/areas_v3/bound/110000_full.json",
    // });
    // map.addLayer({
    //   id: "beijing",
    //   type: "fill",
    //   source: "myCity",
    //   layout: {},
    //   paint: {
    //     "fill-color": "#f08",
    //     "fill-opacity": 0.3,
    //   },
    // });
    // map.addSource("mapbox-terrain-v2", {
    //   type: "vector",
    //   url: "mapbox:///mapbox.mapbox-terrain-v2",
    // });
    // map.addLayer({
    //   id: "terrain-data",
    //   type: "line",
    //   source: "mapbox-terrain-v2",
    //   "source-layer": "contour",
    //   layout: {
    //     "line-join": "round",
    //     "line-cap": "round",
    //   },
    //   paint: {
    //     "line-color": "#ff69b4",
    //     "line-width": 1,
    //   },
    // });
    // TODO添加jeojson
    map.addLayer({
      id: "unitGrid",
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
    // // axiosData(map);
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
    //   type: "circle",
    //   source: "test",
    //   paint: {
    //     "circle-color": "red",
    //     "circle-radius": 4,
    //   },
    //   "source-layer": "points",
    //   maxzoom: 14,
    //   id: "1",
    // });
    // map.addLayer({
    //   type: "line",
    //   source: "test",
    //   "source-layer": "line",
    //   maxzoom: 14,
    //   id: "2",
    //   layout: {
    //     "line-join": "miter",
    //     "line-miter-limit": 2,
    //     "line-round-limit": 1.05,
    //   },
    //   paint: { "line-color": "#5028D5" },
    // });
    // map.addLayer({
    //   type: "fill",
    //   source: "test",
    //   "source-layer": "polygon",
    //   maxzoom: 14,
    //   id: "3",
    //   paint: { "fill-color": "#60D330", "fill-outline-color": "#000000" },
    // });

    // rotate(map);
  });

  map.on("style.load", () => {
    flyTo(map);
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
// 地图漫游
function flyTo(map) {
  map.flyTo({
    center,
    zoom: 12, // 放大级别
    // speed: 0.2,
    // curve: 1,
  });
}
// TODO自动旋转 这里的旋转是指按照经纬度进行移动
function rotate(map) {
  console.log(map);
  let center = map.getCenter();
  map.easeTo({
    center,
    zoom: 2,
    speed: 0.5,
  });
  requestAnimationFrame(rotate);
}
// TODO相机转动 这里的相机转动是一种视角的转动，使用rotateTo函数实现
function rotateCamera(map, timestrip) {
  map.rotateTo((timestrip / 100) % 360, { duration: 0 });
  rotateFlag = requestAnimationFrame(rotateCamera);
}

export default initMap;
