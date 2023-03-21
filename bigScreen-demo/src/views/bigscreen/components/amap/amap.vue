<template>
  <div style="width:100%;height:100%">
    <!-- <popout-enterprise-table :popoutTableShow="popoutTableShow" :param="popoutParam" :enterpriseAllInfo="markerData" @close="closePopoutTable"></popout-enterprise-table> -->
    <div style="width:100%;height:100%;background: #1c1d2e;" id="map"></div>
    <!-- <div style="display:none">
      <InfoWindow ref="infoWindow" :markerData="markerData" @openTable="openTable" @close="closeInfoWindow"></InfoWindow>
    </div> -->
  </div>
</template>

<script>
import { MapControl } from './api/amapControl'
import AMapLoader from '@amap/amap-jsapi-loader'
// import PopoutEnterpriseTable from '../popout/enterprise/PopoutEnterpriseTable.vue'
export default {
  components: {
    // InfoWindow: () => import('./components/InfoWindow.vue'),
    // PopoutEnterpriseTable
  },
  props: {
    zoom: {
      type: Number,
      default: 12
    },
    pitch: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      map: null,
      // markerData: {},
      InfoWindow: {}
      // popoutTableShow: false,
      // popoutParam: {}
    }
  },
  mounted () {
    this.initMap()
  },
  beforeDestroy () {
    this.map.destroy()
  },
  methods: {
    initMap () {
      AMapLoader.load({
        key: 'cee80c95a293c75acca346fde8b9477f', // key
        plugins: [
          'AMap.DistrictSearch',
          'AMap.MarkerClusterer',
          'AMap.GeoJSON',
          'AMap.Map3D',
          'AMap.RangingTool'
        ], // 插件
        version: '2.0',
        Loca: {
          // 是否加载 Loca，缺省不加载
          version: '2.0.0' // Loca 版本，缺省 1.3.2
        }
      })
        .then((AMap) => {
          // 地图主体初始化
          let map = new AMap.Map('map', {
            viewMode: '3D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
            pitch: this.pitch,
            zoom: this.zoom, // 初始化地图层级
            center: [106.626639, 37.371343], // 初始化地图中心点
            resizeEnable: true,
            mapStyle: 'amap://styles/dark', // 自定义地图样式  grey,dark,darkblue
            showLabel: false // 不显示地图文字标记
          })
          this.map = map
          let loca = new Loca.Container({
            map: map
          })
          // 地图加载完成事件
          map.on('complete', () => {
            MapControl.map['map'] = map
            MapControl.loca = loca
            MapControl.isLoad['map'] = true
            this.mapLoad()
          })
        })
        .catch((err) => {
          console.log(err)
          throw new Error('加载⾼德地图失败：' + err)
        })
    },
    // 地图加载事件
    mapLoad () {
      this.renderMarker()
      this.$emit('mapComplete')
    },
    renderMarker () {
      const map = MapControl.map['map']
      let MarkerClusterer = new AMap.MarkerClusterer(map, [], {
        gridSize: 20,
        renderMarker: (context) => {
          var markerType = MapControl.getmarkerType(context)
          var url = require('../../../../assets/bigscreen/map-' +
            markerType +
            '.png')
          var content =
            '<div class="mapmarker">' +
            '<img style="width:100%;height:100%" src="' +
            url +
            '" />' +
            '</div>'
          context.marker.setContent(content)
          // 此处为设置标记在地图上的偏移，根据标记物大小处理
          context.marker.setOffset(new AMap.Pixel(-35, -87))
          // 此处为设置标记是否显示在最上方，一般只有选中的标记在最上方
          // context.marker.setTop(top);
          // 此处为设置标记携带的数据，点击事件会使用
          context.marker.setExtData(context)
          // //此处为添加单个标记点击事件
          context.marker.on('click', (ev) => {
            let lng = ev.target.getPosition().lng
            let lat = ev.target.getPosition().lat

            if (document.getElementById('chartT1') !== null) {
              let dom = document.getElementById('chartT1')
              dom.remove()
            }
            let detail = null
            // 获取标记携带的数据
            const extData = ev.target.getExtData()
            // if (extData.data[0].type === 'enterpriseBaseInfo') {
            //   this.openInfowindow([lng, lat], extData)
            // } else
            if (extData.data[0].type === 'sensorDevice') {
              const params = {
                type: extData.data[0].deviceCode,
                id: extData.data[0].id
              }
              this.$http
                .post(
                  '/ecologicalenvironment/ecologicalEnvironmentDetail',
                  params
                )
                .then((res) => {
                  detail = res.data.datas[0]
                  this.$emit('openInfowindow', [lng, lat], extData, detail)
                })
            } else if (extData.data[0].type === 'solidWasteDepot') {
              const params = {
                type: '06',
                id: extData.data[0].id
              }
              this.$http
                .post(
                  '/ecologicalenvironment/ecologicalEnvironmentDetail',
                  params
                )
                .then((res) => {
                  detail = res.data.datas[0]
                  this.$emit('openInfowindow', [lng, lat], extData, detail)
                })
            } else {
              this.$emit('openInfowindow', [lng, lat], extData)
            }
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
    // 打开弹出框
    // openInfowindow (coord, extData) {
    //   const map = MapControl.map['map']
    //   if (this.InfoWindow) {
    //     map.clearInfoWindow()
    //   }
    //   this.markerData = JSON.parse(JSON.stringify(extData.data[0]))
    //   this.InfoWindow = new AMap.InfoWindow({
    //     anchor: 'bottom-center', // 弹出框瞄点位置
    //     isCustom: true, // 使用自定义窗体
    //     offset: new AMap.Pixel(0, 87),
    //     content: this.$refs.infoWindow.$el
    //   })
    //   this.InfoWindow.open(map, coord)
    // },
    // // 关闭弹窗
    // closeInfoWindow () {
    //   if (this.InfoWindow) {
    //     this.map.clearInfoWindow()
    //   }
    // },
    // openTable (param) {
    //   this.popoutTableShow = true
    //   this.popoutParam = param
    // },
    // closePopoutTable () {
    //   this.popoutTableShow = false
    // }
  }
}
</script>
<style>
.mapmarker {
  height: 87px;
  width: 70px;
}
</style>
