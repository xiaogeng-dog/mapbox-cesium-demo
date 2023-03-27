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
import interestingPoint from "@/assets/mapData/china.geojson";
import drawMap from "@/assets/js/drawMapFigure";
import drawMiniMap from "@/assets/js/drawMiniMap";
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
    // drawMiniMap("overviewMap", this.map);

    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });

    this.map.on("load", () => {});

    // this.map.on("draw.create", updateArea);
    // this.map.on("draw.delete", updateArea);
    // this.map.on("draw.update", updateArea);
  },
  methods: {},
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
