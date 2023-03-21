
<style lang="less" scoped>
@import "./Bigscreen2.less";
@import "./commonless.less";
</style>
<template>
  <div>
  <PopoutWarnVideoSelect
  style="z-index:4;"
  :row="openWarnRow"
  :popoutWarnVideoShow="popoutWarnVideoShow"
  @close='closePopoutWarnVideoSelect'
  >

  </PopoutWarnVideoSelect>
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
      @fullscreen="popoutVideoFullScreenShow=true"
      @close="popoutVideoClose"
    />
    <PopoutTech
      :popoutTechShow="popoutTechShow"
      :list="popoutTechList"
      @close="popoutTechClose"
    />
    <PopoutRiskPoint
      :markerData="riskMarkerData"
      :show="popoutRiskPointShow"
      @close="popoutRiskPointClose"
      @openDetail="popoutRiskPointDetail"
    />
    <PopoutRiskPointDetail
      :show="popoutRiskPointDetailShow"
      :detailList="popoutRiskPointDetailData"
      @close="popoutRiskPointDetailClose"
    />
<popout-video-full-screen style="z-index:4;" :show="popoutVideoFullScreenShow" :cameraUrl="cameraUrl" @close="popoutVideoFullScreenShow = false"></popout-video-full-screen>
<popout-enterprise-table :popoutTableShow="popoutTableShow1" :param="popoutParam" :enterpriseAllInfo="markerData" @close="popoutTableShow1=false"></popout-enterprise-table>
    <!-- 点击地图上的企业 -->

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
       @cesiumLoad="cesiumLoad"
      v-if="isThreeView"
      style="width: 100vw; height: 100vh"
    ></cesiumMap>
    <!-- 地图结束 -->
    <!-- 左上角菜单开始 -->
    <Menu :index="2"></Menu>
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
            <div class="title">重大危险源</div>
          </div>
          <Row class="item-container">
            <div class="item popout" @click="popoutTable1(1)">
              <div class="img-container">
                <img src="@/assets/bigscreen/icon-wxy1.png" alt class="img2" />
                <div class="num-container">
                  <div>一级重大危险源</div>
                  <div>
                    <CountTo
                      :startVal="0"
                      :endVal="majorhazardCount.level1"
                      :duration="countDuration"
                      class="num1"
                    ></CountTo>
                  </div>
                </div>
              </div>
            </div>
            <div class="item popout" @click="popoutTable1(2)">
              <div class="img-container">
                <img src="@/assets/bigscreen/icon-wxy2.png" alt class="img2" />
                <div class="num-container">
                  <div>二级重大危险源</div>
                  <div>
                    <CountTo
                      :startVal="0"
                      :endVal="majorhazardCount.level2"
                      :duration="countDuration"
                      class="num2"
                    ></CountTo>
                  </div>
                </div>
              </div>
            </div>
            <div class="item popout" @click="popoutTable1(3)">
              <div class="img-container">
                <img src="@/assets/bigscreen/icon-wxy3.png" alt class="img2" />
                <div class="num-container">
                  <div>三级重大危险源</div>
                  <div>
                    <CountTo
                      :startVal="0"
                      :endVal="majorhazardCount.level3"
                      :duration="countDuration"
                      class="num3"
                    ></CountTo>
                  </div>
                </div>
              </div>
            </div>
            <div class="item popout" @click="popoutTable1(4)">
              <div class="img-container">
                <img src="@/assets/bigscreen/icon-wxy4.png" alt class="img2" />
                <div class="num-container">
                  <div>四级重大危险源</div>
                  <div>
                    <CountTo
                      :startVal="0"
                      :endVal="majorhazardCount.level4"
                      :duration="countDuration"
                      class="num4"
                    ></CountTo>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <div
          class="
            row3
            container
            animate__animated animate__backInLeft animate__slow
          "
        >
          <div class="item-container">
            <div class="container-title">
              <img src="@/assets/title-arrow.png" alt="" class="img" />
              <div class="title">重点工艺</div>
            </div>
            <div class="bubble-container">
              <charts class="chart" :options="chartOptionW" :id="'chartW'" />
            </div>
          </div>
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
            <div class="title">重点监管化学品</div>
          </div>
          <Row>
            <Col span="2"> </Col>
            <Col span="18">
              <charts class="chart" :options="chartOption0" :id="'chart1'" />
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
            <div class="checkList" >
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
          <div class="checkList1" >
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

          <!-- 告警 -->
          <!-- <div class="round" @click="popoutTable4" v-show="alarmEventNum&&alarmEventNum>0"> -->
          <div class="round" @click="popoutTable4" >
            <div class="circle">
              <a>{{ alarmEventNum || 0 }}</a>
            </div>
            <div class="circle_bottom animation"></div>
            <div class="circle_bottom2 animation2"></div>
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
              <div
                v-for="(item, index) in checkBox2"
                :key="index"
                @click="lenderClick(item)"
                class="check busnissGroup"
                @mouseenter="mouseoverHandle(item)"
              >
                <span class="checkIcon" :class="{ checked: item.check }"></span>
                <span class="checkLabel">{{ item.label }}</span>
              </div>
              <!-- 重大危险源 -->
              <div class="hoverlegen" v-show="checkBox2[1].mouseHover">
                <div
                  v-for="(ele, index) in checkBox2[1].children"
                  :key="index"
                  @click="clickThis(ele.value)"
                  class="check busnissGroup"
                >
                  <span
                    class="checkIcon"
                    :class="{ checked: checkBox[ele.value] }"
                  ></span>
                  <span :class="['icon', ele.icon]"></span>
                  <span class="checkLabel">{{ ele.label }}</span>
                </div>
              </div>
              <!-- 风险四色分区 -->
              <div class="hoverlegen" v-show="checkBox2[2].mouseHover">
                <div
                  v-for="(ele, index) in checkBox2[2].children"
                  :key="index"
                  @click="ele.check=!ele.check;areaGroupShowHidde(ele.value,ele.check)"
                  class="check busnissGroup"
                >
                  <span
                    class="checkIcon"
                    :class="{ checked: ele.check }"
                  ></span>
                  <span :class="['icon', ele.icon]"></span>
                  <span class="checkLabel">{{ ele.label }}</span>
                </div>
              </div>
              <!-- 风险点 -->
              <div class="hoverlegen" v-show="checkBox2[3].mouseHover">
                <div
                  v-for="(ele, index) in checkBox2[3].children"
                  :key="index"
                  @click="clickThis(ele.value)"
                  class="check busnissGroup"
                >
                  <span
                    class="checkIcon"
                    :class="{ checked: checkBox[ele.value] }"
                  ></span>
                  <span :class="['icon', ele.icon]"></span>
                  <span class="checkLabel">{{ ele.label }}</span>
                </div>
              </div>
              <!-- 企业信息 -->
              <div class="hoverlegen" v-show="checkBox2[4].mouseHover">
                <div
                  v-for="(ele, index) in checkBox2[4].children"
                  :key="index"
                 @click="ele.check=!ele.check;areaGroupShowHidde(ele.value,ele.check)"
                  class="check busnissGroup"
                >
                  <span
                    class="checkIcon"
                    :class="{ checked: ele.check }"
                  ></span>
                  <span :class="['icon', ele.icon]"></span>
                  <span class="checkLabel">{{ ele.label }}</span>
                </div>
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
            <div class="title">隐患排查治理(当月)</div>
          </div>
          <Row class="chart-container">
            <Col
              span="8"
              style="border-right: 0.1vw solid rgba(25, 171, 218, 0.41)"
            >
              <Row class="item-container">
                <div class="item popout" @click="popoutTable2(1)">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-yh1.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <div>当月重大隐患</div>
                      <div>
                        <CountTo
                          :startVal="0"
                          :endVal="hiddenDangerTreatmentCount.majorNum"
                          :duration="countDuration"
                          class="num1"
                        ></CountTo>
                        <span>个</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item popout" @click="popoutTable2(2)">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-yh2.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <div>当月一般隐患</div>
                      <div>
                        <CountTo
                          :startVal="0"
                          :endVal="hiddenDangerTreatmentCount.generalNum"
                          :duration="countDuration"
                          class="num1"
                        ></CountTo>
                        <span>个</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item popout" @click="popoutTable2(3)">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-yh3.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <div>未整改隐患</div>
                      <div>
                        <CountTo
                          :startVal="0"
                          :endVal="hiddenDangerTreatmentCount.notRectifiedNum"
                          :duration="countDuration"
                          class="num1"
                        ></CountTo>
                        <span>个</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-yh4.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <div>隐患整改率</div>
                      <div>
                        <span class="num1">{{
                          towNumber(
                            ((hiddenDangerTreatmentCount.allNum -
                              hiddenDangerTreatmentCount.notRectifiedNum) /
                              hiddenDangerTreatmentCount.allNum) *
                              100
                          )
                        }}</span>
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
            <Col span="2"> </Col>
            <Col span="14" class="right">
              <div class="top">企业隐患排名TOP5</div>
              <div class="item" v-if="Top5[0]">
                <img src="@/assets/bigscreen/icon-jl1.png" alt class="img" />
                <div class="name-container" style="color: #f7f300">
                  {{ Top5[0].enterName }}
                </div>
              </div>
              <div class="item" v-if="Top5[1]">
                <img src="@/assets/bigscreen/icon-jl2.png" alt class="img" />
                <div class="name-container">{{ Top5[1].enterName }}</div>
              </div>
              <div class="item" v-if="Top5[2]">
                <img src="@/assets/bigscreen/icon-jl3.png" alt class="img" />
                <div class="name-container" style="color: #ff9f39">
                  {{ Top5[2].enterName }}
                </div>
              </div>
              <div class="item" v-if="Top5[3]">
                <div class="num">4</div>
                <div class="name-container">{{ Top5[3].enterName }}</div>
              </div>
              <div class="item" v-if="Top5[4]">
                <div class="num">5</div>
                <div class="name-container">{{ Top5[4].enterName }}</div>
              </div>
            </Col>
          </Row>
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
            <div class="title">安全风险分级管控</div>
          </div>
          <Row class="chart-container">
            <Col span="24">
              <charts
                class="chart"
                :options="chartOption2"
                :id="'chart2'"
                @chartClick="chartClick2"
              />
            </Col>
          </Row>
        </div>
        <div
          class="
            task-container
            container
            animate__animated animate__backInRight animate__slower
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">企业特殊作业</div>
          </div>
          <div class="item-container">
            <div class="btns">
              <div
                @click="handleWork(1)"
                :class="active == 1 ? 'active' : ''"
                class="btn"
              >
                当日
              </div>
              <div
                @click="handleWork(2)"
                :class="active == 2 ? 'active' : ''"
                class="btn"
              >
                当周
              </div>
              <div
                @click="handleWork(3)"
                :class="active == 3 ? 'active' : ''"
                class="btn"
              >
                当月
              </div>
            </div>
            <Row class="chart-container">
              <Col span="24">
                <charts class="chart" :options="chartOption5" :id="'chart5'" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <!-- 右侧结束 -->
    </div>
         <InfoWindow ref="infoWindow" :markerData="markerData" @openTable="openTable" @close="closeInfoWindow" v-show="infowindowShow"></InfoWindow>
  </div>
</template>

<script>
import moment from 'moment'
import Menu from './components/menu/Menu.vue'
import Header from './components/header/Header.vue'
import charts from '../components/charts.vue'
import * as echarts from 'echarts'
import geoJson from './gyq.js'

import 'echarts-wordcloud'
// import AMap from 'AMap'
import aMap from './components/amap/amap.vue'
import cesiumMap from './components/cesium/cesiumMap.vue'
import { MapControl } from './components/amap/api/amapControl'
import PopoutTable from './components/popout/PopoutTable.vue'
import PopoutVideo from './components/popout/PopoutVideo.vue'
import PopoutTech from './components/popout/PopoutTech.vue'
import PopoutRiskPoint from './components/popout/riskPoint/PopoutRiskPoint.vue'
import PopoutRiskPointDetail from './components/popout/riskPoint/PopoutRiskPointDetail.vue'
import PopoutVideoFullScreen from './components/popout/PopoutVideoFullScreen.vue'
import PopoutWarnVideoSelect from './components/popout/PopoutWarnVideoSelect.vue'
import {
  majorhazardPage,
  ajHiddenPerilInfoPage,
  safetyControlPage,
  getMajorHazardChemicalInfoList,
  countMajorhazardAlarminfo,

  majorhazardAlarminfoPage
} from './api/index'
import CountTo from 'vue-count-to'
import PopoutEnterpriseTable from './components/popout/enterprise/PopoutEnterpriseTable.vue'
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
    PopoutTable,
    PopoutVideo,
    PopoutTech,
    PopoutRiskPoint,
    PopoutRiskPointDetail,
    CountTo,
    aMap,
    cesiumMap,
    PopoutVideoFullScreen,
    PopoutEnterpriseTable,
    PopoutWarnVideoSelect,
    InfoWindow: () => import('./components/amap/components/InfoWindow.vue')
  },
  data() {
    return {
      popoutWarnVideoShow: false,
      openWarnRow: null,
      // 数字滚动的时长
      countDuration: 8000,
      map: null,
      DistrictSearch: null,
      MarkerClusterer: null,
      InfoWindow: null,
      mapData: null,
      // 图层选择
      checkBox: [true, true, true, true, true, true, true, true, true],
      checkBox1: [true, true, true, true, true],
      checkBox2: [
        { label: '园区企业', value: 0, check: true, mouseHover: false },
        {
          label: '重大危险源/4',
          value: 1,
          check: true,
          mouseHover: false,
          children: [
            { label: '一级重大危险源', icon: 'r01', value: 0, check: true },
            { label: '二级重大危险源', icon: 'r02', value: 1, check: true },
            { label: '三级重大危险源', icon: 'r03', value: 2, check: true },
            { label: '四级重大危险源', icon: 'r04', value: 3, check: true }
          ]
        },
        {
          label: '风险四色分区/4',
          value: 2,
          check: true,
          mouseHover: false,
          children: [
            { label: '重大风险区', icon: 'r35', value: '12', check: true },
            { label: '较大风险区', icon: 'r34', value: '11', check: true },
            { label: '一般风险区', icon: 'r33', value: '10', check: true },
            { label: '低风险区', icon: 'r32', value: '09', check: true }
          ]
        },
        {
          label: '风险点/4',
          value: 3,
          check: true,
          mouseHover: false,
          children: [
            { label: '低风险点', icon: 'r25', value: 5, check: true },
            { label: '一般风险点', icon: 'r26', value: 6, check: true },
            { label: '较大风险点', icon: 'r27', value: 7, check: true },
            { label: '重大风险点', icon: 'r28', value: 8, check: true }
          ]
        },
        {
          label: '企业信息/6',
          value: 4,
          check: true,
          mouseHover: false,
          children: [
            { label: '仓库', icon: 'r36', value: '07', check: true },
            { label: '罐区', icon: 'r37', value: '05', check: true },
            { label: '储罐', icon: 'r41', value: '06', check: true },
            { label: '生产设备', icon: 'r40', value: '03', check: true },
            { label: '厂房车间', icon: 'r38', value: '02', check: true },
            { label: '高危工艺', icon: 'r39', value: '04', check: true }
          ]
        },
        { label: '周边敏感目标', value: 5, check: true, mouseHover: false }
      ],
      keyword: '', // 设备编号关键字
      state: false,
      list: [],
      active: 1,
      // 右上角日期和时间
      date: null,
      weekday: null,
      time: null,
      majorhazardCount: {
        level1: null,
        level2: null,
        level3: null,
        level4: null
      },
      Top5: [],
      chartData1: [],
      chartData2: [],
      chartData3: [],
      chartDataW: [],
      hiddenDangerTreatmentCount: {
        majorNum: null,
        generalNum: null,
        notRectifiedNum: null,
        allNum: null
      },
      popoutTechShow: false,
      popoutTechList: [],
      cameraUrl: '',
      popoutVideoShow: false,
      popoutVideoFullScreenShow: false,
      // 弹出框table
      popoutTableShow: false,
      popoutTableIndex: 0,
      popoutTableTitle: '',
      popoutTableColumn: [],
      popoutTableData: [],
      popoutTableTotal: 0,
      popoutTablePage: 0,
      popoutTableForm: {},
      // 地图参数
      zoom: 0,
      pitch: 0,
      isOpenDistance: false,
      // 三维切换
      isThreeView: false,
      pollingST: null,
      alarmEventNum: null,
      // 园区概览
      // 风险点弹窗
      popoutRiskPointShow: false,
      riskMarkerData: {},
      popoutRiskPointDetailShow: false,
      popoutRiskPointDetailData: [],
      // 标注类型
      groupOption: {
        '01': {
          strokeColor: '#FF0000',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#FF0000'
        },
        '02': {
          strokeColor: 'rgba(2,133,248,0.69)',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: 'rgba(2,133,248,0.69)'
        },
        '03': {
          strokeColor: '#eff345',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#eff345'
        },
        '04': {
          strokeColor: '#c4a420',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#c4a420'
        },
        '05': {
          strokeColor: '#5cb425',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#5cb425'
        },
        '06': {
          strokeColor: '#26a286',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#26a286'
        },
        '07': {
          strokeColor: '#4217c0',
          strokeWeight: 3,
          fillOpacity: 0,
          fillColor: '#4217c0'
        },
        '08': {
          strokeColor: '#c51ba9',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#c51ba9'
        },
        '09': {
          strokeColor: '#ff0000',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#ff0000'
        },
        '10': {
          strokeColor: '#c51b',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#c51b'
        },
        '11': {
          strokeColor: '#ff0',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#ff0'
        },
        '12': {
          strokeColor: '#00f',
          strokeWeight: 3,
          fillOpacity: 0.2,
          fillColor: '#00f'
        }
      },
      text: null,
      geoGroup: null,
      areaGroup1: null,
      areaGroup2: null,
      areaGroup3: null,
      areaGroup4: null,
      areaGroup5: null,
      areaGroup6: null,
      areaGroup7: null,
      areaGroup8: null,
      areaGroup9: null,
      areaGroup10: null,
      areaGroup11: null,
      areaGroup12: null,
      areaGeojson: {},
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
      fbhThreePlg: {},
      // 三维图层
      areaThreeGroup1: null,
      areaThreeGroup2: null,
      areaThreeGroup3: null,
      areaThreeGroup4: null,
      areaThreeGroup5: null,
      areaThreeGroup6: null,
      areaThreeGroup7: null,
      areaThreeGroup8: null,
      areaThreeGroup9: null,
      areaThreeGroup10: null,
      areaThreeGroup11: null,
      areaThreeGroup12: null
    }
  },
  mounted() {
    this.initMajorhazardCount()
    this.initChartData1()
    this.initHiddenDangerTreatmentCount()
    this.initTop5()
    this.initChartData2()
    this.initChartData3(1)
    this.initChartDataW()
    this.date = moment(new Date()).format('YYYY年MM月DD日')
    this.weekday = weekdayList[moment().weekday() - 1]
    this.time = moment(new Date()).format('HH:mm')
    this.getAlarmNumber()
    setInterval(() => {
      this.time = moment(new Date()).format('HH:mm')
    }, 60000)
    // 弹出框关闭事件
    window.closeInfoWindow = () => {
      this.closeInfoWindow()
    }
    window.realTimeVideo = (majorhazardId, enterpriseId) => {
      let row = {
        'enterpriseId': enterpriseId,
        'majorhazardId': majorhazardId
      }

      this.openWarnRow = row
      this.popoutWarnVideoShow = true
    }
    window.hisVideo = (id) => {
      this.popoutTechShow = true
      this.$http
        .get('/bigScreen/getMajorHazardDeviceInfoList/' + id)
        .then((res) => {
          let data = res.data.datas[0]
          this.popoutTechList = [...data]
        })
    }
    // 关联危化品
    window.relateDanger = (id) => {
      this.popoutTable5(id)
    }
  },
  methods: {
    towNumber(val) {
      if (isNaN(val)) {
        val = 100
      }
      return val.toFixed(0) ? val.toFixed(0) : 100
    },
    // 地图完成加载
    mapComplete() {
      MapControl.addTdtwms()
      MapControl.addyqlines()
      setTimeout(() => {
        MapControl.clickClusterer() // 注册聚合点点击事件
        this.drawArea()
        this.getMapPoint() // 获取地图上的定位点
        this.getDraw() // 获取标绘信息
      }, 1000)
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
      if (data.type === 'majorHazardInfo') {
		  // console.log(data)
        content = MapControl.getContent(data)
      } else if (data.type === 'impProcessInfo') {
        content = MapControl.getContent(data)
      } else if (data.type === 'rawMateriallInfo') {
        content = MapControl.getContent(data)
      } else if (data.type === 'riskPoint') {
        this.popoutRiskPoint(data)
        return
      } else if (data.type === 'enterpriseBaseInfo') {
        this.markerData = JSON.parse(JSON.stringify(extData.data[0]))
        content = this.$refs.infoWindow.$el
        this.infowindowShow = true
      }

      that.InfoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center', // 弹出框瞄点位置
        isCustom: true, // 使用自定义窗体
        offset: new AMap.Pixel(0, -87),
        content: content
      })
      that.InfoWindow.open(map, coord)
      coord = [coord[0], coord[1] + 0.00025]
      map.setZoomAndCenter(20, coord)
    },
    // 获取地图上的定位点
    getMapPoint() {
      const data = {
        type: '1,2,3,4,5,6,7'
      }
      this.$http.post('/bigScreen/safetySupervision', data).then((res) => {
        if (res.data.code === 0) {
          res.data.datas[0].majorHazardInfo.forEach((item) => {
            item.type = 'majorHazardInfo'
            item.name = item.majorHazardName
          })
          res.data.datas[0].impProcessInfo.forEach((item) => {
            item.type = 'impProcessInfo'
            item.name = item.processName
          })
          res.data.datas[0].rawMateriallInfo.forEach((item) => {
            item.type = 'rawMateriallInfo'
            item.name = item.productName.split('|')[4]
          })
          res.data.datas[0].enterpriseBaseInfo.forEach((item) => {
            item.type = 'enterpriseBaseInfo'
            item.name = item.entprName
          })
          res.data.datas[0].riskPointInfo.forEach((item) => {
            item.type = 'riskPoint'
            item.name = item.pointName
          })
          let data = [
            ...res.data.datas[0].majorHazardInfo,
            ...res.data.datas[0].impProcessInfo,
            ...res.data.datas[0].rawMateriallInfo,
            ...res.data.datas[0].enterpriseBaseInfo,
            ...res.data.datas[0].riskPointInfo
          ]
          if (data && data.length > 0) {
          }
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
    // 获取标绘信息
    getDraw() {
      this.$http.get('/bigScreen/queryBigScreenGisInfo').then((res) => {
        if (res.data.code === 200) {
          let data = res.data.datas
          this.initDraw(data)
        } else {
          this.$Message.info(res.message)
        }
      })
    },
    initDraw(list) {
      let jsonData = []
      list.forEach((item) => {
        item.type = item.plotEntityType
        if (item.plotEntityType === '01') {
          item.plotEntityName = item.enterpriseName
        } else if (item.plotEntityType === '08') {
          if (item.riskLevel === '01') {
            item.type = '09'
          } else if (item.riskLevel === '02') {
            item.type = '10'
          } else if (item.riskLevel === '03') {
            item.type = '11'
          } else if (item.riskLevel === '04') {
            item.type = '12'
          }
        }
        let datas = {
          type: 'Feature',
          properties: item,
          geometry: {
            type: 'Polygon',
            coordinates: [JSON.parse(item.plotData)]
          }
        }
        jsonData.push(datas)
        this.areaGeojson = {
          type: 'FeatureCollection',
          features: jsonData
        }
      })
      this.drawCpyDetail()
    },
    // 绘制企业信息
    drawCpyDetail() {
      const map = MapControl.map['map']
      var that = this
      this.areaGroup1 = new AMap.OverlayGroup()
      this.areaGroup2 = new AMap.OverlayGroup()
      this.areaGroup3 = new AMap.OverlayGroup()
      this.areaGroup4 = new AMap.OverlayGroup()
      this.areaGroup5 = new AMap.OverlayGroup()
      this.areaGroup6 = new AMap.OverlayGroup()
      this.areaGroup7 = new AMap.OverlayGroup()
      this.areaGroup8 = new AMap.OverlayGroup()
      this.areaGroup9 = new AMap.OverlayGroup()
      this.areaGroup10 = new AMap.OverlayGroup()
      this.areaGroup11 = new AMap.OverlayGroup()
      this.areaGroup12 = new AMap.OverlayGroup()
      var geojsons = new AMap.GeoJSON({
        geoJSON: this.areaGeojson,
        getPolygon: function (geojson, lnglats) {
          let objs = geojson.properties
          let polygon = new AMap.Polygon({
            path: lnglats,
            extData: objs,
            cursor: 'pointer'
          })
          polygon.setOptions(that.groupOption[objs.type])
          polygon.on('mouseover', (e) => {
            const extData = e.target.getExtData()
            that.text = new AMap.Text({
              position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
              anchor: 'bottom-center',
              text: extData.plotEntityName
              // style: {'background-color':'red'},
            })
            map.add(that.text)
          })
          polygon.on('mouseout', (e) => {
            if (that.text) {
              map.remove(that.text)
            }
          })
          let obj = {
            '01': that.areaGroup1,
            '02': that.areaGroup2,
            '03': that.areaGroup3,
            '04': that.areaGroup4,
            '05': that.areaGroup5,
            '06': that.areaGroup6,
            '07': that.areaGroup7,
            '08': that.areaGroup8,
            '09': that.areaGroup9,
            '10': that.areaGroup10,
            '11': that.areaGroup11,
            '12': that.areaGroup12
          }
          let group = obj[objs.type]
          group.addOverlay(polygon)
        }
      })
      map.add([
        this.areaGroup1,
        this.areaGroup2,
        this.areaGroup3,
        this.areaGroup4,
        this.areaGroup5,
        this.areaGroup6,
        this.areaGroup7,
        this.areaGroup8,
        this.areaGroup9,
        this.areaGroup10,
        this.areaGroup11,
        this.areaGroup12]
      )
    },

    initMapData() {
      let data = []
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      let data7 = []
      let data8 = []
      let data9 = []
      let data10 = []
      let data11 = []
      this.mapData.forEach((item) => {
        switch (item.type) {
          case 'majorHazardInfo':
            switch (item.majorHazardGrade.split('|')[3]) {
              case '一级':
                data1.push(item)
                break
              case '二级':
                data2.push(item)
                break
              case '三级':
                data3.push(item)
                break
              case '四级':
                data4.push(item)
                break
              default:
                break
            }
            break
          case 'enterpriseBaseInfo':
            data7.push(item)
            break
          case 'riskPoint':
            switch (item.riskLevel.split('|')[3]) {
              case '低风险':
                data8.push(item)
                break
              case '一般风险':
                data9.push(item)
                break
              case '较大风险':
                data10.push(item)
                break
              case '重大风险':
                data11.push(item)
                break
              default:
                break
            }
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
      if (this.checkBox[3]) {
        data = [...data, ...data4]
      }
      if (this.checkBox[4]) {
        data = [...data, ...data7]
      }
      if (this.checkBox[5]) {
        data = [...data, ...data8]
      }
      if (this.checkBox[6]) {
        data = [...data, ...data9]
      }
      if (this.checkBox[7]) {
        data = [...data, ...data10]
      }
      if (this.checkBox[8]) {
        data = [...data, ...data11]
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
    // 根据设备编号查询设备
    queryEquipt(e) {
      if (e.keyCode === 13) {
        if (this.list.length > 0) {
          this.chooseEquipt(this.list[0])
        }
        return
      }
      this.list = []
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

    handleWork(num) {
      this.active = num
      this.initChartData3(this.active)
    },
    initMajorhazardCount() {
      this.$http.get('/bigScreen/countMajorhazard').then((res) => {
        this.majorhazardCount = res.data.datas[0]
      })
    },
    initChartData1() {
      let result = []
      this.$http.get('/bigScreen/countKeyRegulatedChemicals').then((res) => {
        result = [
          {
            value: res.data.datas[0].rawMaterialProduction,
            name: '生产原料'
          },
          {
            value: res.data.datas[0].finalProduct,
            name: '最终产品'
          },
          {
            value: res.data.datas[0].IntermediateProducts,
            name: '中间产品'
          }
        ]
        this.chartData1 = result
      })
    },
    initHiddenDangerTreatmentCount() {
      this.$http.get('/bigScreen/countHiddenDangerTreatment').then((res) => {
        this.hiddenDangerTreatmentCount = res.data.datas[0]
      })
    },
    initTop5() {
      this.$http
        .get('/bigScreen/countHiddenDangerTreatmentTop5')
        .then((res) => {
          this.Top5 = res.data.datas[0]
        })
    },
    initChartData2() {
      this.$http.get('/bigScreen/countSafetyControl').then((res) => {
        let data = [
          {
            value: res.data.datas[0].low,
            name: '低风险'
          },
          {
            value: res.data.datas[0].general,
            name: '一般风险'
          },
          {
            value: res.data.datas[0].greater,
            name: '较大风险'
          },
          {
            value: res.data.datas[0].major,
            name: '重大风险'
          }
        ]
        this.chartData2 = data
      })
    },
    initChartData3(num) {
      this.$http.get('/bigScreen/specialOperation?type=' + num).then((res) => {
        let data = res.data.datas[0]
        let ydata = [
          data.spaceWork,
          data.hotWork,
          data.hoistWork,
          data.powerWork,
          data.excavationWork,
          data.blindWork,
          data.roadWork,
          data.heightWork,
          data.equipWork
        ]
        this.chartData3 = ydata
      })
    },
    initChartDataW() {
      this.$http.get('/bigScreen/countKeyPprocess').then((res) => {
        let data = res.data.datas[0]
        let result = []
        for (var key in data) {
          result.push({
            name: key,
            value: data[key]
          })
        }
        this.chartDataW = result
      })
    },
    popoutVideoClose() {
      this.popoutVideoShow = false
    },
    popoutTechClose() {
      this.popoutTechShow = false
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
      }
    },
    // 重大危险源弹窗
    popoutTable1(level) {
      this.popoutTableForm = {
        level: 'level' + level
      }
      this.popoutTableShow = true
      this.popoutTableIndex = 1
      if (level === 1) {
        this.popoutTableTitle = '一级重大危险源列表'
      } else if (level === 2) {
        this.popoutTableTitle = '二级重大危险源列表'
      } else if (level === 3) {
        this.popoutTableTitle = '三级重大危险源列表'
      } else if (level === 4) {
        this.popoutTableTitle = '四级重大危险源列表'
      }
      this.popoutTableColumn = [
        {
          key: 'danger',
          title: '重大危险源名称',
          align: 'center',
          minWidth: 10,
          ellipsis: true
        },
        {
          key: 'name',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          ellipsis: true
        },
        {
          key: 'code',
          title: '统一编码',
          align: 'center',
          minWidth: 10,
          ellipsis: true
        },
        {
          key: 'manager',
          title: '主要负责人',
          align: 'center',
          minWidth: 10,
          maxWidth: 150,
          ellipsis: true
        }
      ]
      this.renderTable1()
    },
    renderTable1() {
      majorhazardPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let danger = v.majorHazardName ? v.majorHazardName : '——'
          let name = '——'
          if (v.entprId) {
            let list = v.entprId.split('|')
            name = list[list.length - 1]
          }
          let code = v.unifiedCode ? v.unifiedCode : '——'
          let manager = v.majorName ? v.majorName : '——'
          data.push({ danger, name, code, manager })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 隐患排查治理(当月)弹窗
    popoutTable2(level) {
      this.popoutTableShow = true
      this.popoutTableIndex = 2
      let levelParam = ''
      if (level === 1) {
        this.popoutTableTitle = '重大隐患列表'
        levelParam = 'majorNum'
      } else if (level === 2) {
        this.popoutTableTitle = '一般隐患列表'
        levelParam = 'generalNum'
      } else if (level === 3) {
        this.popoutTableTitle = '未整改隐患列表'
        levelParam = 'notRectifiedNum'
      }
      this.popoutTableForm = {
        level: levelParam
      }
      this.popoutTableColumn = [
        {
          key: 'detail',
          title: '隐患描述',
          align: 'center',
          minWidth: 180,
          tooltip: true
        },
        {
          key: 'name',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'type',
          title: '隐患类别',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'date',
          title: '隐患发现时间',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable2()
    },
    renderTable2() {
      ajHiddenPerilInfoPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let detail = v.problDescript ? v.problDescript : '——'
          let name = v.enterName ? v.enterName : '——'
          let type = v.checkTypeName ? v.checkTypeName : '——'
          let date = v.checkdate ? v.checkdate : '——'
          data.push({ detail, name, type, date })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    popoutTable3(name) {
      this.popoutTableShow = true
      this.popoutTableIndex = 3
      this.popoutTableTitle = name + '列表'
      let levelParam = ''
      if (name === '重大风险') {
        levelParam = 'major'
      } else if (name === '较大风险') {
        levelParam = 'greater'
      } else if (name === '一般风险') {
        levelParam = 'general'
      } else if (name === '低风险') {
        levelParam = 'low'
      }
      this.popoutTableForm = {
        level: levelParam
      }
      this.popoutTableColumn = [
        {
          key: 'danger',
          title: '风险点名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'name',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'type',
          title: '风险点类别',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'status',
          title: '管控状态',
          align: 'center',
          minWidth: 10,
          maxWidth: 120,
          tooltip: true
        }
      ]
      this.renderTable3()
    },
    renderTable3() {
      safetyControlPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let danger = '——'
          if (v.pointId) {
            let list = v.pointId.split('|')
            danger = list[list.length - 1]
          }
          let name = v.enterpriseBaseInfo
            ? v.enterpriseBaseInfo.entprName
            : '——'
          let type = v.pointType ? v.pointType : '——'
          let status = '——'
          if (v.status) {
            let list = v.status.split('|')
            status = list[list.length - 1]
          }
          data.push({ danger, name, type, status })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 安全风险分级管控图表点击
    chartClick2(param) {
      this.popoutTable3(param.data.name)
    },
    // 风险点弹窗
    popoutRiskPoint(markerData) {
      this.riskMarkerData = markerData
      this.popoutRiskPointShow = true
    },
    popoutRiskPointClose() {
      this.popoutRiskPointShow = false
    },
    // 风险点详情弹窗
    popoutRiskPointDetail(param) {
      // this.riskPointDetailData = data
      if (param.type === 'knowCard') {
        // 应知卡
        let list = [
          {
            param: '岗位名称',
            value: param.data.postName
          },
          {
            param: '岗位设备/工具',
            value: param.data.postDevice
          },
          {
            param: '使用物料（危化品）',
            value: param.data.material
          },
          {
            param: '成品（危化品）',
            value: param.data.product
          },
          {
            param: '上述危化品相关危险特性',
            value: param.data.hazardInfo
          },
          {
            param: '上述危化品相关理化性质',
            value: param.data.physicalInfo
          },
          {
            param: '相关禁忌要求',
            value: param.data.tabooInfo
          },
          {
            param: '作业环节须知',
            value: param.data.knowInfo
          },
          {
            param: '废弃物处理',
            value: param.data.wasteDisposal
          }
        ]
        if (param.data.uploadFileInfo && param.data.uploadFileInfo.length > 0) {
          // 只会有一个附件
          param.data.uploadFileInfo = param.data.uploadFileInfo.splice(0, 1)
          list.push({
            param: '附件',
            uploadFileInfo: param.data.uploadFileInfo,
            type: 'file'
          })
        }
        this.popoutRiskPointDetailData = list
      } else if (param.type === 'emergencyCard') {
        // 应急卡
        let list = [
          {
            param: '岗位名称',
            value: param.data.postName
          },
          {
            param: '岗位异常紧急处理',
            value: param.data.postEmnMeasure
          },
          {
            param: '救火要求',
            value: param.data.fireRequire
          },
          {
            param: '一般个人急救',
            value: param.data.personEmergency
          },
          {
            param: '泄露应急处理',
            value: param.data.releaseMeasure
          }
        ]
        if (param.data.uploadFileInfo && param.data.uploadFileInfo.length > 0) {
          param.data.uploadFileInfo = param.data.uploadFileInfo.splice(0, 1)
          list.push({
            param: '附件',
            uploadFileInfo: param.data.uploadFileInfo,
            type: 'file'
          })
        }
        this.popoutRiskPointDetailData = list
      }
      this.popoutRiskPointDetailShow = true
    },
    popoutRiskPointDetailClose() {
      this.popoutRiskPointDetailShow = false
    },
    /* -- -- */
    // 实时查询告警数量
    getAlarmNumber() {
      countMajorhazardAlarminfo()
        .then((res) => {
          if (res.data.code === 0) {
            let data = res.data.datas
            this.alarmEventNum = data.num
          } else {
            this.$Message.info(res.data.message)
          }
          this.pollingST = setTimeout(() => {
            clearTimeout(this.pollingST)
            this.getAlarmNumber()
          }, 10000)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 重大危险源告警
    popoutTable4() {
      if (this.alarmEventNum && this.alarmEventNum > 0) {
        this.popoutTableShow = true
        this.popoutTableIndex = 4
        this.popoutTableForm = {}
        this.popoutTableTitle = '重大危险源告警'
        this.popoutTableColumn = [
          {
            key: 'enterpriseName',
            title: '企业名称',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'majorhazardName',
            title: '告警对象',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'majorhazarNumber',
            title: '设备编号',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'unitType',
            title: '设备类型',
            align: 'center',
            minWidth: 10,
            render: (h, params) => {
              return h('div', {}, params.row.unitType.split('|')[3])
            }
          },
          {
            key: 'alarmType',
            title: '告警类型',
            align: 'center',
            minWidth: 10,
            render: (h, params) => {
              return h('div', {}, params.row.alarmType.split('|')[3])
            }
          },
          {
            key: 'alarmTime',
            title: '告警时间',
            align: 'center',
            width: 190
          },
          {
            key: 'handle',
            title: '操作',
            align: 'center',

            render: (h, params) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.openvideo(params.row)
                      }
                    }
                  },
                  '现场视频'
                )

              ])
            }
          }
        ]
        this.renderTable4()
      }
    },
    openvideo(row) {
      console.log(row)
      this.openWarnRow = row
      this.popoutWarnVideoShow = true
    },
    closePopoutWarnVideoSelect() {
      this.popoutWarnVideoShow = false
    },
    renderTable4() {
      majorhazardAlarminfoPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        this.popoutTableData = []
        if (res.data.code === 0) {
          let data = res.data
          this.popoutTableData = data.datas
          this.popoutTableTotal = data.totalCount
        }
      })
    },
    // 关联危化品
    popoutTable5(id) {
      this.popoutTableShow = true
      this.popoutTableIndex = 5
      this.popoutTableForm = {
        majorHazardId: id
      }
      this.popoutTableTitle = '关联危化品'
      this.popoutTableColumn = [
        {
          key: 'chemicalName',
          title: '危险化学品品名',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'installation',
          title: '所属位置或区域',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'chemicalStock',
          title: '存量',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'stockUnit',
          title: '存量单位',
          align: 'center',
          minWidth: 10,
          maxWidth: 120,
          tooltip: true
        },
        {
          key: 'chemicalNature',
          title: '危险化学品性质',
          align: 'center',
          minWidth: 150,
          maxWidth: 120,
          tooltip: true
        }
      ]
      this.renderTable5()
    },
    renderTable5() {
      getMajorHazardChemicalInfoList({
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
    /* 图例点击事件 */
    lenderClick(item) {
      item.check = !item.check
      let key = item.value
      if (key === 0) {
        this.areaGroupShowHidde('01', item.check)
        this.checkBox[4] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 1) {
        this.dangerClick(item.check)
      } else if (key === 2) {
        item.children.forEach((ele) => {
          ele.check = item.check
          this.areaGroupShowHidde(ele.value, item.check)
        })
      } else if (key === 3) {
        this.checkBox[5] = item.check
        this.checkBox[6] = item.check
        this.checkBox[7] = item.check
        this.checkBox[8] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 4) {
        item.children.forEach((ele) => {
          ele.check = item.check
          this.areaGroupShowHidde(ele.value, item.check)
        })
      }
    },
    // 危险源点击事件
    dangerClick(type) {
      this.checkBox[0] = type
      this.checkBox[1] = type
      this.checkBox[2] = type
      this.checkBox[3] = type
      this.$forceUpdate()
      this.initMapData()
    },
    areaGroupShowHidde(type, check) {
      let obj = {
        '01': this.areaGroup1,
        '02': this.areaGroup2,
        '03': this.areaGroup3,
        '04': this.areaGroup4,
        '05': this.areaGroup5,
        '06': this.areaGroup6,
        '07': this.areaGroup7,
        '08': this.areaGroup8,
        '09': this.areaGroup9,
        '10': this.areaGroup10,
        '11': this.areaGroup11,
        '12': this.areaGroup12
      }
      let group = obj[type]
      if (check) {
        group.show()
      } else {
        group.hide()
      }
      if (this.isThreeView) {
        this.showHideThreeDraw(type, check)
      }
    },
    // 鼠标悬浮事件
    mouseoverHandle(item) {
      if (!item.mouseHover) {
        this.checkBox2.forEach((element) => {
          element.mouseHover = false
        })
        if (item.value !== 0 && item.value !== 5) {
          item.mouseHover = true
        }
      }
    },
    // 鼠标离开事件
    mouseoutHandle(item) {
      item.mouseHover = false
    },
    // 园区企业信息
    openTable (param) {
      this.popoutTableShow1 = true
      this.popoutParam = param
    },
    // 关闭弹窗
    closeInfoWindow () {
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
        this.addThreeDraw()
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
        this.viewer.scene.postRender.removeEventListener(this.Popupposition, this)
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
              '道路': '#663bb7',
              '地块': '#c78c0e',
              '水系': '#1cc5ec',
              '绿地': '#4cb051',
              '封闭化': '#ff0000',
              '其他': '#4cb051'
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
    },
    addThreeDraw() {
      let res = Cesium.GeoJsonDataSource.load(this.areaGeojson, {
        clampToGround: true
      })
      let viewer = this.viewer
      this.areaThreeGroup1 = new Cesium.Entity()
      this.areaThreeGroup2 = new Cesium.Entity()
      this.areaThreeGroup3 = new Cesium.Entity()
      this.areaThreeGroup4 = new Cesium.Entity()
      this.areaThreeGroup5 = new Cesium.Entity()
      this.areaThreeGroup6 = new Cesium.Entity()
      this.areaThreeGroup7 = new Cesium.Entity()
      this.areaThreeGroup8 = new Cesium.Entity()
      this.areaThreeGroup9 = new Cesium.Entity()
      this.areaThreeGroup10 = new Cesium.Entity()
      this.areaThreeGroup11 = new Cesium.Entity()
      this.areaThreeGroup12 = new Cesium.Entity()
      let that = this
      res.then((dataSource) => {
        viewer.dataSources.add(dataSource)
        let entities = dataSource.entities.values
        let colorHash = {}
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i]
          let name = entity._properties._type._value
          let labelnmae = entity._properties._plotEntityName._value
          let color = colorHash[name] // 可以使两个同名要素使用同一种颜色。。。
          let colorObj = {
            '01': '#FF0000',
            '02': 'rgba(2,133,248,0.69)',
            '03': '#eff345',
            '04': '#c4a420',
            '05': '#5cb425',
            '06': '#26a286',
            '07': '#4217c0',
            '08': '#c51ba9',
            '09': '#c51ba9',
            '10': '#c51ba9',
            '11': '#c51ba9',
            '12': '#c51ba9'
          }
          if (!color) {
            let opacity = 0.3
            color = Cesium.Color.fromCssColorString(colorObj[name])
            color = color.withAlpha(opacity)
            colorHash[name] = color
          }
          entity.polygon.material = color // 设置要素颜色
          // entity.polygon.outline = true
          // entity.polygon.outlineColor = Cesium.Color.fromCssColorString(colorObj[name])
          // entity.polygon.outlineWidth = 1
          // entity.polygon.zIndex = 10
          let obj = {
            '01': that.areaThreeGroup1,
            '02': that.areaThreeGroup2,
            '03': that.areaThreeGroup3,
            '04': that.areaThreeGroup4,
            '05': that.areaThreeGroup5,
            '06': that.areaThreeGroup6,
            '07': that.areaThreeGroup7,
            '08': that.areaThreeGroup8,
            '09': that.areaThreeGroup9,
            '10': that.areaThreeGroup10,
            '11': that.areaThreeGroup11,
            '12': that.areaThreeGroup12
          }
          let group = obj[name]
          entity.parent = group
          entity.label = {
            text: labelnmae, // 坐标名字
            font: '12px', // 字体样式
            fillColor: Cesium.Color.RED, // 字体颜色
            backgroundColor: Cesium.Color.AQUA, // 背景颜色
            showBackground: false, // 是否显示背景颜色
            style: Cesium.LabelStyle.FILL, // label样式
            // outlineWidth: 2, // 线宽
            pixelOffset: new Cesium.Cartesian2(0, -20), // 像素偏移量
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直位置
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER // 水平位置
          }
        }
      })
    },
    // 控制三维的标绘面显示隐藏
    showHideThreeDraw(type, check) {
      let obj = {
        '01': this.areaThreeGroup1,
        '02': this.areaThreeGroup2,
        '03': this.areaThreeGroup3,
        '04': this.areaThreeGroup4,
        '05': this.areaThreeGroup5,
        '06': this.areaThreeGroup6,
        '07': this.areaThreeGroup7,
        '08': this.areaThreeGroup8,
        '09': this.areaThreeGroup9,
        '10': this.areaThreeGroup10,
        '11': this.areaThreeGroup11,
        '12': this.areaThreeGroup12
      }
      let group = obj[type]
      group.show = check
    }

    /* cesium 相关方法--end */
  },
  computed: {
    chartOptionW() {
      return {
        title: {
          left: '49%',
          top: '38%'
        },
        color: [
          'rgba(50, 124, 246, 1)',
          'rgba(50, 197, 255, 1)',
          'rgba(247, 181, 0, 1)',
          'rgba(50, 197, 255, 1)',
          'rgba(30, 188, 161, 1)',
          'rgba(82, 46, 252, 1)',
          '#3ba272',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc'
        ],
        tooltip: {
          trigger: 'item'
        },

        series: [
          {
            type: 'wordCloud',

            // The shape of the "cloud" to draw. Can be any polar equation represented as a
            // callback function, or a keyword present. Available presents are circle (default),
            // cardioid (apple or heart shape curve, the most known polar equation), diamond (
            // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

            shape: 'diamond',

            // Keep aspect ratio of maskImage or 1:1 for shapes
            // This option is supported from echarts-wordcloud@2.1.0
            keepAspect: false,

            // A silhouette image which the white area will be excluded from drawing texts.
            // The shape option will continue to apply as the shape of the cloud to grow.

            // maskImage: maskImage,

            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.

            left: 'center',
            top: 'center',
            width: '100%',
            height: '100%',
            right: null,
            bottom: null,

            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.

            sizeRange: [12, 40],

            // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

            rotationRange: [-90, 90],
            rotationStep: 45,

            // size of the grid in pixels for marking the availability of the canvas
            // the larger the grid size, the bigger the gap between words.

            gridSize: 8,

            // set to true to allow word being draw partly outside of the canvas.
            // Allow word bigger than the size of the canvas to be drawn
            drawOutOfBound: true,

            // If perform layout animation.
            // NOTE disable it will lead to UI blocking when there is lots of words.
            layoutAnimation: true,

            // Global text style
            textStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              // Color can be a callback function or a color string
              color: function () {
                // Random color
                return (
                  'rgb(' +
                  [
                    Math.round(Math.random() * 255),
                    Math.round(Math.random() * 255),
                    Math.round(Math.random() * 255)
                  ].join(',') +
                  ')'
                )
              }
            },
            emphasis: {
              focus: 'self',

              textStyle: {
                textShadowBlur: 10,
                textShadowColor: '#fff'
              }
            },

            // Data is an array. Each array item must have name and value property.
            data: this.chartDataW
          }
        ]
      }
    },
    // 应急资源饼状图
    chartOption0() {
      return {
        title: {
          left: '49%',
          top: '38%'
        },
        color: ['#544CCB', '#5EAAFD', '#FFC761'],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            roseType: 'radius',
            radius: ['25%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            // roseType: 'radius',
            label: {
              alignTo: 'edge',
              formatter: '{name|{b}}\n{time|{c} 种}',
              edgeDistance: 10,
              lineHeight: 15,
              rich: {
                name: {
                  fontSize: 16,
                  color: '#fff',
                  lineHeight: 25
                },
                time: {
                  fontSize: 16,
                  lineHeight: 25,
                  color: '#fff'
                }
              }
            },
            labelLine: {
              length: 15,
              length2: '100%'
            },
            data: this.chartData1
          }
        ]
      }
    },
    chartOption1() {
      return {
        title: {
          left: '49%',
          top: '38%',
          text: '巡查\n类型',
          textStyle: {
            color: 'rgb(255,255,255)'
          },
          textAlign: 'center'
        },
        color: [
          'rgba(50, 124, 246, 1)',
          'rgba(50, 197, 255, 1)',
          'rgba(247, 181, 0, 1)',
          'rgba(50, 197, 255, 1)',
          'rgba(30, 188, 161, 1)',
          'rgba(82, 46, 252, 1)',
          '#3ba272',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc'
        ],
        series: [
          {
            name: '消防应急资源',
            type: 'pie',
            radius: ['55%', '80%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              alignTo: 'edge',
              formatter: '{name|{b}}\n{time|{d} %}',
              edgeDistance: 10,
              lineHeight: 15,
              rich: {
                name: {
                  //   fontSize: 10,
                  color: '#fff',
                  lineHeight: 25
                },
                time: {
                  lineHeight: 25
                }
              }
            },
            // labelLine: {
            //   show: false,
            //   length: 5,
            //   length2: 0
            // },
            labelLine: {
              length: 25,
              length2: '100%'
            },
            data: [
              {
                value: 1048,
                name: '专项检查',
                label: {
                  color: 'rgba(50, 124, 246, 1)'
                }
              },
              {
                value: 735,
                name: '网络检查',
                label: {
                  color: 'rgba(50, 197, 255, 1)'
                }
              },
              {
                value: 580,
                name: '单位检查',
                label: {
                  color: 'rgba(247, 181, 0, 1)'
                }
              }
            ]
          }
        ]
      }
    },
    chartOption3() {
      return {
        tooltip: {
          trigger: 'item'
        },
        color: [
          'rgba(86, 136, 236, 1)',
          'rgba(82, 154, 204, 1)',
          'rgba(131, 140, 152, 1)',
          'rgba(238, 98, 28, 1)'
        ],
        yAxis: {
          type: 'category',
          data: [
            '化工有限公司A',
            '化工有限公司B',
            '化工有限公司C',
            '化工有限公司D'
          ],
          axisLabel: {
            textStyle: { color: 'rgba(255, 253, 246, 0.8)' }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
              width: 0
            }
          }
        },
        xAxis: {
          type: 'value',
          splitNumber: 2,
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: { color: 'rgba(255, 253, 246, 0.8)' }
          },
          splitLine: {
            lineStyle: {
              color: '#333333'
            }
          }
        },
        grid: {
          right: 10,
          left: 100
        },
        series: [
          {
            // name: '2011',
            type: 'bar',
            data: [14, 32, 13, 45]
          }
        ]
      }
    },
    chartOption2() {
      let that = this
      return {
        title: {
          left: '19%',
          top: '42%',
          text: '安全风险\n分级',
          textStyle: {
            color: 'rgb(255,255,255)',
            fontSize: 18
          },
          textAlign: 'center'
        },
        color: ['#14A6EF', '#DDD600', '#EE8A55', '#FF594B'],
        tooltip: {},
        legend: {
          right: '20%',
          top: 'center',
          icon: 'circle',
          orient: 'vertical',
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          formatter: function (name) {
            // 图例后添加数值
            let data = that.chartData2
            let tarValue
            let total = 0
            let cent
            for (let i = 0; i < data.length; i++) {
              total += data[i].value
            }
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === name) {
                tarValue = data[i].value
                cent = ((tarValue / total) * 100).toFixed(0)
              }
            }
            return name + ' ' + cent + '% |' + tarValue + '个'
          }
        },
        series: [
          {
            name: '安全风险分级',
            type: 'pie',
            radius: ['55%', '80%'],
            center: ['20%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: this.chartData2
          }
        ]
      }
    },
    chartOption5() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '6%',
          right: '6%',
          bottom: '2%',
          top: '28%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 16,
              interval: 0
            },
            data: [
              '受限',
              '动火',
              '吊装',
              '临电',
              '动土',
              '盲板',
              '断路',
              '高处',
              '检修'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1,
            name: '单位：件',
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
            name: '危化品企业',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0],
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
            data: this.chartData3
          }
        ]
      }
    }
  }
}
</script>
