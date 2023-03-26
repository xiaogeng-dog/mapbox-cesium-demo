<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="addPoint()">添加</el-button>
      <el-button type="primary" size="mini" @click="updatePoint()"
        >更新数据</el-button
      >
      <el-button type="primary" size="mini" @click="hidePoint()"
        >隐藏</el-button
      >
      <el-button type="primary" size="mini" @click="showPoint()"
        >显示</el-button
      >
      <el-button type="primary" size="mini" @click="editPointSize()"
        >修改大小</el-button
      >
      <el-button type="primary" size="mini" @click="deletePoint()"
        >删除</el-button
      >
    </div>
  </div>
</template>

<script>
import drawMap from "@/assets/js/drawMapFigure";
export default {
  name: "HomeView",
  data() {
    return {};
  },
  mounted() {
    this.map = drawMap("container");
    this.map.on("mousemove", function (e) {
      document.getElementById("longitude").innerHTML = e.lngLat.lng.toFixed(5);
      document.getElementById("latitude").innerHTML = e.lngLat.lat.toFixed(5);
    });
    this.map.on("load", () => {});
  },
  methods: {
    // 添加点位图层
    addPoint() {
      if (this.map && this.map.getSource("icon")) {
        this.map.removeLayer("icon");
        this.map.removeSource("icon");
        this.map.removeImage("arrow");
      }
      this.map.loadImage(
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc3aaad0d1154dc5cc5675ca53b25a05d85375b1318ff-x1QjSf_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658476811&t=bda3018aa185f4181051598dc68179fe",
        (error, image) => {
          if (error) throw error;
          this.map.addImage("arrow", image);
        }
      );
      this.map.addSource("icon", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { size: 0.1, rotate: 0, color: "red" },
              geometry: { type: "Point", coordinates: [104, 35] },
            },
            {
              type: "Feature",
              properties: { size: 0.1, rotate: 270, color: "green" },
              geometry: { type: "Point", coordinates: [110, 35] },
            },
            {
              type: "Feature",
              properties: { size: 0.1, rotate: 180, color: "red" },
              geometry: { type: "Point", coordinates: [116, 35] },
            },
          ],
        },
      });
      this.map.addLayer({
        id: "icon",
        type: "symbol",
        source: "icon",
        layout: {
          "icon-image": "arrow",
          "icon-size": ["get", "size"],
          "icon-rotate": ["get", "rotate"],
          "icon-offset": [0, 0],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          visibility: "visible",
        },
      });
    },

    // 更新数据源
    updatePoint() {
      if (!this.map.getSource("icon")) {
        return alert("请先添加");
      }
      this.map.getSource("icon").setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { size: 0.1, rotate: 200, color: "red" },
            geometry: { type: "Point", coordinates: [124, 35] },
          },
          {
            type: "Feature",
            properties: { size: 0.1, rotate: 200, color: "yellow" },
            geometry: { type: "Point", coordinates: [128, 35] },
          },
          {
            type: "Feature",
            properties: { size: 0.1, rotate: 200, color: "red" },
            geometry: { type: "Point", coordinates: [132, 35] },
          },
        ],
      });
    },

    // 隐藏
    hidePoint() {
      if (!this.map.getSource("icon")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("icon", "visibility", "none");
    },

    // 显示
    showPoint() {
      if (!this.map.getSource("icon")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("icon", "visibility", "visible");
    },

    // 修改大小
    editPointSize() {
      if (!this.map.getSource("icon")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("icon", "icon-size", 0.05);
    },

    // 删除点位
    deletePoint() {
      if (!this.map.getSource("icon")) {
        return alert("请先添加");
      }
      this.map.removeLayer("icon");
      this.map.removeSource("icon");
      this.map.removeImage("arrow");
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
.btn-list {
  position: fixed;
  top: 100px;
  left: 100px;
}
</style>
