import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/mapboxView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cesiumView.vue"),
  },
  {
    path: "/pdfPreview",
    name: "pdfPreview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/js/预览pdf文件/pdfPreview.vue"
      ),
  },
  {
    path: "/encodeGeojson",
    name: "encodeGeojson",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapApi_demo/压缩解压geojson数据/encodeGeojson.vue"
      ),
  },
  {
    path: "/aes",
    name: "aes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/js/前端AES、RSA加密解密的方式/aes.vue"
      ),
  },
  {
    path: "/rsa",
    name: "rsa",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/js/前端AES、RSA加密解密的方式/rsa.vue"
      ),
  },
  // ==============================mapbox================================================
  {
    path: "/mapbox_typhoonPath",
    name: "mapbox_typhoonPath",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox绘制风圈半径/mapbox_typhoonPath.vue"
      ),
  },
  {
    path: "/loadcgcs2000Demo",
    name: "loadcgcs2000Demo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/loadcgcs2000Demo.vue"
      ),
  },
  {
    path: "/mapboxViewAnimation",
    name: "mapboxViewAnimation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox实现图形自传加镜头拉近动画效果/mapboxViewAnimation.vue"
      ),
  },
  {
    path: "/mapboxViewSelect",
    name: "mapboxViewSelect",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox下拉框加载不同的图层/mapboxViewSelect.vue"
      ),
  },
  {
    path: "/mapboxViewPoint",
    name: "mapboxViewPoint",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox绘制图层并进行添加、删除、更新、显隐等操作/mapboxViewPoint.vue"
      ),
  },
  {
    path: "/mapboxViewLine",
    name: "mapboxViewLine",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox绘制图层并进行添加、删除、更新、显隐等操作/mapboxViewLine.vue"
      ),
  },
  {
    path: "/mapboxViewPolygon",
    name: "mapboxViewPolygon",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox绘制图层并进行添加、删除、更新、显隐等操作/mapboxViewPolygon.vue"
      ),
  },
  {
    path: "/mapboxViewSymbol",
    name: "mapboxViewSymbol",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox绘制图层并进行添加、删除、更新、显隐等操作/mapboxViewSymbol.vue"
      ),
  },
  {
    path: "/mapboxViewHighlight",
    name: "mapboxViewHighlight",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox点击点位图层高亮指定的点位/mapboxViewHighlight.vue"
      ),
  },
  {
    path: "/mapboxViewEvent",
    name: "mapboxViewEvent",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox地图事件：点击、移入、移出、解绑/mapboxViewEvent.vue"
      ),
  },
  {
    path: "/mapboxViewPic",
    name: "mapboxViewPic",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox叠加图片图层到地图上/mapboxViewPic.vue"
      ),
  },
  {
    path: "/mapboxViewMoveLayer",
    name: "mapboxViewMoveLayer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox修改已上图图层间的显示层级/mapboxViewMoveLayer.vue"
      ),
  },
  {
    path: "/mapboxViewCursorStyle",
    name: "mapboxViewCursorStyle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox修改鼠标在地图上的样式/mapboxViewCursorStyle.vue"
      ),
  },
  {
    path: "/mapboxViewGetLayers",
    name: "mapboxViewGetLayers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox获取当前已上图的所有的图层/mapboxViewGetLayers.vue"
      ),
  },
  {
    path: "/mapboxViewRotateIcon",
    name: "mapboxViewRotateIcon",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox绘制自动旋转的图标/mapboxViewRotateIcon.vue"
      ),
  },
  {
    path: "/mapboxViewRectangle",
    name: "mapboxViewRectangle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox根据指定中心点绘制指定公里数的矩形/mapboxViewRectangle.vue"
      ),
  },
  {
    path: "/mapboxViewMarkerRipple",
    name: "mapboxViewMarkerRipple",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox通过marker的方式绘制波纹点位/mapboxViewMarkerRipple.vue"
      ),
  },
  {
    path: "/mapboxViewScale",
    name: "mapboxViewScale",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox地图自定义基础工具/mapboxViewScale.vue"
      ),
  },
  {
    path: "/mapboxViewBoundary",
    name: "mapboxViewBoundary",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox地图自定义基础工具/mapbox地图基础工具 - 获取当前视口边界/mapboxViewBoundary.vue"
      ),
  },
  {
    path: "/mapboxViewCenter",
    name: "mapboxViewCenter",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox地图自定义基础工具/mapbox地图基础工具 - 获取当前地图中心点/mapboxViewCenter.vue"
      ),
  },
  {
    path: "/mapboxViewChangeLngLat",
    name: "mapboxViewChangeLngLat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox地图自定义基础工具/mapbox地图基础工具 - 将360度范围内的经纬度转换为180度范围/mapboxViewChangeLngLat.vue"
      ),
  },
  {
    path: "/mapboxViewMeasureArea",
    name: "mapboxViewMeasureArea",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox的测面功能/mapboxViewMeasureArea.vue"
      ),
  },
  {
    path: "/mapboxViewMeasureDistance",
    name: "mapboxViewMeasureDistance",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/mapbox_demo/mapbox基础操作/mapbox的测距功能/mapboxViewMeasureDistance.vue"
      ),
  },
  // ===============================echarts=========================================
  {
    path: "/echarts-wordcloud",
    name: "echarts-wordcloud",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/echarts_demo/echarts-wordcloud实现字符云、词云的效果/echarts-wordcloud.vue"
      ),
  },
  {
    path: "/echarts-brokenLineLight",
    name: "echarts-brokenLineLight",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/demo/echarts_demo/折线图的荧光效果/echarts-brokenLineLight.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
