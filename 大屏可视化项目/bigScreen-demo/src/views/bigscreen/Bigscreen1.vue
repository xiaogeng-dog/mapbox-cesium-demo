<style lang="less" scoped>
@import "./Bigscreen1.less";
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
    <PopoutChart
      :popoutChartShow="popoutChartShow"
      :title="popoutChartTitle"
      :category="popoutChartCategory"
      :chartData="popoutChartData"
      @close="popoutChartClose"
    />
    <PopoutVideoSelect
      :popoutVideoSelectShow="popoutVideoSelectShow"
      :cameraUrl="cameraUrl"
      @fullscreen="videoclosefull"
      @close="videoclose"
    />
    <PopoutVideo
      :popoutVideoShow="popoutVideoShow"
      :cameraUrl="cameraUrl"
      @fullscreen="
        fullcameraUrl = cameraUrl;
        popoutVideoFullScreenShow = true;
      "
      @close="popoutVideoShow = false"
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

    <!--园区信息 -->
    <AreaInfo :areaInfoshow="areaInfoshow" @close="areaInfoshow = false" />
    <!-- 地图开始 -->
    <aMap
      v-show="!isThreeView"
      style="width: 100vw; height: 100vh"
      :zoom="zoom"
      :pitch="pitch"
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
    <Menu :index="1"></Menu>
    <!-- 左上角菜单结束 -->
    <div class="main-container">
      <!-- 顶部开始 -->
      <Header></Header>
      <!-- 左侧开始 -->
      <div class="col2">
        <div
          class="range-container container animate__animated animate__backInLeft"
        >
          <div
            class="container-title"
            @click="areaInfoshow = true"
            style="cursor: pointer"
          >
            <img src="@/assets/title-arrow.png" class="img" />
            <div class="title">园区概况</div>
            <img src="@/assets/bigscreen/bartz.png" class="task-img" />
          </div>
          <Row class="item-container">
            <Col span="6" class="col-container">
              <img
                src="@/assets/bigscreen/icon-yqgk1.png"
                alt=""
                class="task-img"
              />
              <div>入住企业</div>
              <CountTo
                :startVal="0"
                :endVal="AreaInfo.num"
                :duration="countDuration"
                style="color: #5ee9ff; font-size: 1.2vw"
              ></CountTo>
              <div style="font-size: 0.6vw">(家)</div>
            </Col>
            <Col span="6" class="col-container">
              <img
                src="@/assets/bigscreen/icon-yqgk2.png"
                alt=""
                class="task-img"
              />
              <div>注册资金</div>
              <CountTo
                :startVal="0"
                :endVal="AreaInfo.registeredCapital"
                :duration="countDuration"
                style="color: #5ee9ff; font-size: 1.2vw"
              ></CountTo>
              <div style="font-size: 0.6vw">(万元)</div>
            </Col>
            <Col span="6" class="col-container">
              <img
                src="@/assets/bigscreen/icon-yqgk3.png"
                alt=""
                class="task-img"
              />
              <div>规划面积</div>
              <CountTo
                :startVal="0"
                :endVal="AreaInfo.planArea"
                :duration="countDuration"
                style="color: #5ee9ff; font-size: 1.2vw"
              ></CountTo>
              <div style="font-size: 0.6vw">(公顷)</div>
            </Col>
            <Col span="6" class="col-container">
              <img
                src="@/assets/bigscreen/icon-yqgk4.png"
                alt=""
                class="task-img"
              />
              <div>成立日期</div>
              <div style="color: #5ee9ff; font-size: 1.1vw">
                {{ AreaInfo.buildTime }}
              </div>
              <div style="font-size: 0.6vw">&nbsp;</div>
            </Col>
          </Row>
        </div>
        <div
          class="table-container container animate__animated animate__backInLeft animate__slow"
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">园区经济产值状况(2021年)</div>
          </div>
          <Row>
            <Col span="8" class="item-container">
              <div class="item popout" @click="popoutChart1">
                <div>
                  <CountTo
                    :startVal="0"
                    :endVal="economicSituation.outputValue"
                    :decimals="2"
                    :duration="countDuration"
                    class="num1"
                  ></CountTo>
                  <span class="unit">亿元</span>
                </div>
                <div>园区年产值</div>
                <img src="@/assets/bigscreen/icon-yqncz.png" alt class="img" />
              </div>
              <div class="item popout" @click="popoutChart2">
                <div>
                  <CountTo
                    :startVal="0"
                    :endVal="economicSituation.tax"
                    :duration="countDuration"
                    class="num1"
                  ></CountTo>
                  <span class="unit">亿元</span>
                </div>
                <div>园区税收</div>
                <img src="@/assets/bigscreen/icon-yqss.png" alt class="img" />
              </div>
            </Col>
            <Col span="16">
              <charts class="chart" :options="chartOption2" :id="'chart2'" />
            </Col>
          </Row>
        </div>

        <div
          class="ecology-container container animate__animated animate__backInLeft animate__slower"
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">园区行业类型</div>
          </div>
          <Row>
            <Col span="24">
              <charts
                class="chart"
                :options="chartOption3"
                :id="'chart3'"
                @chartClick="chartClick3"
              />
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
          <!-- 告警 -->
          <div
            class="round"
            @click="popoutAlarmTable"
            v-show="alarmEventNum && alarmEventNum > 0"
          >
            <div class="circle">
              <a>{{ alarmEventNum || 0 }}</a>
            </div>
            <div class="circle_bottom animation"></div>
            <div class="circle_bottom2 animation2"></div>
          </div>
        </div>
        <!-- 底部图层选择 -->
        <!-- v-show="!isThreeView" -->
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
                <span class="checkLabel r18">供水设施</span>
              </div>
              <div @click="clickThis(1)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[1] }"
                ></span>
                <span class="checkLabel r19">供电设施</span>
              </div>
              <div @click="clickThis(2)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[2] }"
                ></span>
                <span class="checkLabel r20">供热设施</span>
              </div>
              <div @click="clickThis(3)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[3] }"
                ></span>
                <span class="checkLabel r21">管廊设施</span>
              </div>
              <div @click="clickThis(4)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[4] }"
                ></span>
                <span class="checkLabel r22">供气/汽设施</span>
              </div>
              <div @click="clickThis(5)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[5] }"
                ></span>
                <span class="checkLabel r23">公共消防设施</span>
              </div>
              <div @click="clickThis(6)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[6] }"
                ></span>
                <span class="checkLabel r24">园区企业</span>
              </div>
              <div @click="clickThis(7)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[7] }"
                ></span>
                <span class="checkLabel r17">视频监控</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 中间结束 -->
      <!-- 右侧开始 -->
      <div class="col4">
        <div
          class="weather-container container animate__animated animate__backInDown animate__slower"
        >
          <div class="weather">
            <div>{{ date }}</div>
            <div>{{ weekday }}</div>
            <div>{{ time }}</div>
          </div>
        </div>
        <div
          class="video-container container animate__animated animate__backInRight"
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt class="img" />
            <div class="title">园区全景概览</div>
          </div>
          <div class="item-container">
            <div class="item">
              <div
                class="img-container popout"
                @click="popoutVideoSelect(cameraUrl1, 1)"
              >
                <CameraItem
                  class="video"
                  :url="cameraUrl1"
                  ref="cameraItem"
                ></CameraItem>
              </div>
              <div
                class="img-container popout"
                @click="popoutVideoSelect(cameraUrl2, 2)"
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
          class="table-container container animate__animated animate__backInRight animate__slow"
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">园区基础能力</div>
          </div>
          <div class="chart-container">
            <Row class="item-container">
              <div class="num2-container">
                <img
                  src="@/assets/bigscreen/icon-yqjc1.png"
                  alt=""
                  class="task-img"
                />
                <div>最大供水</div>
                <div class="unit">(t/d)</div>
                <CountTo
                  :startVal="0"
                  :endVal="basicAbility.maxAbility[0].max"
                  :duration="countDuration"
                  class="num1"
                ></CountTo>
              </div>
              <div class="num2-container">
                <img
                  src="@/assets/bigscreen/icon-yqjc4.png"
                  alt=""
                  class="task-img"
                />
                <div>污水处理</div>
                <div class="unit">(m<sup>3</sup>/d)</div>
                <CountTo
                  :startVal="0"
                  :endVal="basicAbility.maxAbility[1].max"
                  :duration="countDuration"
                  class="num1"
                ></CountTo>
              </div>
              <div class="num2-container">
                <img
                  src="@/assets/bigscreen/icon-yqjc2.png"
                  alt=""
                  class="task-img"
                />
                <div>最大供电</div>
                <div class="unit">(MW)</div>
                <CountTo
                  :startVal="0"
                  :endVal="basicAbility.maxAbility[2].max"
                  :duration="countDuration"
                  class="num1"
                ></CountTo>
              </div>
              <div class="num2-container">
                <img
                  src="@/assets/bigscreen/icon-yqjc3.png"
                  alt=""
                  class="task-img"
                />
                <div>最大供气</div>
                <div class="unit">(万m<sup>3</sup>/d)</div>
                <CountTo
                  :startVal="0"
                  :endVal="basicAbility.maxAbility[3].max"
                  :duration="countDuration"
                  class="num1"
                ></CountTo>
              </div>
            </Row>
            <Row>
              <Col span="6">
                <charts
                  class="chart"
                  :options="chartOption5"
                  :id="'chart5'"
                  style="cursor: none"
                />
              </Col>
              <Col span="6">
                <charts
                  class="chart"
                  :options="chartOption6"
                  :id="'chart6'"
                  style="cursor: none"
                />
              </Col>
              <Col span="6">
                <charts class="chart" :options="chartOption7" :id="'chart7'" />
              </Col>
              <Col span="6">
                <charts class="chart" :options="chartOption8" :id="'chart8'" />
              </Col>
            </Row>
          </div>
        </div>
        <div
          class="task-container container animate__animated animate__backInRight animate__slower"
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">园区创新能力</div>
          </div>
          <Row class="item-container">
            <Col span="1"> </Col>
            <Col span="11">
              <div class="item popout" @click="popoutTable2">
                <div class="img-container">
                  <img src="@/assets/bigscreen/icon-cx1.png" alt class="img" />
                  <div class="num-container">
                    <div>企业专利申请总数</div>
                    <div>
                      <CountTo
                        :startVal="0"
                        :endVal="innovationAbility.parkPatentsTotal"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="item popout"
                @click="popoutTable4(item.enterpriseId)"
                v-for="(item, index) in innovationAbility.parkPatentList"
                :key="item.id"
              >
                <div class="img-container">
                  <img
                    v-if="index < 3"
                    :src="
                      require('@/assets/bigscreen/icon-cxl' +
                        (index + 1) +
                        '.png')
                    "
                    alt
                    class="img2"
                  />
                  <div v-else class="img2">{{ index + 1 }}</div>
                  <div class="num-container">
                    <div class="name">{{ item.enterpriseName }}</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="1"> </Col>
            <Col span="11">
              <div class="item popout" @click="popoutTable3">
                <div class="img-container">
                  <img src="@/assets/bigscreen/icon-cx2.png" alt class="img" />
                  <div class="num-container">
                    <div>企业获奖总数</div>
                    <div>
                      <CountTo
                        :startVal="0"
                        :endVal="innovationAbility.parkAwardTotal"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="item popout"
                @click="popoutTable5(item.enterpriseId)"
                v-for="(item, index) in innovationAbility.parkAwardList"
                :key="item.id"
              >
                <div class="img-container">
                  <img
                    v-if="index < 3"
                    :src="
                      require('@/assets/bigscreen/icon-cxl' +
                        (index + 4) +
                        '.png')
                    "
                    alt
                    class="img2"
                  />
                  <div v-else class="img2">{{ index + 1 }}</div>
                  <div class="num-container">
                    <div class="name">{{ item.enterpriseName }}</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <!-- 右侧结束 -->
    </div>
    <!-- 底部开始 -->
    <!-- <BigscreenFooter :index="1"></BigscreenFooter> -->
    <!-- 底部结束 -->
    <!-- <div style="display:none">
      <InfoWindow ref="infoWindow" :markerData="markerData" @openTable="openTable" @close="closeInfoWindow"></InfoWindow>
    </div> -->
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
import moment from "moment";
// import BigscreenFooter from './components/bigscreen-footer/BigscreenFooter.vue'
import Menu from "./components/menu/Menu.vue";
import Header from "./components/header/Header.vue";
import charts from "../components/charts.vue";
import PopoutTable from "./components/popout/PopoutTable.vue";
import PopoutChart from "./components/popout/PopoutChart.vue";
import PopoutVideoFullScreen from "./components/popout/PopoutVideoFullScreen.vue";
import PopoutVideoSelect from "./components/popout/PopoutVideoSelect.vue";
import PopoutVideo from "./components/popout/PopoutVideo.vue";
import CameraItem from "../components/camera-item.vue";
import AreaInfo from "./components/popout/areaInfo.vue";
// import coordtranslate from '@/libs/coordtranslate'
import * as echarts from "echarts";
import "echarts-liquidfill";
// 地图
// import AMap from 'AMap'
import geoJson from "./gyq.js";
import aMap from "./components/amap/amap.vue";
import cesiumMap from "./components/cesium/cesiumMap.vue";
import { MapControl } from "./components/amap/api/amapControl";
import {
  enterprisePage,
  outputValueList,
  taxList,
  parkPatentPage,
  parkAwardPage,
  bigScreencountEcologicalEnvironment,
  bigScreenecologicalEnvironmentPage,
} from "./api/index";
import CountTo from "vue-count-to";
import PopoutEnterpriseTable from "./components/popout/enterprise/PopoutEnterpriseTable.vue";

import { mapState, mapMutations } from "vuex";

const weekdayList = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
export default {
  components: {
    charts,
    Menu,
    Header,
    PopoutTable,
    PopoutChart,
    PopoutVideoFullScreen,
    PopoutVideoSelect,
    CameraItem,
    CountTo,
    aMap,
    AreaInfo,
    cesiumMap,
    PopoutEnterpriseTable,
    PopoutVideo,
    InfoWindow: () => import("./components/amap/components/InfoWindow.vue"),
  },
  data() {
    return {
      cameraUrl1: "",
      cameraUrl2: "",
      fullcameraUrl: "",
      // 数字滚动的时长
      countDuration: 8000,
      map: null,
      mapData: null,
      // 图层选择
      checkBox: [true, true, true, true, true, true, true, true],
      checkBox1: [true, true, true, true, true],
      keyword: "", // 设备编号关键字
      state: false,
      list: [],
      alertChartData1: [],
      alertChartData2: [],
      alertChartData3: [],
      dangerChartData: [],
      // 轮播图
      carouselValue: 0,
      // 右上角日期和时间
      date: null,
      weekday: null,
      time: null,
      enterNum: 0,
      chartData1: [],
      chartData2: {},
      economicSituation: {
        outputValue: null,
        tax: null,
        list: [],
      },
      ecologicalMonitoring: {
        environmentalQuality: null,
        rainwaterDrainage: null,
        exhaustEmission: null,
        wastewaterDischarge: null,
      },
      closedManagement: {
        hazardousChemicalVehicle: null,
        personnelPositioningAlarm: null,
        socialVehicle: null,
        hazardousChemicals: null,
        operators: null,
      },
      innovationAbility: {
        parkPatentsTotal: null,
        parkAwardTotal: null,
        parkAwardList: [],
        parkPatentList: [],
      },
      basicAbility: {
        maxAbility: [{ max: 0 }, { max: 0 }, { max: 0 }, { max: 0 }],
        actualTimeAbility: [
          { actualTime: 0 },
          { actualTime: 0 },
          { actualTime: 0 },
          { actualTime: 0 },
        ],
      },
      // 左下角行业类型
      chartData3: {
        nodes: [],
        links: [],
        categories: [],
      },
      enterpriseType: {},
      // 弹出框table
      popoutTableShow: false,
      popoutTableShow1: false,
      // 记录弹出的是哪一个table
      popoutTableIndex: 0,
      popoutTableTitle: "",
      popoutTableColumn: [],
      popoutTableData: [],
      popoutTableTotal: 0,
      // 分页从0开始
      popoutTablePage: 0,
      popoutTableForm: {},
      // 弹出框chart
      popoutChartShow: false,
      popoutChartTitle: "",
      popoutChartData: [],
      popoutChartCategory: [],
      // 弹出框video
      popoutVideoShow: false,
      popoutVideoSelectShow: false,
      popoutVideoFullScreenShow: false,
      // 记录左上角视频点击的是哪个
      vidioIndex: 0,
      cameraUrl: "",
      // 地图参数
      zoom: 0,
      pitch: 0,
      isOpenDistance: false,
      // 三维切换
      isThreeView: false,
      pollingST: null,
      alarmEventNum: null,

      // 园区概览
      AreaInfo: {},
      areaInfoshow: false,
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
    };
  },
  mounted() {
    // 后台登录后跳转到大屏
    if (this.$route.query.token) {
      localStorage.setItem("token", this.$route.query.token);
    }
    this.initMap();
    this.initCameraUrl();
    this.initAreaInfo();
    this.initChartData1();
    this.initChartData3();
    this.initEconomicSituation();
    this.initBasicAbility();
    this.initInnovationAbility();
    this.initClosedManagement();
    this.initAlertChart();
    this.date = moment(new Date()).format("YYYY年MM月DD日");
    this.weekday = weekdayList[moment().weekday() - 1];
    this.time = moment(new Date()).format("HH:mm");
    this.getAlarmNumber();

    setInterval(() => {
      this.time = moment(new Date()).format("HH:mm");
    }, 60000);
    // 弹出框关闭事件
    window.closeInfoWindow = () => {
      this.closeInfoWindow();
    };
    window.realTimeVideo = (url) => {
      if (url && url !== "null") {
        this.popoutVideoShow = true;
        this.cameraUrl = url;
      } else {
        this.$Message.info("暂未接入视频");
      }
    };
  },
  methods: {
    ...mapMutations("app", ["setIsFirst"]),
    initCameraUrl() {
      this.$http.get("/bigScreen/getCameraList?videoType=1").then((res) => {
        this.cameraUrl1 = res.data.datas[0].url;
      });
      this.$http.get("/bigScreen/getCameraList?videoType=1").then((res) => {
        this.cameraUrl2 = res.data.datas[1].url;
      });
    },
    // 地图初始化
    initMap() {
      if (this.isFirst) {
        this.zoom = 2;
        this.pitch = 55;
      } else {
        this.zoom = 12;
        this.pitch = 30;
      }
    },
    // 地图完成加载
    mapComplete() {
      if (this.isFirst) {
        this.setIsFirst(false);
        MapControl.addAnimates();
        // 等待地图初始化动画完成
        setTimeout(() => {
          MapControl.clickClusterer(); // 注册聚合点点击事件
          this.drawArea();
          this.getMapPoint(); // 获取地图上的定位点
        }, 6000);
      } else {
        MapControl.addTdtwms();
        MapControl.addyqlines();
        setTimeout(() => {
          MapControl.clickClusterer(); // 注册聚合点点击事件
          this.drawArea();
          this.getMapPoint(); // 获取地图上的定位点
        }, 6000);
      }
    },
    // 园区范围面绘制
    drawArea() {
      MapControl.drawGeojson(geoJson, this.checkBox1);
      if (this.isThreeView) {
        this.showHideThreePlg();
      }
    },
    // 园区范围面显隐控制
    clickMap(key) {
      this.checkBox1[parseInt(key)] = !this.checkBox1[parseInt(key)];
      this.$forceUpdate();
      this.drawArea();
    },
    // 获取地图上的定位点
    getMapPoint() {
      const data = {
        type: "1,2,3,4,5,6,7,16",
      };
      this.$http.post("/bigScreen/parkOverview", data).then((res) => {
        if (res.data.code === 0) {
          res.data.datas[0].projectWater.forEach((item) => {
            item.type = "projectWater";
            item.name = item.facilityName;
          });
          res.data.datas[0].projectElectricity.forEach((item) => {
            item.type = "projectElectricity";
            item.name = item.facilityName;
          });
          res.data.datas[0].projectHot.forEach((item) => {
            item.type = "projectHot";
            item.name = item.facilityName;
          });
          res.data.datas[0].projectPipegallery.forEach((item) => {
            item.type = "projectPipegallery";
            item.name = item.facilityName;
          });
          res.data.datas[0].projectGas.forEach((item) => {
            item.type = "projectGas";
            item.name = item.facilityName;
          });
          res.data.datas[0].projectFirefacilities.forEach((item) => {
            item.type = "projectFirefacilities";
            item.name = item.facilityName;
          });
          res.data.datas[0].enterpriseBaseInfo.forEach((item) => {
            item.type = "enterpriseBaseInfo";
            item.name = item.entprName;
          });
          res.data.datas[0].cameraList.forEach((item) => {
            item.type = "roadVideoInfo";
            item.name = item.videoName;
          });
          let data = [
            ...res.data.datas[0].projectWater,
            ...res.data.datas[0].projectElectricity,
            ...res.data.datas[0].projectHot,
            ...res.data.datas[0].projectPipegallery,
            ...res.data.datas[0].projectGas,
            ...res.data.datas[0].projectFirefacilities,
            ...res.data.datas[0].enterpriseBaseInfo,
            ...res.data.datas[0].cameraList,
          ];
          data.forEach((item) => {
            let lnglat = [];
            lnglat.push(item.longitude, item.latitude);
            item.lnglat = lnglat;
          });
          this.mapData = data;
          this.initMapData();
        } else {
          this.$Message.info(res.message);
          this.mapData = [];
          this.initMapData();
        }
      });
    },

    // 图例点击事件
    clickThis(key) {
      this.checkBox[parseInt(key)] = !this.checkBox[parseInt(key)];
      this.$forceUpdate();
      this.initMapData();
    },
    initMapData() {
      let datas = [
        {
          type: "managementCommittee",
          name: "太阳山开发区管委会",
          longitude: 106.580164,
          latitude: 37.440162,
        }, // 太阳山开发区管委会
        {
          type: "townGovernment",
          name: "太阳山镇政府",
          longitude: 106.579237,
          latitude: 37.435349,
        }, // 太阳山镇政府
        {
          type: "policeOffice",
          name: "公安局太阳山分局",
          longitude: 106.58243,
          latitude: 37.437385,
        }, // 公安局太阳山分局
        {
          type: "townHospital",
          name: "太阳山镇医院",
          longitude: 106.583102,
          latitude: 37.43908,
        }, // 太阳山镇医院
        {
          type: "fireBrigade",
          name: "消防救援大队",
          longitude: 106.602435,
          latitude: 37.424989,
        }, // 消防救援大队
        {
          type: "aidStation",
          name: "医疗救护站",
          longitude: 106.605216,
          latitude: 37.342578,
        }, // 医疗救护站
      ];
      let data = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      let data4 = [];
      let data5 = [];
      let data6 = [];
      let data7 = [];
      let data8 = [];

      this.mapData.forEach((item) => {
        switch (item.type) {
          case "projectWater":
            data1.push(item);
            break;
          case "projectElectricity":
            data2.push(item);
            break;
          case "projectHot":
            data3.push(item);
            break;
          case "projectPipegallery":
            data4.push(item);
            break;
          case "projectGas":
            data5.push(item);
            break;
          case "projectFirefacilities":
            data6.push(item);
            break;
          case "enterpriseBaseInfo":
            data7.push(item);
            break;
          case "roadVideoInfo":
            data8.push(item);
            break;
          default:
            break;
        }
      });
      if (this.checkBox[0]) {
        data = [...data, ...data1];
      }
      if (this.checkBox[1]) {
        data = [...data, ...data2];
      }
      if (this.checkBox[2]) {
        data = [...data, ...data3];
      }
      if (this.checkBox[3]) {
        data = [...data, ...data4];
      }
      if (this.checkBox[4]) {
        data = [...data, ...data5];
      }
      if (this.checkBox[5]) {
        data = [...data, ...data6];
      }
      if (this.checkBox[6]) {
        data = [...data, ...data7];
      }
      if (this.checkBox[7]) {
        data = [...data, ...data8];
      }
      data = [...data, ...datas];
      data.forEach((item) => {
        let lnglat = [];
        lnglat.push(item.longitude, item.latitude);
        item.lnglat = lnglat;
      });
      console.log(data);
      if (this.InfoWindow) {
        MapControl.clearInfoWindow();
      }
      if (data.length === 0) {
        MapControl.MarkerClusterer.setData([]);
        MapControl.initScatterData([]);
      } else {
        MapControl.MarkerClusterer.setData(data);
        MapControl.initScatterData(data);
      }
      if (this.isThreeView) {
        this.cesiumDraw(data);
      }
    },
    // 初始化弹出框功能
    openInfowindow(coord, extData) {
      // 判断是否存在弹出框
      const map = MapControl.map["map"];
      if (this.InfoWindow) {
        map.clearInfoWindow();
      }
      let data = extData.data[0];
      if (data.type === "camera") {
        this.popoutVideo(data.url);
        return;
      }
      if (data.type === "managementCommittee") {
        return;
      }
      if (data.type === "townGovernment") {
        return;
      }
      if (data.type === "policeOffice") {
        return;
      }
      if (data.type === "townHospital") {
        return;
      }
      if (data.type === "fireBrigade") {
        return;
      }
      if (data.type === "aidStation") {
        return;
      }
      // 获取弹窗样式
      var content = "";
      if (data.type === "enterpriseBaseInfo") {
        this.markerData = JSON.parse(JSON.stringify(extData.data[0]));
        content = this.$refs.infoWindow.$el;
        this.infowindowShow = true;
      } else {
        content = MapControl.getContent(data);
      }
      this.InfoWindow = new AMap.InfoWindow({
        anchor: "bottom-center", // 弹出框瞄点位置
        isCustom: true, // 使用自定义窗体
        offset: new AMap.Pixel(0, -87),
        content: content,
      });
      this.InfoWindow.open(map, coord);
    },

    // 根据设备编号查询设备
    queryEquipt(e) {
      if (e.keyCode === 13) {
        if (this.list.length > 0) {
          this.chooseEquipt(this.list[0]);
        }
        return;
      }
      this.list = [];
      let keyword = this.keyword.trim();
      // 循环模拟数据的数组
      if (this.mapData && this.mapData.length > 0) {
        this.mapData.forEach((msg) => {
          if (msg.name.indexOf(keyword) !== -1) {
            // 然后把当前json添加到list数组中
            this.list.push(msg);
          }
        });
      } else {
        return this.$Message.info("暂无数据");
      }
      if (keyword.length > 0 && this.list.length > 0) {
        this.state = true;
      } else {
        this.state = false;
        this.initMapData();
      }
    },
    // 选择设备
    chooseEquipt(item) {
      this.keyword = item.name;
      this.state = false;
      // 定位到改设备位置
      if (this.InfoWindow) {
        MapControl.clearInfoWindow();
      }
      MapControl.MarkerClusterer.setData([item]);
      MapControl.initScatterData([item]);
      let lng = item.longitude;
      let lat = item.latitude;
      // 当前标记居中
      setTimeout(() => {
        MapControl.setZoomAndCenter(22, [lng, lat]);
      }, 200);
    },
    // 清楚当前标记
    clearMarker() {
      this.keyword = "";
      this.initMapData();
    },
    // 测距
    distanceMeasure() {
      this.isOpenDistance = !this.isOpenDistance;
      if (!this.isThreeView) {
        MapControl.addDistance(this.isOpenDistance);
      } else {
        if (this.isOpenDistance) {
          this.$refs["cesiumMap"].draw("Polyline");
        } else {
          this.$refs["cesiumMap"].clearAllDrawn();
        }
      }
    },
    initClosedManagement() {
      this.$http.get("/bigScreen/closedManagement").then((res) => {
        this.closedManagement = res.data.datas[0];
      });
    },
    initEconomicSituation() {
      this.$http.get("/bigScreen/economicSituation").then((res) => {
        this.economicSituation = res.data.datas[0];
        let chartData2 = { xdata: [], ydata: [] };
        res.data.datas[0].list.forEach((item) => {
          chartData2.xdata.push(item.outputValue);
          chartData2.ydata.push(item.entprName);
        });
        chartData2.xdata.reverse();
        chartData2.ydata.reverse();
        while (chartData2.ydata.length < 5) {
          chartData2.ydata.unshift("");
          chartData2.xdata.unshift("");
        }
        this.chartData2 = chartData2;
      });
    },
    initBasicAbility() {
      this.$http.get("/bigScreen/basicAbility").then((res) => {
        if (res.data.datas && res.data.datas.actualTimeAbility) {
          this.basicAbility = res.data.datas;
        }
      });
    },
    initAlertChart() {
      let list = [];
      for (let j = 0; j < 7; j++) {
        list.push(parseInt(Math.random() * 1000) + 1000);
      }
      this.alertChartData1 = list;
      list = [];
      for (let j = 0; j < 7; j++) {
        list.push(parseInt(Math.random() * 1000));
      }
      this.alertChartData2 = list;
      list = [];
      for (let j = 0; j < 7; j++) {
        list.push(parseInt(Math.random() * 1000));
      }
      this.alertChartData3 = list;
    },
    initChartData1() {
      this.$http.get("/bigScreen/countEnterpriseOverview").then((res) => {
        let data = res.data.datas[0];
        let result = [
          {
            value: data.general,
            name: "一般监管",
            label: {
              color: "#27BEFF",
            },
          },
          {
            value: data.major,
            name: "重点关注",
            label: {
              color: "#FFA927",
            },
          },
          {
            value: data.special,
            name: "特别管控",
            label: {
              color: "#FF6827",
            },
          },
        ];

        this.enterNum = data.enterNum;
        this.chartData1 = result;
      });
    },
    initInnovationAbility() {
      this.$http.get("/bigScreen/innovationAbility").then((res) => {
        if (res.data.datas[0].parkAwardList.length > 5) {
          res.data.datas[0].parkAwardList =
            res.data.datas[0].parkAwardList.splice(0, 5);
        }
        if (res.data.datas[0].parkPatentList.length > 5) {
          res.data.datas[0].parkPatentList =
            res.data.datas[0].parkPatentList.splice(0, 5);
        }
        this.innovationAbility = res.data.datas[0];
      });
    },
    // 左下角力导向图
    initChartData3() {
      this.$http.get("/bigScreen/enterpriseType").then((res) => {
        this.enterpriseType = res.data.datas;
        if (res.data.datas && res.data.datas.level1) {
          this.chartData3 = this.generateNodes(res.data.datas.level1, null);
        }
      });
    },
    // 左上角信息
    initAreaInfo() {
      this.$http.get("/bigScreen/countEnterpriseOverviewDetail").then((res) => {
        if (res.data.code === 0) {
          this.AreaInfo = res.data.datas[0];
        }
      });
    },
    chartClick3(param) {
      if (param.data.id !== 0) {
        let index = param.data.itemValue.length + 1;
        if (!param.data.itemValue) {
          return;
        }
        let data = [];
        if (index > 4) {
          // 第五级,企业
          let enterpriseList = this.enterpriseType.enterpriseList.filter(
            (v) => {
              return v.indus_type_small === param.data.itemValue;
            }
          );
          enterpriseList.forEach((v) => {
            data.push({
              code_name: v.entpr_name,
              count: 1,
            });
          });
        } else {
          data = this.enterpriseType["level" + index].filter((v) => {
            return v.item_code.includes(param.data.itemCode);
          });
        }
        this.chartData3 = this.generateNodes(data, param.data);
      } else {
        // this.initChartData3()
        // 一级
        if (!param.data.itemValue) {
          return;
        }
        let index = param.data.itemValue.length;
        // 二级
        if (index < 2) {
          this.chartData3 = this.generateNodes(
            this.enterpriseType.level1,
            null
          );
          return;
        }
        // 三级,四级,五级
        let itemCode = param.data.itemCode.substr(
          0,
          param.data.itemCode.length - 4
        );
        let data = this.enterpriseType["level" + index].filter((v) => {
          return v.item_code.includes(itemCode);
        });
        let root = this.enterpriseType["level" + (index - 1)].filter((v) => {
          return v.item_code === itemCode;
        })[0];
        let rootNode = {
          name: root.code_name,
          value: root.count,
          itemCode: root.item_code,
          itemValue: root.item_value,
        };
        this.chartData3 = this.generateNodes(data, rootNode);
      }
    },
    // 渲染力导向图里的节点
    generateNodes(data, root) {
      let nodes = [];
      let links = [];
      let categories = [];
      let total = 0;
      data.forEach((v, i) => {
        let node = {};
        let id = i + 1;
        node = {
          id: id,
          name: v.code_name,
          category: i,
          value: v.count,
          itemCode: v.item_code,
          itemValue: v.item_value,
          symbolSize: 50,
          itemStyle: {
            borderColor: "#00fff7",
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: "#00fff7",
            color: "#11213b",
          },
        };
        links.push({
          source: id,
          target: 0,
        });
        total += v.count;
        nodes.push(node);
        categories.push({
          name: v.code_name,
        });
      });
      if (root == null) {
        nodes.unshift({
          id: 0,
          name: "分类",
          value: total,
          symbolSize: 80,
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "#00fff7",
            color: "#00fff7",
          },
        });
      } else {
        nodes.unshift({
          ...root,
          id: 0,
          symbolSize: 80,
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "#00fff7",
            color: "#00fff7",
          },
        });
      }
      return { nodes, links, categories };
    },
    // 弹出框table
    popoutTableClose() {
      this.popoutTableShow = false;
      this.popoutTablePage = 0;
    },
    // 分页
    popoutTablePageChange(page) {
      // 后端分页从0开始,所以要减1
      this.popoutTablePage = page - 1;
      if (this.popoutTableIndex === 1) {
        this.renderTable1();
      } else if (this.popoutTableIndex === 2) {
        this.renderTable2();
      } else if (this.popoutTableIndex === 3) {
        this.renderTable3();
      } else if (this.popoutTableIndex === 4) {
        this.renderTable4();
      } else if (this.popoutTableIndex === 5) {
        this.renderTable5();
      } else if (this.popoutTableIndex === 6) {
        this.renderTable6();
      }
    },
    // 企业列表
    popoutTable1() {
      this.popoutTableShow = true;
      this.popoutTableIndex = 1;
      this.popoutTableTitle = "企业列表";
      this.popoutTableColumn = [
        {
          key: "num",
          title: "序号",
          align: "center",
          minWidth: 10,
          maxWidth: 80,
          tooltip: true,
        },
        {
          key: "name",
          title: "企业名称",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "large",
          title: "监管行业大类",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "small",
          title: "监管行业小类",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "size",
          title: "企业规模",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "legalPerson",
          title: "法人",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
      ];
      this.renderTable1();
    },
    renderTable1() {
      enterprisePage({
        page: this.popoutTablePage,
        size: 10,
      }).then((res) => {
        let data = [];
        res.data.data.forEach((v, i) => {
          let num = 10 * this.popoutTablePage + i + 1;
          let large = "——";
          if (v.indusTypeClass) {
            let list = v.indusTypeClass.split("|");
            large = list[list.length - 1];
          }
          let small = "——";
          if (v.indusTypeSmall) {
            let list = v.indusTypeSmall.split("|");
            small = list[list.length - 1];
          }
          let size = "——";
          if (v.scale) {
            let list = v.scale.split("|");
            size = list[list.length - 1];
          }
          let name = v.entprName ? v.entprName : "——";
          let legalPerson = v.legalPerson ? v.legalPerson : "——";
          data.push({
            num,
            name,
            large,
            small,
            size,
            legalPerson,
          });
        });
        this.popoutTableData = data;
        this.popoutTableTotal = res.data.count;
      });
    },
    // 所有企业专利列表
    popoutTable2() {
      this.popoutTableShow = true;
      this.popoutTableIndex = 2;
      this.popoutTableTitle = "企业专利申请列表";
      this.popoutTableColumn = [
        {
          key: "name",
          title: "企业名称",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "patentName",
          title: "专利名称",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "date",
          title: "申请日期",
          align: "center",
          minWidth: 10,
          maxWidth: 120,
          tooltip: true,
        },
        {
          key: "code",
          title: "专利号",
          align: "center",
          minWidth: 10,
          maxWidth: 180,
          tooltip: true,
        },
      ];
      this.renderTable2();
    },
    renderTable2() {
      parkPatentPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10,
      }).then((res) => {
        let data = [];
        res.data.data.forEach((v, i) => {
          let name = v.enterpriseName ? v.enterpriseName : "——";
          let patentName = v.patentName ? v.patentName : "——";
          let date = v.validDate ? v.validDate : "——";
          let code = v.patentNumber ? v.patentNumber : "——";
          data.push({ name, patentName, date, code });
        });
        this.popoutTableData = data;
        this.popoutTableTotal = res.data.count;
      });
    },
    // 所有企业获奖列表
    popoutTable3() {
      this.popoutTableShow = true;
      this.popoutTableIndex = 3;
      this.popoutTableTitle = "企业获奖列表";
      this.popoutTableColumn = [
        {
          key: "name",
          title: "企业名称",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "award",
          title: "奖项名称",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "date",
          title: "申请日期",
          align: "center",
          minWidth: 10,
          maxWidth: 120,
          tooltip: true,
        },
      ];
      this.renderTable3();
    },
    renderTable3() {
      parkAwardPage({
        page: this.popoutTablePage,
        size: 10,
      }).then((res) => {
        let data = [];
        res.data.data.forEach((v, i) => {
          let name = v.enterpriseName ? v.enterpriseName : "——";
          let date = v.awardDate ? v.awardDate : "——";
          let award = v.awardName ? v.awardName : "——";
          data.push({ name, date, award });
        });
        this.popoutTableData = data;
        this.popoutTableTotal = res.data.count;
      });
    },
    // 单个企业专利列表
    popoutTable4(id) {
      this.popoutTableForm = {
        id: id,
      };
      this.popoutTableShow = true;
      this.popoutTableIndex = 4;
      this.popoutTableTitle = "企业专利列表";
      this.popoutTableColumn = [
        {
          key: "num",
          title: "序号",
          align: "center",
          minWidth: 10,
          maxWidth: 80,
          tooltip: true,
        },
        {
          key: "name",
          title: "专利名称",
          align: "center",
          minWidth: 180,
          tooltip: true,
        },
        {
          key: "date",
          title: "申请日期",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
        {
          key: "code",
          title: "专利号",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
      ];
      this.renderTable4();
    },
    renderTable4() {
      parkPatentPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10,
      }).then((res) => {
        let data = [];
        res.data.data.forEach((v, i) => {
          let num = 10 * this.popoutTablePage + i + 1;
          let name = v.patentName ? v.patentName : "——";
          let date = v.validDate ? v.validDate : "——";
          let code = v.patentNumber ? v.patentNumber : "——";
          data.push({ num, name, date, code });
        });
        this.popoutTableData = data;
        this.popoutTableTotal = res.data.count;
      });
    },
    // 单个企业获奖列表
    popoutTable5(id) {
      this.popoutTableForm = {
        id: id,
      };
      this.popoutTableShow = true;
      this.popoutTableIndex = 5;
      this.popoutTableTitle = "企业获奖列表";
      this.popoutTableColumn = [
        {
          key: "num",
          title: "序号",
          align: "center",
          minWidth: 10,
          maxWidth: 80,
          tooltip: true,
        },
        {
          key: "award",
          title: "奖项名称",
          align: "center",
          minWidth: 180,
          tooltip: true,
        },
        {
          key: "date",
          title: "申请日期",
          align: "center",
          minWidth: 10,
          tooltip: true,
        },
      ];
      this.renderTable5();
    },
    renderTable5() {
      parkAwardPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10,
      }).then((res) => {
        let data = [];
        res.data.data.forEach((v, i) => {
          let num = 10 * this.popoutTablePage + i + 1;
          let date = v.awardDate ? v.awardDate : "——";
          let award = v.awardName ? v.awardName : "——";
          data.push({ num, date, award });
        });
        this.popoutTableData = data;
        this.popoutTableTotal = res.data.count;
      });
    },
    // 弹出框chart
    popoutChartClose() {
      this.popoutChartShow = false;
    },
    // 园区年产值
    popoutChart1() {
      this.popoutChartShow = true;
      this.popoutChartTitle = "园区经济产值趋势";
      this.renderChart1();
    },
    renderChart1() {
      let category = [];
      let data = [];
      outputValueList().then((res) => {
        let list = res.data.datas[0].reverse();
        list.forEach((v) => {
          let key = Object.keys(v)[0];
          category.push(key);
          data.push(v[key]);
        });
        this.popoutChartCategory = category;
        this.popoutChartData = data;
      });
    },
    // 园区税收
    popoutChart2() {
      this.popoutChartShow = true;
      this.popoutChartTitle = "园区税收趋势";
      this.renderChart2();
    },
    renderChart2() {
      let category = [];
      let data = [];
      taxList().then((res) => {
        let list = res.data.datas[0].reverse();
        list.forEach((v) => {
          let key = Object.keys(v)[0];
          category.push(key);
          data.push(v[key]);
        });
        this.popoutChartCategory = category;
        this.popoutChartData = data;
      });
    },
    popoutVideoSelect(url, index) {
      this.vidioIndex = index;
      this.cameraUrl = url;
      this.popoutVideoSelectShow = true;
    },
    videoclose(a) {
      this.popoutVideoSelectShow = false;
      if (this.vidioIndex === 1) {
        this.cameraUrl1 = a;
      } else if (this.vidioIndex === 2) {
        this.cameraUrl2 = a;
      }
      this.vidioIndex = 0;
    },
    videoclosefull(e) {
      this.fullcameraUrl = e;
      this.popoutVideoFullScreenShow = true;
    },
    // 园区企业信息
    openTable(param) {
      this.popoutTableShow1 = true;
      this.popoutParam = param;
    },
    // 关闭弹窗
    closeInfoWindow() {
      if (this.InfoWindow) {
        const map = MapControl.map["map"];
        map.clearInfoWindow();
      }
      if (this.isThreeView) {
        this.clearCesiumPopup();
      }
      this.infowindowShow = false;
    },
    /* cesium 相关方法--start */
    // cesium加载完成
    cesiumLoad(viewer, handler) {
      this.viewer = viewer;
      this.handler = handler;
      this.initMapData();
      this.leftDownAction();
      setTimeout(() => {
        this.addGeojson();
      }, 500);
    },
    // 点位点位绘制
    cesiumDraw(data) {
      let viewer = this.viewer;
      viewer.entities.removeAll();
      if (data.length > 0) {
        data.forEach((item) => {
          MapControl.addCesiumPoint(item, viewer);
        });
      }
    },
    // 注册左键点击事件
    leftDownAction() {
      let handler = this.handler;
      let viewer = this.viewer;
      handler.setInputAction((movement) => {
        var picked = viewer.scene.pick(movement.position);
        if (Cesium.defined(picked) && picked.id.id) {
          let data = picked.id.monitoItems.data;
          this.getleftAction(data);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    // 获取图标点击事件
    getleftAction(data) {
      this.clearCesiumPopup();
      // 判断返回类型，是否显示地图弹窗
      if (data.type === "camera") {
        this.popoutVideo(data.url);
        return;
      }
      this.Popupposition(data);
    },
    // 弹窗加载
    Popupposition(data) {
      let viewer = this.viewer;
      this.divcontent = document.createElement("div");
      let divcontent = this.divcontent;
      // 获取弹窗样式
      var content = "";
      // 判断是否是其他类型弹窗
      if (data.type === "enterpriseBaseInfo") {
        this.markerData = JSON.parse(JSON.stringify(data));
        divcontent.appendChild(this.$refs.infoWindow.$el);
        this.infowindowShow = true;
      } else {
        content = MapControl.getContent(data);
        divcontent.innerHTML = content;
      }
      MapControl.addCesiumPupop(data, viewer, divcontent);
    },
    // 清除cesium弹窗
    clearCesiumPopup() {
      if (this.divcontent) {
        var parent = this.divcontent.parentElement;
        parent.removeChild(this.divcontent);
        this.viewer.scene.postRender.removeEventListener(
          this.Popupposition,
          this
        );
        this.divcontent = null;
      }
    },
    // 添加Geojson数据
    addGeojson() {
      let res = Cesium.GeoJsonDataSource.load(geoJson, {
        clampToGround: true,
      });
      let viewer = this.viewer;
      this.dlThreePlg = new Cesium.Entity();
      this.dkThreePlg = new Cesium.Entity();
      this.sxThreePlg = new Cesium.Entity();
      this.ldThreePlg = new Cesium.Entity();
      this.fbhThreePlg = new Cesium.Entity();
      let that = this;
      res.then((dataSource) => {
        viewer.dataSources.add(dataSource);
        let entities = dataSource.entities.values;
        let colorHash = {};
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          let name = entity._properties._type._value;
          let color = colorHash[name]; // 可以使两个同名要素使用同一种颜色。。。
          if (!color) {
            let colorObj = {
              道路: "#663bb7",
              地块: "#c78c0e",
              水系: "#1cc5ec",
              绿地: "#4cb051",
              封闭化: "#ff0000",
              其他: "#4cb051",
            };
            let opacity = 0.8;
            color = Cesium.Color.fromCssColorString(colorObj[name]);
            if (name === "其他") {
              opacity = 0;
            }
            color = color.withAlpha(opacity);
            colorHash[name] = color;
          }
          entity.polygon.material = color; // 设置要素颜色
          entity.polygon.outline = false;
          if (name === "道路") {
            entity.parent = that.dlThreePlg;
          } else if (name === "地块") {
            entity.parent = that.dkThreePlg;
          } else if (name === "水系") {
            entity.parent = that.sxThreePlg;
          } else if (name === "绿地") {
            entity.parent = that.ldThreePlg;
          } else if (name === "封闭化") {
            entity.parent = that.fbhThreePlg;
          }
        }
      });
      this.showHideThreePlg();
    },
    // 控制三维的范围面显示隐藏
    showHideThreePlg() {
      this.dlThreePlg.show = this.checkBox1[0];
      this.dkThreePlg.show = this.checkBox1[1];
      this.ldThreePlg.show = this.checkBox1[2];
      this.sxThreePlg.show = this.checkBox1[3];
      this.fbhThreePlg.show = this.checkBox1[4];
    },
    /* cesium 相关方法--end */
    // 实时查询告警数量
    getAlarmNumber() {
      bigScreencountEcologicalEnvironment()
        .then((res) => {
          if (res.data.code === 0) {
            let data = res.data.datas;
            this.alarmEventNum = data.total;
          } else {
            this.$Message.info(res.data.message);
          }
          this.pollingST = setTimeout(() => {
            clearTimeout(this.pollingST);
            this.getAlarmNumber();
          }, 10000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重大危险源告警
    popoutAlarmTable() {
      if (this.alarmEventNum && this.alarmEventNum > 0) {
        this.popoutTableShow = true;
        this.popoutTableIndex = 6;
        this.popoutTableForm = {};
        this.popoutTableTitle = "告警列表";
        this.popoutTableColumn = [
          {
            key: "alarmTitle",
            title: "告警标题",
            align: "center",
            minWidth: 10,
            tooltip: true,
          },
          {
            key: "alarmContent",
            title: "告警内容",
            align: "center",
            minWidth: 10,
            tooltip: true,
          },
          {
            key: "alarmTypeName",
            title: "告警类型",
            align: "center",
            minWidth: 10,
            tooltip: true,
          },
          // {
          //   key: 'unitType',
          //   title: '设备类型',
          //   align: 'center',
          //   minWidth: 10,
          //   render: (h, params) => {
          //     return h('div', {}, params.row.unitType.split('|')[3])
          //   }
          // },
          // {
          //   key: 'alarmType',
          //   title: '告警类型',
          //   align: 'center',
          //   minWidth: 10,
          //   render: (h, params) => {
          //     return h('div', {}, params.row.alarmType.split('|')[3])
          //   }
          // },
          {
            key: "alarmDate",
            title: "告警时间",
            align: "center",
            width: 190,
          },
        ];
        this.renderTable6();
      }
    },
    renderTable6() {
      bigScreenecologicalEnvironmentPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10,
      }).then((res) => {
        this.popoutTableData = [];
        if (res.data.code === 0) {
          let data = res.data;
          let list = data.datas;
          list.forEach((item) => {
            item.alarmTitle = item.alarmTitle || "--";
            item.alarmContent = item.alarmContent || "--";
          });
          this.popoutTableData = list;

          this.popoutTableTotal = data.totalCount;
        }
      });
    },
  },
  computed: {
    chartOption1() {
      return {
        title: {
          left: "49%",
          top: "35%",
          text: "安全\n监管类型",
          textStyle: {
            color: "rgb(255,255,255)",
          },
          textAlign: "center",
        },
        color: ["#27BEFF", "#FFA927", "#FF6827"],
        series: [
          {
            name: "消防应急资源",
            type: "pie",
            radius: ["45%", "60%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              alignTo: "edge",
              formatter: "{name|{b}}\n{time|{d} %}",
              edgeDistance: 10,
              lineHeight: 15,
              rich: {
                name: {
                  color: "#fff",
                  lineHeight: 25,
                },
                time: {
                  lineHeight: 25,
                },
              },
            },
            labelLine: {
              length: 15,
              length2: "100%",
            },
            data: this.chartData1,
          },
        ],
      };
    },
    chartOption2() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "category",
          data: this.chartData2.ydata,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        xAxis: {
          type: "value",
          nameTextStyle: {
            color: "white",
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        grid: {
          top: "5%",
          left: "10%",
          right: "5%",
          bottom: "5%",
        },
        series: [
          {
            name: "产值",
            data: this.chartData2.xdata,
            type: "bar",
            barWidth: 14,
            label: {
              show: true,
              formatter: "{b}",
              color: "#fff",
              position: [10, -20],
              fontSize: 14,
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#2AABF8",
                },
                {
                  offset: 1,
                  color: "#1799E5",
                },
              ]),
              borderRadius: 50,
            },
          },
        ],
      };
    },

    chartOption3() {
      return {
        tooltip: {},
        series: [
          {
            name: "行业类型",
            type: "graph",
            layout: "force",
            data: this.chartData3.nodes,
            symbolSize: 20,
            links: this.chartData3.links,
            categories: this.chartData3.categories,
            roam: true,
            label: {
              show: true,
              color: "#fff",
              formatter: "{b}\n{num|{c}}",
              rich: {
                num: {
                  fontSize: 14,
                  align: "center",
                },
              },
            },
            force: {
              repulsion: 900,
              friction: 0.4,
            },
          },
        ],
      };
    },
    chartOption4() {
      return {
        title: {
          left: "49%",
          top: "32%",
          text: "行业\n类型",
          textStyle: {
            color: "rgb(255,255,255)",
            fontSize: 18,
          },
          textAlign: "center",
        },
        color: ["#3C71F6", "#BB609C", "#12E0B1", "#25C1FE", "#BE4369"],
        tooltip: {},
        legend: {
          top: "bottom",
          icon: "circle",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        series: [
          {
            name: "行业类型",
            type: "pie",
            radius: ["45%", "70%"],
            center: ["50%", "40%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: "#0b1322",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 32, name: "制造业" },
              { value: 55, name: "建筑业" },
              { value: 23, name: "电力、热力、燃气及水生产和供应业" },
              { value: 75, name: "交通运输、仓储和邮政业" },
            ],
          },
        ],
      };
    },
    chartOption5() {
      var that = this;
      return {
        series: [
          {
            type: "liquidFill",
            data: [
              this.basicAbility.actualTimeAbility[0].actualTime /
                (this.basicAbility.actualTimeAbility[0].actualTime * 2),
            ],
            name: "实时供水",
            color: ["#2AABF8"],
            radius: "80%",
            itemStyle: {
              opacity: 0.6,
            },
            emphasis: {
              itemStyle: {
                opacity: 0.9,
              },
            },
            label: {
              // position: ['38%', '40%'],
              formatter: function (param) {
                return (
                  that.basicAbility.actualTimeAbility[0].actualTime +
                  "\n" +
                  param.seriesName
                );
              },
              fontSize: 16,
              fontWeight: 100,
              color: "#fff",
            },
            backgroundStyle: {
              borderWidth: 2,
              borderColor: "#5DE8FF",
              color: "#0a2c61",
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                color: "none",
                borderColor: "#1A83BA",
                borderWidth: 4,
                shadowBlur: 20,
                shadowColor: "rgba(0, 0, 0, 0.25)",
              },
            },
          },
        ],
      };
    },
    chartOption6() {
      var that = this;
      return {
        series: [
          {
            type: "liquidFill",
            data: [
              this.basicAbility.actualTimeAbility[1].actualTime /
                (this.basicAbility.actualTimeAbility[1].actualTime * 2),
            ],
            name: "实时污水",
            color: ["#2AABF8"],
            radius: "80%",
            itemStyle: {
              opacity: 0.6,
            },
            emphasis: {
              itemStyle: {
                opacity: 0.9,
              },
            },
            label: {
              // position: ['38%', '40%'],
              formatter: function (param) {
                return (
                  that.basicAbility.actualTimeAbility[1].actualTime +
                  "\n" +
                  param.seriesName
                );
              },
              fontSize: 16,
              fontWeight: 100,
              color: "#fff",
            },
            backgroundStyle: {
              borderWidth: 2,
              borderColor: "#5DE8FF",
              color: "#0a2c61",
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                color: "none",
                borderColor: "#1A83BA",
                borderWidth: 4,
                shadowBlur: 20,
                shadowColor: "rgba(0, 0, 0, 0.25)",
              },
            },
          },
        ],
      };
    },
    chartOption7() {
      return {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "50%"],
            radius: "70%",
            startAngle: 90,
            endAngle: -270,
            min: 0,
            max: 160,
            splitNumber: 12,
            itemStyle: {
              color: "#5EE9FF",
            },
            progress: {
              show: true,
              width: 5,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 5,
              },
            },
            axisTick: {
              distance: -15,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#5EE9FF",
              },
            },
            splitLine: {
              distance: -22,
              length: 14,
              lineStyle: {
                width: 2,
                color: "#5EE9FF",
              },
              show: false,
            },
            axisLabel: {
              distance: -10,
              color: "#5EE9FF",
              fontSize: 20,
              show: false,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-20%"],
              fontSize: 16,
              fontWeight: "500",
              formatter: "{value}",
              color: "#5EE9FF",
            },
            data: [
              {
                value: this.basicAbility.actualTimeAbility[2].actualTime,
              },
            ],
          },
          {
            type: "gauge",
            center: ["50%", "60%"],
            radius: "70%",
            startAngle: 90,
            endAngle: -270,
            min: 0,
            max: 160,
            itemStyle: {
              color: "#FD7347",
            },
            progress: {
              show: false,
              width: 2,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, "-12%"],
              fontSize: 14,
              fontWeight: "100",
              formatter: "实时供电",
              color: "#fff",
            },
            data: [
              {
                value: this.basicAbility.actualTimeAbility[2].actualTime,
              },
            ],
          },
        ],
      };
    },
    chartOption8() {
      return {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "50%"],
            radius: "70%",
            startAngle: 90,
            endAngle: -270,
            min: 0,
            max: 160,
            splitNumber: 12,
            itemStyle: {
              color: "#5EE9FF",
            },
            progress: {
              show: true,
              width: 5,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 5,
              },
            },
            axisTick: {
              distance: -15,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#5EE9FF",
              },
            },
            splitLine: {
              distance: -22,
              length: 14,
              lineStyle: {
                width: 2,
                color: "#5EE9FF",
              },
              show: false,
            },
            axisLabel: {
              distance: -10,
              color: "#5EE9FF",
              fontSize: 20,
              show: false,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-20%"],
              fontSize: 16,
              fontWeight: "500",
              formatter: "{value}",
              color: "#5EE9FF",
            },
            data: [
              {
                value: this.basicAbility.actualTimeAbility[3].actualTime,
              },
            ],
          },
          {
            type: "gauge",
            center: ["50%", "60%"],
            radius: "70%",
            startAngle: 90,
            endAngle: -270,
            min: 0,
            max: 160,
            itemStyle: {
              color: "#FD7347",
            },
            progress: {
              show: false,
              width: 2,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              // width: '60%',
              // lineHeight: 40,
              // borderRadius: 8,
              offsetCenter: [0, "-12%"],
              fontSize: 14,
              fontWeight: "100",
              formatter: "实时供气",
              color: "#fff",
            },
            data: [
              {
                value: this.basicAbility.actualTimeAbility[3].actualTime,
              },
            ],
          },
        ],
      };
    },
    alertChartOption() {
      return {
        legend: {
          data: ["消防告警", "故障告警", "联网告警"],
          textStyle: {
            color: "#fff",
          },
          right: "5%",
          icon: "roundRect",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "单位:件",
          nameTextStyle: {
            color: "white",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(216, 214, 214, 0.5)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(216, 214, 214, 0.5)",
              type: [2, 2],
            },
          },
          axisLabel: {
            color: "white",
          },
        },
        grid: {
          top: "20%",
          left: "10%",
          right: "5%",
          bottom: "20%",
        },
        series: [
          {
            name: "消防告警",
            data: this.alertChartData1,
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(253, 192, 0, 1)",
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: "solid",
                  color: "rgba(253, 192, 0, 1)",
                },
              },
            },
          },
          {
            name: "故障告警",
            data: this.alertChartData2,
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(254, 106, 0, 1)",
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: "solid",
                  color: "rgba(254, 106, 0, 1)",
                },
              },
            },
          },
          {
            name: "联网告警",
            data: this.alertChartData3,
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(30, 191, 245, 1)",
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: "solid",
                  color: "rgba(30, 191, 245, 1)",
                },
              },
            },
          },
        ],
      };
    },
    atmosphereOption() {
      return {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            radius: "60%",
            startAngle: 230,
            endAngle: -50,
            min: 0,
            max: 100,
            splitNumber: 12,
            itemStyle: {
              color: "#00D6F7",
            },
            progress: {
              show: true,
              width: 5,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 5,
              },
            },
            axisTick: {
              distance: -15,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#00D6F7",
              },
            },
            splitLine: {
              distance: -22,
              length: 14,
              lineStyle: {
                width: 2,
                color: "#00D6F7",
              },
            },
            axisLabel: {
              distance: -10,
              color: "#00D6F7",
              fontSize: 20,
              show: false,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "8%"],
              fontSize: 25,
              fontWeight: "bolder",
              formatter: "{value}",
              color: "#00D6F7",
            },
            data: [
              {
                value: 20,
              },
            ],
          },
          {
            type: "gauge",
            center: ["50%", "60%"],
            radius: "70%",
            startAngle: 230,
            endAngle: -50,
            min: 0,
            max: 100,
            itemStyle: {
              color: "#FD7347",
            },
            progress: {
              show: false,
              width: 2,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, "78%"],
              fontSize: 15,
              formatter: "AQI",
              color: "#fff",
            },
            data: [
              {
                value: 20,
              },
            ],
          },
        ],
      };
    },
    ...mapState({
      isFirst: (state) => state.app.isFirst,
    }),
  },
};
</script>

<style></style>
