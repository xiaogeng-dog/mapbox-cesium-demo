// import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
var mapOptions = {
  basemaps: [
    { name: "谷歌地图", type: "google", layer: "vec", show: true },
    {
      type: "group",
      name: "谷歌影像",
      layers: [
        { type: "google", layer: "img_d" },
        { type: "google", layer: "img_z" }
      ]
    },
    { name: "谷歌地形", type: "google", layer: "ter" }
  ]
}

// 事件对象，用于抛出事件给vue
var eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalNotify(
    "功能和已知问题提示：",
    `(1) 按国家测绘主管部门的通知，
    目前国家相关部门对未经审核批准的谷歌等地图做了封锁及下架，目前谷歌地图服务暂不可用。`,
    { duration: null }
  )
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null
}
