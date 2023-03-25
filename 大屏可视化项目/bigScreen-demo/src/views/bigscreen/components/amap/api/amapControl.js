/**
 * 地图管理
author: Lishiqiang
 *
 */

import xzqgeoJson from './xzq' // 行政区
import roadgeoJson from './road' // 道路
import yqgeoJson from './yqfw' // 道路
import moment from 'moment'
export const MapControl = {}
/**
 * 地图对象
 * @type {{}}
 */
MapControl.map = {}
/**
 * 地图loca对象
 * @type {}
 */
MapControl.loca = {}

/**
 * 地图是否加载完毕
 * @type {{}}
 */
MapControl.isLoad = {}
/**
 * 地图overgroup对象
 * @type {}
 */
MapControl.overgroup = {}
// 定位
MapControl.setZoomAndCenter = (level, coord) => {
  const map = MapControl.map['map']
  map.setZoomAndCenter(level, coord)
}

// 地图旋转平移动画

MapControl.addAnimates = () => {
  const loca = MapControl.loca
  loca.viewControl.addAnimates([{
    center: {
      value: [106.626639, 37.371343], // 动画终点的经纬度
      control: [[106.6054672, 37.433655], [106.6154673, 37.393655]], // 过渡中的轨迹控制点，地图上的经纬度
      timing: [0.42, 0, 0.4, 1], // 动画时间控制点
      duration: 3000 // 过渡时间，毫秒（ms）
    },
    // 俯仰角动画
    pitch: {
      value: 30, // 动画终点的俯仰角度
      control: [[0.3, 75], [0.4, 60]], // 控制器，x是0～1的起始区间，y是pitch值
      timing: [0, 0, 1, 1], // 这个值是线性过渡
      duration: 4000
    },
    // 缩放等级动画
    zoom: {
      value: 10, // 动画终点的地图缩放等级
      control: [[0.4, 4], [0.6, 8]], // 控制器，x是0～1的起始区间，y是zoom值
      timing: [0.42, 0, 0.4, 1],
      duration: 4000
    },
    // 旋转动画
    rotation: {
      value: 10, // 动画终点的地图旋转角度
      control: [[0.4, 10], [0.6, 50]], // 控制器，x是0～1的起始区间，y是rotation值
      timing: [0.42, 0, 0.4, 1],
      duration: 3000
    }
  }], () => {
    setTimeout(() => {
      // 旋转后回调
      // MapControl.addDistrict('district', '昌江区')
      // MapControl.drawPulseLineLayer(roadgeoJson)
      // MapControl.addyqlines()
      MapControl.addyqlocal()
    }, 500)
  })
  // 下面的注掉,不然太卡了
  // setTimeout(() => {
  //   MapControl.addmask(xzqgeoJson)
  // }, 4000)
  loca.animate.start()
}

// 添加天地图
MapControl.addTdtwms = () => {
  const map = MapControl.map['map']
  let wms = new AMap.TileLayer.WMTS({
    url: 'http://t4.tianditu.gov.cn/img_w/wmts',
    blend: false,
    tileSize: 256,
    params: {
      Layer: 'img',
      Version: '1.0.0',
      Format: 'tiles',
      TileMatrixSet: 'w',
      STYLE: 'default',
      tk: '614bc38fc5a9c9efcc03193960f4b9c1'
    }
  })
  wms.setMap(map)
  let wms1 = new AMap.TileLayer.WMTS({
    url: 'http://t4.tianditu.gov.cn/cia_w/wmts',
    blend: false,
    tileSize: 256,
    params: {
      Layer: 'cia',
      Version: '1.0.0',
      Format: 'tiles',
      TileMatrixSet: 'w',
      STYLE: 'default',
      tk: '614bc38fc5a9c9efcc03193960f4b9c1'
    }
  })
  wms1.setMap(map)
}
// 添加范围面
MapControl.drawGeojson = (geoJson, checklist) => {
  const map = MapControl.map['map']
  let overlayGroup = MapControl.overlayGroup
  // var polygon = map.getAllOverlays('polygon')
  // if (polygon) {
  //   map.remove(polygon)
  // }
  if (overlayGroup) {
    map.remove(overlayGroup)
    overlayGroup = new AMap.OverlayGroup()
  } else {
    overlayGroup = new AMap.OverlayGroup()
  }
  var geojsons = new AMap.GeoJSON({
    geoJSON: geoJson,
    getPolygon: function (geojson, lnglats) {
      let type = geojson.properties.type
      let color
      let opacity = 0.8
      switch (type) {
        case '道路':
          color = '#663bb7'
          if (!checklist[0]) {
            opacity = 0
          }
          break
        case '地块':
          color = '#c78c0e'
          if (!checklist[1]) {
            opacity = 0
          }
          break
        case '水系':
          color = '#1cc5ec'
          if (!checklist[3]) {
            opacity = 0
          }
          break
        case '绿地':
          color = '#4cb051'
          if (!checklist[2]) {
            opacity = 0
          }
          break
        case '封闭化':
          color = '#ff0000'
          if (!checklist[4]) {
            opacity = 0
          }
          break
        default:
          break
      }
      let Polygon = new AMap.Polygon({
        path: lnglats,
        fillOpacity: opacity, // 面积越大透明度越高
        strokeColor: '#fff0',
        fillColor: color,
        zIndex: 10
      })
      overlayGroup.addOverlay(Polygon)
      if (checklist[4]) {
        // 创建纯文本标记

        var style = {
          'font-size': '8px',
          'color': 'blue'
        }
        var text1 = new AMap.Text({
          text: '10.84公里',
          anchor: 'center', // 设置文本标记锚点
          cursor: 'pointer',
          zooms: [14, 20],
          // angle: 10,
          style: style,
          position: [106.614847, 37.412767]
        })
        var text2 = new AMap.Text({
          text: '17.25公里',
          anchor: 'center', // 设置文本标记锚点
          cursor: 'pointer',
          zooms: [14, 20],
          // angle: 10,
          style: style,
          position: [106.601228, 37.354676]
        })
        overlayGroup.addOverlay(text1)
        overlayGroup.addOverlay(text2)
      }
    }
  })
  MapControl.overlayGroup = overlayGroup
  map.add(MapControl.overlayGroup)
}

// 获取地图行政区化范围
MapControl.addDistrict = (level, cityname) => {
  var opts = {
    subdistrict: 0,
    extensions: 'all',
    level: level
  }
  var district = new AMap.DistrictSearch(opts)
  district.search(cityname, function (status, result) {
    var bounds = result.districtList[0].boundaries
    var mask = []
    for (var i = 0; i < bounds.length; i += 1) {
      mask.push([bounds[i]])
    }
    MapControl.addmask(mask)
  })
}

// 地图添加mask
MapControl.addmask = () => {
  const map = MapControl.map['map']
  MapControl.addObject3Dlayer(xzqgeoJson)
  // let geojsons =
  return new AMap.GeoJSON({
    geoJSON: xzqgeoJson,
    getPolygon: function (geojson, lnglats) {
      // let list = []
      // lnglats[0].forEach((item, index) => {
      //   if (index % 3 === 0) {
      //     list.push(item)
      //   }
      // })
      // console.log(list)
      map.setMask(lnglats)
    }
  })
  // map.add(geojsons)
}

// 添加object3Dlayer
MapControl.addObject3Dlayer = (geojson) => {
  if (!geojson) {
    return
  }
  const loca = MapControl.loca
  // loca.ambLight = {
  //   intensity: 0.3,
  //   color: '#fff'
  // }
  // loca.dirLight = {
  //   intensity: 0.6,
  //   color: '#fff',
  //   target: [0, 0, 0],
  //   position: [0, -1, 1]
  // }

  // loca.pointLight = {
  //   color: 'rgb(100,100,100)',
  //   position: [120.24289, 30.341335, 20000],
  //   intensity: 3,
  //   // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
  //   distance: 50000
  // }
  // 添加高度面
  let geo = new Loca.GeoJSONSource({
    data: geojson
  })
  let pl = new Loca.PolygonLayer({
    zIndex: 10,
    opacity: 0.5,
    shininess: 10,
    hasSide: true
  })
  pl.setSource(geo)
  pl.setStyle({
    topColor: '#c5dfed70',
    sideTopColor: '#c5dfed',
    sideBottomColor: '#c5dfed',
    height: -100,
    altitude: 0
  })
  loca.add(pl)
}

MapControl.PulseLineLayer = {}
// 添加动态线性
MapControl.drawPulseLineLayer = () => {
  if (!roadgeoJson) {
    return
  }
  if (MapControl.PulseLineLayer) {
    MapControl.PulseLineLayer = {}
  }
  const loca = MapControl.loca
  let geo = new Loca.GeoJSONSource({
    data: roadgeoJson
  })
  var layer = new Loca.PulseLineLayer({
    zIndex: 10,
    opacity: 1,
    visible: true,
    zooms: [6, 16]
  })
  layer.setSource(geo)
  layer.setStyle({
    headColor: '#ECFFB1', // 脉冲头颜色
    trailColor: 'rgba(255,178,6, 0.2)', // 脉冲尾颜色
    interval: 0.25, // 脉冲长度，0.25 表示一段脉冲占整条路的 1/4
    duration: 3000, // 脉冲线的速度，几秒钟跑完整段路
    altitude: 0,
    lineWidth: 2
  })
  loca.add(layer)
  MapControl.PulseLineLayer = layer
  loca.animate.start()
  setTimeout(() => {
    MapControl.PulseLineLayer.hide()
  }, 5000)
}

// 添加地图聚合
MapControl.MarkerClusterer = {}

/*
MapControl.addMarkerClusterer = () => {
  const map = MapControl.map['map']
  let MarkerClusterer = new AMap.MarkerClusterer(map, [], {
    gridSize: 50,
    renderMarker: (context) => {
      var markerType = MapControl.getmarkerType(context)
      var content = '<div class="mapmarker ' + markerType + '"></div>'
      context.marker.setContent(content)
      // 此处为设置标记在地图上的偏移，根据标记物大小处理
      context.marker.setOffset(new AMap.Pixel(-35, -87))
      // 此处为设置标记是否显示在最上方，一般只有选中的标记在最上方
      // context.marker.setTop(top);
      // 此处为设置标记携带的数据，点击事件会使用
      context.marker.setExtData(context)
      // //此处为添加单个标记点击事件
      context.marker.on('click', ev => {
        // let lng = ev.target.getPosition().lng
        // let lat = ev.target.getPosition().lat
        // 获取标记携带的数据
        // const extData = ev.target.getExtData()
        // this.openInfowindow([lng, lat], extData)
        // this.pointId = extData.data[0].id
        // this.isShow = true
      })
      // marker滑动事件
      context.marker.on('mouseover', function (e) {
        e.target.setTop(true)
        e.target.setLabel({
          content: '<div>' + context.data[0].name + '</div>',
          offset: new AMap.Pixel(-10, 20)
        })
      })
      context.marker.on('mouseout', function (e) {
        e.target.setTop(false)
        e.target.setLabel({
          content: null
        })
      })
    }
  })

  MapControl.MarkerClusterer = MarkerClusterer
}
*/

// 添加地图聚合点击事件
MapControl.clickClusterer = () => {
  let MarkerClusterer = MapControl.MarkerClusterer
  const map = MapControl.map['map']
  MarkerClusterer.on('click', (item) => {
    // 这里是计算所有聚合点的中心点
    let alllng = 0; let alllat = 0
    for (const mo of item.clusterData) {
      alllng += mo.lnglat.lng
      alllat += mo.lnglat.lat
    }
    const lat = alllat / item.clusterData.length
    const lng = alllng / item.clusterData.length
    // 这里是放大地图，此处写死了每次点击放大的级别，可以根据点的数量和当前大小适应放大，体验更佳
    map.setZoomAndCenter(map.getZoom() + 2, [lng, lat])
  })
}

/**
 -
  获取定位点样式
  -
**/
MapControl.getmarkerType = (context, ele) => {
  let item = {}
  if (ele) {
    item = ele
  } else {
    item = context.data[0]
  }
  var markerType = ''
  if (item.type === 'projectWater') {
    markerType = 'marker18'
  } else if (item.type === 'projectElectricity') {
    markerType = 'marker19'
  } else if (item.type === 'projectHot') {
    markerType = 'marker20'
  } else if (item.type === 'projectPipegallery') {
    markerType = 'marker21'
  } else if (item.type === 'projectGas') {
    markerType = 'marker22'
  } else if (item.type === 'projectFirefacilities') {
    markerType = 'marker23'
  } else if (item.type === 'majorHazardInfo') {
    if (item.majorHazardGrade.split('|')[3] === '一级') {
      markerType = 'marker1'
    } else if (item.majorHazardGrade.split('|')[3] === '二级') {
      markerType = 'marker2'
    } else if (item.majorHazardGrade.split('|')[3] === '三级') {
      markerType = 'marker3'
    } else if (item.majorHazardGrade.split('|')[3] === '四级') {
      markerType = 'marker4'
    }
  } else if (item.type === 'emnStorageInfo') {
    markerType = 'marker7'
  } else if (item.type === 'teamInfo') {
    markerType = 'marker8'
  } else if (item.type === 'sensorDevice') {
    if (item.deviceCode === '01') {
      markerType = 'marker9'
    }
    if (item.deviceCode === '03') {
      markerType = 'marker11'
    }
    if (item.deviceCode === '04') {
      markerType = 'marker10'
    }
    if (item.deviceCode === '05') {
      markerType = 'marker12'
    }
  } else if (item.type === 'kkjk') {
    markerType = 'marker13'
  } else if (item.type === 'pwjk') {
    markerType = 'marker14'
  } else if (item.type === 'blockparkSentrymanage') {
    markerType = 'marker15'
  } else if (item.type === 'blockparkParkinglot') {
    markerType = 'marker16'
  } else if (item.type === 'jksxt') {
    markerType = 'marker17'
  } else if (item.type === 'camera') {
    markerType = 'marker17'
  } else if (item.type === 'riskPoint') {
    if (item.riskLevel.split('|')[3] === '低风险') {
      markerType = 'marker25'
    } else if (item.riskLevel.split('|')[3] === '一般风险') {
      markerType = 'marker26'
    } else if (item.riskLevel.split('|')[3] === '较大风险') {
      markerType = 'marker27'
    } else if (item.riskLevel.split('|')[3] === '重大风险') {
      markerType = 'marker28'
    }
  } else if (item.type === 'pipeline') {
    markerType = 'marker11'
  } else if (item.type === 'pipevalve') {
    markerType = 'marker18'
  } else if (item.type === 'pipemeter') {
    markerType = 'marker22'
  } else if (item.type === 'solidWasteDepot') {
    markerType = 'marker29'
  } else if (item.type === 'healthInfo') { // 医院
    markerType = 'marker30'
  } else if (item.type === 'asylumareaInfo') { // 避难所
    markerType = 'marker31'
  } else if (item.type === 'AccidentPoint') { // 重大事件
    markerType = 'marker34'
  } else if (item.type === 'enterpriseEnergyInfo') { // 重大事件
    markerType = 'marker32'
  } else if (item.type === 'waterStation') { // 重大事件
    markerType = 'marker33'
  } else if (item.type === 'roadVideoInfo') { // 视频监控
    markerType = 'marker13'
  } else if (item.type === 'smartHeightlimitInfo') { // 智能限高杆
    markerType = 'marker35'
  } else if (item.type === 'managementCommittee') { // 太阳山开发区管委会
    markerType = 'marker36'
  } else if (item.type === 'townGovernment') { // 太阳山镇政府
    markerType = 'marker36'
  } else if (item.type === 'policeOffice') { // 公安局太阳山分局
    markerType = 'marker37'
  } else if (item.type === 'townHospital') { // 太阳山镇医院
    markerType = 'marker38'
  } else if (item.type === 'fireBrigade') { // 消防救援大队
    markerType = 'marker39'
  } else if (item.type === 'aidStation') { // 医疗救护站
    markerType = 'marker38'
  } else {
    markerType = 'marker24'
  }
  return markerType
}

// 弹窗清除事件
MapControl.clearInfoWindow = () => {
  const map = MapControl.map['map']
  map.clearInfoWindow()
}

// 园区范围定位
MapControl.addyqlocal = () => {
  const loca = MapControl.loca
  loca.viewControl.addAnimates([{
    // 缩放等级动画
    zoom: {
      value: 12, // 动画终点的地图缩放等级
      control: [[0.33, 10], [0.66, 11]], // 控制器，x是0～1的起始区间，y是zoom值
      timing: [0, 0, 1, 1],
      duration: 800
    }
  }], () => {
    MapControl.addTdtwms()
    MapControl.addyqlines()
  })
  loca.animate.start()
}
// 添加园区范围线
MapControl.addyqlines = () => {
  const loca = MapControl.loca
  // 添加高度面
  let geo = new Loca.GeoJSONSource({
    data: yqgeoJson
  })
  var layer = new Loca.PulseLineLayer({
    zIndex: 10,
    opacity: 1,
    visible: true,
    zooms: [6, 16]
  })
  layer.setSource(geo)
  layer.setStyle({
    headColor: '#0aa1fd', // 脉冲头颜色
    trailColor: 'rgba(10,161,253, 0.3)', // 脉冲尾颜色
    interval: 0.3, // 脉冲长度，0.25 表示一段脉冲占整条路的 1/4
    duration: 5000, // 脉冲线的速度，几秒钟跑完整段路
    altitude: 0,
    lineWidth: 6
  })
  loca.add(layer)
  loca.animate.start()
  setTimeout(() => {
    MapControl.addyq3Dlayer()
  }, 500)
}
// 添加园区范围面
MapControl.addyq3Dlayer = () => {
  const loca = MapControl.loca
  // 添加高度面
  let geo = new Loca.GeoJSONSource({
    data: yqgeoJson
  })
  let pl = new Loca.PolygonLayer({
    zIndex: 10,
    opacity: 0.8,
    shininess: 100,
    cullface: 'back',
    hasSide: true
  })
  pl.setSource(geo)
  pl.setStyle({
    topColor: 'rgba(10,161,253, 0.4)',
    sideTopColor: 'rgba(10,161,253, 0.2)', // rgba(255,178,6, 0.2)  rgba(10,161,253, 0.3)
    sideBottomColor: '#0aa1fd', // #0aa1fd  #ECFFB1
    height: 200,
    altitude: 0
  })
  loca.add(pl)
}

//
MapControl.initScatterData = (data) => {
  var jsonData = []
  for (let i = 0; i < data.length; i++) {
    let datas = { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [parseFloat(data[i].longitude), parseFloat(data[i].latitude)] } }
    jsonData.push(datas)
  }
  var geojson = {
    'type': 'FeatureCollection',
    'features': jsonData
  }

  if (geoLevelE) {
    MapControl.addScatterLayer(geojson)
  } else {
    MapControl.addScatterLayer(geojson)
  }
}
var geoLevelE
var breathYellow
// 添加贴地呼吸点
MapControl.addScatterLayer = (geojson) => {
  const loca = MapControl.loca
  if (geoLevelE) {
    geoLevelE.destroy()
  }
  if (breathYellow) {
    breathYellow.remove()
  }
  geoLevelE = new Loca.GeoJSONSource({
    data: geojson
  })
  breathYellow = new Loca.ScatterLayer({
    loca,
    zIndex: 112,
    opacity: 1,
    visible: true,
    zooms: [13, 22]
  })
  breathYellow.setSource(geoLevelE)
  breathYellow.setStyle({
    unit: 'meter',
    size: [200, 200],
    borderWidth: 0,
    texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png',
    duration: 1000,
    animate: true
  })
  // 启动渲染动画
  loca.animate.start()
}

// 地图测距
var ruler
MapControl.addDistance = (isopen) => {
  const map = MapControl.map['map']
  if (isopen) {
    if (!ruler) {
      // 自定义样式
      var startMarkerOptions = {
        icon: new AMap.Icon({
          size: new AMap.Size(19, 31), // 图标大小
          imageSize: new AMap.Size(19, 31),
          image: '//webapi.amap.com/theme/v1.3/markers/b/start.png'
        }),
        offset: new AMap.Pixel(-9, -31)
      }
      var endMarkerOptions = {
        icon: new AMap.Icon({
          size: new AMap.Size(19, 31), // 图标大小
          imageSize: new AMap.Size(19, 31),
          image: '//webapi.amap.com/theme/v1.3/markers/b/end.png'
        }),
        offset: new AMap.Pixel(-9, -31)
      }
      var midMarkerOptions = {
        icon: new AMap.Icon({
          size: new AMap.Size(19, 31), // 图标大小
          imageSize: new AMap.Size(19, 31),
          image: '//webapi.amap.com/theme/v1.3/markers/b/mid.png'
        }),
        offset: new AMap.Pixel(-9, -31)
      }
      var lineOptions = {
        strokeStyle: 'solid',
        strokeColor: '#FF33FF',
        strokeOpacity: 1,
        strokeWeight: 2
      }
      var rulerOptions = {
        startMarkerOptions: startMarkerOptions,
        midMarkerOptions: midMarkerOptions,
        endMarkerOptions: endMarkerOptions,
        lineOptions: lineOptions
      }
      // 自定义样式
      // ruler = new AMap.RangingTool(map, rulerOptions)
      // 默认样式
      ruler = new AMap.RangingTool(map)
    }
    ruler.turnOn()
  } else {
    ruler.turnOff(true)
    ruler = null
  }
}

// 地图弹窗样式
MapControl.getContent = (data) => {
  var content = ''
  if (data.type === 'projectWater') {
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.facilityName +
      '</span></div>' +
      '</div>' +
      '<div class="infoTitle1">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class=""><span>( ' +
      data.facilityType.split('|')[3] +
      ' )</span></div>' + // facilityType
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">责任单位:</div>' +
      '<div class="infocontent2">' +
      data.facilityCompany +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">负责人:</div>' +
      '<div class="infocontent2">' +
      data.facilityPrincipal +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">供水范围:</div>' +
      '<div class="infocontent2">' +
      data.facilityScope +
      '</div>' +
      '</div>'
  } else if (data.type === 'projectElectricity') {
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.facilityName +
      '</span></div>' +
      '</div>' +
      '<div class="infoTitle1">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class=""><span>( ' +
      data.facilityType.split('|')[3] +
      ' )</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">配电类型:</div>' +
      '<div class="infocontent2">' +
      data.electricityType.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">设施负责单位:</div>' +
      '<div class="infocontent2">' +
      data.facilityCompany +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">负责人:</div>' +
      '<div class="infocontent2">' +
      data.facilityPrincipal +
      '</div>' +
      '</div>'
  } else if (data.type === 'projectHot') {
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.facilityName +
      '</span></div>' +
      '</div>' +
      '<div class="infoTitle1">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class=""><span>( 编号:' +
      data.facilityNumber +
      ' )</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">锅炉类型:</div>' +
      '<div class="infocontent2">' +
      data.boilerType.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">供热能力:</div>' +
      '<div class="infocontent2">' +
      data.hotAbility +
      't/h</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">是否重大危险源:</div>' +
      '<div class="infocontent2">' +
      data.isMajorhazard +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">设施负责单位:</div>' +
      '<div class="infocontent2">' +
      data.facilityCompany +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">负责人:</div>' +
      '<div class="infocontent2">' +
      data.facilityPrincipal +
      '</div>' +
      '</div>'
  } else if (data.type === 'projectPipegallery') {
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.facilityName +
      '</span></div>' +
      '</div>' +
      '<div class="infoTitle1">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class=""><span>( 编号:' +
      data.facilityNumber +
      ' )</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">输送介质:</div>' +
      '<div class="infocontent2">' +
      data.transportType.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">输送压力:</div>' +
      '<div class="infocontent2">' +
      data.transportPower +
      'Mpa</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">是否危化品管道:</div>' +
      '<div class="infocontent2">' +
      (data.isDanger === '1' ? '是' : '否') +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">设施负责单位:</div>' +
      '<div class="infocontent2">' +
      data.facilityCompany +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">负责人:</div>' +
      '<div class="infocontent2">' +
      data.facilityPrincipal +
      '</div>' +
      '</div>'
  } else if (data.type === 'projectGas') {
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.facilityName +
      '</span></div>' +
      '</div>' +
      '<div class="infoTitle1">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class=""><span>( 编号:' +
      data.facilityNumber +
      ' )</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">输送介质:</div>' +
      '<div class="infocontent2">' +
      data.transportType.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">管道设计压力:</div>' +
      '<div class="infocontent2">' +
      data.pipesPower +
      'Mpa</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">架设方式:</div>' +
      '<div class="infocontent2">' +
      data.erectionMethod +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">设施负责单位:</div>' +
      '<div class="infocontent2">' +
      data.facilityCompany +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">负责人:</div>' +
      '<div class="infocontent2">' +
      data.facilityPrincipal +
      '</div>' +
      '</div>'
  } else if (data.type === 'projectFirefacilities') {
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.facilityName +
      '</span></div>' +
      '</div>' +
      '<div class="infoTitle1">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class=""><span>( 编号:' +
      data.facilityNumber +
      ' )</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">负责人:</div>' +
      '<div class="infocontent2">' +
      data.mainer +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">联系电话:</div>' +
      '<div class="infocontent2">' +
      data.principalTel +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">设施负责单位:</div>' +
      '<div class="infocontent2">' +
      data.facilityCompany +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">设施负责人:</div>' +
      '<div class="infocontent2">' +
      data.facilityPrincipal +
      '</div>' +
      '</div>'
  } else if (data.type === 'majorHazardInfo') {
    let safetySupervisionLevel = data.managementType.split('|')[3]

    let entprId = data.entprId.split('|')[3]

    let safetySupervision =
      '<div class="tips" style="border: 1px solid rgba(54, 128, 226, 1);background: rgba(51, 8, 8, 0.5);">' +
      safetySupervisionLevel +
      '</div>'

    let alarmContent =
      '<div class="infocontent" style="margin-top: 0.2vh">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="tips tip' +
      data.majorHazardGrade.split('|')[2] +
      '">' +
      data.majorHazardGrade.split('|')[3] +
      '重大危险源</div>' +
      safetySupervision +
      '</div>' +
      '</div>'
    content = '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.majorHazardName +
      '</span></div>' +
      '</div>' +
      alarmContent +
      '<div class="infocontent">' +
      '<div class="infocontent1">R值:</div>' +
      '<div class="infocontent2"><span>' +
      data.rvalue +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">投用日期:</div>' +
      '<div class="infocontent2">' +
      data.useDate +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">所属公司:</div>' +
      '<div class="infocontent2">' +
      data.entprId.split('|')[4] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">重大危险源:</div>' +
      '<div class="infocontent2"><span>' +
      data.majorHazardDescription +
      '</span></div>' +
      '</div>' +
      '<div class="infoBtns">' +
      '<div class="infoBtn" onclick="realTimeVideo(' +
      "'" +
      data.id +
      "','" + entprId +
      "'" +
	  ')">查看视频</div>' +
      '<div class="infoBtn" onclick="hisVideo(' +
      "'" +
      data.id +
      "'" +
      ')">数据监测</div>' +
      '<div class="infoBtn" onclick="relateDanger(' +
      "'" +
      data.id +
      "'" +
      ')">关联危化品</div>' +
      '</div>'
  } else if (data.type === 'impProcessInfo') {
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.reactionType.split('|')[3] +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent3">重点监管危险化工工艺:</div>' +
      '<div class="infocontent2 y"><span>' +
      data.keySupervisionProcess.split('|')[3] +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent3">反应类型:</div>' +
      '<div class="infocontent2 y">' +
      data.reactionType.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent3">工艺危险特点:</div>' +
      '<div class="infocontent2 y">' +
      data.dangerousCharacter +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent3">所属公司:</div>' +
      '<div class="infocontent2"><span>' +
      data.enterpriseBaseInfo.entprName +
      '</span></div>' +
      '</div>'
  } else if (data.type === 'rawMateriallInfo') {
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.productName.split('|')[4] +
      '</span><span style="color: #F7D500">(' +
      data.dangerChemcataNature.split('|')[3] +
      ')</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">CAS号:</div>' +
      '<div class="infocontent2"><span>' +
      data.casNo +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">所属公司:</div>' +
      '<div class="infocontent2">' +
      data.entprId.split('|')[4] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">年消耗量:</div>' +
      '<div class="infocontent2">' +
      data.annualConsumption +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">最大存储量:</div>' +
      '<div class="infocontent2"><span>' +
      data.maxStoreDay +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">实际存储量:</div>' +
      '<div class="infocontent2"><span>' +
      data.actualReserves +
      '</span></div>' +
      '</div>'
  } else if (data.type === 'teamInfo') {
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.teamname +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">队伍类型:</div>' +
      '<div class="infocontent2 b"><span>' +
      data.teamtypecode.split('|')[3] +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">联系人:</div>' +
      '<div class="infocontent2">' +
      data.contactper +
      '(' +
      data.contactmtel +
      ')</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">详细地址:</div>' +
      '<div class="infocontent2">' +
      data.address +
      '</div>' +
      '</div>'
  } else if (data.type === 'emnStorageInfo') {
    let table = `<div class="contentTable0"><table align="left" cellspacing="0" class="contentTable">
    <thead>
      <tr>
          <th>序号</th>
          <th>名称</th>
          <th>编号</th>
          <th>数量</th>
      </tr>
    </thead>
    <tbody>`
    data.mapList.forEach((item, index) => {
      table += `<tr>
                    <td>${index + 1}</td>
                    <td>${item.equipName}</td>
                    <td>${item.code}</td>
                    <td>${item.nownumber + item.unitName}</td>
                </tr>`
    })
    table += '</tbody></table></div>'
    content = '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.storagename +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">联系人:</div>' +
      '<div class="infocontent2">' +
      data.contactper +
      '(' +
      data.contactmtel +
      ')</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">详细地址:</div>' +
      '<div class="infocontent2">' +
      data.address +
      '</div>' +
      '</div>' +
      table
  } else if (data.type === 'healthInfo') {
    content =

      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.name +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">医院分类:</div>' +
      '<div class="infocontent2">' +
      data.depttypeCode.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">联系人:</div>' +
      '<div class="infocontent2">' +
      data.contactper +
      '(' +
      data.contactmTel +
      ')</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">详细地址:</div>' +
      '<div class="infocontent2">' +
      data.address +
      '</div>' +
      '</div>'
  } else if (data.type === 'asylumareaInfo') {
    // 避难所
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.name +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">避难所类型:</div>' +
      '<div class="infocontent2">' +
      data.sheltertypecode.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">联系人:</div>' +
      '<div class="infocontent2">' +
      data.contactper +
      '(' +
      data.contactmtel +
      ')</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">详细地址:</div>' +
      '<div class="infocontent2">' +
      data.address +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">面积:</div>' +
      '<div class="infocontent2">' +
      data.engrossarea +
      'm2</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">可容纳人数:</div>' +
      '<div class="infocontent2">' +
      data.personnum +
      '人</div>' +
      '</div>'
  } else if (data.type === 'AccidentPoint') {
    // 重大事故
    // 信息展示
    content =
      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.accidentTypeNames +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">事件类型:</div>' +
      '<div class="infocontent2">' +
      data.accreportType.split('|')[3] +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">发生时间:</div>' +
      '<div class="infocontent2">' +
      data.happenTime +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">地点:</div>' +
      '<div class="infocontent2">' +
      data.address +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">报警人:</div>' +
      '<div class="infocontent2">' +
      data.accreporter +
      '(' +
      data.accreporterMobile +
      ')</div>' +
      '</div>' +
      '<div class="infoBtns">' +
      '<div class="infoBtn" style="background: #c10707;border: 1px solid #c10707;" onclick="AccidentPage(' +
      "'" +
      data.id +
      "'" +
      ')">进入战时</div>' +
      '</div>'
  } else if (data.type === 'blockparkSentrymanage') {
    content =

      '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.sentryName +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">人行卡口:</div>' +
      '<div class="infocontent2">' +
      data.customsTypeMap.people +
      '个</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">车辆卡口:</div>' +
      '<div class="infocontent2">' +
      data.customsTypeMap.car +
      '个</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">联系人:</div>' +
      '<div class="infocontent2">' +
      (data.principalName ? data.principalName : '暂无') +
      '(' +
      (data.principalTel ? data.principalTel : '--') +
      ')</div>' +
      '</div>' +
      '<div class="infoBtns">' +
      '<div class="infoBtn" onclick="realTimeVideo(' +
      "'" +
      data.id +
      "'" +
      ')"><div class="itemicon itemInfoHistory"></div>查看视频</div>' +
      '<div class="infoBtn" onclick="hisVideo(' +
      "'" +
      data.id +
      "'" +
      ')"><div class="itemicon itemInfodetail"></div>出入信息</div>' +
      '</div>'
  } else if (data.type === 'blockparkParkinglot') {
    content = '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.parkingName +
      '</span></div>' +
      '</div>' +
      '<div class="infoTitle1">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class=""><span>( 编号:' +
      data.parkingNumber +
      ' )</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">车位数:</div>' +
      '<div class="infocontent2">' +
      data.parkspacesNumber +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">位置:</div>' +
      '<div class="infocontent2">' +
      data.tranCompany +
      '</div></div>'
  } else if (data.type === 'enterpriseEnergyInfo') {
    if (data.statisticsDate) {
      data.statisticsDate = moment(data.statisticsDate).format('YYYY-MM')
    } else {
      data.statisticsDate = ''
    }
    content = `<div class="infotitle">
                <div class="itemicon itemInfoicon"></div>
                <div class="titlespan">
                  <span>${data.name}</span>
                </div>
              </div>
              <div class="info-content">
                <div class="infocontent">
                  <div class="infocontent1">最近统计月:</div>
                  <div class="infocontent5">
                    <span>${data.statisticsDate}</span>
                  </div>
                </div>
                <div class="infocontent">
                  <div class="infocontent1">产品产值(万元):</div>
                  <div class="infocontent5">
                    <span>
                    ${data.outputValue ? data.outputValue : 0}
                    </span>
                  </div>
                </div>
                <div class="infocontent">
                  <div class="infocontent1">用电(KW·H):</div>
                  <div class="infocontent5">
                    <span>
                    ${data.electricTotal ? data.electricTotal : 0}
                    </span>
                  </div>
                </div>
                <div class="infocontent">
                  <div class="infocontent1">用水(t):</div>
                  <div class="infocontent5">
                    <span>
                    ${data.waterTotal ? data.waterTotal : 0}
                    </span>
                  </div>
                </div>
                <div class="infocontent">
                  <div class="infocontent1">蒸汽(m³):</div>
                  <div class="infocontent5">
                    <span>
                    ${data.steamTotal ? data.steamTotal : 0}
                    </span>
                  </div>
                </div>
                <div class="infocontent">
                  <div class="infocontent1">天然气(m³):</div>
                  <div class="infocontent5">
                    <span>
                    ${data.naturalGasTotal ? data.naturalGasTotal : 0}
                    </span>
                  </div>
                </div>
              </div>`
  } else if (data.type === 'roadVideoInfo') {
    content = '<div class="infotitle">' +
      '<div class="itemicon itemInfoicon"></div>' +
      '<div class="titlespan"><span>' +
      data.videoName +
      '</span></div>' +
      '</div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">点位名称:</div>' +
      '<div class="infocontent2"><span>' +
      (data.pointName ? data.pointName : '-') +
      '</span></div>' +
      '</div>' +
      '<div class="infocontent">' +
      '<div class="infocontent1">监控设备类型:</div>' +
      '<div class="infocontent2">' +
      (data.barType ? data.barType : '-') +
      '</div>' +
      '</div>' +
      // '<div class="infocontent">' +
      // '<div class="infocontent1">监控设备类型:</div>' +
      // '<div class="infocontent2">' +
      // (data.videoType ? data.videoType : '-') +
      // '</div>' +
      // '</div>' +
      '<div class="infoBtns">' +
      '<div class="infoBtn" onclick="realTimeVideo(' +
      "'" +
      data.url +
      "'" +
      ')"><div class="itemicon itemInfoHistory"></div>查看视频</div>' +
      '</div>'
  } else if (data.type === 'smartHeightlimitInfo') {
    content = '<div class="infotitle">' +
    '<div class="itemicon itemInfoicon"></div>' +
    '<div class="titlespan"><span>' +
    data.heightlimit +
    '</span></div>' +
    '</div>' +
    '<div class="infocontent">' +
    '<div class="infocontent1">联系人:</div>' +
    '<div class="infocontent2">' +
    data.personCharge +
    '(' +
    data.personMobile +
    ')</div>' +
    '</div>' +
    '<div class="infocontent">' +
    '<div class="infocontent1">详细地址:</div>' +
    '<div class="infocontent2">' +
    data.addr +
    '</div>' +
    '</div>' +
    '</div>' +
     '<div class="infoBtns">' +
    '<div class="infoBtn" onclick="heightlimit(' +
    "'" +
    data.url +
    "'" +
    ')"><div class="itemicon itemInfoHistory"></div>查看</div>' +
    '</div>'
  }
  let contents =
    '<div class="infowindowContent">' +
    '<div class="infowindowClose" onclick="closeInfoWindow()"></div>' +
    '<div class="contentDiv">' +
    content +
    '</div>' +
    '</div>'
  return contents
}

// cesium 加载弹窗
MapControl.addCesiumPupop = (data, viewer, divcontent) => {
  viewer.container.append(divcontent)
  // 经纬度转为世界坐标
  let gisPosition = Cesium.Cartesian3.fromDegrees(
    data.longitude,
    data.latitude,
    0
  )
  divcontent.style.display = 'block' // 弹出信息框
  viewer.scene.postRender.addEventListener(() => {
    // 转化为屏幕坐标
    var windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, gisPosition)
    let x = windowPosition.x - divcontent.offsetWidth / 2
    let y = windowPosition.y - divcontent.offsetHeight
    divcontent.style.cssText = `
      position:absolute;
      background:rgba(0,0,0,0.7);
      color:white;
    `
    divcontent.style.left = x + 'px'
    divcontent.style.top = y + 'px'
    // 解决滚动不隐藏问题
    const camerPosition = viewer.camera.position
    let height = viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height
    height += viewer.scene.globe.ellipsoid.maximumRadius
    if ((!(Cesium.Cartesian3.distance(camerPosition, gisPosition) > height)) && viewer.camera.positionCartographic.height < 50000000) {
      divcontent.style.display = 'block'
    } else {
      divcontent.style.display = 'none'
    }
  })
}

// cesium 添加点
MapControl.addCesiumPoint = (item, viewer) => {
  let markerType = MapControl.getmarkerType(null, item)
  var imgurl = require('../../../../../assets/bigscreen/map-' +
    markerType +
    '.png')

  if (item.latitude === '111') {
    // 不显示有问题的数据
    return
  }
  viewer.entities.add({
    id: item.id, // id
    name: item.name, // 名称（不显示在地图上）
    position: Cesium.Cartesian3.fromDegrees(
      item.longitude,
      item.latitude
    ),
    monitoItems: {
      data: item
    },
    // 自定义
    billboard: new Cesium.BillboardGraphics({
      image: imgurl,
      width: 70,
      height: 87,
      disableDepthTestDistance: Number.POSITIVE_INFINITY, //
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
      // pixelOffset: new Cesium.Cartesian2(0, 10), // 偏移量
      scale: 0.8 // icon尺寸
    }),
    // 自带圆点坐标
    // point: {
    //   color: Cesium.Color.WHEAT,
    //   pixelSize: 5,
    //   outlineWidth: 3,
    //   disableDepthTestDistance: Number.POSITIVE_INFINITY, //
    //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 规定贴地
    // },
    label: {
      text: item.name, // 坐标名字
      font: '12px', // 字体样式
      fillColor: Cesium.Color.black, // 字体颜色
      backgroundColor: Cesium.Color.white, // 背景颜色
      showBackground: false, // 是否显示背景颜色
      style: Cesium.LabelStyle.FILL, // label样式
      // outlineWidth: 2, // 线宽
      pixelOffset: new Cesium.Cartesian2(0, -30), // 像素偏移量
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直位置
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER // 水平位置
    }
  })
}

var carMarker
var polyline
var passedPolyline

MapControl.carRoute = (lineArr, speedNum) => {
  let speed = speedNum || 1
  const map = MapControl.map['map']
  carMarker = new AMap.Marker({
    map: map,
    position: lineArr[0],
    icon: require('@/assets/bigscreen/dangerCar.png'),
    offset: new AMap.Pixel(-13, -26)
  })
  map.setCenter(lineArr[0], true)
  // 绘制轨迹
  polyline = new AMap.Polyline({
    map: map,
    path: lineArr,
    showDir: true,
    strokeColor: '#000', // 线颜色
    // strokeOpacity: 1,     //线透明度
    strokeWeight: 6 // 线宽
    // strokeStyle: "solid"  //线样式
  })

  passedPolyline = new AMap.Polyline({
    map: map,
    strokeColor: '#FFF', // 线颜色
    strokeWeight: 6 // 线宽
  })

  carMarker.on('moving', function (e) {
    if (passedPolyline) {
      passedPolyline.setPath(e.passedPath)
    }
  })

  carMarker.moveAlong(lineArr, {
    // 每一段的时长
    duration: 500 / speed, // 可根据实际采集时间间隔设置
    // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
    autoRotation: true,
    circlable: false
  })
}

MapControl.clearCarRoute = () => {
  if (carMarker) {
    carMarker.stopMove()
    carMarker.setMap(null)
    carMarker = null
  }
  if (polyline) {
    polyline.setMap(null)
    polyline = null
  }
  if (passedPolyline) {
    passedPolyline.setMap(null)
    passedPolyline = null
  }
}
