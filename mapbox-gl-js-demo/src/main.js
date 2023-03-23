import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.prototype.$axios = axios;
// require("@/lib");

// const viewer = new Cesium.Map("cesiumContainer", {
//   shouldAnimate: true,
//   selectionIndicator: true,
//   infoBox: false,
// });
Vue.config.productionTip = false;
Vue.use(ElementUI);
// 引入cesium相关文件
var cesium = require("cesium/Cesium.js");
var widgets = require("cesium//Widgets/widgets.css");

// 如果vue.config.js中不配置别名，就要用下面的方式按路径引入
// var cesium = require('cesium/Build/Cesium/Cesium.js');
// var widgets = require('cesium/Build/Cesium/Widgets/widgets.css');

Vue.prototype.cesium = cesium;
Vue.prototype.widgets = widgets;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
