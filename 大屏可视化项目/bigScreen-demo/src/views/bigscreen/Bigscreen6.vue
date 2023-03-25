
<style lang="less" scoped>
@import "./Bigscreen6.less";
@import "./commonless.less";
</style>
<template>
  <div>
    <!-- 地图开始 -->
    <aMap
      v-show="!isThreeView"
      style="width: 100vw; height: 100vh"
      @mapComplete="mapComplete"
      @openInfowindow="openInfowindow"
    ></aMap>
    <!-- 三维地图 -->
    <cesiumMap
      ref="cesiumMap"
      v-if="isThreeView"
      @cesiumLoad="cesiumLoad"
      style="width: 100vw; height: 100vh"
    ></cesiumMap>
    <!-- 地图结束 -->
    <!-- 左上角菜单开始 -->
    <Menu :index="6"></Menu>
    <!-- 左上角菜单结束 -->

    <div class="main-container">
      <!-- 顶部开始 -->
      <Header></Header>
      <!-- 左侧开始 -->
      <div class="col2">
        <div
          class="task-container container animate__animated animate__backInLeft"
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">能源监测统计</div>
          </div>
          <Row class="num-container">
            <Col span="8">
              <CountTo
                :startVal="0"
                :endVal="data1.enterpriseNum"
                :duration="countDuration"
                class="num"
              ></CountTo>
              <div class="num-text">监测企业数</div>
            </Col>
            <Col span="8">
              <CountTo
                :startVal="0"
                :endVal="data1.monitoringTypeNum"
                :duration="countDuration"
                class="num"
              ></CountTo>
              <div>监测种类</div>
            </Col>
            <Col span="8">
              <CountTo
                :startVal="0"
                :endVal="data1.monitoringPointNum"
                :duration="countDuration"
                class="num"
              ></CountTo>
              <div>监测点数</div>
            </Col>
          </Row>
        </div>
        <div
          class="
            row3
            container
            animate__animated animate__backInLeft animate__slow
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">每月能耗统计(一年内)</div>
          </div>
          <div class="search-container">
            <div class="btns">
              <div
                @click="handleWork(1)"
                :class="active == 1 ? 'active' : ''"
                class="btn"
              >
                电能
              </div>
              <div
                @click="handleWork(2)"
                :class="active == 2 ? 'active' : ''"
                class="btn"
              >
                水能
              </div>
              <div
                @click="handleWork(3)"
                :class="active == 3 ? 'active' : ''"
                class="btn"
              >
                蒸汽
              </div>
              <div
                @click="handleWork(4)"
                :class="active == 4 ? 'active' : ''"
                class="btn"
              >
                天然气
              </div>
            </div>
            <Select
              class="select"
              v-model="energyCompany1"
              placeholder="全部"
              clearable
            >
              <Option
                v-for="item in enterpriseList"
                :value="item.name"
                :key="item.id"
                :title="item.name"
                >{{ item.name }}</Option
              >
            </Select>
          </div>

          <charts class="chart" :options="chartOption1" :id="'chart1'" />
        </div>

        <div
          class="
            range-container
            container
            animate__animated animate__backInLeft animate__slower
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">每月综合能耗统计（一年内）</div>
          </div>
          <Select
            class="select"
            v-model="energyCompany2"
            placeholder="全部"
            clearable
          >
            <Option
              v-for="item in enterpriseList"
              :value="item.name"
              :key="item.id"
              :title="item.name"
              >{{ item.name }}</Option
            >
          </Select>
          <Row>
            <Col span="24">
              <charts class="chart" :options="chartOption2" :id="'chart2'" />
            </Col>
          </Row>
        </div>
      </div>
      <!-- 左侧结束 -->
      <!-- 中间开始 -->
      <div class="col3">
        <div class="tool-container animate__animated animate__backInDown"></div>
        <div
          class="topCheckbox container animate__animated animate__backInDown"
        >
          <!-- 企业图例 -->
          <div class="checkBoxs">
            <div class="checkList">
              <div @click="clickMap(4)" class="check busnissGroup">
                <div class="checkIcon" :class="{ checked: checkBox1[4] }"></div>
                <span>封闭化</span>
              </div>
              <div @click="clickMap(0)" class="check busnissGroup">
                <div class="checkIcon" :class="{ checked: checkBox1[0] }"></div>
                <span>道路</span>
              </div>
              <div @click="clickMap(1)" class="check busnissGroup">
                <div class="checkIcon" :class="{ checked: checkBox1[1] }"></div>
                <span>企业用地</span>
              </div>
              <div @click="clickMap(2)" class="check busnissGroup">
                <div class="checkIcon" :class="{ checked: checkBox1[2] }"></div>
                <span>绿地</span>
              </div>
              <div @click="clickMap(3)" class="check busnissGroup">
                <div class="checkIcon" :class="{ checked: checkBox1[3] }"></div>
                <span>水源</span>
              </div>
            </div>
          </div>
          <!-- 测距 -->
          <div class="checkList1" v-show="!isThreeView" style="margin: 0 0.5vw">
            <div
              class="btnBg"
              :class="{ btnBgCheck: isOpenDistance }"
              @click="distanceMeasure()"
            >
              <div class="screen2"></div>
              <span>{{ isOpenDistance ? "清除" : "测距" }}</span>
            </div>
          </div>
          <div class="checkList1">
            <div
              @click="isThreeView = false"
              class="btnBg"
              :class="{ btnBgCheck: !isThreeView }"
            >
              <div class="screen"></div>
              <span>卫星地图</span>
            </div>
            <div
              @click="isThreeView = true"
              class="btnBg"
              :class="{ btnBgCheck: isThreeView }"
            >
              <div class="screen1"></div>
              <span>三维地图</span>
            </div>
          </div>
        </div>
        <!-- 底部图层选择 -->
        <div
          class="bottomCheckbox container animate__animated animate__backInUp"
        >
          <div class="titleHeader">图例</div>
          <div class="line"></div>
          <div class="checkBoxs">
            <div class="checkList">
              <div @click="clickThis(0)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[0] }"
                ></span>
                <span class="checkLabel r40">园区企业</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 中间结束 -->
      <!-- 右侧开始 -->
      <div class="col4">
        <div
          class="
            weather-container
            container
            animate__animated animate__backInDown animate__slower
          "
        >
          <div class="weather">
            <div>{{ date }}</div>
            <div>{{ weekday }}</div>
            <div>{{ time }}</div>
          </div>
        </div>
        <div
          class="
            table-container
            container
            animate__animated animate__backInRight
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">园区每月总产值统计（一年内）</div>
          </div>
          <charts class="chart1" :options="chartOption3" :id="'chart3'" />
        </div>
        <div
          class="
            table-container
            container
            animate__animated animate__backInRight animate__slow
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">园区企业能耗占比（一年内）</div>
          </div>
          <charts class="chart1" :options="chartOption4" :id="'chart4'" />
        </div>
        <div
          class="
            table-container
            container
            animate__animated animate__backInRight animate__slower
          "
        >
          <div class="container-title popout">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">企业综合能耗TOP5排行（一年内）</div>
          </div>
          <charts class="chart" :options="chartOption5" :id="'chart5'" />
        </div>
        <div
          class="
            table-container
            container
            animate__animated animate__backInRight animate__slower
          "
        >
          <div class="container-title popout">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">每月企业单位产值综合能耗TOP5排行</div>
          </div>
          <charts class="chart" :options="chartOption6" :id="'chart6'" />
        </div>
      </div>
      <!-- 右侧结束 -->
    </div>
    <InfoWindow
      ref="infoWindow"
      :markerData="markerData"
      @openTable="openTable"
      @close="closeInfoWindow"
      v-show="infowindowShow"
    ></InfoWindow>
  </div>
</template>

<script>
import moment from 'moment'
// import BigscreenFooter from './components/bigscreen-footer/BigscreenFooter.vue'
import Menu from './components/menu/Menu.vue'
import Header from './components/header/Header.vue'
import charts from '../components/charts.vue'
import * as echarts from 'echarts'
// import AMap from 'AMap'
import aMap from './components/amap/amap.vue'
import cesiumMap from './components/cesium/cesiumMap.vue'
import { MapControl } from './components/amap/api/amapControl'
import geoJson from './gyq.js'
import {
  consumptionStatistics,
  comprehensiveConsumptionCount,
  getEnterpriseBaseInfoList,
  productOutputValueCount,
  monitoringCount,
  consumptionRate,
  consumptionTop5,
  consumptionTop5ByMonth
} from './api/index'
import CountTo from 'vue-count-to'
const weekdayList = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
]
export default {
  components: {
    charts,
    Menu,
    Header,
    CountTo,
    aMap,
    cesiumMap,
    InfoWindow: () => import('./components/amap/components/InfoWindow.vue')
  },
  data() {
    return {
      // 数字滚动的时长
      countDuration: 8000,
      map: null,
      mapData: null,
      // 右上角日期和时间
      date: null,
      weekday: null,
      time: null,
      // 图层选择
      checkBox: [true],
      data1: {
        enterpriseNum: 0,
        monitoringTypeNum: 0,
        monitoringPointNum: 0
      },
      checkBox1: [true, true, true, true, true],
      chartData1: {
        category: [],
        data1: [],
        data2: [],
        data3: []
      },
      chartData2: {
        category: [],
        data1: [],
        data2: [],
        data3: []
      },
      chartData3: {
        category: [],
        data: []
      },
      chartData4: [],
      chartData5: {
        category: [],
        data: []
      },
      chartData6: {
        category: [],
        data: []
      },
      // 企业下拉
      enterpriseList: [],
      // 每月能耗统计(一年内)
      active: 1,
      energyCompany1: null,
      energyCompany2: null,
      isOpenDistance: false,
      // 三维切换
      isThreeView: false,
      popoutTableShow1: false,
      viewer: {}, // cesium对象
      handler: null, // cesium事件
      divcontent: null, // cesium弹窗
      markerData: {},
      popoutParam: {},
      infowindowShow: false,
      dlThreePlg: {},
      dkThreePlg: {},
      sxThreePlg: {},
      ldThreePlg: {},
      fbhThreePlg: {}
    }
  },
  mounted() {
    this.getEnterpriseBaseInfoList()
    this.initData1()
    this.initChartData1()
    this.initChartData2()
    this.initChartData3()
    this.initChartData4()
    this.initChartData5()
    this.initChartData6()
    this.date = moment(new Date()).format('YYYY年MM月DD日')
    this.weekday = weekdayList[moment().weekday() - 1]
    this.time = moment(new Date()).format('HH:mm')
    setInterval(() => {
      this.time = moment(new Date()).format('HH:mm')
    }, 60000)
    // 弹出框关闭事件
    window.closeInfoWindow = () => {
      this.closeInfoWindow()
    }
  },
  methods: {
    getDictionaries(str) {
      return str.split('|')[3]
    },
    getEnterpriseBaseInfoList() {
      getEnterpriseBaseInfoList().then((res) => {
        let data = res.data.datas[0]
        data.forEach((item) => {
          let lnglat = []
          lnglat.push(item.longitude, item.latitude)
          item.lnglat = lnglat
          item.type = 'enterpriseEnergyInfo'
        })
        this.enterpriseList = data
      })
    },
    // 能源监测统计
    initData1() {
      monitoringCount().then((res) => {
        let result = res.data.datas[0]
        this.data1 = result
      })
    },
    initChartData1() {
      if (this.energyCompany1 === '') {
        // watch的时候,energyCompany1会先变为''再变为undefined
        return
      }
      let deviceType = ''
      if (this.active === 1) {
        // 电能
        deviceType = '02'
      } else if (this.active === 2) {
        // 水能
        deviceType = '01'
      } else if (this.active === 3) {
        // 蒸汽
        deviceType = '04'
      } else if (this.active === 4) {
        // 天然气
        deviceType = '03'
      }
      consumptionStatistics({
        deviceType: deviceType,
        enterpriseName: this.energyCompany1
      }).then((res) => {
        let result = res.data.datas[0]
        let data = {}
        data.category = result.month.map((v) => {
          return v.substr(5, 2).replace(/^0/g, '') + '月'
        })
        data.data1 = result.totalList.map((v) => {
          return Number(v)
        })
        data.data2 = result.monthTotalRateList.map((v) => {
          return Number(v.substr(0, v.length - 1))
        })
        data.data3 = result.yearTotalRateList.map((v) => {
          return Number(v.substr(0, v.length - 1))
        })
        this.chartData1 = data
      })
    },
    initChartData2() {
      comprehensiveConsumptionCount({
        enterpriseName: this.energyCompany2
      }).then((res) => {
        let result = res.data.datas[0]
        let data = {}
        data.category = result.month.map((v) => {
          return v.substr(5, 2).replace(/^0/g, '') + '月'
        })
        data.data1 = result.standardCoalList.map((v) => {
          return Number(v)
        })
        data.data2 = result.monthStandardCoalRateList.map((v) => {
          return Number(v.substr(0, v.length - 1))
        })
        data.data3 = result.yearStandardCoalRateList.map((v) => {
          return Number(v.substr(0, v.length - 1))
        })
        this.chartData2 = data
      })
    },
    initChartData3() {
      productOutputValueCount().then((res) => {
        let result = res.data.datas[0]
        let category = []
        let data = []
        result.forEach((v) => {
          category.push(
            v.statisticsDate.substr(5, 2).replace(/^0/g, '') + '月'
          )
          data.push(v.outputValue)
        })
        this.chartData3 = {
          category,
          data
        }
      })
    },
    initChartData4() {
      consumptionRate().then((res) => {
        let result = res.data.datas[0]
        let data = []
        Object.keys(result).forEach((v) => {
          data.push({
            name: v,
            value: Number(result[v])
          })
        })
        this.chartData4 = data
      })
    },
    initChartData5() {
      consumptionTop5().then((res) => {
        let result = res.data.datas[0].reverse()
        let category = []
        let data = []
        result.forEach((v) => {
          category.push(v.enterpriseName)
          data.push(v.total)
        })
        this.chartData5 = {
          category,
          data
        }
      })
    },
    initChartData6() {
      consumptionTop5ByMonth({
        date: moment(new Date()).format('YYYY-MM')
      }).then((res) => {
        let result = res.data.datas[0].reverse()
        let category = []
        let data = []
        result.forEach((v) => {
          category.push(v.enterpriseName)
          data.push(v.total)
        })
        this.chartData6 = {
          category,
          data
        }
      })
    },
    // 地图完成加载
    mapComplete() {
      MapControl.addTdtwms()
      MapControl.addyqlines()
      setTimeout(() => {
        MapControl.clickClusterer() // 注册聚合点点击事件
        // 获取地图上的定位点
        this.drawArea()
        this.initMapData()
      }, 6000)
    },
    // 园区范围面绘制
    drawArea() {
      MapControl.drawGeojson(geoJson, this.checkBox1)
      if (this.isThreeView) {
        this.showHideThreePlg()
      }
    },
    // 测距
    distanceMeasure() {
      this.isOpenDistance = !this.isOpenDistance
      if (!this.isThreeView) {
        MapControl.addDistance(this.isOpenDistance)
      } else {
        if (this.isOpenDistance) {
          this.$refs['cesiumMap'].draw('Polyline')
        } else {
          this.$refs['cesiumMap'].clearAllDrawn()
        }
      }
    },
    // 园区范围面显隐控制
    clickMap(key) {
      this.checkBox1[parseInt(key)] = !this.checkBox1[parseInt(key)]
      this.$forceUpdate()
      this.drawArea()
    },
    // 图例点击事件
    clickThis(key) {
      let list = JSON.parse(JSON.stringify(this.checkBox))
      list[parseInt(key)] = !list[parseInt(key)]
      this.checkBox = list
      this.initMapData()
    },
    initMapData() {
      let data = []
      let data1 = []
      this.enterpriseList.forEach((item) => {
        switch (item.type) {
          case 'enterpriseEnergyInfo':
            data1.push(item)
            break
          default:
            break
        }
      })
      if (this.checkBox[0]) {
        data = [...data, ...data1]
      }
      if (this.InfoWindow) {
        MapControl.clearInfoWindow()
      }
      if (data.length === 0) {
        MapControl.MarkerClusterer.setData([])
        MapControl.initScatterData([])
      } else {
        MapControl.MarkerClusterer.setData(data)
        MapControl.initScatterData(data)
      }
      if (this.isThreeView) {
        this.cesiumDraw(data)
      }
    },
    // 初始化弹出框功能
    openInfowindow(coord, extData) {
      const map = MapControl.map['map']
      // 判断是否存在弹出框
      if (this.InfoWindow) {
        map.clearInfoWindow()
      }
      let data = extData.data[0]
      var content = ''

      content = MapControl.getContent(data)
      this.InfoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center', // 弹出框瞄点位置
        isCustom: true, // 使用自定义窗体
        offset: new AMap.Pixel(0, -87),
        content: content
      })
      this.InfoWindow.open(map, coord)
      coord = [coord[0], coord[1] + 0.00025]
      map.setZoomAndCenter(20, coord)
    },
    handleWork(num) {
      this.active = num
      this.initChartData1()
    },
    // 园区企业信息
    openTable(param) {
      this.popoutTableShow1 = true
      this.popoutParam = param
    },
    // 关闭弹窗
    closeInfoWindow() {
      if (this.InfoWindow) {
        const map = MapControl.map['map']
        map.clearInfoWindow()
      }
      if (this.isThreeView) {
        this.clearCesiumPopup()
      }
      this.infowindowShow = false
    },
    /* cesium 相关方法--start */
    // cesium加载完成
    cesiumLoad(viewer, handler) {
      this.viewer = viewer
      this.handler = handler

      this.initMapData()
      this.leftDownAction()
      setTimeout(() => {
        this.addGeojson()
      }, 500)
    },
    // 点位点位绘制
    cesiumDraw(data) {
      let viewer = this.viewer
      viewer.entities.removeAll()
      if (data.length > 0) {
        data.forEach((item) => {
          MapControl.addCesiumPoint(item, viewer)
        })
      }
    },
    // 注册左键点击事件
    leftDownAction() {
      let handler = this.handler
      let viewer = this.viewer
      handler.setInputAction((movement) => {
        var picked = viewer.scene.pick(movement.position)
        if (Cesium.defined(picked) && picked.id.id) {
          let data = picked.id.monitoItems.data
          this.getleftAction(data)
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    // 获取图标点击事件
    getleftAction(data) {
      this.clearCesiumPopup()
      // 判断返回类型，是否显示地图弹窗
      if (data.type === 'riskPoint') {
        this.popoutRiskPoint(data)
        return
      }
      this.Popupposition(data)
    },
    // 弹窗加载
    Popupposition(data) {
      let viewer = this.viewer
      this.divcontent = document.createElement('div')
      let divcontent = this.divcontent
      // 获取弹窗样式
      var content = ''
      // 判断是否是其他类型弹窗
      if (data.type === 'enterpriseBaseInfo') {
        this.markerData = JSON.parse(JSON.stringify(data))
        divcontent.appendChild(this.$refs.infoWindow.$el)
        this.infowindowShow = true
      } else {
        content = MapControl.getContent(data)
        divcontent.innerHTML = content
      }
      MapControl.addCesiumPupop(data, viewer, divcontent)
    },
    // 清除cesium弹窗
    clearCesiumPopup() {
      if (this.divcontent) {
        var parent = this.divcontent.parentElement
        parent.removeChild(this.divcontent)
        this.viewer.scene.postRender.removeEventListener(
          this.Popupposition,
          this
        )
        this.divcontent = null
      }
    },
    // 添加Geojson数据
    addGeojson() {
      let res = Cesium.GeoJsonDataSource.load(geoJson, {
        clampToGround: true
      })
      let viewer = this.viewer
      this.dlThreePlg = new Cesium.Entity()
      this.dkThreePlg = new Cesium.Entity()
      this.sxThreePlg = new Cesium.Entity()
      this.ldThreePlg = new Cesium.Entity()
      this.fbhThreePlg = new Cesium.Entity()
      let that = this
      res.then((dataSource) => {
        viewer.dataSources.add(dataSource)
        let entities = dataSource.entities.values
        let colorHash = {}
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i]
          let name = entity._properties._type._value
          let color = colorHash[name] // 可以使两个同名要素使用同一种颜色。。。
          if (!color) {
            let colorObj = {
              道路: '#663bb7',
              地块: '#c78c0e',
              水系: '#1cc5ec',
              绿地: '#4cb051',
              封闭化: '#ff0000',
              其他: '#4cb051'
            }
            let opacity = 0.8
            color = Cesium.Color.fromCssColorString(colorObj[name])
            if (name === '其他') {
              opacity = 0
            }
            color = color.withAlpha(opacity)
            colorHash[name] = color
          }
          entity.polygon.material = color // 设置要素颜色
          entity.polygon.outline = false
          if (name === '道路') {
            entity.parent = that.dlThreePlg
          } else if (name === '地块') {
            entity.parent = that.dkThreePlg
          } else if (name === '水系') {
            entity.parent = that.sxThreePlg
          } else if (name === '绿地') {
            entity.parent = that.ldThreePlg
          } else if (name === '封闭化') {
            entity.parent = that.fbhThreePlg
          }
        }
      })
      this.showHideThreePlg()
    },
    // 控制三维的范围面显示隐藏
    showHideThreePlg() {
      this.dlThreePlg.show = this.checkBox1[0]
      this.dkThreePlg.show = this.checkBox1[1]
      this.ldThreePlg.show = this.checkBox1[2]
      this.sxThreePlg.show = this.checkBox1[3]
      this.fbhThreePlg.show = this.checkBox1[4]
    }

    /* cesium 相关方法--end */
  },
  computed: {
    chartOption1() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff'
          }
        },
        color: [
          'rgba(39, 190, 255, 1)',
          'rgba(255, 169, 39, 1)',
          'rgba(255, 39, 76, 1)'
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: [
          {
            type: 'value',
            name: '单位:KW·H',
            nameTextStyle: {
              color: '#fff'
            },
            axisLabel: {
              color: '#fff',
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                width: 0
              }
            },
            splitLine: {
              lineStyle: {
                color: '#4F6B83',
                type: 'dashed'
              }
            }
          },
          {
            type: 'value',
            axisLabel: {
              color: '#fff',
              formatter: '{value}%'
            },
            axisLine: {
              lineStyle: {
                width: 0
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: {
          type: 'category',
          data: this.chartData1.category,
          axisLabel: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '能耗',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: this.chartData1.data1
          },
          {
            name: '环比增长率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: this.chartData1.data2
          },
          {
            name: '同比增长率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: this.chartData1.data3
          }
        ]
      }
    },
    chartOption2() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff'
          }
        },
        color: [
          'rgba(39, 190, 255, 1)',
          'rgba(255, 169, 39, 1)',
          'rgba(255, 39, 76, 1)'
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: [
          {
            type: 'value',
            name: '单位:t(标煤)',
            nameTextStyle: {
              color: '#fff'
            },
            axisLabel: {
              color: '#fff',
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                width: 0
              }
            },
            splitLine: {
              lineStyle: {
                color: '#4F6B83',
                type: 'dashed'
              }
            }
          },
          {
            type: 'value',
            axisLabel: {
              color: '#fff',
              formatter: '{value}%'
            },
            axisLine: {
              lineStyle: {
                width: 0
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: {
          type: 'category',
          data: this.chartData2.category,
          axisLabel: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '能耗',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: this.chartData2.data1
          },
          {
            name: '环比增长率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: this.chartData2.data2
          },
          {
            name: '同比增长率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: this.chartData2.data3
          }
        ]
      }
    },
    chartOption3() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '100',
          right: '20',
          bottom: '20',
          top: '30'
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#fff'
            },
            data: this.chartData3.category
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1,
            name: '单位：万元',
            nameTextStyle: {
              color: '#BEE4FF',
              fontSize: 14
            },
            axisLabel: {
              color: '#BEE4FF',
              fontSize: 16
            },
            axisLine: {
              lineStyle: {
                width: 0
              }
            },
            splitLine: {
              lineStyle: {
                color: '#4F6B83',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '储量',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              borderRadius: [5, 5, 0, 0],
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: '#A6E1FF' // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: '#4BD2FF' // 60% 处的颜色
                  }
                ],
                false
              )
            },
            data: this.chartData3.data
          }
        ]
      }
    },
    chartOption4() {
      return {
        color: [
          new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(255, 255, 0, 1)'
              },
              {
                offset: 1,
                color: 'rgba(221, 214, 0, 1)'
              }
            ],
            false
          ),
          new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(118, 255, 224, 1)'
              },
              {
                offset: 1,
                color: 'rgba(33, 208, 148, 1)'
              }
            ],
            false
          ),
          new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(91, 184, 241, 1)'
              },
              {
                offset: 1,
                color: 'rgba(33, 124, 208, 1)'
              }
            ],
            false
          ),
          new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(255, 200, 12, 1)'
              },
              {
                offset: 1,
                color: 'rgba(251, 147, 10, 1)'
              }
            ],
            false
          )
        ],
        legend: {
          orient: 'vertical',
          right: 0,
          top: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '水利重点工程',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            itemStyle: {
              borderRadius: 6
            },
            data: this.chartData4,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              color: '#fff',
              formatter: '{b}\n{c}%'
            }
          }
        ]
      }
    },
    chartOption5() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                '<br/>' +
                params[i].marker +
                params[i].seriesName +
                ' : ' +
                params[i].value +
                't（标煤）'
            }
            return relVal
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData5.category,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          nameTextStyle: {
            color: 'white'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        grid: {
          top: '5%',
          left: '10%',
          right: '5%',
          bottom: '5%'
        },
        series: [
          {
            name: '能耗',
            data: this.chartData5.data,
            type: 'bar',
            barWidth: 14,
            label: {
              show: true,
              formatter: '{b}',
              color: '#fff',
              position: [10, -15],
              fontSize: 14
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#2AABF8'
                },
                {
                  offset: 1,
                  color: '#1799E5'
                }
              ]),
              borderRadius: 50
            }
          }
        ]
      }
    },
    chartOption6() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData6.category,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          nameTextStyle: {
            color: 'white'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        grid: {
          top: '5%',
          left: '10%',
          right: '5%',
          bottom: '5%'
        },
        series: [
          {
            name: '能耗',
            data: this.chartData6.data,
            type: 'bar',
            barWidth: 14,
            label: {
              show: true,
              formatter: '{b}',
              color: '#fff',
              position: [10, -15],
              fontSize: 14
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#2AABF8'
                },
                {
                  offset: 1,
                  color: '#1799E5'
                }
              ]),
              borderRadius: 50
            }
          }
        ]
      }
    }
  },
  watch: {
    energyCompany1() {
      this.initChartData1()
    },
    energyCompany2() {
      this.initChartData2()
    }
  }
}
</script>

<style>
</style>
