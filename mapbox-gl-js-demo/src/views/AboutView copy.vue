<template>
  <div class="map-box-index">
    <div
      id="indexMap"
      :style="{ height: height + 'px', width: width + 'px' }"
    ></div>
  </div>
</template>
<script>
import "mapbox-gl/dist/mapbox-gl.css";
// 引入语言包
import MapboxLanguage from "@mapbox/mapbox-gl-language";
// 搜索控件
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
const mapboxgl = require("mapbox-gl");
export default {
  name: "indexMap",
  props: {
    height: {
      type: Number,
      default: 310,
    },
    width: {
      type: Number,
      default: 310,
    },
  },
  data() {
    return {
      map: null,
      center: [116.18425567303788, 39.90661201076973],
      mapNewData: {},
    };
  },
  mounted() {
    this.initMap();
    // console.log("@indexmapData", this.mapData);
  },
  watch: {
    /* handler是数据rowValue 发生变化的时候触发的方法 */
    height: {
      immediate: true,
      deep: true,
      handler: function (newVal, oldVal) {
        // console.log("@newVal-null", newVal);
        if (newVal !== null) {
          // console.log("@对话框", newVal);
          this.$nextTick(() => {
            this.initMap();
          });
        }
      },
    },
  },
  methods: {
    initMap() {
      //  console.log('initMap执行了',this.isShowMap);
      mapboxgl.accessToken =
        "pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ";
      // eslint-disable-next-line no-unused-vars
      this.map = new mapboxgl.Map({
        container: "indexMap",
        // style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
        // style: "mapbox://styles/mapbox/satellite-streets-v11",
        // 天地图
        style: {
          version: 8,
          sources: {
            "tian-satellite": {
              type: "raster",
              tiles: [
                "http://t0.tianditu.gov.cn/vec_w/wmts?tk=1883a2da124fe27b3c281f9d65356e82&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles",
              ],
              tileSize: 256,
              minzoom: 0,
              maxzoom: 18,
            },
          },
          layers: [
            {
              id: "tian-satellite",
              type: "raster",
              source: "tian-satellite",
              layout: {
                visibility: "none",
              },
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },
        // center: [104.07, 30.67],
        center: [116.18425567303788, 39.90661201076973],
        zoom: 5,
        // center: [116.4178, 40.222279390523586],
        // zoom: 7.4, // 放大级别
        // pitch: 60,
        // attributionControl: true,
      });
      //  中文设置 （天地图不支持）
      // this.map.addControl(
      //    new MapboxLanguage({
      //     defaultLanguage: "zh-Hans", // zh-Hant
      //   })
      //  );

      // 写法二
      // var language = new MapboxLanguage({ defaultLanguage: 'zh-Hans' })
      // this.map.addControl(language)
      // 1.加载 全屏控件 ， 位置 是 'top-left'
      this.map.addControl(new mapboxgl.FullscreenControl(), "top-left");
      this.map.on("load", (e) => {
        this.map.setFog({}); // 设置天气
        // 加载地图的底图 （指定样式图层中布局属性的值。）
        /**
         * layer 要设置布局属性的图层的ID。 (string)
         *  name 要设置的布局属性的名称。 (string)
         * value 布局的值。必须是适合该属性的类型，如Mapbox样式规范中所定义 。 (any)
         *
         */
        this.map.setLayoutProperty("tian-satellite", "visibility", "visible");
        // 在底图之上绘制
        this.map.addSource("myCity", {
          type: "geojson",
          // data:`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`
          // data:`https://geo.datav.aliyun.com/areas_v3/bound/${city_code}_full.json`
          data: "https://geo.datav.aliyun.com/areas_v3/bound/110000_full.json",
        });
        // 加载控件
        // 2.添加导航控件
        this.map.addControl(new mapboxgl.NavigationControl(), "top-left");
        /* 3、添加搜索控件 */
        this.map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: "请输入搜索地址",
            mapboxgl: mapboxgl,
          })
        );
        /* 4、添加比例尺控件 */
        this.map.addControl(new mapboxgl.ScaleControl({}), "bottom-right");
        this.map.addLayer({
          id: "beijing",
          type: "fill",
          source: "myCity",
          layout: {},
          paint: {
            "fill-color": "#f08",
            "fill-opacity": 0.3,
          },
        });
        this.flyTo();
      });
    },
    flyTo() {
      this.map.flyTo({
        center: [116.4178, 40.222279390523586],
        zoom: 5, // 放大级别
        // speed: 0.2,
        // curve: 1,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.map-box-index {
  width: 100%;
  height: 100%;
  //   background-color: pink;
  #indexMap {
    width: 100%;
    height: 100%;
    /deep/ .mapboxgl-canvas {
      // width: 100%;
      // height: 100%;
    }
    /deep/ .mapboxgl-control-container {
      .mapboxgl-ctrl-bottom-left {
        .mapboxgl-ctrl {
          .mapboxgl-ctrl-logo {
            display: none;
          }
        }
      }
      .mapboxgl-ctrl-bottom-right {
        // .mapboxgl-ctrl mapboxgl-ctrl-attrib
        .mapboxgl-ctrl-attrib-inner {
          display: none;
        }
        .mapboxgl-compact {
          display: none;
        }
      }
    }
  }
}
</style>
