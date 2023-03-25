
<style lang="less" scoped>
@import "./Bigscreen7.less";
@import "./commonless.less";
</style>
<template>
  <div>
    <popout-info
      :show="popoutInfoShow"
      @close="popoutInfoShow = false"
      :list="markerList"
    />
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
      v-show="isThreeView"
      style="width: 100vw; height: 100vh"
    ></cesiumMap>
    <!-- 地图结束 -->
    <!-- 左上角菜单开始 -->
    <Menu :index="7"></Menu>
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
            <div class="title">园区管网结构树</div>
          </div>
          <Input
            v-model="treeSearch"
            placeholder="请输入搜索内容"
            clearable
            class="input"
          />
          <Tree
            class="tree-container"
            :data="treeData"
            :render="renderContent"
            show-checkbox
            multiple
            expand-node
            @on-check-change="treeCheckChange"
          ></Tree>
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
          <div class="checkBoxs" >
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
          <div class="checkList1" style="margin: 0 0.5vw">
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
          <!-- 测距 -->
          <!-- <div class="checkList1">
              <div
                class=" btnBg"
                :class="{'btnBgCheck': isOpenDistance}"
                @click="distanceMeasure()"
              >
                <div class="screen2"></div>
                <span>{{isOpenDistance?'清除':'测距'}}</span>
              </div>
          </div> -->
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
          <!-- <div class="weather">
            <img
              src="@/assets/weather.png"
              alt=""
              class="img"
            />
            <div class="text">阴转多云</div>
            <div class="text">24~30℃</div>
          </div> -->
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
            animate__animated animate__backInRight animate__slow
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">管廊类型占比</div>
          </div>
          <charts class="chart1" :options="chartOption1" :id="'chart1'" />
        </div>
        <div
          class="
            table-container
            container
            animate__animated animate__backInRight animate__slower
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">管网用途分类数量</div>
          </div>
          <charts class="chart" :options="chartOption2" :id="'chart2'" />
        </div>
        <div
          class="
            table-container
            container
            animate__animated animate__backInRight animate__slower
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">管网告警</div>
          </div>
          <div class="detail-container">
            <vue-seamless-scroll
              :data="list1"
              :class-option="options"
              class="seamless-warp"
            >
              <Row class="detail" v-for="item in list1" :key="item.id">
                <Col span="4">
                  <div class="button">
                    {{ getDictionaries(item.meterType) }}
                  </div>
                </Col>
                <Col span="16">
                  <div>
                    <span class="title1">{{ item.pipenetName }}</span>
                    <span class="title2">({{ item.pipenetNumber }})</span>
                  </div>
                  <div>
                    <span class="param">告警原因:</span>
                    <span class="value">{{ item.alarmContent }}</span>
                  </div>
                  <div>
                    <span class="param">起止时间:</span>
                    <span
                      >{{ timePipe(item.createdDate, "MM-DD HH:mm") }} -
                      {{ timePipe(item.handleDate, "MM-DD HH:mm") }}</span
                    >
                  </div>
                </Col>
                <Col span="4">
                  <div
                    class="location"
                    @click="openMapInfoWindow(item.meterId)"
                  >
                    <Icon type="md-pin" />定位
                  </div>
                </Col>
              </Row>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
      <!-- 右侧结束 -->
    </div>
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
import geoJson from './gyq.js'
import { MapControl } from './components/amap/api/amapControl'
import {
  pipenetstructure,
  pipenetTypeRate,
  pipenetTypeCount,
  pipenetAlarmList
} from './api/index'
import PopoutInfo from './components/popout/PopoutInfo'
import vueSeamlessScroll from 'vue-seamless-scroll'
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
    aMap,
    PopoutInfo,
    vueSeamlessScroll,
    cesiumMap
  },
  data() {
    return {
      options: {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      },
      map: null,
      mapData: null,
      // 右上角日期和时间
      date: null,
      weekday: null,
      time: null,
      chartData1: [],
      chartData2: {
        category: [],
        data1: [],
        data2: [],
        data3: []
      },
      // 左侧树
      treeSearch: '',
      checkBox1: [true, true, true, true, true],
      originalTreeData: [],
      treeData: [
        {
          title: '园区管网',
          num: 3,
          expand: true,
          checked: true,
          render: (h, { root, node, data }) => {
            return h('span', `${data.title}`)
          },
          children: [
            {
              title: '危化品运输',
              num: 1
            }
          ]
        }
      ],
      // 地图弹窗
      popoutInfoShow: false,
      markerData: {
        pipenetLineList: [],
        pipenetValveList: [],
        pipenetMeterList: []
      },
      markerList: [],
      // 地图所有点位
      originalMarker: [],
      isThreeView: false,
      // 管网告警列表
      list1: []
    }
  },
  mounted() {
    this.initChartData1()
    this.initChartData2()
    this.getTreeData()
    this.initList1()
    this.date = moment(new Date()).format('YYYY年MM月DD日')
    this.weekday = weekdayList[moment().weekday() - 1]
    this.time = moment(new Date()).format('HH:mm')
    setInterval(() => {
      this.time = moment(new Date()).format('HH:mm')
    }, 60000)
  },
  methods: {
    timePipe(timestr, format) {
      return moment(timestr).format(format)
    },
    // 所有管网数据
    getTreeData() {
      pipenetstructure().then((res) => {
        let pipenetLineList = []
        let pipenetValveList = []
        let pipenetMeterList = []
        let result = res.data.datas[0]
        let treeData = [
          {
            title: '园区管网',
            num: 3,
            expand: true,
            checked: true,
            render: (h, { root, node, data }) => {
              return h('span', `${data.title}`)
            },
            children: []
          }
        ]
        let children = []
        Object.keys(result).forEach((key) => {
          // 大类
          let level1 = result[key]
          let children1 = []
          level1.forEach((level2) => {
            // 管网
            let children2 = []
            if (level2.pipenetLineList) {
              level2.pipenetLineList.forEach((level3) => {
                // 管线
                let pipenet = {
                  enterpriseName: level2.enterpriseName,
                  pipenetName: level2.pipenetName,
                  pipenetNumber: level2.pipenetNumber,
                  pipenetType: level2.pipenetType,
                  useCategory: level2.useCategory,
                  tranMedium: level2.tranMedium,
                  mediumName: level2.mediumName,
                  buildDate: level2.buildDate,
                  buildUnit: level2.buildUnit,
                  buildContact: level2.buildContact,
                  buildContactTel: level2.buildContactTel,
                  useDate: level2.useDate,
                  manageUnit: level2.manageUnit,
                  manageContact: level2.manageContact,
                  warrantyMouth: level2.warrantyMouth,
                  warrantyUnit: level2.warrantyUnit,
                  warrantyContact: level2.warrantyContact,
                  warrantyContactTel: level2.warrantyContactTel
                }
                level3.pipenet = pipenet
                pipenetLineList.push(level3)
                let children3 = []
                if (level3.pipenetValveList) {
                  level3.pipenetValveList.forEach((level4) => {
                    // 阀门
                    let pipenet = {
                      enterpriseName: level2.enterpriseName,
                      pipenetName: level2.pipenetName,
                      pipenetNumber: level2.pipenetNumber,
                      pipenetType: level2.pipenetType,
                      useCategory: level2.useCategory,
                      tranMedium: level2.tranMedium,
                      mediumName: level2.mediumName,
                      buildDate: level2.buildDate,
                      buildUnit: level2.buildUnit,
                      buildContact: level2.buildContact,
                      buildContactTel: level2.buildContactTel,
                      useDate: level2.useDate,
                      manageUnit: level2.manageUnit,
                      manageContact: level2.manageContact,
                      warrantyMouth: level2.warrantyMouth,
                      warrantyUnit: level2.warrantyUnit,
                      warrantyContact: level2.warrantyContact,
                      warrantyContactTel: level2.warrantyContactTel
                    }
                    level4.pipenet = pipenet
                    pipenetValveList.push(level4)
                    children3.push({
                      expand: true,
                      checked: true,
                      title: level4.valveName,
                      num: level4.valveNumber,
                      id: level4.id
                    })
                  })
                }
                if (level3.pipenetMeterList) {
                  level3.pipenetMeterList.forEach((level4) => {
                    // 仪表
                    let pipenet = {
                      enterpriseName: level2.enterpriseName,
                      pipenetName: level2.pipenetName,
                      pipenetNumber: level2.pipenetNumber,
                      pipenetType: level2.pipenetType,
                      useCategory: level2.useCategory,
                      tranMedium: level2.tranMedium,
                      mediumName: level2.mediumName,
                      buildDate: level2.buildDate,
                      buildUnit: level2.buildUnit,
                      buildContact: level2.buildContact,
                      buildContactTel: level2.buildContactTel,
                      useDate: level2.useDate,
                      manageUnit: level2.manageUnit,
                      manageContact: level2.manageContact,
                      warrantyMouth: level2.warrantyMouth,
                      warrantyUnit: level2.warrantyUnit,
                      warrantyContact: level2.warrantyContact,
                      warrantyContactTel: level2.warrantyContactTel
                    }
                    level4.pipenet = pipenet
                    pipenetMeterList.push(level4)
                    children3.push({
                      expand: true,
                      checked: true,
                      title: level4.meterName,
                      num: level4.meterNumber,
                      id: level4.id
                    })
                  })
                }
                children2.push({
                  expand: true,
                  checked: true,
                  title: level3.lineName,
                  num: children3.length,
                  id: level3.id,
                  children: children3
                })
              })
            }
            children1.push({
              expand: true,
              checked: true,
              title: level2.pipenetName,
              num: level2.pipenetNumber,
              id: level2.id,
              children: children2
            })
          })

          children.push({
            expand: true,
            checked: true,
            title: key,
            num: level1.length,
            id: level1.id,
            children: children1
          })
        })

        treeData[0].children = children
        this.treeData = JSON.parse(JSON.stringify(treeData))
        this.originalTreeData = JSON.parse(JSON.stringify(treeData))
        this.markerData = {
          pipenetLineList,
          pipenetValveList,
          pipenetMeterList
        }
      })
    },
    // 递归判断该节点或者节点的子节点是否包含搜索内容
    hasStr(node, search) {
      if (node.children && node.children.length > 0) {
        let flag = false
        for (let i = 0; i < node.children.length; i++) {
          if (this.hasStr(node.children[i], search)) {
            flag = true
            break
          }
        }
        return flag
      } else {
        return node.title.includes(search)
      }
    },
    // 筛选符合结果的节点
    reduceChildNode(node, search) {
      if (node.children && node.children.length > 0) {
        let list = []
        for (let i = 0; i < node.children.length; i++) {
          this.reduceChildNode(node.children[i], search)
          if (this.hasStr(node.children[i], search)) {
            list.push(node.children[i])
          }
        }
        node.children = list
      }
    },
    // 左侧树
    renderContent(h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }
        },
        [h('div', `${data.title}(${data.num})`)]
      )
    },
    treeCheckChange(checkedList, node) {
      console.log(checkedList, node)
      let idList = []
      checkedList.forEach((v) => {
        if (v.id) {
          idList.push(v.id)
        }
      })
      let data = this.originalMarker.filter((v) => {
        return idList.includes(v.id)
      })
      this.initMapData(data)
    },
    getDictionaries(str) {
      try {
        let list = str.split('|')
        return list[list.length - 1]
      } catch {
        return ''
      }
    },
    initChartData1() {
      pipenetTypeRate().then((res) => {
        let result = res.data.datas[0]
        let data = []
        Object.keys(result).forEach((v) => {
          let value = result[v]
          console.log(value)
          if (typeof value === 'string') {
            value = Number(value.substring(0, value.length - 1))
          }
          data.push({
            name: v,
            value: value
          })
        })
        this.chartData1 = data
      })
    },
    initChartData2() {
      pipenetTypeCount().then((res) => {
        let result = res.data.datas[0]
        let category = []
        let data1 = []
        let data2 = []
        let data3 = []
        Object.keys(result).forEach((key) => {
          category.push(key)
          let map = result[key][0]
          data1.push(map['管线'])
          data2.push(map['仪表'])
          data3.push(map['阀门'])
        })
        this.chartData2 = {
          category,
          data1,
          data2,
          data3
        }
      })
    },
    initList1() {
      pipenetAlarmList().then((res) => {
        this.list1 = res.data.datas[0]
      })
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
    // 获取地图上的定位点
    getMapPoint() {
      let data1 = []
      let data2 = []
      let data3 = []
      this.markerData.pipenetLineList.forEach((item) => {
        let startPoint = JSON.parse(JSON.stringify(item))
        // startPoint.lnglat = [117.080251, 29.178106]
        startPoint.lnglat = item.startLnt.split(',')
        startPoint.type = 'pipeline'
        startPoint.name = item.lineName + '(起点)'
        data1.push(startPoint)
        let endPoint = JSON.parse(JSON.stringify(item))
        endPoint.lnglat = item.endLnt.split(',')
        endPoint.type = 'pipeline'
        endPoint.name = item.lineName + '(终点)'
        data1.push(endPoint)
      })
      this.markerData.pipenetValveList.forEach((item) => {
        let lnglat = []
        // lnglat.push(117.080251, 29.178106)
        lnglat.push(item.longitude, item.latitude)
        item.lnglat = lnglat
        item.type = 'pipevalve'
        item.name = item.valveName
        data2.push(item)
      })
      this.markerData.pipenetMeterList.forEach((item) => {
        let lnglat = []
        // lnglat.push(117.080251, 29.178106)
        lnglat.push(item.longitude, item.latitude)
        item.lnglat = lnglat
        item.type = 'pipemeter'
        item.name = item.meterName
        data3.push(item)
      })
      let data = [...data1, ...data2, ...data3]
      this.originalMarker = data
      this.initMapData(data)
    },
    initMapData(data) {
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

      if (data.type === 'pipeline') {
        content = `<div class="infowindowContentNew">
                      <div class="infowindowClose" onclick="closeInfoWindow()"></div>
                      <div class="contentDiv">
                        <div class="infotitle">
                          <div class="itemicon itemInfoicon"></div>
                          <div class="titlespan">
                            <span>${data.name}</span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">所属管网:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.pipenetName}
                            </span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">介质名称:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.pipeMaterial ? data.pipeMaterial : ''}
                            </span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">建设日期:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.createdDate ? data.createdDate : ''}
                            </span>
                          </div>
                        </div>
                        <div class="infoBtnsNew">
                          <div class="infoBtn" onclick="openInfo()">查看详情</div>
                        </div>
                      </div>
                    </div>`
        this.markerList = [
          {
            title: '管线信息',
            data: [
              {
                col: '12',
                param: '管线名称',
                paramCol: '8',
                value: data.name,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管线编号',
                paramCol: '8',
                value: data.lineNumber,
                valueCol: '16'
              },
              {
                col: '24',
                param: '位置描述',
                paramCol: '4',
                value: data.location,
                valueCol: '20'
              },
              {
                col: '12',
                param: '上游使用单位',
                paramCol: '8',
                value: data.upstreamUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '下游使用单位',
                paramCol: '8',
                value: data.downstreamUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管道总长度(m)',
                paramCol: '8',
                value: data.pipeLength,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管道材质',
                paramCol: '8',
                value: data.pipeMaterial,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管径(mm)',
                paramCol: '8',
                value: data.diameter,
                valueCol: '16'
              },
              {
                col: '12',
                param: '壁厚(kg/m)',
                paramCol: '8',
                value: data.thickness,
                valueCol: '16'
              },
              {
                col: '12',
                param: '是否保温',
                paramCol: '8',
                value: data.keepWarm ? '是' : '否',
                valueCol: '16'
              },
              {
                col: '12',
                param: '是否伴热',
                paramCol: '8',
                value: data.heatTracing ? '是' : '否',
                valueCol: '16'
              },
              {
                col: '12',
                param: '压力范围(Pa)',
                paramCol: '8',
                value: data.pressureRange,
                valueCol: '16'
              },
              {
                col: '12',
                param: '温度范围(℃)',
                paramCol: '8',
                value: data.temperatureRange,
                valueCol: '16'
              }
            ]
          },
          {
            title: '所属管网',
            data: [
              {
                col: '12',
                param: '管网名称',
                paramCol: '8',
                value: data.pipenet.pipenetName,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管网编号',
                paramCol: '8',
                value: data.pipenet.pipenetNumber,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管网类型',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.pipenetType),
                valueCol: '16'
              },
              {
                col: '12',
                param: '用途分类',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.useCategory),
                valueCol: '16'
              },
              {
                col: '12',
                param: '输送介质类型',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.tranMedium),
                valueCol: '16'
              },
              {
                col: '12',
                param: '介质名称',
                paramCol: '8',
                value: data.pipenet.mediumName,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设日期',
                paramCol: '8',
                value: data.pipenet.buildDate
                  ? data.pipenet.buildDate.substring(0, 10)
                  : '',
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位',
                paramCol: '8',
                value: data.pipenet.buildUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位联系人',
                paramCol: '8',
                value: data.pipenet.buildContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位联系方式',
                paramCol: '8',
                value: data.pipenet.buildContactTel,
                valueCol: '16'
              },
              {
                col: '12',
                param: '使用日期',
                paramCol: '8',
                value: data.pipenet.useDate
                  ? data.pipenet.useDate.substring(0, 10)
                  : '',
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位',
                paramCol: '8',
                value: data.pipenet.manageUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位联系人',
                paramCol: '8',
                value: data.pipenet.manageContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位联系方式',
                paramCol: '8',
                value: data.pipenet.manageContactTel,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保周期(月)',
                paramCol: '8',
                value: data.pipenet.warrantyMouth,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位',
                paramCol: '8',
                value: data.pipenet.warrantyUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位联系人',
                paramCol: '8',
                value: data.pipenet.warrantyContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位联系方式',
                paramCol: '8',
                value: data.pipenet.warrantyContactTel,
                valueCol: '16'
              }
            ]
          }
        ]
      } else if (data.type === 'pipevalve') {
        data.useType = this.getDictionaries(data.useType)

        content = `<div class="infowindowContentNew">
                      <div class="infowindowClose" onclick="closeInfoWindow()"></div>
                      <div class="contentDiv">
                        <div class="infotitle">
                          <div class="itemicon itemInfoicon"></div>
                          <div class="titlespan">
                            <span>${data.name}</span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">所属管网:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.pipenetName}
                            </span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">用途分类:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.useType}
                            </span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">阀门材料:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.valveMaterial ? data.valveMaterial : ''}
                            </span>
                          </div>
                        </div>
                        <div class="infoBtnsNew">
                          <div class="infoBtn" onclick="openInfo()">查看详情</div>
                        </div>
                      </div>
                    </div>`
        this.markerList = [
          {
            title: '阀门信息',
            data: [
              {
                col: '12',
                param: '阀门名称',
                paramCol: '8',
                value: data.name,
                valueCol: '16'
              },
              {
                col: '12',
                param: '阀门编号',
                paramCol: '8',
                value: data.valveNumber,
                valueCol: '16'
              },
              {
                col: '12',
                param: '用途分类',
                paramCol: '8',
                value: data.useType,
                valueCol: '16'
              },
              {
                col: '12',
                param: '压力分类',
                paramCol: '8',
                value: this.getDictionaries(data.pressureType),
                valueCol: '16'
              },
              {
                col: '12',
                param: '温度分类',
                paramCol: '8',
                value: this.getDictionaries(data.temperatureType),
                valueCol: '16'
              },
              {
                col: '12',
                param: '材料',
                paramCol: '8',
                value: data.valveMaterial,
                valueCol: '16'
              }
            ]
          },
          {
            title: '所属管网',
            data: [
              {
                col: '12',
                param: '管网名称',
                paramCol: '8',
                value: data.pipenet.pipenetName,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管网编号',
                paramCol: '8',
                value: data.pipenet.pipenetNumber,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管网类型',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.pipenetType),
                valueCol: '16'
              },
              {
                col: '12',
                param: '用途分类',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.useCategory),
                valueCol: '16'
              },
              {
                col: '12',
                param: '输送介质类型',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.tranMedium),
                valueCol: '16'
              },
              {
                col: '12',
                param: '介质名称',
                paramCol: '8',
                value: data.pipenet.mediumName,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设日期',
                paramCol: '8',
                value: data.pipenet.buildDate
                  ? data.pipenet.buildDate.substring(0, 10)
                  : '',
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位',
                paramCol: '8',
                value: data.pipenet.buildUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位联系人',
                paramCol: '8',
                value: data.pipenet.buildContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位联系方式',
                paramCol: '8',
                value: data.pipenet.buildContactTel,
                valueCol: '16'
              },
              {
                col: '12',
                param: '使用日期',
                paramCol: '8',
                value: data.pipenet.useDate
                  ? data.pipenet.useDate.substring(0, 10)
                  : '',
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位',
                paramCol: '8',
                value: data.pipenet.manageUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位联系人',
                paramCol: '8',
                value: data.pipenet.manageContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位联系方式',
                paramCol: '8',
                value: data.pipenet.manageContactTel,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保周期(月)',
                paramCol: '8',
                value: data.pipenet.warrantyMouth,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位',
                paramCol: '8',
                value: data.pipenet.warrantyUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位联系人',
                paramCol: '8',
                value: data.pipenet.warrantyContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位联系方式',
                paramCol: '8',
                value: data.pipenet.warrantyContactTel,
                valueCol: '16'
              }
            ]
          }
        ]
      } else if (data.type === 'pipemeter') {
        data.meterType = this.getDictionaries(data.meterType)

        content = `<div class="infowindowContentNew">
                      <div class="infowindowClose" onclick="closeInfoWindow()"></div>
                      <div class="contentDiv">
                        <div class="infotitle">
                          <div class="itemicon itemInfoicon"></div>
                          <div class="titlespan">
                            <span>${data.name}</span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">所属管网:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.pipenetName}
                            </span>
                          </div>
                        </div>
                        <div class="infocontent">
                          <div class="infocontent1">仪表类型:</div>
                          <div class="infocontent2">
                            <span>
                            ${data.meterType}
                            </span>
                          </div>
                        </div>
                        <div class="infoBtnsNew">
                          <div class="infoBtn" onclick="openInfo()">查看详情</div>
                        </div>
                      </div>
                    </div>`
        this.markerList = [
          {
            title: '阀门信息',
            data: [
              {
                col: '12',
                param: '仪表名称',
                paramCol: '8',
                value: data.name,
                valueCol: '16'
              },
              {
                col: '12',
                param: '仪表编号',
                paramCol: '8',
                value: data.meterNumber,
                valueCol: '16'
              },
              {
                col: '12',
                param: '仪表类型',
                paramCol: '8',
                value: data.meterType,
                valueCol: '16'
              }
            ]
          },
          {
            title: '所属管网',
            data: [
              {
                col: '12',
                param: '管网名称',
                paramCol: '8',
                value: data.pipenet.pipenetName,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管网编号',
                paramCol: '8',
                value: data.pipenet.pipenetNumber,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管网类型',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.pipenetType),
                valueCol: '16'
              },
              {
                col: '12',
                param: '用途分类',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.useCategory),
                valueCol: '16'
              },
              {
                col: '12',
                param: '输送介质类型',
                paramCol: '8',
                value: this.getDictionaries(data.pipenet.tranMedium),
                valueCol: '16'
              },
              {
                col: '12',
                param: '介质名称',
                paramCol: '8',
                value: data.pipenet.mediumName,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设日期',
                paramCol: '8',
                value: data.pipenet.buildDate
                  ? data.pipenet.buildDate.substring(0, 10)
                  : '',
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位',
                paramCol: '8',
                value: data.pipenet.buildUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位联系人',
                paramCol: '8',
                value: data.pipenet.buildContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '建设单位联系方式',
                paramCol: '8',
                value: data.pipenet.buildContactTel,
                valueCol: '16'
              },
              {
                col: '12',
                param: '使用日期',
                paramCol: '8',
                value: data.pipenet.useDate
                  ? data.pipenet.useDate.substring(0, 10)
                  : '',
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位',
                paramCol: '8',
                value: data.pipenet.manageUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位联系人',
                paramCol: '8',
                value: data.pipenet.manageContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '管理单位联系方式',
                paramCol: '8',
                value: data.pipenet.manageContactTel,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保周期(月)',
                paramCol: '8',
                value: data.pipenet.warrantyMouth,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位',
                paramCol: '8',
                value: data.pipenet.warrantyUnit,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位联系人',
                paramCol: '8',
                value: data.pipenet.warrantyContact,
                valueCol: '16'
              },
              {
                col: '12',
                param: '维保单位联系方式',
                paramCol: '8',
                value: data.pipenet.warrantyContactTel,
                valueCol: '16'
              }
            ]
          }
        ]
      }

      this.InfoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center', // 弹出框瞄点位置
        isCustom: true, // 使用自定义窗体
        offset: new AMap.Pixel(0, -87),
        content: content
      })
      this.InfoWindow.open(map, coord)
      coord = [coord[0], coord[1]]
      map.setZoomAndCenter(16, coord)
      // 弹出框关闭事件
      window.closeInfoWindow = () => {
        if (this.InfoWindow) {
          map.clearInfoWindow()
        }
      }

      window.openInfo = () => {
        this.popoutInfoShow = true
      }
    },
    openMapInfoWindow(id) {
      for (let i = 0; i < this.originalMarker.length; i++) {
        let marker = this.originalMarker[i]
        if (marker.id === id) {
          let extData = {
            data: [marker]
          }
          this.openInfowindow([marker.lnglat.lng, marker.lnglat.lat], extData)
          break
        }
      }
    }
  },
  computed: {
    chartOption1() {
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
            // data: [{ name: 1, value: 1 }],
            data: this.chartData1,
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
    chartOption2() {
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
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '50',
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
            data: this.chartData2.category
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#BEE4FF'
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
            name: '管线',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              borderRadius: [5, 5, 0, 0]
            },
            data: this.chartData2.data1
          },
          {
            name: '仪表',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              borderRadius: [5, 5, 0, 0]
            },
            data: this.chartData2.data1
          },
          {
            name: '阀门',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              borderRadius: [5, 5, 0, 0]
            },
            data: this.chartData2.data2
          }
        ]
      }
    }
  },
  watch: {
    treeSearch(val) {
      if (val === '') {
        this.treeData = JSON.parse(JSON.stringify(this.originalTreeData))
        this.initMapData(this.originalMarker)
      } else {
        this.reduceChildNode(this.treeData[0], val)
      }
    }
  }
}
</script>

<style>
</style>
