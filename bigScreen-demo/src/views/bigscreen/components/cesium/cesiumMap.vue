<template>
  <div id="cesiumContainer">
    <!-- <div class="state" id="stateShow">

      </div> -->
  </div>
</template>

<script>
export default {
  name: "cesium",
  data() {
    return {
      tempEntities: [],
      pointNum: 0,
      floatingPoint: null,
      activeShape: null,
      toolhandle: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZWVjOWRlMy1iOTRhLTQxNDktOGM3Ny0yMTRjZTFkMDg5MWUiLCJpZCI6Mjk1MjUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTIyOTY5Mjh9.nVxUnQ6d-g8pp2hB3gfL77auBxQLybpuSKRm-0u_CVE";
      var tdtImage = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=614bc38fc5a9c9efcc03193960f4b9c1",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        maximumLevel: 18,
        show: false,
      });
      // 加载数据
      var viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: tdtImage, // 地图底图服务
        terrainProvider: Cesium.createWorldTerrain(), // 添加地形高度
        projectionPicker: false,

        sceneModePicker: false, // 控制右上角第三个位置的选择视角模式，2d，3d
        baseLayerPicker: false, // 控制右上角第四个位置的图层选择器
        navigationHelpButton: false, // 控制右上角第五个位置的导航帮助按钮
        homeButton: false, // 控制右上角第二个位置的home图标
        geocoder: false, // 控制右上角第一个位置的查找工具
        animation: false, // 控制左下角的动画器件
        timeline: false, // 控制下方时间线
        infoBox: false, // If set to false, the InfoBox widget will not be created.
        fullscreenButton: false, // 右下角全屏按钮
        // vrButton:false//右下角vr按钮
      });
      // this.viewer = viewer
      // this.addTms()
      // viewer.scene.globe.depthTestAgainstTerrain = true // 默认为false
      this.hiddenCopy(viewer);
      this.addTiles(viewer);
      this.isload(viewer);
    },
    // 添加天地图底图图层
    addTms() {
      let viewer = this.viewer;
      // 天地图影像服务，必须添加自己的key
      var tdtImage = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=614bc38fc5a9c9efcc03193960f4b9c1",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        maximumLevel: 18,
        show: false,
      });
      var viewerLayers = viewer.imageryLayers;
      viewerLayers.addImageryProvider(tdtImage);
    },
    // 隐藏版权信息
    hiddenCopy(viewer) {
      // let viewer = this.viewer
      // 隐藏版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
    },
    // 添加倾斜摄影
    addTiles(viewer) {
      // 加载三维模型3dtiles数据
      // var tileset = new Cesium.Cesium3DTileset(
      //   {
      //     url: 'https://www.nxbeidou.com.cn:9843/ext/wzstysmk-proxy/suoyousanwei/tys/tys01/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g'
      //   })
      // var tileset2 = new Cesium.Cesium3DTileset({
      //   url: 'https://www.nxbeidou.com.cn:9843/ext/wzstysmk2-proxy/suoyousanwei/tys/tys02/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g'
      // })
      // var tileset3 = new Cesium.Cesium3DTileset({
      //   url: 'https://www.nxbeidou.com.cn:9843/ext/tysmk3-proxy/suoyousanwei/tys/tys03/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g'
      // })
      // var tileset4 = new Cesium.Cesium3DTileset({
      //   url: 'https://www.nxbeidou.com.cn:9843/ext/tysmk4-proxy/suoyousanwei/tys/tys04/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g'
      // })
      // var tileset5 = new Cesium.Cesium3DTileset({
      //   url: 'https://www.nxbeidou.com.cn:9843/ext/wzstys5-proxy/suoyousanwei/tys/tys05/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g'
      // })
      // var tileset6 = new Cesium.Cesium3DTileset({
      //   url: 'https://www.nxbeidou.com.cn:9843/ext/tys666-proxy/suoyousanwei//tys/tys06/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g'
      // })
      var tileset = new Cesium.Cesium3DTileset({
        url: "/ext/wzstysmk-proxy/suoyousanwei/tys/tys01/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset2 = new Cesium.Cesium3DTileset({
        url: "/ext/wzstysmk2-proxy/suoyousanwei/tys/tys02/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset3 = new Cesium.Cesium3DTileset({
        url: "/ext/tysmk3-proxy/suoyousanwei/tys/tys03/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset4 = new Cesium.Cesium3DTileset({
        url: "/ext/tysmk4-proxy/suoyousanwei/tys/tys04/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset5 = new Cesium.Cesium3DTileset({
        url: "/ext/wzstys5-proxy/suoyousanwei/tys/tys05/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
      var tileset6 = new Cesium.Cesium3DTileset({
        url: "/ext/tys666-proxy/suoyousanwei//tys/tys06/tileset.json?ua_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjgzOTU4NTIxODUsImV4cCI6NDA5NzE0NTYwMH0.yhEKlDMVnGCU4IFIt7sSDoMEBqrO96Q5lMEv2Kcopjyfp-jycTdbD38TwIwb5RUBtOe9Io3tWkXpNhGHUeOG_g",
      });
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
      // 开启深度检测
      viewer.scene.globe.depthTestAgainstTerrain = false;
      // 创建场景的HTML canvas元素
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      this.$emit("cesiumLoad", viewer, handler);
    },

    /* 空间两点距离计算函数 */
    getLength(start, end) {
      // 将起点与终点位置信息从笛卡尔坐标形式转换为Cartographic形式
      let startCartographic = Cesium.Cartographic.fromCartesian(start);
      let endCartographic = Cesium.Cartographic.fromCartesian(end);
      // 初始化测地线
      let geodesic = new Cesium.EllipsoidGeodesic();
      // 设置测地线起点和终点，EllipsoidGeodesic中setEndPoints常与surfaceDistance搭配使用
      geodesic.setEndPoints(startCartographic, endCartographic);
      // 获取起点和终点之间的表面距离，单位为km，规定四舍五入保留两位小数

      return (geodesic.surfaceDistance / 1000).toFixed(2);
    },
    /* 空间两点计算中点函数 */
    getMidpoint(start, end) {
      let startPoint = Cesium.Cartographic.fromCartesian(start);
      let endPoint = Cesium.Cartographic.fromCartesian(end);
      let geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(startPoint, endPoint);
      let geoPoint = geodesic.interpolateUsingFraction(0.5);
      // console.log(Cesium.Ellipsoid.WGS84.cartographicToCartesian(geoPoint))
      return Cesium.Ellipsoid.WGS84.cartographicToCartesian(geoPoint);
    },
    /* 在线段中点处添加标签，显示长度 */
    addLabel(midPoint, labelLength) {
      let viewer = this.viewer;
      return viewer.entities.add({
        name: "中点",
        position: midPoint,
        label: {
          text: labelLength + "km",
          font: "20px sans-serif",
          fillColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          backgroundColor: Cesium.Color.BLACK,
          showBackground: true,
          style: Cesium.LabelStyle.FILL,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
    },
    /* 清除实体 */
    clearAllDrawn() {
      let viewer = this.viewer;
      this.tempEntities = [];
      this.floatingPoint = null;
      this.activeShape = null;
      this.pointNum = 0;
      if (this.toolhandle) {
        this.toolhandle.destroy();
        this.toolhandle = null;
      }
      viewer.entities.removeAll();
    },
    /* 绘制函数 */
    drawPointLabel(position, pointNum) {
      let viewer = this.viewer;
      // 本质上就是添加一个点的实体
      return viewer.entities.add({
        name: "点几何对象",
        position: position,
        point: {
          color: Cesium.Color.WHEAT,
          pixelSize: 5,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY, //
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
        },
        label: {
          text: pointNum,
          font: "30px sans-serif",
          fillColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          backgroundColor: Cesium.Color.BLACK,
          showBackground: true,
          style: Cesium.LabelStyle.FILL,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        },
      });
    },
    drawPoint(position) {
      let viewer = this.viewer;
      // 本质上就是添加一个点的实体
      return viewer.entities.add({
        position: position,
        point: {
          color: Cesium.Color.WHEAT,
          pixelSize: 5,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
        },
      });
    },
    drawPolyline(positions) {
      let viewer = this.viewer;
      if (positions.length < 1) return;
      return viewer.entities.add({
        name: "线几何对象",
        polyline: {
          positions: positions,
          width: 5.0,
          material: new Cesium.PolylineGlowMaterialProperty({
            // eslint-disable-next-line new-cap
            color: Cesium.Color.WHEAT,
          }),
          depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
            // eslint-disable-next-line new-cap
            color: Cesium.Color.WHEAT,
          }),
          clampToGround: true,
        },
      });
    },
    drawPolygon(positions) {
      let viewer = this.viewer;
      if (positions.length < 2) return;
      return viewer.entities.add({
        name: "面几何对象",
        polygon: {
          hierarchy: positions,
          // eslint-disable-next-line new-cap
          material: new Cesium.ColorMaterialProperty(
            Cesium.Color.WHEAT.withAlpha(0.4)
          ),
        },
      });
    },
    /* 根据类型绘制对象
     * @param type point polyline polygon */
    draw(type) {
      let that = this;
      let viewer = this.viewer;
      let tempEntities = that.tempEntities;
      let floatingPoint = that.floatingPoint;
      let activeShape = that.activeShape;
      let position = [];
      let tempPoints = [];
      let activeShapePoints = [];
      // 开启深度检测
      viewer.scene.globe.depthTestAgainstTerrain = true;
      // 创建场景的HTML canvas元素
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      this.toolhandle = handler;
      switch (type) {
        // 绘制线
        case "Polyline":
          // 取消鼠标双击事件
          viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
          );
          // 监听鼠标移动
          handler.setInputAction(function (movement) {
            if (Cesium.defined(floatingPoint)) {
              let newPosition = viewer.scene.pickPosition(movement.endPosition);
              if (Cesium.defined(newPosition)) {
                floatingPoint.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);
              }
            }
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          // 左键单击开始画线
          handler.setInputAction(function (click) {
            let earthPosition = viewer.scene.pickPosition(click.position);
            if (Cesium.defined(earthPosition)) {
              floatingPoint = that.drawPoint(earthPosition);
            }
            // 获取位置信息
            // 从相机位置创建一条射线，这条射线通过世界中movement.position像素所在的坐标,返回Cartesian3坐标
            let ray = viewer.camera.getPickRay(click.position);
            // 找到射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3坐标
            position = viewer.scene.globe.pick(ray, viewer.scene);
            tempPoints.push(position); // 记录点位
            that.pointNum += 1;
            let tempLength = tempPoints.length; // 记录点数
            // 调用绘制点的接口
            let point = that.drawPointLabel(
              tempPoints[tempPoints.length - 1],
              JSON.stringify(that.pointNum)
            );
            tempEntities.push(point);
            // 存在超过一个点时
            if (tempLength > 1) {
              // 绘制线
              let pointLength = that.getLength(
                tempPoints[tempPoints.length - 2],
                tempPoints[tempPoints.length - 1]
              );
              let midPosition = that.getMidpoint(
                tempPoints[tempPoints.length - 2],
                tempPoints[tempPoints.length - 1]
              );
              let pointline = that.drawPolyline([
                tempPoints[tempPoints.length - 2],
                tempPoints[tempPoints.length - 1],
              ]);
              let pointLabel = that.addLabel(midPosition, pointLength);
              tempEntities.push(pointline); // 保存记录
              tempEntities.push(pointLabel);
            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
          // 右键单击结束画线
          handler.setInputAction(function (click) {
            activeShapePoints.pop();
            viewer.entities.remove(activeShapePoints);
            viewer.entities.remove(floatingPoint);
            tempPoints = []; // 清空点位记录
            handler.destroy();
            handler = null;
            floatingPoint = null;
            activeShape = null;
            activeShapePoints = [];
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
          break;
        // 绘制面
        case "Polygon":
          // 取消鼠标双击事件
          viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
          );
          // 监听鼠标移动
          handler.setInputAction(function (movement) {
            if (Cesium.defined(floatingPoint)) {
              let newPosition = viewer.scene.pickPosition(movement.endPosition);
              if (Cesium.defined(newPosition)) {
                floatingPoint.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);
              }
            }
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          // 左键单击开始画线
          handler.setInputAction(function (click) {
            let earthPosition = viewer.scene.pickPosition(click.position);
            if (Cesium.defined(earthPosition)) {
              if (activeShapePoints.length === 0) {
                floatingPoint = that.drawPoint(earthPosition);
                activeShapePoints.push(earthPosition);
                const dynamicPositions = new Cesium.CallbackProperty(
                  function () {
                    return new Cesium.PolygonHierarchy(activeShapePoints);
                  },
                  false
                );
                activeShape = that.drawPolygon(dynamicPositions);
              }
              activeShapePoints.push(earthPosition);
            }
            // 获取位置信息
            let ray = viewer.camera.getPickRay(click.position);
            position = viewer.scene.globe.pick(ray, viewer.scene);
            tempPoints.push(position); // 记录点位
            let tempLength = tempPoints.length; // 记录点数
            that.pointNum += 1;
            // 调用绘制点的接口
            let point = that.drawPointLabel(
              tempPoints[tempPoints.length - 1],
              JSON.stringify(that.pointNum)
            );
            tempEntities.push(point);
            // 存在超过一个点时
            if (tempLength > 1) {
              // 绘制线
              let pointline = that.drawPolyline([
                tempPoints[tempPoints.length - 2],
                tempPoints[tempPoints.length - 1],
              ]);
              tempEntities.push(pointline); // 保存记录
            }
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
          // 右键单击结束画面
          handler.setInputAction(function (click) {
            // 选择一个椭球或地图
            let cartesian = viewer.camera.pickEllipsoid(
              click.position,
              viewer.scene.globe.ellipsoid
            );
            if (cartesian) {
              let tempLength = tempPoints.length;
              if (tempLength < 3) {
                alert("闭合操作需要至少3个点嗷");
              } else {
                // 闭合最后一条线
                let pointline = that.drawPolyline([
                  tempPoints[0],
                  tempPoints[tempPoints.length - 1],
                ]);
                tempEntities.push(pointline);
                that.drawPolygon(tempPoints);
                let pointArea = that.getArea(tempPoints);
                that.addArea(JSON.stringify(pointArea), tempPoints);
                tempEntities.push(tempPoints);
                handler.destroy();
                handler = null;
              }
            }
            activeShapePoints.pop();
            viewer.entities.remove(activeShapePoints);
            viewer.entities.remove(floatingPoint);
            floatingPoint = null;
            activeShapePoints = [];
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
          break;
      }
    },
  },
};
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
