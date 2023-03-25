
<style lang="less" scoped>
@import "./Bigscreen3.less";
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
      @fullscreen="popoutVideoFullScreenShow=true"
      @close="popoutVideoClose"
    />
    <PopoutHeilimit
    :show="popoutHeilimitShow"
      :url="url"
      @close="popoutHeilimitShow=false"
      />
    <PopoutTech
      :popoutTechShow="popoutTechShow"
      :list="popoutTechList"
      @close="popoutTechClose"
    />
    <popout-video-full-screen style="z-index:4;" :show="popoutVideoFullScreenShow" :cameraUrl="cameraUrl" @close="popoutVideoFullScreenShow = false"></popout-video-full-screen>
<popout-enterprise-table :popoutTableShow="popoutTableShow1" :param="popoutParam" :enterpriseAllInfo="markerData" @close="popoutTableShow1=false"></popout-enterprise-table>
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
    <Menu :index="3"></Menu>
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
            <div class="title">突发事件概览(年度)</div>
          </div>
          <Row>
            <Col span="12" class="item-container">
              <div class="item">
                <div class="img-container">
                  <img src="@/assets/bigscreen/icon-swrs.png" alt class="img" />
                  <div class="num-container">
                    <div>累计死亡人数</div>
                    <div>
                      <CountTo
                        :startVal="0"
                        :endVal="realTimeMonitoring.death"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                      <span class="unit">人</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="img-container">
                  <img src="@/assets/bigscreen/icon-ssrs.png" alt class="img" />
                  <div class="num-container">
                    <div>累计受伤人数</div>
                    <div>
                      <CountTo
                        :startVal="0"
                        :endVal="realTimeMonitoring.inj"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                      <span class="unit">人</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="img-container">
                  <img src="@/assets/bigscreen/icon-jjss.png" alt class="img" />
                  <div class="num-container">
                    <div>累计经济损失</div>
                    <div>
                      <CountTo
                        :startVal="0"
                        :endVal="realTimeMonitoring.loss"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                      <span class="unit">万元</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="12" class="item-container">
              <div class="num2-container popout" @click="popoutTable1(1)">
                <img
                  src="@/assets/bigscreen/icon-tf1.png"
                  alt=""
                  class="task-img"
                />
                <div>事故灾难</div>
                <CountTo
                  :startVal="0"
                  :endVal="realTimeMonitoring.accident"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num2-container popout" @click="popoutTable1(2)">
                <img
                  src="@/assets/bigscreen/icon-tf2.png"
                  alt=""
                  class="task-img"
                />
                <div>社会安全</div>
                <CountTo
                  :startVal="0"
                  :endVal="realTimeMonitoring.security"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num2-container popout" @click="popoutTable1(3)">
                <img
                  src="@/assets/bigscreen/icon-tf3.png"
                  alt=""
                  class="task-img"
                />
                <div>公共卫生</div>
                <CountTo
                  :startVal="0"
                  :endVal="realTimeMonitoring.health"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num2-container popout" @click="popoutTable1(4)">
                <img
                  src="@/assets/bigscreen/icon-tf4.png"
                  alt=""
                  class="task-img"
                />
                <div>自然灾害</div>
                <CountTo
                  :startVal="0"
                  :endVal="realTimeMonitoring.disaster"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
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
          <div class="item-container">
            <div class="container-title">
              <img src="@/assets/title-arrow.png" alt="" class="img" />
              <div class="title">突发事件占比分析(年度)</div>
            </div>
            <Row>
              <Col span="24">
                <charts class="chart" :options="chartOption0" :id="'chart0'" />
              </Col>
            </Row>
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
            <div class="title">突发事件统计(年度)</div>
          </div>
          <Row>
            <Col span="24">
              <charts class="chart" :options="chartOption1" :id="'chart1'" />
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
              <div class="hoverlegen" v-show="checkBox2[0].mouseHover">
                <div
                  v-for="(ele, index) in checkBox2[0].children"
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
            </div>
            <!-- <div class="checkList">
              <div @click="clickThis(4)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[4] }"
                ></span>
                <span class="checkLabel r07">物资储备库</span>
              </div>
              <div @click="clickThis(5)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[5] }"
                ></span>
                <span class="checkLabel r08">救援队伍</span>
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
                <span class="checkLabel r30">医疗资源</span>
              </div>
              <div @click="clickThis(8)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[8] }"
                ></span>
                <span class="checkLabel r31">避难场所</span>
              </div>
            </div> -->
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
            <div class="title">园区应急保障</div>
          </div>
          <Row class="chart-container">
            <Col span="12">
              <div class="item">
                <div class="img-container popout" @click="popoutTable2">
                  <img
                    src="@/assets/bigscreen/icon-yjya.png"
                    alt=""
                    class="img"
                  />
                  <div>
                    <div>应急预案</div>
                    <CountTo
                      :startVal="0"
                      :endVal="countEmergencyResourceStatistics.plan"
                      :duration="countDuration"
                      class="num1"
                    ></CountTo>
                    <span class="unit">项</span>
                  </div>
                </div>
                <div class="bot">
                  <div class="item popout" @click="popoutTable8(1)">
                    <div class="img-container">
                      <img
                        src="@/assets/bigscreen/ICON-yjzy1.png"
                        alt
                        class="img"
                      />
                      <div class="num-container">
                        <div>事故灾难</div>
                        <div>
                          <CountTo
                            :startVal="0"
                            :endVal="countEmergencyResourceStatistics.accident"
                            :duration="countDuration"
                            class="num1"
                          ></CountTo>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item popout" @click="popoutTable8(2)">
                    <div class="img-container">
                      <img
                        src="@/assets/bigscreen/ICON-yjzy2.png"
                        alt
                        class="img"
                      />
                      <div class="num-container">
                        <div>自然灾害</div>
                        <div>
                          <CountTo
                            :startVal="0"
                            :endVal="countEmergencyResourceStatistics.disaster"
                            :duration="countDuration"
                            class="num1"
                          ></CountTo>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item popout" @click="popoutTable8(3)">
                    <div class="img-container">
                      <img
                        src="@/assets/bigscreen/ICON-yjzy3.png"
                        alt
                        class="img"
                      />
                      <div class="num-container">
                        <div>社会安全</div>
                        <div>
                          <CountTo
                            :startVal="0"
                            :endVal="countEmergencyResourceStatistics.security"
                            :duration="countDuration"
                            class="num1"
                          ></CountTo>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item popout" @click="popoutTable8(4)">
                    <div class="img-container">
                      <img
                        src="@/assets/bigscreen/ICON-yjzy4.png"
                        alt
                        class="img"
                      />
                      <div class="num-container">
                        <div>公共卫生</div>
                        <div>
                          <CountTo
                            :startVal="0"
                            :endVal="countEmergencyResourceStatistics.health"
                            :duration="countDuration"
                            class="num1"
                          ></CountTo>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="12" class="item-container">
              <div class="num3-container popout" @click="popoutTable3">
                <img
                  src="@/assets/bigscreen/icon-yjzy5.png"
                  alt=""
                  class="task-img"
                />
                <div>应急资源</div>
                <CountTo
                  :startVal="0"
                  :endVal="countEmergencyResourceStatistics.resources"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num3-container popout" @click="popoutTable4">
                <img
                  src="@/assets/bigscreen/icon-yjzy6.png"
                  alt=""
                  class="task-img"
                />
                <div>救援队伍</div>
                <CountTo
                  :startVal="0"
                  :endVal="countEmergencyResourceStatistics.team"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num3-container popout" @click="popoutTable5">
                <img src="@/assets/bigscreen/icon-yjzy7.png" class="task-img" />
                <div>物资储备库</div>
                <CountTo
                  :startVal="0"
                  :endVal="countEmergencyResourceStatistics.reserveBank"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num3-container popout" @click="popoutTable6">
                <img src="@/assets/bigscreen/icon-yjzy8.png" class="task-img" />
                <div>救援专家</div>
                <CountTo
                  :startVal="0"
                  :endVal="countEmergencyResourceStatistics.expert"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num3-container popout" @click="popoutTable10">
                <img src="@/assets/bigscreen/icon-yjzy9.png" class="task-img" />
                <div>医疗资源</div>
                <CountTo
                  :startVal="0"
                  :endVal="countEmergencyResourceStatistics.healthInfo"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
              </div>
              <div class="num3-container popout" @click="popoutTable11">
                <img src="@/assets/bigscreen/icon-yjzy10.png" class="task-img" />
                <div>避难场所</div>
                <CountTo
                  :startVal="0"
                  :endVal="countEmergencyResourceStatistics.asylumareaInfo"
                  :duration="countDuration"
                  class="num2"
                ></CountTo>
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
          <div class="container-title" @click="popoutTable2" style="cursor:pointer;">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">应急预案</div>
            <img src="@/assets/bigscreen/bartz.png"  class="task-img" />
          </div>
          <div class="item-container">
            <vue-seamless-scroll
              :data="emergencyPlan"
              :class-option="options"
              class="seamless-warp"
            >
              <div
                v-for="(item, index) in emergencyPlan"
                :key="index"
                class="item"
              >
                <div class="title-container">
                  <div class="index">0{{ index + 1 }}</div>
                  <div class="title">{{ item.planname }}</div>
                </div>
                <div class="info-container">
                  <div class="type">
                    ·{{ getDictionaries(item.plantypecode) }}
                  </div>
                  <div class="line">|</div>
                  <div class="date">{{ item.publishtime }}</div>
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
        <div
          class="
            task-container
            container
            animate__animated animate__backInRight animate__slower
          "
        >
          <div class="container-title" @click="popoutTable7" style="cursor:pointer;">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">演练事件</div>
            <img src="@/assets/bigscreen/bartz.png"  class="task-img" />
          </div>
          <div class="item-container">
            <vue-seamless-scroll
              :data="drillEvents"
              :class-option="options"
              class="seamless-warp"
            >
              <div
                v-for="(item, index) in drillEvents"
                :key="index"
                class="item"
              >
                <div class="title-container">
                  <div class="index">0{{ index + 1 }}</div>
                  <div class="title">{{ item.rescueName }}</div>
                </div>
                <div class="info-container">
                  <div class="type">
                    ·{{ getDictionaries(item.rescueType) }}
                  </div>
                  <div class="line">|</div>
                  <div class="date">{{ item.happenTime }}</div>
                </div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
      <!-- 右侧结束 -->
    </div>
    <!-- 底部开始 -->
    <InfoWindow ref="infoWindow" :markerData="markerData" @openTable="openTable" @close="closeInfoWindow" v-show="infowindowShow"></InfoWindow>
  </div>
</template>

<script>
import moment from 'moment'
// import BigscreenFooter from './components/bigscreen-footer/BigscreenFooter.vue'
import Menu from './components/menu/Menu.vue'
import Header from './components/header/Header.vue'
import charts from '../components/charts.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
import * as echarts from 'echarts'
import geoJson from './gyq.js'
// import AMap from 'AMap'
import aMap from './components/amap/amap.vue'
import cesiumMap from './components/cesium/cesiumMap.vue'
import { MapControl } from './components/amap/api/amapControl'
import PopoutTable from './components/popout/PopoutTable.vue'
import PopoutVideo from './components/popout/PopoutVideo.vue'
import PopoutTech from './components/popout/PopoutTech.vue'
import PopoutVideoFullScreen from './components/popout/PopoutVideoFullScreen.vue'
import PopoutHeilimit from './components/popout/PopoutHeilimit.vue'
import {
  realTimeMonitoringPage,
  emergencyPlanPage,
  emergencyResourcesPage,
  drillEventsPage,
  getAccidentreportinfo,
  getAccidentreportinfoList,
  getMajorHazardChemicalInfoList
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
    PopoutHeilimit,
    charts,
    Menu,
    Header,
    vueSeamlessScroll,
    PopoutTable,
    PopoutVideo,
    PopoutTech,
    CountTo,
    aMap,
    cesiumMap,
    PopoutVideoFullScreen,
    PopoutEnterpriseTable,
    InfoWindow: () => import('./components/amap/components/InfoWindow.vue')
  },
  data() {
    return {
      // 图层选择
      checkBox: [true, true, true, true, true, true, true, true, true, true, true],
      checkBox1: [true, true, true, true, true],
      checkBox2: [
        {
          label: '重大危险源/4',
          value: 0,
          check: true,
          mouseHover: false,
          children: [
            { label: '一级重大危险源', icon: 'r01', value: 0, check: true },
            { label: '二级重大危险源', icon: 'r02', value: 1, check: true },
            { label: '三级重大危险源', icon: 'r03', value: 2, check: true },
            { label: '四级重大危险源', icon: 'r04', value: 3, check: true }
          ]
        },
        { label: '物资储备库', icon: 'r07', value: 1, check: true, mouseHover: false },
        { label: '救援队伍', value: 2, check: true, mouseHover: false },
        { label: '园区企业', value: 3, check: true, mouseHover: false },
        { label: '医疗资源', value: 4, check: true, mouseHover: false },
        { label: '避难场所', value: 5, check: true, mouseHover: false },
        { label: '视频监控', value: 6, check: true, mouseHover: false },
        { label: '智能限高杆', value: 7, check: true, mouseHover: false }
      ],
      // 数字滚动的时长
      countDuration: 8000,
      options: {
        step: 1, // 数值越大速度滚动越快
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
      // checkBox: [true, true, true, true, true, true, true, true, true],
      // checkBox1: [true, true, true, true, true],
      keyword: '', // 设备编号关键字
      state: false,
      list: [],
      // 右上角日期和时间
      date: null,
      weekday: null,
      time: null,
      chartData1: [],
      chartData2: {},
      realTimeMonitoring: {
        inj: null,
        loss: null,
        security: null,
        death: null,
        accident: null,
        disaster: null,
        health: null
      },
      countEmergencyResourceStatistics: {
        plan: null,
        accident: null,
        disaster: null,
        security: null,
        health: null,
        resources: null,
        team: null,
        reserveBank: null,
        expert: null,
        healthInfo: null,
        asylumareaInfo: null
      },
      emergencyPlan: [],
      drillEvents: [],
      popoutTechShow: false,
      popoutTechList: [],
      cameraUrl: '',
      url: '',
      popoutVideoShow: false,
      popoutHeilimitShow: false,
      popoutVideoFullScreenShow: false,
      PopoutHeilimitFullScreenShow: false,
      // 弹出框table
      popoutTableShow: false,
      popoutTableIndex: 0,
      popoutTableTitle: '',
      popoutTableColumn: [],
      popoutTableData: [],
      popoutTableTotal: 0,
      popoutTablePage: 0,
      popoutTableForm: {},
      isOpenDistance: false,
      // 三维切换
      isThreeView: false,
      //  重大事件
      pollingST: null,
      reportTime: '',
      importEventPoints: [],
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
    // this.initMap()
    this.initRealTimeMonitoring()
    this.initEmergencyResourceStatistics()
    this.initEmergencyPlan()
    this.initDrillEvents()
    this.initChartData1()
    this.initChartData2()
    this.getimportEventPoints() // 获取重大事故
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
    window.realTimeVideo = (url) => {
      if (url && url !== 'null') {
        this.popoutVideoShow = true
        this.cameraUrl = url
      } else {
        this.$Message.info('暂未接入视频')
      }
    }
    window.heightlimit = (url) => {
      if (url && url !== 'null') {
        this.url = url
        window.open(url)
        // this.popoutHeilimitShow = true
      } else {
        this.$Message.info('暂未接入视频')
      }
    }
    window.hisVideo = (id) => {
      this.popoutTechShow = true
      this.$http
        .get('/bigScreen/getMajorHazardDeviceInfoList/' + id)
        .then((res) => {
          this.popoutTechList = res.data.datas[0]
        })
    }
    // 进入战时
    window.AccidentPage = (id) => {
      let url = '/tysyq/gis/?method=incidentMap'
      window.open(url)
    }
    // 关联危化品
    window.relateDanger = (id) => {
      this.popoutTable12(id)
    }
  },
  methods: {
    /* 图例点击事件 */
    lenderClick(item) {
      item.check = !item.check
      let key = item.value
      if (key === 0) {
        this.dangerClick(item.check)
      } else if (key === 1) {
        this.checkBox[4] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 2) {
        this.checkBox[5] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 3) {
        this.checkBox[6] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 4) {
        this.checkBox[7] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 5) {
        this.checkBox[8] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 6) {
        this.checkBox[9] = item.check
        this.$forceUpdate()
        this.initMapData()
      } else if (key === 7) {
        // this.areaGroupShowHidde('07', item.check)
        this.checkBox[10] = item.check
        this.$forceUpdate()
        this.initMapData()
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
        if (item.value === 0) {
          item.mouseHover = true
        }
      }
    },
    getDictionaries(str) {
      return str.split('|')[3]
    },
    initRealTimeMonitoring() {
      this.$http.get('/bigScreen/realTimeMonitoring').then((res) => {
        if (res.data.datas) {
          this.realTimeMonitoring = res.data.datas[0]
        }
      })
    },
    initEmergencyPlan() {
      this.$http.get('/bigScreen/emergencyPlan').then((res) => {
        this.emergencyPlan = res.data.datas[0]
      })
    },
    initDrillEvents() {
      this.$http.get('/bigScreen/drillEvents').then((res) => {
        this.drillEvents = res.data.datas[0]
      })
    },
    initEmergencyResourceStatistics() {
      this.$http
        .get('/bigScreen/countEmergencyResourceStatistics')
        .then((res) => {
          let data = res.data.datas[0]
          if (data) {
            let map = {}
            map.plan = data.plan ? data.plan : 0
            map.accident = data.accident ? data.accident : 0
            map.disaster = data.disaster ? data.disaster : 0
            map.security = data.security ? data.security : 0
            map.health = data.health ? data.health : 0
            map.resources = data.resources ? data.resources : 0
            map.team = data.team ? data.team : 0
            map.reserveBank = data.reserveBank ? data.reserveBank : 0
            map.expert = data.expert ? data.expert : 0
            map.healthInfo = data.healthInfo ? data.healthInfo : 0
            map.asylumareaInfo = data.asylumareaInfo ? data.asylumareaInfo : 0
            this.countEmergencyResourceStatistics = res.data.datas[0]
          }
        })
    },
    /*
      accident：事故；
      security：社会安全
      health：公共安全
      disaster：自然灾害
    */
    initChartData1() {
      let result = []
      this.$http.get('/bigScreen/eventsProportion').then((res) => {
        result = [
          {
            value: res.data.datas[0].accident,
            name: '事故灾难'
          },
          {
            value: res.data.datas[0].health,
            name: '公共卫生'
          },
          {
            value: res.data.datas[0].disaster,
            name: '自然灾害'
          },
          {
            value: res.data.datas[0].security,
            name: '社会安全'
          }
        ]
        this.chartData1 = result
      })
    },
    initChartData2() {
      let result = []
      this.$http.get('/bigScreen/emergencyStatistics').then((res) => {
        let data = res.data.datas[0]
        result = {
          great: [
            data.accident.great,
            data.disaster.great,
            data.security.great,
            data.health.great
          ],
          major: [
            data.accident.major,
            data.disaster.major,
            data.security.major,
            data.health.major
          ],
          more: [
            data.accident.more,
            data.disaster.more,
            data.security.more,
            data.health.more
          ],
          commonly: [
            data.accident.commonly,
            data.disaster.commonly,
            data.security.commonly,
            data.health.commonly
          ],
          total: [
            data.accident.great +
              data.accident.major +
              data.accident.more +
              data.accident.commonly,
            data.disaster.great +
              data.disaster.major +
              data.disaster.more +
              data.disaster.commonly,
            data.security.great +
              data.security.major +
              data.security.more +
              data.security.commonly,
            data.health.great +
              data.health.major +
              data.health.more +
              data.health.commonly
          ]
        }
        this.chartData2 = result
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
        type: '1,2,3,4,14,15,17,12,13,16,18'
      }
      this.$http.post('/bigScreen/emergencyCommand', data).then((res) => {
        if (res.data.code === 0) {
          res.data.datas[0].majorHazardInfo.forEach((item) => {
            item.type = 'majorHazardInfo'
            item.name = item.majorHazardName
          })
          res.data.datas[0].emnStorageInfo.forEach((item) => {
            item.type = 'emnStorageInfo'
            item.name = item.storagename
          })
          res.data.datas[0].teamInfo.forEach((item) => {
            item.type = 'teamInfo'
            item.name = item.teamname
          })

          res.data.datas[0].enterpriseBaseInfo.forEach((item) => {
            item.type = 'enterpriseBaseInfo'
            item.name = item.entprName
          })
          // 医院
          if (res.data.datas[0].healthInfo) {
            res.data.datas[0].healthInfo.forEach((item) => {
              item.type = 'healthInfo'
              item.name = item.healthName
            })
          }

          // 避难所
          if (res.data.datas[0].asylumareaInfo) {
            res.data.datas[0].asylumareaInfo.forEach((item) => {
              item.type = 'asylumareaInfo'
              item.name = item.asylumareaname
            })
          }
          // 视频监控
          if (res.data.datas[0].roadVideoInfo) {
            res.data.datas[0].roadVideoInfo.forEach((item) => {
              item.type = 'roadVideoInfo'
              item.name = item.videoName
            })
          }
          // 智能限高杆
          if (res.data.datas[0].smartHeightlimitInfo) {
            res.data.datas[0].smartHeightlimitInfo.forEach((item) => {
              item.type = 'smartHeightlimitInfo'
              item.name = item.heightlimit
            })
          }
          let data = [
            ...res.data.datas[0].majorHazardInfo,
            ...res.data.datas[0].emnStorageInfo,
            ...res.data.datas[0].teamInfo,
            ...res.data.datas[0].enterpriseBaseInfo,
            ...res.data.datas[0].healthInfo,
            ...res.data.datas[0].asylumareaInfo,
            ...res.data.datas[0].roadVideoInfo,
            ...res.data.datas[0].smartHeightlimitInfo
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

    // 获取重大事件
    getimportEventPoints() {
      getAccidentreportinfo(this.reportTime)
        .then((res) => {
          if (res.data.code === 0) {
            let data = res.data.datas
            this.reportTime = data[0]
            this.getimportEventList()
          } else {
            console.log(res.data.message)
          }
          this.pollingST = setTimeout(() => {
            clearTimeout(this.pollingST)
            this.getimportEventPoints()
          }, 10000)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getimportEventList() {
      getAccidentreportinfoList()
        .then((res) => {
          if (res.data.code === 0) {
            let data = res.data.datas
            data.forEach((item) => {
              let lnglat = []
              lnglat.push(item.longitude, item.latitude)
              item.lnglat = lnglat
              item.type = 'AccidentPoint'
              item.name = item.accidentTypeNames
            })
            this.importEventPoints = data
            this.initMapData()
          } else {
            this.$Message.info(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initMapData() {
      // let data = this.mapData
      let data = this.importEventPoints
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      let data5 = []
      let data6 = []
      let data7 = []
      let data8 = []
      let data9 = []
      let data10 = []
      let data11 = []
      if (this.mapData && this.mapData.length > 0) {
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
            case 'emnStorageInfo':
              data5.push(item)
              break
            case 'teamInfo':
              data6.push(item)
              break
            case 'enterpriseBaseInfo':
              data7.push(item)
              break
            case 'healthInfo':
              data8.push(item)
              break
            case 'asylumareaInfo':
              data9.push(item)
              break
            case 'roadVideoInfo':
              data10.push(item)
              break
            case 'smartHeightlimitInfo':
              data11.push(item)
              break
            default:
              break
          }
        })
      }
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
        data = [...data, ...data5]
      }
      if (this.checkBox[5]) {
        data = [...data, ...data6]
      }
      if (this.checkBox[6]) {
        data = [...data, ...data7]
      }
      if (this.checkBox[7]) {
        data = [...data, ...data8]
      }
      if (this.checkBox[8]) {
        data = [...data, ...data9]
      }
      if (this.checkBox[9]) {
        data = [...data, ...data10]
      }
      if (this.checkBox[10]) {
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
      coord = [coord[0], coord[1] + 0.00025]
      map.setZoomAndCenter(20, coord)
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
      } else if (this.popoutTableIndex === 6) {
        this.renderTable6()
      } else if (this.popoutTableIndex === 7) {
        this.renderTable7()
      } else if (this.popoutTableIndex === 8) {
        this.renderTable8()
      }
    },
    // 实时突发事件弹窗
    popoutTable1(type) {
      this.popoutTableShow = true
      this.popoutTableIndex = 1
      let typeParam = ''
      if (type === 1) {
        this.popoutTableTitle = '事故灾难事件监测'
        typeParam = 'accident'
      } else if (type === 2) {
        typeParam = 'security'
        this.popoutTableTitle = '社会安全事件监测'
      } else if (type === 3) {
        typeParam = 'health'
        this.popoutTableTitle = '公共卫生事件监测'
      } else if (type === 4) {
        typeParam = 'disaster'
        this.popoutTableTitle = '自然灾害事件监测'
      }
      this.popoutTableForm = {
        type: typeParam
      }
      this.popoutTableColumn = [
        {
          key: 'title',
          title: '事件标题',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'level',
          title: '事件等级',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'time',
          title: '报警时间',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable1()
    },
    renderTable1() {
      realTimeMonitoringPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let title = v.reportTitle ? v.reportTitle : '——'
          let level = '——'
          if (v.accidentLevel) {
            let list = v.accidentLevel.split('|')
            level = list[list.length - 1]
          }
          let time = v.reportTime ? v.reportTime : '——'
          data.push({ title, level, time })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 应急预案弹窗
    popoutTable2() {
      this.popoutTableShow = true
      this.popoutTableIndex = 2
      this.popoutTableTitle = '应急预案列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '预案名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'type',
          title: '预案类型',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'unit',
          title: '发布单位',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'date',
          title: '发布日期',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable2()
    },
    renderTable2() {
      emergencyPlanPage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.planname ? v.planname : '——'
          let type = v.typeName ? v.typeName : '——'
          let unit = v.publishorgname ? v.publishorgname : '——'
          let date = v.publishtime ? v.publishtime : '——'
          data.push({ name, type, unit, date })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 应急资源
    popoutTable3() {
      this.popoutTableShow = true
      this.popoutTableIndex = 3
      this.popoutTableTitle = '应急资源列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'store',
          title: '储备库名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'type',
          title: '物资装备分类',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'num',
          title: '实时库存',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'unit',
          title: '单位',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable3()
    },
    renderTable3() {
      emergencyResourcesPage({
        page: this.popoutTablePage,
        size: 10,
        type: 'resources'
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.order ? v.order.equipname : '——'
          let store = v.storageInfo ? v.storageInfo.storagename : '——'
          let type = '——'
          if (v.order && v.order.equiptypefrist) {
            let list = v.order.equiptypefrist.split('|')
            type = list[list.length - 1]
          }
          let num = v.nownumber ? v.nownumber : '——'
          let unit = '——'
          if (v.order && v.order.unit) {
            let list = v.order.unit.split('|')
            unit = list[list.length - 1]
          }
          data.push({ name, store, type, num, unit })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 救援队伍弹窗
    popoutTable4() {
      this.popoutTableShow = true
      this.popoutTableIndex = 4
      this.popoutTableTitle = '救援队伍列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '队伍名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'type',
          title: '队伍类型',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'level',
          title: '队伍级别',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'manager',
          title: '联系人',
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
      this.renderTable4()
    },
    renderTable4() {
      emergencyResourcesPage({
        page: this.popoutTablePage,
        size: 10,
        type: 'team'
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.teamname ? v.teamname : '——'
          let type = '——'
          if (v.teamtypecode) {
            let list = v.teamtypecode.split('|')
            type = list[list.length - 1]
          }
          let level = '——'
          if (v.levelcode) {
            let list = v.levelcode.split('|')
            level = list[list.length - 1]
          }
          let manager = v.respper ? v.respper : '——'
          let phone = v.respmtel ? v.respmtel : '——'
          data.push({ name, type, level, manager, phone })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 物资储备弹窗
    popoutTable5() {
      this.popoutTableShow = true
      this.popoutTableIndex = 5
      this.popoutTableTitle = '物资储备库列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '储备库名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'type',
          title: '储备库类型',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'manager',
          title: '联系人',
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
      emergencyResourcesPage({
        page: this.popoutTablePage,
        size: 10,
        type: 'reserveBank'
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.storagename ? v.storagename : '——'
          let type = '——'
          if (v.repttypecode) {
            let list = v.repttypecode.split('|')
            type = list[list.length - 1]
          }
          let manager = v.respper ? v.respper : '——'
          let phone = v.respmtel ? v.respmtel : '——'
          data.push({ name, type, manager, phone })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 救援专家弹窗
    popoutTable6() {
      this.popoutTableShow = true
      this.popoutTableIndex = 6
      this.popoutTableTitle = '救援专家列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '姓名',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'gender',
          title: '性别',
          align: 'center',
          minWidth: 10,
          maxWidth: 80,
          tooltip: true
        },
        {
          key: 'major',
          title: '专业',
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
        },
        {
          key: 'profession',
          title: '擅长事故类型',
          align: 'center',
          minWidth: 180,
          tooltip: true
        }
      ]
      this.renderTable6()
    },
    renderTable6() {
      emergencyResourcesPage({
        page: this.popoutTablePage,
        size: 10,
        type: 'expert'
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.expertname ? v.expertname : '——'
          let gender = '——'
          if (v.sexcode) {
            let list = v.sexcode.split('|')
            gender = list[list.length - 1]
          }
          let major = '——'
          if (v.major) {
            let list = v.major.split('|')
            major = list[list.length - 1]
          }
          let phone = v.mobiletel ? v.mobiletel : '——'
          let profession = v.goodAccTypeNames ? v.goodAccTypeNames : '——'
          data.push({ name, gender, major, phone, profession })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 演练事件弹窗
    popoutTable7() {
      this.popoutTableShow = true
      this.popoutTableIndex = 7
      this.popoutTableTitle = '演练事件列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '演练事件',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'title',
          title: '演练主题',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'cost',
          title: '演练工作经费',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'unit',
          title: '单位',
          align: 'center',
          minWidth: 10,
          maxWidth: 80,
          tooltip: true
        },
        {
          key: 'status',
          title: '演练状态',
          align: 'center',
          minWidth: 10,
          maxWidth: 160,
          tooltip: true
        }
      ]
      this.renderTable7()
    },
    renderTable7() {
      drillEventsPage({
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.rescueName ? v.rescueName : '——'
          let title = v.accidentTypeNames ? v.accidentTypeNames : '——'
          let cost = v.rescueExpenditure ? v.rescueExpenditure : '——'
          let unit = '元'
          let status = '——'
          if (v.rescueStatus) {
            let list = v.rescueStatus.split('|')
            status = list[list.length - 1]
          }
          data.push({ name, title, cost, unit, status })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 应急预案弹窗
    popoutTable8(type) {
      this.popoutTableShow = true
      this.popoutTableIndex = 8
      let typeParam = ''
      if (type === 1) {
        this.popoutTableTitle = '事故灾难列表'
        typeParam = 'accident'
      } else if (type === 2) {
        this.popoutTableTitle = '自然灾害列表'
        typeParam = 'disaster'
      } else if (type === 3) {
        this.popoutTableTitle = '社会安全列表'
        typeParam = 'security'
      } else if (type === 4) {
        this.popoutTableTitle = '公共卫生列表'
        typeParam = 'health'
      }
      this.popoutTableForm = {
        type: typeParam
      }
      this.popoutTableTitle = '应急预案列表'
      this.popoutTableColumn = [
        {
          key: 'name',
          title: '预案名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'unit',
          title: '发布单位',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'date',
          title: '发布日期',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
      this.renderTable8()
    },
    renderTable8() {
      emergencyPlanPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          let name = v.planname ? v.planname : '——'
          let unit = v.publishorgname ? v.publishorgname : '——'
          let date = v.publishtime ? v.publishtime : '——'
          data.push({ name, unit, date })
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 医疗资源
    popoutTable10() {
      this.popoutTableShow = true
      this.popoutTableIndex = 10
      this.popoutTableTitle = '医疗资源列表'
      this.popoutTableColumn = [
        {
          key: 'healthName',
          title: '医疗名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'inuseDate',
          title: '投入使用时间',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'contactper',
          title: '联系人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'contactmTel',
          title: '联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'respper',
          title: '负责人',
          align: 'center',
          tooltip: true
        }
      ]
      this.renderTable10()
    },
    renderTable10() {
      emergencyResourcesPage({
        page: this.popoutTablePage,
        size: 10,
        type: 'healthcare'
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          v.healthName = v.healthName ? v.healthName : '——'

          v.mobiletel = v.mobiletel ? v.mobiletel : '——'
          v.goodAccTypeNames = v.goodAccTypeNames ? v.goodAccTypeNames : '——'
          data.push(v)
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 避难场所
    popoutTable11() {
      this.popoutTableShow = true
      this.popoutTableIndex = 11
      this.popoutTableTitle = '避难场所列表'
      this.popoutTableColumn = [
        {
          key: 'asylumareaname',
          title: '名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'inusedate',
          title: '投入使用时间',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'contactper',
          title: '联系人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'contactmTel',
          title: '联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'respper',
          title: '负责人',
          align: 'center',
          tooltip: true
        }
      ]
      this.renderTable11()
    },
    renderTable11() {
      emergencyResourcesPage({
        page: this.popoutTablePage,
        size: 10,
        type: 'asylumareaInfo'
      }).then((res) => {
        let data = []
        res.data.data.forEach((v, i) => {
          v.asylumareaid = v.asylumareaid ? v.asylumareaid : '——'

          v.mobiletel = v.mobiletel ? v.mobiletel : '——'
          v.goodAccTypeNames = v.goodAccTypeNames ? v.goodAccTypeNames : '——'
          data.push(v)
        })
        this.popoutTableData = data
        this.popoutTableTotal = res.data.count
      })
    },
    // 关联危化品
    popoutTable12(id) {
      this.popoutTableShow = true
      this.popoutTableIndex = 12
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
      this.renderTable12()
    },
    renderTable12() {
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
    }

    /* cesium 相关方法--end */
  },
  computed: {
    // 应急资源饼状图
    chartOption0() {
      return {
        color: ['#544CCB', '#FFC761', '#5EAAFD', '#4CC9CB'],
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   top: 'bottom',
        //   icon: 'circle',
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        series: [
          {
            // name: '消防应急资源',
            type: 'pie',
            roseType: 'radius',
            radius: ['25%', '50%'],
            center: ['50%', '50%'],
            // avoidLabelOverlap: false,
            // roseType: 'radius',
            label: {
              alignTo: 'labelLine',
              // formatter: '{name|{b}}\n{time|{d} %}',
              formatter: function (data) {
                return (
                  '{name|' +
                  data.name +
                  '}\n{time|' +
                  data.percent.toFixed(0) +
                  ' %}'
                )
              },
              // edgeDistance: 10,
              // lineHeight: 15,
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
              length: 35,
              length2: 85
            },
            data: this.chartData1
          }
        ]
      }
    },
    chartOption1() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          icon: 'circle',
          data: ['特别重大', '重大', '较大', '一般'],
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        color: [
          'rgba(255, 39, 76, 0.5)',
          'rgba(255, 104, 39, 0.5)',
          'rgba(249, 185, 9, 0.5)',
          'rgba(39, 190, 255, 0.5)'
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          nameTextStyle: {
            color: '#BEE4FF',
            fontSize: 16
          },
          axisLabel: {
            color: '#BEE4FF',
            fontSize: 16,
            show: false
          },
          // axisTick: { show: false },
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
        yAxis: {
          type: 'category',
          data: ['事故灾难', '自然灾害', '社会安全', '公共卫生'],
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            interval: 0
          }
        },
        series: [
          {
            name: '特别重大',
            type: 'bar',
            stack: 'total',
            // label: {
            //   show: true
            // },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData2.great
          },
          {
            name: '重大',
            type: 'bar',
            stack: 'total',
            // label: {
            //   show: true
            // },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData2.major
          },
          {
            name: '较大',
            type: 'bar',
            stack: 'total',
            // label: {
            //   show: true
            // },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData2.more
          },
          {
            name: '一般',
            type: 'bar',
            stack: 'total',
            // label: {
            //   show: true
            // },
            emphasis: {
              focus: 'series'
            },
            data: this.chartData2.commonly
          },
          {
            name: '总数',
            type: 'bar',
            barGap: '-100%', // 左移100%，stack不再与上面两个在一列
            label: {
              normal: {
                show: true,
                position: 'right', //  位置设为top
                formatter: '{c}',
                textStyle: { color: '#fff' }
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(128, 128, 128, 0)' // 仍为透明
              }
            },
            data: this.chartData2.total
          }
        ]
      }
    },
    chartOption2() {
      return {
        title: {
          text: '整改率',
          bottom: '0',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontWeight: '300',
            fontSize: 14
          }
        },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            radius: '100%',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(255, 193, 50, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(50, 197, 255, 0.5)'
                }
              ])
            },
            progress: {
              show: true,
              width: 300
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },

            data: [
              {
                value: this.chartData1
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            radius: '100%',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(255, 193, 50, 1)'
                },
                {
                  offset: 1,
                  color: '#61E4FF'
                }
              ])
            },
            progress: {
              show: true,
              width: 10
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              offsetCenter: [0, '-15%'],
              fontSize: 20,
              fontWeight: 'bolder',
              formatter: '{value}%',
              color: '#fff'
            },
            data: [
              {
                value: this.chartData1
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
    chartOption4() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        // grid: {
        //   top: '120',
        //   bottom: '120'
        // },
        radar: [
          {
            indicator: [
              { name: '低风险' },
              { name: '重大风险' },
              { name: '较大风险' },
              { name: '一般风险' }
            ],
            center: ['50%', '50%'],
            shape: 'circle',
            radius: '65%',
            splitLine: {
              lineStyle: {
                color: 'rgba(211, 253, 250, 0.4)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(211, 253, 250, 0)'
              }
            },
            axisName: {
              color: '#fff'
            }
          }
        ],

        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            // lineStyle: {
            //   color: '#3c3c3c'
            // },
            data: [
              {
                value: [60, 73, 85, 40],
                name: 'A Software'
              }
            ]
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
              fontSize: 12,
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
            // name: '单位：家',
            nameTextStyle: {
              color: '#BEE4FF',
              fontSize: 12
            },
            axisLabel: {
              color: '#BEE4FF',
              fontSize: 12
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
            data: [1, 4, 3, 4, 3, 4, 3, 5, 7]
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
