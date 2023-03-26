<template>
  <div>
    <div class="home" id="container"></div>
    <div id="coordinate_div">
      <p>经度: <span id="longitude"></span></p>
      <p>纬度: <span id="latitude"></span></p>
    </div>
    <div class="btn-list">
      <el-button type="primary" size="mini" @click="add()">添加</el-button>
      <el-button type="primary" size="mini" @click="hide()">隐藏</el-button>
      <el-button type="primary" size="mini" @click="show()">显示</el-button>
      <el-button type="primary" size="mini" @click="editOpacity()"
        >修改透明度</el-button
      >
      <el-button type="primary" size="mini" @click="deleteLayer()"
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
    // 添加
    add() {
      if (this.map.getSource("image")) {
        this.map.removeLayer("image");
        this.map.removeSource("image");
      }
      this.map.addSource("image", {
        type: "image",
        url: "/iTab-v9w635.png", //需要将资源放置到public目录
        coordinates: [
          // 图片覆盖地图的四至点
          [73.47656249999999, 53.592504809039376], // 左上
          [135.1112921875038, 53.592504809039376], // 右上
          [135.1112921875038, 18.312810846425442], // 右下
          [73.47656249999999, 18.312810846425442], // 左下
        ],
      });
      this.map.addLayer({
        id: "image",
        type: "raster",
        source: "image",
        paint: {
          "raster-opacity": 1,
        },
      });
    },
    // 隐藏
    hide() {
      if (!this.map.getSource("image")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("image", "visibility", "none");
    },
    // 显示
    show() {
      if (!this.map.getSource("image")) {
        return alert("请先添加");
      }
      this.map.setLayoutProperty("image", "visibility", "visible");
    },
    // 修改透明度
    editOpacity() {
      if (!this.map.getSource("image")) {
        return alert("请先添加");
      }
      this.map.setPaintProperty("image", "raster-opacity", 0.5);
    },
    // 删除图层
    deleteLayer() {
      if (this.map.getSource("image")) {
        this.map.removeLayer("image");
        this.map.removeSource("image");
      }
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
