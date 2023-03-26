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
    path: "/pdfPreview",
    name: "pdfPreview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/demo/pdfPreview.vue"),
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
