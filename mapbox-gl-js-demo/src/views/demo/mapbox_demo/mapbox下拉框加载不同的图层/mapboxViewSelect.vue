<template>
  <div>
    <div class="home" id="container">
      <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="select-box">
      网格：
      <el-select
        v-model="gridValue"
        @change="(e) => changeGeoJson(e, 'grid')"
        placeholder="请选择"
      >
        <el-option
          v-for="item in gridOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="select-box2">
      点位数据：
      <el-select
        v-model="pointValue"
        @change="(e) => changeGeoJson(e, 'point')"
        placeholder="请选择"
      >
        <el-option
          v-for="item in pointOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const mapboxgl = require("mapbox-gl");
import drawMap from "@/assets/js/drawMapFigure";
export default {
  name: "HomeView",
  data() {
    return {
      rotateFlag: false,
      initFlag: true,
      startTime: null,
      gridValue: null,
      pointValue: null,
      gridOptions: [
        {
          value: "streetGrid",
          label: "街道网格",
        },
        {
          value: "communityGrid",
          label: "社区网格",
        },
        {
          value: "county",
          label: "县区",
        },
        {
          value: "unitGrid",
          label: "单元网格",
        },
        {
          value: "partArea",
          label: "地片与片区",
        },
        {
          value: "cityEnvironment",
          label: "市容环境卫生责任网格",
        },
      ],
      pointOptions: [
        {
          value: "interestPoint",
          label: "兴趣点",
        },
      ],
    };
  },
  mounted() {
    this.map = drawMap("container");
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });
    this.popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
      closeOnMove: true,
      focusAfterOpen: true,
      maxWidth: "500px",
    });
  },
  methods: {
    async changeGeoJson(value, value2) {
      this.popup.remove();
      if (!this.map.getSource(value)) {
        const res = await this.$axios.get(
          `/mapData/JinHuCensus/Geocoding/${
            value2 == "grid" ? "areaData" : "point"
          }/${value}.geojson`
        );
        this.map.addSource(value, {
          type: "geojson",
          data: res.data,
        });
        if (value2 == "grid") {
          this.map.addLayer({
            id: value,
            type: "fill",
            source: value,
            paint: {
              "fill-color": "#0080ff",
              "fill-outline-color": "white",
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.4,
              ],
            },
          });
        } else {
          this.map.addLayer({
            id: value,
            type: "circle",
            source: value,
            paint: {
              "circle-blur": 0, // 模糊度
              "circle-color": "#4264fb",
              "circle-pitch-alignment": "viewport", // 倾斜时的视角，默认viewport,枚举类型，map则为固定在地图上
              "circle-pitch-scale": "map", // 控制圆的缩放行为默认map,枚举类型，viewport则为不能缩放
              "circle-radius": 6,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            },
          });
        }

        this.map.on(value2 == "grid" ? "click" : "mouseenter", value, (e) => {
          // Change the cursor style as a UI indicator.
          this.map.getCanvas().style.cursor = "pointer";
          // Copy coordinates array.
          // const coordinates = e.features[0].geometry.coordinates.slice();
          const coordinates = [e.lngLat.lng, e.lngLat.lat];
          const description = e.features[0].properties;
          let descriptionArr = [];
          for (let item in description) {
            if (description[item]) {
              descriptionArr.push(`<div>${item} : ${description[item]}</div>`);
            }
          }
          // console.log(descriptionArr);
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          this.popup
            .setLngLat(coordinates)
            .setHTML(descriptionArr.join(""))
            .addTo(this.map);
        });
        this.map.on("mouseenter", value, () => {
          this.map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        this.map.on("mouseleave", value, () => {
          this.map.getCanvas().style.cursor = "";
        });
      }
      value2 == "grid" &&
        this.gridOptions.forEach((ele) => {
          if (ele.value == value) {
            this.map.setLayoutProperty(value, "visibility", "visible");
          } else {
            if (this.map.getSource(ele.value)) {
              this.map.setLayoutProperty(ele.value, "visibility", "none");
            }
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 800px;
}

.mapboxgl-ctrl-attrib {
  display: none;
}

#coordinate_div {
  position: absolute;
  bottom: 80px;
  left: 20px;
  color: white;
  z-index: 100;
}

#coordinate_div > p {
  margin: 2px;
}

.select-box {
  position: absolute;
  top: 100px;
  left: 20px;
  z-index: 100;
  color: white;
}

.select-box2 {
  position: absolute;
  top: 100px;
  left: 300px;
  z-index: 100;
  color: white;
}
</style>
