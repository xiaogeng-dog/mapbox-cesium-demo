// import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
var eventTarget = new mars2d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  basemaps: [
    {
      name: "高德地图",
      type: "gaode",
      layer: "vec",
      show: true
    },
    {
      name: "高德卫星",
      type: "group",
      layers: [
        {
          type: "gaode",
          layer: "img_d"
        },
        {
          type: "gaode",
          layer: "img_z"
        }
      ]
    },
    {
      name: "高德大字体地图",
      type: "gaode",
      layer: "vec",
      bigfont: true
    }
  ],
  operationallayers: [
    {
      name: "实时交通信息",
      type: "gaode",
      layer: "time"
    }
  ]
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  eventTarget.fire("mapLoaded")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null
}
