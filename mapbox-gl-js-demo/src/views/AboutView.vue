<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {};
  },
  methods: {
    init() {
      var token = "a42a5cc72ceffa83582cc329ed0d156f";
      // 服务域名
      var tdtUrl = "https://t{s}.tianditu.gov.cn/";
      // 服务负载子域
      var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

      const Cesium = this.cesium;
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjM2M1YWM2My1kOGQyLTRlZDMtODg1OS00YTg4YjdlYzIxYzkiLCJpZCI6MTI5MzU0LCJpYXQiOjE2NzkyMzM0Mjh9.0Qbw5zRJd0TC8sd5QvY40t2mtEeSroN0M4Jqfc3_7mE";

      var tdtImage = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=614bc38fc5a9c9efcc03193960f4b9c1",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        maximumLevel: 18,
        show: false,
      });
      const viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: tdtImage, // 地图底图服务
        shouldAnimate: true, //是否允许动画
        selectionIndicator: false,
        navigationInstructionsInitiallyVisible: false,
        showRenderLoopErrors: false,
        shadows: false,
        projectionPicker: false,
        terrainProvider: Cesium.createWorldTerrain(), // 添加地形高度
        sceneModePicker: false, // 控制右上角第三个位置的选择视角模式，2d，3d
        baseLayerPicker: false, // 控制右上角第四个位置的图层选择器
        navigationHelpButton: false, // 控制右上角第五个位置的导航帮助按钮
        animation: false, // 控制左下角的动画器件
        timeline: false, // 控制下方时间线
        fullscreenButton: false, // 右下角全屏按钮
        geocoder: false, // 控制右上角第一个位置的查找工具
        homeButton: false, // 控制右上角第二个位置的home图标
        infoBox: false, // If set to false, the InfoBox widget will not be created.
        // vrButton:false//右下角vr按钮
      });
      // 抗锯齿
      viewer.scene.fxaa = true;
      viewer.scene.postProcessStages.fxaa.enabled = false;
      // 水雾特效
      viewer.scene.globe.showGroundAtmosphere = true;
      // 设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧
      viewer.scene.screenSpaceCameraController.constrainedPitch =
        Cesium.Math.toRadians(-20);
      viewer.scene.screenSpaceCameraController.autoResetHeadingPitch = false;
      viewer.scene.screenSpaceCameraController.inertiaZoom = 0.5;
      viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50;
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000;
      viewer.scene.screenSpaceCameraController.zoomEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG,
        Cesium.CameraEventType.WHEEL,
        Cesium.CameraEventType.PINCH,
      ];
      viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.MIDDLE_DRAG,
        Cesium.CameraEventType.PINCH,
        {
          eventType: Cesium.CameraEventType.LEFT_DRAG,
          modifier: Cesium.KeyboardEventModifier.CTRL,
        },
        {
          eventType: Cesium.CameraEventType.RIGHT_DRAG,
          modifier: Cesium.KeyboardEventModifier.CTRL,
        },
      ];
      // 取消默认的双击事件
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      // 叠加影像服务
      var imgMap = new Cesium.UrlTemplateImageryProvider({
        url: tdtUrl + "DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + token,
        subdomains: subdomains,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 18,
      });
      viewer.imageryLayers.addImageryProvider(imgMap);

      // 叠加国界服务
      var iboMap = new Cesium.UrlTemplateImageryProvider({
        url: tdtUrl + "DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=" + token,
        subdomains: subdomains,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 10,
      });
      viewer.imageryLayers.addImageryProvider(iboMap);
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
        orientation: {
          heading: Cesium.Math.toRadians(348.4202942851978),
          pitch: Cesium.Math.toRadians(-89.74026687972041),
          roll: Cesium.Math.toRadians(0),
        },
        complete: function callback() {
          // 定位完成之后的回调函数
        },
      });
      this.addTiles(viewer);
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
    },
    addTiles(viewer) {
      const Cesium = this.cesium;
      // 加载三维模型3dtiles数据
      var tileset = new Cesium.Cesium3DTileset({
        url: "https://www.nxbeidou.com.cn:9843/ext/wzstysmk-proxy/suoyousanwei/tys/tys01/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset2 = new Cesium.Cesium3DTileset({
        url: "https://www.nxbeidou.com.cn:9843/ext/wzstysmk2-proxy/suoyousanwei/tys/tys02/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset3 = new Cesium.Cesium3DTileset({
        url: "https://www.nxbeidou.com.cn:9843/ext/tysmk3-proxy/suoyousanwei/tys/tys03/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset4 = new Cesium.Cesium3DTileset({
        url: "https://www.nxbeidou.com.cn:9843/ext/tysmk4-proxy/suoyousanwei/tys/tys04/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset5 = new Cesium.Cesium3DTileset({
        url: "https://www.nxbeidou.com.cn:9843/ext/wzstys5-proxy/suoyousanwei/tys/tys05/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset6 = new Cesium.Cesium3DTileset({
        url: "https://www.nxbeidou.com.cn:9843/ext/tys666-proxy/suoyousanwei//tys/tys06/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      // var tileset = new Cesium.Cesium3DTileset({
      //   url: "/ext/wzstysmk-proxy/suoyousanwei/tys/tys01/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      // });
      // var tileset2 = new Cesium.Cesium3DTileset({
      //   url: "/ext/wzstysmk2-proxy/suoyousanwei/tys/tys02/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      // });
      // var tileset3 = new Cesium.Cesium3DTileset({
      //   url: "/ext/tysmk3-proxy/suoyousanwei/tys/tys03/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      // });
      // var tileset4 = new Cesium.Cesium3DTileset({
      //   url: "/ext/tysmk4-proxy/suoyousanwei/tys/tys04/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      // });
      // var tileset5 = new Cesium.Cesium3DTileset({
      //   url: "/ext/wzstys5-proxy/suoyousanwei/tys/tys05/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      // });
      // var tileset6 = new Cesium.Cesium3DTileset({
      //   url: "/ext/tys666-proxy/suoyousanwei//tys/tys06/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      // });
      // 添加倾斜模型
      viewer.scene.primitives.add(tileset);
      viewer.scene.primitives.add(tileset2);
      viewer.scene.primitives.add(tileset3);
      viewer.scene.primitives.add(tileset4);
      viewer.scene.primitives.add(tileset5);
      viewer.scene.primitives.add(tileset6);
      viewer.imageryLayers.get(0).show = true;
      viewer.zoomTo(tileset4);
    },
    isload(viewer) {
      const Cesium = this.cesium;
      // 开启深度检测
      viewer.scene.globe.depthTestAgainstTerrain = false;
      // 创建场景的HTML canvas元素
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      this.$emit("cesiumLoad", viewer, handler);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang="less">
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.box {
  height: 100%;
}
</style>
