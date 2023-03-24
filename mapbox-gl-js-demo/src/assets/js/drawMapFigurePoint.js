import "@/assets/css/mapbox-gl.css";
import "@/assets/css/mapbox-gl-geocoder.css";
import { mapboxToken, TDT_Underlay, TDT_Note } from "@/assets/js/mapToken";
import { center } from "@/assets/js/mapBasis";
// import unitGrid from "@/assets/mapData/金湖部件普查数据 - geoJSON/第三部分：地理编码/地片与区片数据/地片与区片.geojson";
import interestingPoint from "@/assets/mapData/金湖部件普查数据 - geoJSON/第三部分：地理编码/兴趣点数据/兴趣点.geojson";
// 导入控件
import mapboxControls from "@/assets/js/mapboxControls";

const mapboxgl = require("mapbox-gl");
mapboxgl.accessToken = mapboxToken;
/**
 * 初始化地图
 * @param {*} container  容器
 * @returns map对象
 */
function initMap(container) {
  let style = getStyle();
  const map = new mapboxgl.Map({
    container, // container ID
    // style: style,
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center,
    zoom: 2, // starting zoom
    minZoom: 0,
    maxZoom: 18,
    // hash: true,//路由hash
    // dragRotate: false,
    doubleClickZoom: false,
    projection: "globe",
  });

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
    // 加载控件
    mapboxControls(map);
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
    // map.addLayer({
    //   id: "unitGrid",
    //   type: "fill",
    //   source: "unitGrid",
    //   paint: {
    //     "fill-color": "#0080ff",
    //     "fill-outline-color": "#4f4f4f",
    //     "fill-opacity": [
    //       "case",
    //       ["boolean", ["feature-state", "hover"], false],
    //       1,
    //       0.4,
    //     ],
    //   },
    // });
    //添加聚合的圆圈效果，图层过滤
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "interestingPoint",
      filter: ["has", "point_count"],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "interestingPoint",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count"],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "interestingPoint",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });
    // inspect a cluster on click
    map.on("click", "clusters", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      map
        .getSource("interestingPoint")
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on("click", "unclustered-point", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const mag = e.features[0].properties.mag;
      const tsunami = e.features[0].properties.tsunami === 1 ? "yes" : "no";

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`)
        .addTo(map);
    });

    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "";
    });

    // TODO添加popup
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "500px",
    });
    // TODO  点聚合

    // TODO popup
    // const popup = new mapboxgl.Popup({ closeOnClick: false })
    //   .setLngLat([-96, 37.8])
    //   .setHTML("<h1>Hello World!</h1>")
    //   .addTo(map);

    // map.on("mouseenter", "unitGrid", (e) => {
    //   // Change the cursor style as a UI indicator.
    //   map.getCanvas().style.cursor = "pointer";
    //   // Copy coordinates array.
    //   // const coordinates = e.features[0].geometry.coordinates.slice();
    //   const coordinates = [e.lngLat.lng, e.lngLat.lat];
    //   const description = e.features[0].properties;
    //   let descriptionArr = [];
    //   for (let item in description) {
    //     if (description[item]) {
    //       descriptionArr.push(`<div>${item} : ${description[item]}</div>`);
    //     }
    //   }
    //   // console.log(descriptionArr);
    //   // Ensure that if the map is zoomed out such that multiple
    //   // copies of the feature are visible, the popup appears
    //   // over the copy being pointed to.
    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //   }

    //   // Populate the popup and set its coordinates
    //   // based on the feature found.
    //   popup.setLngLat(coordinates).setHTML(descriptionArr.join("")).addTo(map);
    // });

    // map.on("mouseleave", "unitGrid", () => {
    //   map.getCanvas().style.cursor = "";
    //   popup.remove();
    // });

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
    // name: "Basic-my",
    // metadata: {
    //   "mapbox:autocomposite": true,
    //   "mapbox:type": "template",
    // },
    // // center: center,
    // zoom: 3,
    // bearing: 0,
    // pitch: 0,
    sources: {
      // "test": {
      //     "type": "vector",
      //     "tiles": ["http://localhost:9080/pg_postgis_mvt/api/v1/jcb_cd/{z}/{x}/{y}"]
      // }
    },
    layers: [],
    // created: "2023-03-17T18:36:38.832Z",
    // id: "cj7pjk1qrc3k92so5dn7vp6yc",
    // modified: "2023-03-17T18:36:38.832Z",
    // owner: "小耿先森",
    // // visibility: "private",
    // draft: false,
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
    maxzoom: 18,
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
    maxzoom: 18,
  };
  if (!map.getLayer("tdtcva")) {
    map.addLayer(Layer_cva);
  }

  // map.addSource("unitGrid", {
  //   type: "geojson",
  //   data: unitGrid,
  // });
  map.addSource("interestingPoint", {
    type: "geojson",
    data: interestingPoint,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
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
