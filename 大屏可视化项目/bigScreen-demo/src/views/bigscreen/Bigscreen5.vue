
<style lang="less" scoped>
@import "./Bigscreen5.less";
@import "./commonless.less";
</style>
<template>
  <div>
    <PopoutTable
      :popoutTableShow="popoutTableShow"
      :columns="popoutTableColumn"
      :tableData="popoutTableData"
      :total="popoutTableTotal"
      :title="popoutTableTitle"
      @close="popoutTableClose"
      @pageChange="popoutTablePageChange"
    />
    <PopoutVideo
      :popoutVideoShow="popoutVideoShow"
      :cameraUrl="cameraUrl"
      @fullscreen="fullcameraUrl=cameraUrl;popoutVideoFullScreenShow = true"
      @close="popoutVideoShow = false"
    />
    <PopoutfbVideoSelect
      :popoutVideoSelectShow="popoutVideoSelectShow"
      :cameraUrl="cameraUrl"
      @fullscreen="videoclosefull"
      @close="videoclose"
    />
    <popout-video-full-screen
      style="z-index: 4"
      :show="popoutVideoFullScreenShow"
      :cameraUrl="fullcameraUrl"
      @close="popoutVideoFullScreenShow = false"
    ></popout-video-full-screen>
    <popout-enterprise-table
      :popoutTableShow="popoutTableShow1"
      :param="popoutParam"
      :enterpriseAllInfo="markerData"
      @close="popoutTableShow1 = false"
    ></popout-enterprise-table>
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
    <Menu :index="5"></Menu>
    <!-- 左上角菜单结束 -->

    <div class="main-container">
      <!-- 顶部开始 -->
      <Header></Header>
      <!-- 左侧开始 -->
      <div class="col2">
        <div
          class="
            range-container
            container
            animate__animated animate__backInLeft
          "
        >
          <div
            class="container-title"
            @click="popoutTable7"
            style="cursor: pointer"
          >
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">出入园实时动态</div>
            <img src="@/assets/bigscreen/bartz.png" class="task-img" />
          </div>
          <div class="item">
            <div class="img-container">
              <div class="detail in">
                <img src="@/assets/bigscreen/ICON-arrow-down.png" />入园
              </div>
              <vue-seamless-scroll
                :data="realTimeDynamic.in"
                :class-option="options"
                class="seamless-warp"
                style="height: 100%"
              >
                <div v-for="(item, index) of realTimeDynamic.in" :key="index">
                  <div class="name">{{ item.vehicleNo }}</div>
                  <div class="location">
                    <div>{{ item.sentryName }}</div>
                  </div>
                  <div class="time">
                    <div>{{ item.crossTime }}</div>
                  </div>
                </div>
              </vue-seamless-scroll>
            </div>
            <div class="img-container out">
              <div class="detail out">
                <img src="@/assets/bigscreen/ICON-arrow-UP.png" />出园
              </div>
              <vue-seamless-scroll
                :data="realTimeDynamic.out"
                :class-option="options"
                class="seamless-warp"
                style="height: 100%"
              >
                <div v-for="(item, index) of realTimeDynamic.out" :key="index">
                  <div class="name out">
                    {{ item.vehicleNo }}
                  </div>
                  <div class="location">
                    <div>{{ item.sentryName }}</div>
                  </div>
                  <div class="time">
                    <div>{{ item.crossTime }}</div>
                  </div>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <div
          class="
            table-container
            container
            animate__animated animate__backInLeft animate__slow
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">人/车/危化品入园趋势(近24h)</div>
          </div>
          <Row class="item-container">
            <charts class="chart" :options="alertChartOption" :id="'chart1'" />
          </Row>
        </div>

        <div
          class="
            table-container1
            container
            animate__animated animate__backInLeft animate__slower
          "
        >
        <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">封闭化管理(当日)</div>
          </div>
          <Row>
            <Col span="9">
              <div class="detail-container popout" @click="popoutTable1">
                <img
                  src="@/assets/bigscreen/icon-wxplz.png"
                  alt=""
                  class="img"
                />
                <div>危险品流转量</div>
                <div>
                  <span class="num">{{
                    closedManagement.hazardousChemicals
                  }}</span>
                </div>
                <div class="unit">吨</div>
              </div>
            </Col>
            <Col span="15">
              <Row class="item-container">
                <div class="item popout" @click="popoutTable2">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-fbgl1.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <div>
                        <span class="num3">{{
                          closedManagement.hazardousChemicalVehicle
                        }}</span>
                        <span> 辆</span>
                      </div>
                      <div>入园危化车</div>
                    </div>
                  </div>
                </div>

                <div class="item popout" @click="popoutTable4">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-fbgl3.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <div>
                        <span class="num3">{{
                          closedManagement.socialVehicle
                        }}</span>
                        <span> 辆</span>
                      </div>
                      <div>入园社会车</div>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <!-- 左侧结束 -->
      <!-- 中间开始 -->
      <div class="col3">
        <div class="tool-container animate__animated animate__backInDown">
          <div class="search-container container">
            <input type="text" placeholder="输入关键字" v-model="keyword" />
            <img
              src="@/assets/search.png"
              alt=""
              class="img"
              @click="queryEquipt"
            />
          </div>
          <div v-show="state" class="carChoose container">
            <div v-for="(o, idx) in list" :key="idx">
              <div class="carNum" @click="chooseEquipt(o)">{{ o.name }}</div>
            </div>
          </div>
        </div>
        <div
          class="topCheckbox container animate__animated animate__backInDown"
        >
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
                <span class="checkLabel r15">卡口</span>
              </div>
              <div @click="clickThis(1)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[1] }"
                ></span>
                <span class="checkLabel r16">危化品停车场</span>
              </div>
              <div @click="clickThis(2)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[2] }"
                ></span>
                <span class="checkLabel r24">园区企业</span>
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
            video-container
            container
            animate__animated animate__backInRight
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt class="img" />
            <div class="title">重点卡口监控</div>
          </div>
          <div class="item-container">
            <div class="item">
              <div
                class="img-container popout"
                @click="PopoutfbVideoSelect(cameraUrl1, 1)"
              >
                <CameraItem
                  class="video"
                  :url="cameraUrl1"
                  ref="cameraItem"
                ></CameraItem>
              </div>
              <div
                class="img-container popout"
                @click="PopoutfbVideoSelect(cameraUrl2, 2)"
              >
                <CameraItem
                  class="video"
                  :url="cameraUrl2"
                  ref="cameraItem"
                ></CameraItem>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            ecology-container
            container
            animate__animated animate__backInRight animate__slow
          "
        >
        <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">车辆违规记录</div>
          </div>
          <Row>
            <div class="table1">
              <div class="thead">
                <div>序号</div>
                <div>车牌</div>
                <div>违规类型</div>
                <div>抓拍时间</div>
              </div>
              <vue-seamless-scroll
                :data="carviolateList"
                :class-option="options"
                class="seamless-warp"
              >
                <div
                  v-for="(item, index) in carviolateList"
                  :key="index"
                  class="tbody"
                >
                  <div>{{ index + 1 }}</div>
                  <div>{{ item.trancarLicense }}</div>
                  <div>{{ item.violateType.split("|")[3] }}</div>
                  <div>{{ item.alarmStartime }}</div>
                </div>
              </vue-seamless-scroll>
            </div>
          </Row>
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
    <vehiclePlayback
     :show="vehiclePlaybackShow"
      @close="carRouteHide"
@sliderChange="sliderChange"
      :startTime="routeStartTime"
      :endTime="routeEndTime"
    ></vehiclePlayback>
  </div>
</template>

<script>
import moment from 'moment'
import Menu from './components/menu/Menu.vue'
import Header from './components/header/Header.vue'
import charts from '../components/charts.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
import * as echarts from 'echarts'
import geoJson from './gyq.js'
import aMap from './components/amap/amap.vue'
import cesiumMap from './components/cesium/cesiumMap.vue'
import { MapControl } from './components/amap/api/amapControl'
import CameraItem from '../components/camera-item.vue'
import PopoutTable from './components/popout/PopoutTable.vue'
import PopoutVideo from './components/popout/PopoutVideo.vue'
import PopoutVideoFullScreen from './components/popout/PopoutVideoFullScreen.vue'
import PopoutfbVideoSelect from './components/popout/PopoutfbVideoSelect.vue'
import {
  hazardousChemicalsPage,
  socialVehiclePage,
  blockparkChemicalcarPage,
  operatorsPage,
  locationAlarmPage,
  getVehicleInOutList,
  getCarLocationInfo,
  vehicleInOutPage
} from './api/index'
import PopoutEnterpriseTable from './components/popout/enterprise/PopoutEnterpriseTable.vue'
import vehiclePlayback from './components/vehicle/vehiclePlayback.vue'

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
    vueSeamlessScroll,
    PopoutTable,
    CameraItem,
    aMap,
    cesiumMap,
    PopoutVideo,
    PopoutVideoFullScreen,
    PopoutfbVideoSelect,
    PopoutEnterpriseTable,
    vehiclePlayback,
    InfoWindow: () => import('./components/amap/components/InfoWindow.vue')
  },
  data() {
    return {
      routeStartTime: null,
      routeEndTime: null,
      vehiclePlaybackShow: false,
      cameraUrl1: '',
      cameraUrl2: '',
      fullcameraUrl: '',
      options: {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      },
      map: null,
      mapData: null,
      // 图层选择
      checkBox: [true, true, true],
      checkBox1: [true, true, true, true, true],
      keyword: '', // 设备编号关键字
      state: false,
      list: [],
      alertChartData1: [],
      alertChartData2: [],
      alertChartData3: [],
      dangerChartData: [],
      // 轮播图
      carouselValue: 0,
      carouselValue1: 0,
      // 右上角日期和时间
      date: null,
      weekday: null,
      time: null,
      realTimeDynamic: {
        in: [],
        out: []
      },
      realTimeList: [],
      closedManagement: {
        hazardousChemicalVehicle: null,
        personnelPositioningAlarm: null,
        socialVehicle: null,
        hazardousChemicals: null,
        operators: null
      },
      carviolateList: [],
      guestsBlackList: [],
      // 弹出框table
      popoutTableShow: false,
      // 记录弹出的是哪一个table
      popoutTableIndex: 0,
      popoutTableTitle: '',
      popoutTableColumn: [],
      popoutTableData: [],
      popoutTableTotal: 0,
      // 分页从0开始
      popoutTablePage: 0,
      popoutTableForm: {},
      // 弹出框video
      popoutVideoShow: false,
      popoutVideoSelectShow: false,
      popoutVideoFullScreenShow: false,
      vidioIndex: 0,
      cameraUrl: '',
      isOpenDistance: false,
      // 三维切换
      isThreeView: false,
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
      fbhThreePlg: {},
      popoutTableShow1: false
    }
  },
  mounted() {
    this.initCameraUrl()
    this.initRealTimeDynamic()
    this.initCarviolateList()
    this.initGuestsBlackList()
    this.initClosedManagement()
    this.initAlertChart()
    this.getCarLocation() // 获取车辆实时位置
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
    // 视频
    window.realTimeVideo = () => {
      this.popoutVideoShow = true
      let id
      let r = Math.random()
      if (r <= 0.25) {
        id = 1
      } else if (r <= 0.5) {
        id = 3
      } else if (r <= 0.75) {
        id = 5
      } else {
        id = 6
      }
      this.$http.get('/bigScreen/getCameraUrl?id=' + id).then((res) => {
        this.cameraUrl = res.data.datas.data.url
      })
    }
    // 出入信息
    window.hisVideo = (id) => {
      this.popoutTable6(id)
    }
  },
  methods: {
    getRoute(item) {
      // this.clearclickThis() 清除图例
      let type = item.inOrOut.split('|')[2]
      // console.log('type', type)
      let startTime
      let endTime
      this.crossTime = item.crossTime
      this.licensePlate = item.vehicleNo
      if (type === '1') {
        // 入园  往后推200分钟
        startTime = this.formatMsToDate(new Date(item.crossTime).getTime())
        endTime = this.formatMsToDate(new Date(item.crossTime).getTime() + 400 * 60 * 1000)
      } else {
        // 出园  往前推200分钟
        startTime = this.formatMsToDate(new Date(item.crossTime).getTime() - 400 * 60 * 1000)
        endTime = this.formatMsToDate(new Date(item.crossTime).getTime())
      }

      this.$http.get('/bigScreen/getHistoricalLocation?licensePlate=' + item.vehicleNo + '&startTime=' + startTime + '&endTime=' + endTime).then((res) => {
        console.log(res.data)
        if (
          res.data
        ) {
          let cv = { a: 1 }
          this.showCarRoute(res.data, cv, 1)
        } else {
          this.$Message.info('未查询到报警时的定位数据')
        }
      })
    },
    showCarRoute(points, cv, speed) {
      if (this.vehiclePlaybackShow) {
        MapControl.clearCarRoute()
      } else {
        this.vehiclePlaybackShow = true
      }
      const lineArr = points.map((v) => {
        return [v.longitude, v.latitude]
      })
      this.lineArr = lineArr
      if (cv.a === 1) {
        this.routeStartTime = moment(points[0].locTime).format('HH:mm')
        this.routeEndTime = moment(points[points.length - 1].locTime).format(
          'HH:mm'
        )
      } else {
        // console.log(points[0].time)
      }
      MapControl.carRoute(lineArr, speed)
    },
    carRouteHide() {
      this.vehiclePlaybackShow = false
      MapControl.clearCarRoute()
    },
    sliderChange(a) {
      // console.log(a)
      let map = {
        0: 1,
        25: 5,
        50: 10,
        75: 50,
        100: 100
      }
      MapControl.clearCarRoute()
      // let lineArr = this.lineArr
      // MapControl.carRoute(lineArr, map[a.val])

      this.getHistoryRoutemod(a.t1, a.t2, map[a.val])
    },
    getHistoryRoutemod(t1, t2, speed) {
      let st =
          this.crossTime.substring(0, 11) + t1 + ':00'
      let et =
          this.crossTime.substring(0, 11) + t2 + ':00'
      this.$http.get('/bigScreen/getHistoricalLocation?licensePlate=' + this.licensePlate + '&startTime=' + st + '&endTime=' + et).then((res) => {
        if (
          res.data
        ) {
          let cv = { a: 2, t1: st, t2: et }
          this.showCarRoute(res.data, cv, speed)
        } else {
          this.$Message.info('未查询到报警时的定位数据')
        }
      })
    },
    // 该方法用于给日期、时间补零
    addZero (num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num
    },

    formatMsToDate (ms) {
      if (ms) {
        var oDate = new Date(ms)
        var oYear = oDate.getFullYear()
        var oMonth = oDate.getMonth() + 1
        var oDay = oDate.getDate()
        var oHour = oDate.getHours()
        var oMin = oDate.getMinutes()
        var oSen = oDate.getSeconds()
        var oTime = oYear + '-' + this.addZero(oMonth) + '-' + this.addZero(oDay) + ' ' + this.addZero(oHour) + ':' +
                this.addZero(oMin) + ':' + this.addZero(oSen)
        return oTime
      } else {
        return ''
      }
    },

    initCameraUrl() {
      this.$http.get('/bigScreen/getCameraList?videoType=2').then((res) => {
        this.cameraUrl1 = res.data.datas[2].url
      })
      this.$http.get('/bigScreen/getCameraList?videoType=2').then((res) => {
        this.cameraUrl2 = res.data.datas[3].url
      })
    },
    PopoutfbVideoSelect (url, index) {
      this.vidioIndex = index
      this.popoutVideoSelectShow = true
      this.cameraUrl = url
    },
    videoclose(a) {
      this.popoutVideoSelectShow = false
      if (this.vidioIndex === 1) {
        this.cameraUrl1 = a
      } else if (this.vidioIndex === 2) {
        this.cameraUrl2 = a
      }
      this.vidioIndex = 0
    },
    videoclosefull(e) {
      this.fullcameraUrl = e
      this.popoutVideoFullScreenShow = true
    },
    // 地图完成加载
    mapComplete() {
      MapControl.addTdtwms()
      MapControl.addyqlines()
      setTimeout(() => {
        MapControl.clickClusterer() // 注册聚合点点击事件
        this.drawArea()
        this.getMapPoint() // 获取地图上的定位点
      }, 6000)
    },
    // 园区范围面绘制
    drawArea() {
      MapControl.drawGeojson(geoJson, this.checkBox1)
      if (this.isThreeView) {
        this.showHideThreePlg()
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
      this.checkBox[parseInt(key)] = !this.checkBox[parseInt(key)]
      this.$forceUpdate()
      this.initMapData()
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
    // 获取地图上的定位点
    getMapPoint() {
      const data = {
        type: '1,2,3'
      }
      this.$http.post('/bigScreen/closedPark', data).then((res) => {
        if (res.data.code === 0) {
          res.data.datas[0].blockparkParkinglot.forEach((item) => {
            item.type = 'blockparkParkinglot'
            item.name = item.parkingName
          })
          res.data.datas[0].blockparkSentrymanage.forEach((item) => {
            item.type = 'blockparkSentrymanage'
            item.name = item.sentryName
          })
          res.data.datas[0].enterpriseBaseInfo.forEach((item) => {
            item.type = 'enterpriseBaseInfo'
            item.name = item.entprName
          })
          let data = [
            ...res.data.datas[0].blockparkParkinglot,
            ...res.data.datas[0].blockparkSentrymanage,
            ...res.data.datas[0].enterpriseBaseInfo
          ]
          data.forEach((item) => {
            let lnglat = []
            lnglat.push(item.longitude, item.latitude)
            item.lnglat = lnglat
          })
          this.mapData = data
          this.initMapData()
        } else {
          this.$Message.info(res.message)
          this.mapData = []
          this.initMapData()
        }
      })
    },
    initMapData() {
      let data = []
      let data1 = []
      let data2 = []
      let data3 = []
      this.mapData.forEach((item) => {
        switch (item.type) {
          case 'blockparkSentrymanage':
            data1.push(item)
            break
          case 'blockparkParkinglot':
            data2.push(item)
            break
          case 'enterpriseBaseInfo':
            data3.push(item)
            break
          default:
            break
        }
      })
      if (this.checkBox[0]) {
        data = [...data, ...data1]
      }
      if (this.checkBox[1]) {
        data = [...data, ...data2]
      }
      if (this.checkBox[2]) {
        data = [...data, ...data3]
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
      var that = this
      var content = ''

      if (data.type === 'enterpriseBaseInfo') {
        this.markerData = JSON.parse(JSON.stringify(extData.data[0]))
        content = this.$refs.infoWindow.$el
        this.infowindowShow = true
      } else {
        content = MapControl.getContent(data)
      }

      that.InfoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center', // 弹出框瞄点位置
        isCustom: true, // 使用自定义窗体
        offset: new AMap.Pixel(0, -87),
        content: content
      })
      that.InfoWindow.open(map, coord)
    },
    // 根据设备编号查询设备
    queryEquipt(e) {
      console.log(e)
      if (e.keyCode === 13) {
        if (this.list.length > 0) {
          this.chooseEquipt(this.list[0])
        }
        return
      }
      this.list = []
      // console.log(this.keyword)
      let keyword = this.keyword.trim()
      // 循环模拟数据的数组
      if (this.mapData && this.mapData.length > 0) {
        this.mapData.forEach((msg) => {
          if (msg.name.indexOf(keyword) !== -1) {
            // 然后把当前json添加到list数组中
            this.list.push(msg)
          }
        })
      } else {
        return this.$Message.info('暂无数据')
      }
      if (keyword.length > 0 && this.list.length > 0) {
        this.state = true
      } else {
        this.state = false
        this.initMapData()
      }
    },
    // 选择设备
    chooseEquipt(item) {
      console.log(item)
      this.keyword = item.name
      this.state = false
      // 定位到改设备位置
      if (this.InfoWindow) {
        MapControl.clearInfoWindow()
      }
      MapControl.MarkerClusterer.setData([item])
      MapControl.initScatterData([item])
      let lng = item.longitude
      let lat = item.latitude
      // 当前标记居中
      setTimeout(() => {
        MapControl.setZoomAndCenter(22, [lng, lat])
      }, 200)
    },
    // 清楚当前标记
    clearMarker() {
      this.keyword = ''
      this.initMapData()
    },
    // 工具函数，数组两两分组
    groupArr(arr) {
      let temp = []
      let ranm = []
      let zongArr = []
      arr.forEach((item, index) => {
        if (index % 2) {
          temp.push(item)
        } else {
          ranm.push(item)
        }
      })

      ranm.forEach((item, index) => {
        zongArr.push([item, temp[index]])
      })
      return zongArr
    },
    // getCarLocation
    getCarLocation() {
      getCarLocationInfo(this.reportTime)
        .then((res) => {
          if (res.data.code === 0) {
            let data = res.data.datas
            this.reportTime = data[0]
          } else {
            console.log(res.data.message)
          }
          this.pollingST = setTimeout(() => {
            clearTimeout(this.pollingST)
            // this.getCarLocation()
          }, 10000)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initRealTimeDynamic() {
      this.$http.get('/bigScreen/realTimeDynamic').then((res) => {
        let data = res.data.datas
        let inArr = data.in
        let outArr = data.out
        this.realTimeDynamic = {
          in: inArr,
          out: outArr
        }
      })
    },
    initClosedManagement() {
      this.$http.get('/bigScreen/closedManagement').then((res) => {
        this.closedManagement = res.data.datas[0]
      })
    },
    initEcologicalMonitoring() {
      this.$http.get('/bigScreen/ecologicalMonitoring').then((res) => {
        this.ecologicalMonitoring = res.data.datas[0]
      })
    },
    initCarviolateList() {
      this.$http.get('/bigScreen/carviolateList').then((res) => {
        this.carviolateList = res.data.datas[0]
      })
    },
    initGuestsBlackList() {
      this.$http.get('/bigScreen/guestsBlackList').then((res) => {
        this.guestsBlackList = res.data.datas[0]
      })
    },
    initAlertChart() {
      this.$http.get('/bigScreen/enterParkTrend').then((res) => {
        let list = res.data.datas
        // list.person.unshift(0)
        // list.car.unshift(0)
        // list.danger.unshift(0)
        this.alertChartData1 = list.person
        this.alertChartData2 = list.car
        this.alertChartData3 = list.danger
      })
    },
    // 弹出框table
    popoutTableClose() {
      this.popoutTableShow = false
      this.popoutTablePage = 0
    },
    // 分页
    popoutTablePageChange(page) {
      // 后端分页从0开始,所以要减1
      this.popoutTablePage = page - 1
      if (this.popoutTableIndex === 1) {
        this.renderTable1()
      } else if (this.popoutTableIndex === 2) {
        this.renderTable2()
      } else if (this.popoutTableIndex === 3) {
        this.renderTable3()
      } else if (this.popoutTableIndex === 4) {
        this.renderTable4()
      } else if (this.popoutTableIndex === 5) {
        this.renderTable5()
      } else if (this.popoutTableIndex === 6) {
        this.renderTable6()
      } else if (this.popoutTableIndex === 7) {
        this.renderTable7()
      }
    },
    // 危化品流转量列表
    popoutTable1() {
      this.popoutTableShow = true
      this.popoutTableIndex = 1
      this.popoutTableTitle = '危化品流转量列表'
      this.popoutTableColumn = [
        {
          key: 'code',
          title: '运单编号',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'plate',
          title: '车牌号',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'name',
          title: '货物信息',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'load',
          title: '装载货物量(吨)',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'driver',
          title: '驾驶员姓名',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'phone',
          title: '联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable1()
    },
    renderTable1() {
      hazardousChemicalsPage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let code = v.waybillNumber ? v.waybillNumber : '——'
          let plate = v.trancarLicense ? v.trancarLicense : '——'
          let name = v.goodinfo ? v.goodinfo : '——'
          let load = v.tonnage ? v.tonnage : '——'
          let driver = v.driverName ? v.driverName : '——'
          let phone = v.driverMobile ? v.driverMobile : '——'
          data.push({
            code,
            plate,
            name,
            load,
            driver,
            phone
          })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 入园危化车
    popoutTable2() {
      this.popoutTableShow = true
      this.popoutTableIndex = 2
      this.popoutTableTitle = '入园危化品车辆列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '访客名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'plate',
          title: '车牌号',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'phone',
          title: '访客联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'company',
          title: '访问企业',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable2()
    },
    renderTable2() {
      blockparkChemicalcarPage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.visitor ? v.visitor : '——'
          let plate = v.licensePlate ? v.licensePlate : '——'
          let phone = v.visitorTel ? v.visitorTel : '——'
          let company = v.enterpriseName ? v.enterpriseName : '——'
          data.push({
            name,
            plate,
            phone,
            company
          })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 作业人员
    popoutTable3() {
      this.popoutTableShow = true
      this.popoutTableIndex = 3
      this.popoutTableTitle = '作业人员列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '姓名',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'company',
          title: '公司名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'phone',
          title: '联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable3()
    },
    renderTable3() {
      operatorsPage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.employeeName ? v.employeeName : '——'
          let phone = v.moible ? v.moible : '——'
          let company = v.enterpriseName ? v.enterpriseName : '——'
          data.push({
            name,
            phone,
            company
          })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 入园社会车辆
    popoutTable4() {
      this.popoutTableShow = true
      this.popoutTableIndex = 4
      this.popoutTableTitle = '入园社会车辆列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '访客名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'plate',
          title: '车牌号',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'phone',
          title: '访客联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'company',
          title: '访问企业',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable4()
    },
    renderTable4() {
      socialVehiclePage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.visitor ? v.visitor : '——'
          let plate = v.licensePlate ? v.licensePlate : '——'
          let phone = v.visitorTel ? v.visitorTel : '——'
          let company = v.visitorUnit ? v.visitorUnit : '——'
          data.push({
            name,
            plate,
            phone,
            company
          })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    popoutTable5() {
      this.popoutTableShow = true
      this.popoutTableIndex = 5
      this.popoutTableTitle = '人员定位告警列表'
      this.popoutTableColumn = [
        {
          key: 'alertName',
          title: '告警名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'name',
          title: '告警人员',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'company',
          title: '公司名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'phone',
          title: '联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable5()
    },
    renderTable5() {
      locationAlarmPage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let alertName = '——'
          if (v.alarmType) {
            let list = v.alarmType.split('|')
            alertName = list[list.length - 1]
          }
          let name = v.employeeName ? v.employeeName : '——'
          let phone = v.moible ? v.moible : '——'
          let company = v.enterpriseName ? v.enterpriseName : '——'
          data.push({
            alertName,
            name,
            phone,
            company
          })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    popoutVideo(url) {
      this.popoutVideoShow = true
      this.cameraUrl = url
    },
    popoutTable6(id) {
      this.popoutTableShow = true
      this.popoutTableIndex = 6
      this.popoutTableForm = {
        sentryId: id
      }
      this.popoutTableTitle = '岗亭出入信息'
      this.popoutTableColumn = [
        {
          key: 'crossTime',
          title: '时间',
          align: 'center',
          width: 190,
          tooltip: true
        },
        {
          key: 'inOrOut',
          title: '入/出',
          align: 'center',
          minWidth: 10,
          render: (h, params) => {
            return h('div', {}, params.row.inOrOut.split('|')[3])
          }
        },
        {
          key: 'vehicleNo',
          title: '车牌',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'vehicleType',
          title: '车辆类型',
          align: 'center',
          minWidth: 10,
          render: (h, params) => {
            return h('div', {}, params.row.vehicleType.split('|')[3])
          }
        }
      ]
      this.renderTable6()
    },
    renderTable6() {
      getVehicleInOutList({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        this.popoutTableData = []
        if (res.data.code === '0') {
          let data = res.data.data
          this.popoutTableData = data
          this.popoutTableTotal = res.data.count
        }
      })
    },
    // 危化品流转量列表
    popoutTable7() {
      this.popoutTableShow = true
      this.popoutTableIndex = 7
      this.popoutTableTitle = '出入园实时动态'
      this.popoutTableColumn = [
        {
          key: 'crossTime',
          title: '时间',
          align: 'center',
          width: 190,
          tooltip: true
        },
        {
          key: 'vehicleNo',
          title: '车牌',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'inOrOut',
          title: '入/出',
          align: 'center',
          minWidth: 10,
          render: (h, params) => {
            return h('div', {}, params.row.inOrOut.split('|')[3])
          }
        },
        {
          key: 'sentryName',
          title: '位置',
          align: 'center',
          minWidth: 10
        },
        {
          key: 'route',
          title: '历史轨迹',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, params) => {
            // if (params.row.type === '2' || params.row.type === '3') {
            return h(
              'a',
              {
                attrs: {
                  id: params.row.id
                },
                on: {
                  click: () => {
                    // this.carRouteType = 1
                    this.popoutTableShow = false
                    this.vehiclePlaybackShow = true
                    this.getRoute(params.row)
                  }
                }
              },
              '查看'
            )
            // } else {
            //   return h('div', {}, '-')
            // }
          }
        }
      ]
      this.renderTable7()
    },
    renderTable7() {
      vehicleInOutPage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        this.popoutTableData = []
        if (res.data.code === '0') {
          let data = res.data.data
          this.popoutTableData = data
          this.popoutTableTotal = res.data.count
        }
      })
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
    alertChartOption() {
      return {
        legend: {
          data: ['人', '车', '危化品'],
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // name: '时',
          axisLabel: {
            color: 'white',
            fontSize: 14
          },
          data: ['0-4', '4-8', '8-12', '12-16', '16-20', '20-24时'],
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // name: '单位:件',
          nameTextStyle: {
            color: 'white',
            fontSize: 14
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(216, 214, 214, 0.5)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(216, 214, 214, 0.5)',
              type: [2, 2]
            }
          },
          axisLabel: {
            color: 'white'
          }
        },
        grid: {
          top: '20%',
          left: '10%',
          right: '5%',
          bottom: '20%'
        },
        series: [
          {
            name: '人',
            data: this.alertChartData1,
            type: 'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#0F79A6'
                },
                {
                  offset: 1,
                  color: 'rgba(39, 190, 255, 1)'
                }
              ])
            },
            itemStyle: {
              normal: {
                color: 'rgba(39, 190, 255, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(39, 190, 255, 1)'
                }
              }
            }
          },
          {
            name: '车',
            data: this.alertChartData2,
            type: 'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(118, 255, 224, 1)'
                },
                {
                  offset: 1,
                  color: '#16A876'
                }
              ])
            },
            itemStyle: {
              normal: {
                color: '#16A876',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: '#16A876'
                }
              }
            }
          },
          {
            name: '危化品',
            data: this.alertChartData3,
            type: 'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FF802C'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 128, 44, 1)'
                }
              ])
            },
            itemStyle: {
              normal: {
                color: 'rgba(255, 128, 44, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(255, 128, 44, 1)'
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
