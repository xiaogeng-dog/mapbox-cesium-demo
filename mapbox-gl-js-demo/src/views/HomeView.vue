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
    <div id="overviewMap" class="overviewMap"></div>
    <div class="select-box">
      <el-select v-model="value1" @change="changeGeoJson" placeholder="请选择">
        <el-option
          v-for="item in options"
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
import drawMiniMap from "@/assets/js/drawMiniMap";
export default {
  name: "HomeView",
  data() {
    return {
      rotateFlag: false,
      initFlag: true,
      startTime: null,
      value1: null,
      options: [
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
      ],
    };
  },
  mounted() {
    this.map = drawMap("container");
    drawMiniMap("overviewMap", this.map);
    // this.listenPage();
    // this.requestData("cluster_net").then((res) => {
    //   console.log(res);
    //   drawMap.drawClusterNet(this.map, res);
    // });
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });
    // this.map.on("style.load", () => {
    //   this.rotate();
    // });

    // this.map.on("moveend", () => {
    //   this.rotate();
    // });
    this.map.on("click", (e) => {
      console.log(this.initFlag, this.rotateFlag);
      if (!this.initFlag && this.rotateFlag) {
        if (this.rotateFlag) {
          cancelAnimationFrame(this.rotateFlag);
          this.rotateFlag = null;
        } else {
          this.startTime = Date.now();
          this.rotateCamera(Date.now());
        }
      }
    });
    this.popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      maxWidth: "500px",
    });
    this.map.on("move", (e) => {});
  },
  methods: {
    async changeGeoJson(value) {
      this.popup.remove();
      if (!this.map.getSource(value)) {
        const res = await this.$axios.get(
          `/mapData/JinHuCensus/Geocoding/areaData/${value}.geojson`
        );
        this.map.addSource(value, {
          type: "geojson",
          data: res.data,
        });
        this.map.addLayer({
          id: value,
          type: "fill",
          source: value,
          paint: {
            "fill-color": "#0080ff",
            "fill-outline-color": "red",
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              1,
              0.4,
            ],
          },
        });
        this.map.on("click", value, (e) => {
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
      this.options.forEach((ele) => {
        if (ele.value == value) {
          this.map.setLayoutProperty(value, "visibility", "visible");
        } else {
          if (this.map.getSource(ele.value)) {
            this.map.setLayoutProperty(ele.value, "visibility", "none");
          }
        }
      });
    },
    rotate() {
      let center = this.map.getCenter();
      this.map.easeTo({
        center: [center.lng + 40, center.lat],
        easing: (n) => n,
        duration: 6000,
        // zoom: 2,
        // speed: 0.5,
      });
      this.rotateFlag = requestAnimationFrame(this.rotate);
    },
  },
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 800px;
}

#overviewMap {
  width: 200px;
  height: 200px;
  position: absolute;
  right: 20px;
  bottom: 50px;
  border: 2px solid gray;
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
}
</style>
