
<style lang="less" scoped>
@import "./Bigscreen4.less";
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
      @cesiumLoad="cesiumLoad"
      v-if="isThreeView"
      style="width: 100vw; height: 100vh"
    ></cesiumMap>
    <!-- 地图结束 -->
    <!-- 左上角菜单开始 -->
    <Menu :index="4"></Menu>
    <!-- 左上角菜单结束 -->

    <div class="main-container">
      <!-- 顶部开始 -->
      <Header></Header>
      <!-- 左侧开始 -->
      <div class="col2">
        <div
          class="
            ecology-container
            container
            animate__animated animate__backInLeft
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">环境监测点数总览</div>
          </div>
          <Row>
            <Col span="6">
              <div class="detail-container">
                <img
                  src="@/assets/bigscreen/icon-jcd1.png"
                  alt=""
                  class="img"
                />
                <div>监测点总数</div>
                <CountTo
                  :startVal="0"
                  :endVal="
                    ecologicalMonitoring.environmentalQuality +
                    ecologicalMonitoring.rainwaterDrainage +
                    ecologicalMonitoring.exhaustEmission +
                    ecologicalMonitoring.wastewaterDischarge
                  "
                  :duration="countDuration"
                  class="num"
                ></CountTo>
              </div>
            </Col>
            <Col span="18">
              <Row class="item-container">
                <div class="item">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-hjjc1.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <CountTo
                        :startVal="0"
                        :endVal="ecologicalMonitoring.environmentalQuality"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                      <div>环境质量</div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-hjjc2.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <CountTo
                        :startVal="0"
                        :endVal="ecologicalMonitoring.exhaustEmission"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                      <div>废气排放</div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-hjjc3.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <CountTo
                        :startVal="0"
                        :endVal="ecologicalMonitoring.rainwaterDrainage"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                      <div>雨水排放</div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="img-container">
                    <img
                      src="@/assets/bigscreen/icon-hjjc4.png"
                      alt
                      class="img2"
                    />
                    <div class="num-container">
                      <CountTo
                        :startVal="0"
                        :endVal="ecologicalMonitoring.wastewaterDischarge"
                        :duration="countDuration"
                        class="num1"
                      ></CountTo>
                      <div>废水排放</div>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
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
            <div class="title">环境空气质量</div>
          </div>
          <div class="tab-container">
            <div
              :class="tabIndex1 === 1 ? 'tab active' : 'tab'"
              @click="changeTabIndex(1)"
            >
              质量分析
            </div>
            <div
              :class="tabIndex1 === 2 ? 'tab active' : 'tab'"
              @click="changeTabIndex(2)"
            >
              动态分析
            </div>
          </div>
          <Row class="item-container" v-if="tabIndex1 === 1">
            <Col span="24">
              <Select
                style="width: 150px"
                class="select"
                v-model="select1"
                placeholder="监测站"
              >
                <Option
                  v-for="item in airStationList"
                  :value="item.id"
                  :key="item.id"
                  :title="item.stationName"
                  >{{ item.stationName }}</Option
                >
              </Select>
            </Col>
            <Col span="10">
              <div class="item">
                <div class="img-container">
                  <img
                    src="@/assets/bigscreen/ICON-yjzy3.png"
                    alt=""
                    class="img"
                  />
                  <CountTo
                    :startVal="0"
                    :endVal="Number(environmentQuality.AQI)"
                    :duration="countDuration"
                    class="num1"
                    :class="atmosphere"
                  ></CountTo>
                  <div class="aqi">
                    {{ environmentQuality.overallQuality
                    }}<span style="color: #fff">(AQI)</span>
                  </div>
                </div>
                <div class="fir">
                  <div class="tit">首要污染物</div>
                  <div class="num2">
                    {{ environmentQuality.fistContaminants }}
                  </div>
                </div>
                <div>
                  <div>
                    ·大气自动站共监测
                    <span class="blu">
                      <CountTo
                        :startVal="0"
                        :endVal="
                          Number(
                            environmentQuality.monitorDays
                              ? environmentQuality.monitorDays
                              : 0
                          )
                        "
                        :duration="countDuration"
                      ></CountTo>
                      天
                    </span>
                  </div>
                  <div>
                    ·空气质量总体
                    <span class="blu">{{
                      environmentQuality.overallQuality
                    }}</span>
                  </div>
                  <div>
                    ·达标天数
                    <span class="blu">
                      <CountTo
                        :startVal="0"
                        :endVal="Number(environmentQuality.reachDimensionDays)"
                        :duration="countDuration"
                      ></CountTo>
                      天 </span
                    >; 占比<span class="blu">{{
                      environmentQuality.reachDimensionProportion
                    }}</span>
                  </div>
                  <div>
                    ·未达标天数
                    <span class="bro"
                      >{{ environmentQuality.unReachDimensionDays }}天</span
                    >; 占比<span class="bro">{{
                      environmentQuality.unReachDimensionProportion
                    }}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="13" offset="1">
              <div class="month">
                <span class="pointer" @click="changeMonth('-')">&lt; </span>
                <span>{{ canMonth }}</span>
                <span class="pointer" @click="changeMonth('+')"> &gt;</span>
              </div>
              <charts class="chart" :options="chartOption1" :id="'chart1'" />
              <div class="legend">
                <div class="name">
                  <div>优</div>
                  <div>良</div>
                  <div>轻度</div>
                  <div>中度</div>
                  <div>重度</div>
                  <div>严重</div>
                </div>
                <div class="color">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="num">
                  <div>0</div>
                  <div>50</div>
                  <div>100</div>
                  <div>150</div>
                  <div>200</div>
                  <div>300</div>
                  <div>以上</div>
                </div>
              </div>
            </Col>
          </Row>
          <div v-if="tabIndex1 === 2">
            <Row class="item-container" :gutter="10">
              <Col span="24" class="subtab-container">
                <div
                  :class="tabIndex1_1 === 1 ? 'tab active' : 'tab'"
                  @click="changeTabIndex1_1(1)"
                >
                  热力分析
                </div>
                <div
                  :class="tabIndex1_1 === 2 ? 'tab active' : 'tab'"
                  @click="changeTabIndex1_1(2)"
                >
                  同比
                </div>
                <div
                  :class="tabIndex1_1 === 3 ? 'tab active' : 'tab'"
                  @click="changeTabIndex1_1(3)"
                >
                  环比
                </div>
                <div
                  :class="tabIndex1_1 === 4 ? 'tab active' : 'tab'"
                  @click="changeTabIndex1_1(4)"
                >
                  横比
                </div>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select1_1"
                  placeholder="监测站"
                  clearable
                >
                  <Option
                    v-for="item in airStationList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.stationName"
                    >{{ item.stationName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6" v-if="tabIndex1_1 === 4">
                <Select
                  class="select"
                  v-model="select1_3"
                  placeholder="监测站2"
                  clearable
                >
                  <Option
                    v-for="item in airStationList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.stationName"
                    >{{ item.stationName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select1_2"
                  placeholder="监测因子"
                  clearable
                >
                  <Option
                    v-for="item in factorList1_2"
                    :value="item.factorType"
                    :key="item.factorType"
                    :title="item.factorTypeName"
                    >{{ item.factorTypeName }}</Option
                  >
                </Select>
              </Col>
              <Col span="12" style="z-index: 4">
                <DatePicker
                  type="daterange"
                  :options="dateOptions"
                  :start-date="new Date()"
                  @on-change="dateChange1"
                  placement="bottom-end"
                  placeholder="选择日期"
                  class="date-select"
                  transfer
                ></DatePicker>
              </Col>
              <Col span="24">
                <div v-if="tabIndex1_1 === 1">
                  <charts
                    class="chart"
                    :options="chartOption1_1"
                    :id="'chart1_1'"
                  />
                </div>
              </Col>
              <Col span="24">
                <div v-if="tabIndex1_1 === 2">
                  <charts
                    class="chart"
                    :options="chartOption1_2"
                    :id="'chart1_2'"
                  />
                </div>
              </Col>
              <Col span="24">
                <div v-if="tabIndex1_1 === 3">
                  <charts
                    class="chart"
                    :options="chartOption1_3"
                    :id="'chart1_3'"
                  />
                </div>
              </Col>
              <Col span="24">
                <div v-if="tabIndex1_1 === 4">
                  <charts
                    class="chart"
                    :options="chartOption1_4"
                    :id="'chart1_4'"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div
          class="
            table-container
            container
            animate__animated animate__backInLeft animate__slower
          "
        >
          <div class="container-title">
            <img src="@/assets/title-arrow.png" alt="" class="img" />
            <div class="title">水环境质量</div>
          </div>
          <div class="tab-container">
            <div
              :class="tabIndex2 === 1 ? 'tab active' : 'tab'"
              @click="changeTabIndex2(1)"
            >
              质量分析
            </div>
            <div
              :class="tabIndex2 === 2 ? 'tab active' : 'tab'"
              @click="changeTabIndex2(2)"
            >
              动态分析
            </div>
          </div>
          <Row class="item-container" v-if="tabIndex2 === 1">
            <Col span="24">
              <Select
                style="width: 150px"
                class="select"
                v-model="select2"
                placeholder="监测站"
              >
                <Option
                  v-for="item in waterStationList"
                  :value="item.id"
                  :key="item.id"
                  :title="item.stationName"
                  >{{ item.stationName }}</Option
                >
              </Select>
            </Col>
            <Col span="12">
              <div class="item">
                <div class="img-container">
                  <img
                    src="@/assets/bigscreen/ICON-yjzy3.png"
                    alt=""
                    class="img"
                  />
                  <div class="num1">
                    {{ waterQuality.overallQuality
                    }}<span class="aqi" style="color: #fff">(水质等级)</span>
                  </div>
                </div>
                <div>
                  <div>
                    ·地表水自动站共监测
                    <span class="blu">{{ waterQuality.monitorDays }}天</span>
                  </div>
                  <div>
                    ·水质量总体
                    <span class="blu">{{ waterQuality.overallQuality }}</span>
                  </div>
                  <div>
                    ·达标天数
                    <span class="blu"
                      >{{ waterQuality.reachDimensionDays }}天</span
                    >; 占比<span class="blu">{{
                      waterQuality.reachDimensionProportion
                    }}</span>
                  </div>
                  <div>
                    ·未达标天数
                    <span class="bro"
                      >{{ waterQuality.unReachDimensionDays }}天</span
                    >; 占比<span class="bro">{{
                      waterQuality.unReachDimensionProportion
                    }}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="12">
              <charts class="chart2" :options="chartOption2" :id="'chart2'" />
            </Col>
          </Row>
          <div v-if="tabIndex2 === 2">
            <Row class="item-container" :gutter="10">
              <Col span="24" class="subtab-container">
                <div
                  :class="tabIndex2_1 === 1 ? 'tab active' : 'tab'"
                  @click="changeTabIndex2_1(1)"
                >
                  热力分析
                </div>
                <div
                  :class="tabIndex2_1 === 2 ? 'tab active' : 'tab'"
                  @click="changeTabIndex2_1(2)"
                >
                  同比
                </div>
                <div
                  :class="tabIndex2_1 === 3 ? 'tab active' : 'tab'"
                  @click="changeTabIndex2_1(3)"
                >
                  环比
                </div>
                <div
                  :class="tabIndex2_1 === 4 ? 'tab active' : 'tab'"
                  @click="changeTabIndex2_1(4)"
                >
                  横比
                </div>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select2_1"
                  placeholder="监测站"
                  clearable
                >
                  <Option
                    v-for="item in waterStationList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.stationName"
                    >{{ item.stationName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6" v-if="tabIndex2_1 === 4">
                <Select
                  class="select"
                  v-model="select2_3"
                  placeholder="监测站2"
                  clearable
                >
                  <Option
                    v-for="item in waterStationList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.stationName"
                    >{{ item.stationName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select2_2"
                  placeholder="监测因子"
                  clearable
                >
                  <Option
                    v-for="item in factorList2_2"
                    :value="item.factorType"
                    :key="item.factorType"
                    :title="item.factorTypeName"
                    >{{ item.factorTypeName }}</Option
                  >
                </Select>
              </Col>
              <Col span="12">
                <DatePicker
                  type="daterange"
                  :options="dateOptions"
                  :start-date="new Date()"
                  @on-change="dateChange2"
                  placement="bottom-end"
                  placeholder="选择日期"
                  class="date-select"
                ></DatePicker>
              </Col>
              <Col span="24">
                <div v-if="tabIndex2_1 === 1">
                  <charts
                    class="chart"
                    :options="chartOption2_1"
                    :id="'chart2_1'"
                  />
                </div>
              </Col>
              <Col span="24">
                <div v-if="tabIndex2_1 === 2">
                  <charts
                    class="chart"
                    :options="chartOption2_2"
                    :id="'chart2_2'"
                  />
                </div>
              </Col>
              <Col span="24">
                <div v-if="tabIndex2_1 === 3">
                  <charts
                    class="chart"
                    :options="chartOption2_3"
                    :id="'chart2_3'"
                  />
                </div>
              </Col>
              <Col span="24">
                <div v-if="tabIndex2_1 === 4">
                  <charts
                    class="chart"
                    :options="chartOption2_4"
                    :id="'chart2_4'"
                  />
                </div>
              </Col>
            </Row>
          </div>
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
            <!-- 告警 -->
            <div class="round" @click="popoutTable1" v-show="alarmEventNum&&alarmEventNum>0" >
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
              <div @click="clickThis(0)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[0] }"
                ></span>
                <span class="checkLabel r09">环境空气质量监测点</span>
              </div>
              <div @click="clickThis(1)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[1] }"
                ></span>
                <span class="checkLabel r10">废气排放监测点</span>
              </div>
              <div @click="clickThis(2)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[2] }"
                ></span>
                <span class="checkLabel r11">废水排放监测点</span>
              </div>
              <div @click="clickThis(3)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[3] }"
                ></span>
                <span class="checkLabel r12">雨水排放监测点</span>
              </div>
              <div @click="clickThis(4)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[4] }"
                ></span>
                <span class="checkLabel r29">固废仓库</span>
              </div>
              <!-- <div @click="clickThis(5)" class="check busnissGroup">
                <span
                  class="checkIcon"
                  :class="{ checked: checkBox[5] }"
                ></span>
                <span class="checkLabel r14">排污监控</span>
              </div> -->
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
                <span class="checkLabel r41">地表水环境质量监测点</span>
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
            <div class="title">废气排放分析</div>
          </div>
          <div class="tab-container">
            <div
              :class="tabIndex3 === 1 ? 'tab active' : 'tab'"
              @click="changeTabIndex3(1)"
            >
              超标统计
            </div>
            <div
              :class="tabIndex3 === 2 ? 'tab active' : 'tab'"
              @click="changeTabIndex3(2)"
            >
              超标排行
            </div>
            <div
              :class="tabIndex3 === 3 ? 'tab active' : 'tab'"
              @click="changeTabIndex3(3)"
            >
              动态分析
            </div>
          </div>
          <div v-if="tabIndex3 === 1">
            <Row :gutter="10">
              <Col span="6">
                <Select
                  class="select"
                  v-model="select3_1"
                  placeholder="监测站"
                  clearable
                >
                  <Option
                    v-for="item in wastegasList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.mondeviceName"
                    >{{ item.mondeviceName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select3_2"
                  placeholder="监测因子"
                  clearable
                >
                  <Option
                    v-for="item in factorList3_2"
                    :value="item.factorTypes"
                    :key="item.factorTypes"
                    :title="item.factorNames"
                    >{{ item.factorNames }}</Option
                  >
                </Select>
              </Col>
              <Col span="12" class="subtab-container">
                <div
                  :class="tabIndex3_1 === 1 ? 'tab active' : 'tab'"
                  @click="changeTabIndex3_1(1)"
                >
                  近1月
                </div>
                <div
                  :class="tabIndex3_1 === 2 ? 'tab active' : 'tab'"
                  @click="changeTabIndex3_1(2)"
                >
                  近3月
                </div>
                <div
                  :class="tabIndex3_1 === 3 ? 'tab active' : 'tab'"
                  @click="changeTabIndex3_1(3)"
                >
                  近1年
                </div>
              </Col>
            </Row>
            <charts class="chart" :options="chartOption3" :id="'chart3'" />
          </div>
          <div v-if="tabIndex3 === 2">
            <Row>
              <Col span="24" class="subtab-container">
                <div
                  :class="tabIndex3_2 === 1 ? 'tab active' : 'tab'"
                  @click="changeTabIndex3_2(1)"
                >
                  次数分析
                </div>
                <div
                  :class="tabIndex3_2 === 2 ? 'tab active' : 'tab'"
                  @click="changeTabIndex3_2(2)"
                >
                  时长分析
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <charts
                  class="chart"
                  :options="chartOption3_1"
                  :id="'chart3_1'"
                />
              </Col>
              <Col span="8">
                <charts
                  class="chart"
                  :options="chartOption3_2"
                  :id="'chart3_2'"
                />
              </Col>
              <Col span="8">
                <charts
                  class="chart"
                  :options="chartOption3_3"
                  :id="'chart3_3'"
                />
              </Col>
            </Row>
          </div>
          <div v-if="tabIndex3 === 3">
            <Row :gutter="10">
              <Col span="6">
                <Select
                  class="select"
                  v-model="select3_1"
                  placeholder="监测站"
                  clearable
                >
                  <Option
                    v-for="item in wastegasList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.mondeviceName"
                    >{{ item.mondeviceName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select3_2"
                  placeholder="监测因子"
                  clearable
                >
                  <Option
                    v-for="item in factorList3_2"
                    :value="item.factorTypes"
                    :key="item.factorTypes"
                    :title="item.factorNames"
                    >{{ item.factorNames }}</Option
                  >
                </Select>
              </Col>
              <Col span="12">
                <DatePicker
                  type="daterange"
                  :options="dateOptions"
                  :start-date="new Date()"
                  @on-change="dateChange3"
                  placement="bottom-end"
                  placeholder="选择日期"
                  class="date-select"
                ></DatePicker>
              </Col>
              <Col span="24">
                <charts
                  class="chart"
                  :options="chartOption3_4"
                  :id="'chart3_4'"
                />
              </Col>
            </Row>
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
            <div class="title">废水排放分析</div>
          </div>
          <div class="tab-container">
            <div
              :class="tabIndex4 === 1 ? 'tab active' : 'tab'"
              @click="changeTabIndex4(1)"
            >
              超标统计
            </div>
            <div
              :class="tabIndex4 === 2 ? 'tab active' : 'tab'"
              @click="changeTabIndex4(2)"
            >
              超标排行
            </div>
            <div
              :class="tabIndex4 === 3 ? 'tab active' : 'tab'"
              @click="changeTabIndex4(3)"
            >
              动态分析
            </div>
          </div>
          <div v-if="tabIndex4 === 1">
            <Row :gutter="10">
              <Col span="6">
                <Select
                  class="select"
                  v-model="select4_1"
                  placeholder="监测站"
                  clearable
                >
                  <Option
                    v-for="item in wastewaterList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.mondeviceName"
                    >{{ item.mondeviceName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select4_2"
                  placeholder="监测因子"
                  clearable
                >
                  <Option
                    v-for="item in factorList4_2"
                    :value="item.factorTypes"
                    :key="item.factorTypes"
                    :title="item.factorNames"
                    >{{ item.factorNames }}</Option
                  >
                </Select>
              </Col>
              <Col span="12" class="subtab-container">
                <div
                  :class="tabIndex4_1 === 1 ? 'tab active' : 'tab'"
                  @click="changeTabIndex4_1(1)"
                >
                  近1月
                </div>
                <div
                  :class="tabIndex4_1 === 2 ? 'tab active' : 'tab'"
                  @click="changeTabIndex4_1(2)"
                >
                  近3月
                </div>
                <div
                  :class="tabIndex4_1 === 3 ? 'tab active' : 'tab'"
                  @click="changeTabIndex4_1(3)"
                >
                  近1年
                </div>
              </Col>
            </Row>
            <charts class="chart" :options="chartOption4" :id="'chart4'" />
          </div>
          <div v-if="tabIndex4 === 2">
            <Row>
              <Col span="24" class="subtab-container">
                <div
                  :class="tabIndex4_2 === 1 ? 'tab active' : 'tab'"
                  @click="changeTabIndex4_2(1)"
                >
                  次数分析
                </div>
                <div
                  :class="tabIndex4_2 === 2 ? 'tab active' : 'tab'"
                  @click="changeTabIndex4_2(2)"
                >
                  时长分析
                </div>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <charts
                  class="chart"
                  :options="chartOption4_1"
                  :id="'chart4_1'"
                />
              </Col>
              <Col span="8">
                <charts
                  class="chart"
                  :options="chartOption4_2"
                  :id="'chart4_2'"
                />
              </Col>
              <Col span="8">
                <charts
                  class="chart"
                  :options="chartOption4_3"
                  :id="'chart4_3'"
                />
              </Col>
            </Row>
          </div>
          <div v-if="tabIndex4 === 3">
            <Row :gutter="10">
              <Col span="6">
                <Select
                  class="select"
                  v-model="select4_1"
                  placeholder="监测站"
                  clearable
                >
                  <Option
                    v-for="item in wastewaterList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.mondeviceName"
                    >{{ item.mondeviceName }}</Option
                  >
                </Select>
              </Col>
              <Col span="6">
                <Select
                  class="select"
                  v-model="select4_2"
                  placeholder="监测因子"
                  clearable
                >
                  <Option
                    v-for="item in factorList4_2"
                    :value="item.factorTypes"
                    :key="item.factorTypes"
                    :title="item.factorNames"
                    >{{ item.factorNames }}</Option
                  >
                </Select>
              </Col>
              <Col span="12">
                <DatePicker
                  type="daterange"
                  :options="dateOptions"
                  :start-date="new Date()"
                  @on-change="dateChange4"
                  placement="bottom-end"
                  placeholder="选择日期"
                  class="date-select"
                ></DatePicker>
              </Col>
              <Col span="24">
                <charts
                  class="chart"
                  :options="chartOption4_4"
                  :id="'chart4_4'"
                />
              </Col>
            </Row>
          </div>
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
            <div class="title">危险废物分析</div>
          </div>
          <div class="tab-container">
            <div
              :class="tabIndex5 === 1 ? 'tab active' : 'tab'"
              @click="changeTabIndex5(1)"
            >
              数据分析
            </div>
            <div
              :class="tabIndex5 === 2 ? 'tab active' : 'tab'"
              @click="changeTabIndex5(2)"
            >
              环比分析
            </div>
          </div>
          <div v-if="tabIndex5 === 1">
            <Row>
              <Col span="12" offset="6">
                <DatePicker
                  type="daterange"
                  :options="dateOptions"
                  :start-date="new Date()"
                  @on-change="dateChange"
                  placement="bottom-end"
                  placeholder="选择日期"
                  class="date-select"
                ></DatePicker>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div>危废流转过程量</div>
                <div class="detail-container">
                  <img src="@/assets/bigscreen/wf1.png" alt="" class="img" />
                  <div>
                    <div class="title">产生量</div>
                    <div>
                      <span class="num">10</span>
                      <span>吨</span>
                    </div>
                  </div>
                </div>
                <div class="detail-container">
                  <img src="@/assets/bigscreen/wf2.png" alt="" class="img1" />
                  <div>
                    <div>贮存量</div>
                    <div>
                      <span class="num1">10</span>
                      <span>吨</span>
                    </div>
                  </div>
                  <img src="@/assets/bigscreen/wf3.png" alt="" class="img1" />
                  <div>
                    <div>利用量</div>
                    <div>
                      <span class="num1">10</span>
                      <span>吨</span>
                    </div>
                  </div>
                  <img src="@/assets/bigscreen/wf4.png" alt="" class="img1" />
                  <div>
                    <div>处置量</div>
                    <div>
                      <span class="num1">10</span>
                      <span>吨</span>
                    </div>
                  </div>
                  <img src="@/assets/bigscreen/wf5.png" alt="" class="img1" />
                  <div>
                    <div>转移量</div>
                    <div>
                      <span class="num1">10</span>
                      <span>吨</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span="12">
                <div>危废产生量TOP5</div>
                <charts class="chart" :options="chartOption5" :id="'chart5'" />
              </Col>
            </Row>
          </div>
          <div v-if="tabIndex5 === 2">
            <Row>
              <Col span="8" offset="2">
                <Select
                  class="select"
                  v-model="select5_1"
                  placeholder="选择企业"
                  clearable
                >
                  <Option
                    v-for="item in enterpriseList"
                    :value="item.id"
                    :key="item.id"
                    :title="item.name"
                    >{{ item.name }}</Option
                  >
                </Select>
              </Col>
              <Col span="12" offset="2">
                <DatePicker
                  type="daterange"
                  :options="dateOptions"
                  :start-date="new Date()"
                  @on-change="dateChange"
                  placement="bottom-end"
                  placeholder="选择日期"
                  class="date-select"
                ></DatePicker>
              </Col>
            </Row>
            <charts class="chart" :options="chartOption5_1" :id="'chart5_1'" />
          </div>
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
import geoJson from './gyq.js'
// import AMap from 'AMap'
import aMap from './components/amap/amap.vue'
import cesiumMap from './components/cesium/cesiumMap.vue'
import { MapControl } from './components/amap/api/amapControl'
import CountTo from 'vue-count-to'
import {
  getStationList,
  environmentQuality,
  getEnterpriseBaseInfoList,
  getFactorTypeList,
  environmentQualityLateralRatio,
  exhaustEmission,
  countEcologicalEnvironment,
  ecologicalEnvironmentPage
} from './api/index'
import PopoutTable from './components/popout/PopoutTable.vue'

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
    CountTo,
    aMap,
    cesiumMap,
    PopoutEnterpriseTable,
    PopoutTable,
    InfoWindow: () => import('./components/amap/components/InfoWindow.vue')
  },
  data() {
    return {
      // 监测站下拉
      airStationList: [],
      waterStationList: [],
      // 企业下拉
      enterpriseList: [],
      // 环境空气质量
      tabIndex1: 1,
      select1: null,
      tabIndex1_1: 1,
      select1_1: null,
      // 监测因子下拉
      factorList1_2: [],
      select1_2: null,
      select1_3: null,
      date1: [],
      dateOptions: {
        disabledDate(date) {
          return date.valueOf() > Date.now()
        }
      },
      chartData1_1: {
        category: [],
        data: [],
        markArea: []
      },
      chartData1_2: {
        category: [],
        data1: [],
        dataName2: '',
        data2: [],
        dataName3: '',
        data3: []
      },
      chartData1_3: {
        category: [],
        data1: [],
        dataName2: '',
        data2: [],
        dataName3: '',
        data3: []
      },
      chartData1_4: {
        category: [],
        dataName1: '',
        data1: [],
        dataName2: '',
        data2: []
      },
      // 水环境质量
      select2: null,
      tabIndex2: 1,
      tabIndex2_1: 1,
      select2_1: null,
      // 监测因子下拉
      factorList2_2: [],
      select2_2: null,
      select2_3: null,
      date2: [],
      chartData2_1: {
        category: [],
        data: [],
        markArea: []
      },
      chartData2_2: {
        category: [],
        data1: [],
        dataName2: '',
        data2: [],
        dataName3: '',
        data3: []
      },
      chartData2_3: {
        category: [],
        data1: [],
        dataName2: '',
        data2: [],
        dataName3: '',
        data3: []
      },
      chartData2_4: {
        category: [],
        dataName1: '',
        data1: [],
        dataName2: '',
        data2: []
      },
      // 废气排放分析
      select3: null,
      // 废气监测站下拉
      wastegasList: [],
      // 废气监测因子下拉
      factorList3_2: [],
      tabIndex3: 1,
      tabIndex3_1: 1,
      tabIndex3_2: 1,
      select3_1: null,
      select3_2: null,
      date3: [],
      chartData3: {
        category: [],
        data: []
      },
      chartData3_1: {
        name: '',
        category: [],
        data: []
      },
      chartData3_2: {
        name: '',
        category: [],
        data: []
      },
      chartData3_3: {
        name: '',
        category: [],
        data: []
      },
      chartData3_4: {
        category: [],
        data: []
      },
      // 废水排放分析
      select4: null,
      // 废水监测站下拉
      wastewaterList: [],
      // 废水监测因子下拉
      factorList4_2: [],
      tabIndex4: 1,
      tabIndex4_1: 1,
      tabIndex4_2: 1,
      select4_1: null,
      select4_2: null,
      date4: [],
      chartData4: {
        category: [],
        data: []
      },
      chartData4_1: {
        name: '',
        category: [],
        data: []
      },
      chartData4_2: {
        name: '',
        category: [],
        data: []
      },
      chartData4_3: {
        name: '',
        category: [],
        data: []
      },
      chartData4_4: {
        category: [],
        data: []
      },
      // 危险废物分析
      tabIndex5: 1,
      select5_1: null,
      // 数字滚动的时长
      countDuration: 8000,
      map: null,
      mapData: null,
      // 图层选择
      checkBox: [true, true, true, true, true, true, true, true],
      checkBox1: [true, true, true, true, true],
      keyword: '', // 设备编号关键字
      state: false,
      list: [],
      alertChartData1: [],
      alertChartData2: [],
      alertChartData3: [],
      dangerChartData: [],
      // 右上角日期和时间
      date: null,
      weekday: null,
      time: null,
      ecologicalMonitoring: {
        environmentalQuality: null,
        rainwaterDrainage: null,
        exhaustEmission: null,
        wastewaterDischarge: null
      },
      environmentQuality: {
        monitorDays: null,
        reachDimensionDays: null,
        AQI: null,
        airStaDataList: null,
        overallQuality: null,
        fistContaminants: null,
        reachDimensionProportion: null,
        unReachDimensionDays: null,
        unReachDimensionProportion: null
      },
      waterQuality: {
        monitorDays: null,
        reachDimensionDays: null,
        AQI: null,
        waterStaDataList: null,
        overallQuality: null,
        fistContaminants: null,
        reachDimensionProportion: null,
        unReachDimensionDays: null,
        unReachDimensionProportion: null
      },
      atmosphere: '',
      atmosphereData: 0,
      waterChart: [],
      canMonth: moment(new Date()).format('YYYY-MM'),
      effluent: {
        normal: 0,
        warning: 0,
        discon: 0,
        exceed: 0
      },
      gas: {
        normal: 0,
        warning: 0,
        discon: 0,
        exceed: 0
      },
      working: {
        normal: 0,
        warning: 0,
        discon: 0,
        exceed: 0
      },
      // canMonth: '2022-05',
      // 三维切换
      isThreeView: false,
      isOpenDistance: false,
      pollingST: null,
      alarmEventNum: null,
      // 弹出框table
      // 弹出框table
      popoutTableShow: false,
      popoutTableIndex: 0,
      popoutTableTitle: '',
      popoutTableColumn: [],
      popoutTableData: [],
      popoutTableTotal: 0,
      popoutTablePage: 0,
      popoutTableForm: {},
      // 园区概览
      areaInfoshow: false,
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
    this.getStationList()
    this.getEnterpriseBaseInfoList()
    this.renderChart3_1to3_3()
    this.renderChart4_1to4_3()
    this.initEcologicalMonitoring()
    this.initAlertChart()
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
  },
  methods: {
    // 获取空气和水质监测站点list
    getStationList() {
      getStationList({ environmentType: 'airSta' }).then((res) => {
        let result = res.data.datas[0]
        this.airStationList = result
        this.select1 = result[0].id
      })
      getStationList({ environmentType: 'waterSta' }).then((res) => {
        let result = res.data.datas[0]
        this.waterStationList = result
        this.select2 = result[0].id
      })
      getStationList({ environmentType: 'wastegas' }).then((res) => {
        let result = res.data.datas[0]
        this.wastegasList = result
        this.select3_1 = result[0].id
      })
      getStationList({ environmentType: 'wastewater' }).then((res) => {
        let result = res.data.datas[0]
        this.wastewaterList = result
        this.select4_1 = result[0].id
      })
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
    // 获取企业list
    getEnterpriseBaseInfoList() {
      getEnterpriseBaseInfoList().then((res) => {
        let data = res.data.datas[0]
        this.enterpriseList = data
      })
    },
    // 获取监测因子
    getFactorTypeList(type, stationId) {
      return new Promise((resolve, reject) => {
        getFactorTypeList({
          environmentType: type,
          stationId: stationId
        }).then((res) => {
          resolve(res)
        })
      })
    },
    // 获取共同拥有的监测因子
    getFactorTypeList2(type, stationId, stationId1) {
      return new Promise((resolve, reject) => {
        getFactorTypeList({
          environmentType: type,
          stationId: stationId,
          stationId1: stationId1
        }).then((res) => {
          resolve(res)
        })
      })
    },
    changeTabIndex(index) {
      this.tabIndex1 = index
    },
    changeTabIndex1_1(index) {
      this.tabIndex1_1 = index
    },
    dateChange(val) {},
    dateChange1(val) {
      this.date1 = val
    },
    dateChange2(val) {
      this.date2 = val
    },
    dateChange3(val) {
      this.date3 = val
    },
    dateChange4(val) {
      this.date4 = val
    },
    changeTabIndex2(index) {
      this.tabIndex2 = index
    },
    changeTabIndex2_1(index) {
      this.tabIndex2_1 = index
    },
    changeTabIndex3(index) {
      this.tabIndex3 = index
    },
    changeTabIndex3_1(index) {
      this.tabIndex3_1 = index
    },
    changeTabIndex3_2(index) {
      this.tabIndex3_2 = index
    },
    changeTabIndex4(index) {
      this.tabIndex4 = index
    },
    changeTabIndex4_1(index) {
      this.tabIndex4_1 = index
    },
    changeTabIndex4_2(index) {
      this.tabIndex4_2 = index
    },
    changeTabIndex5(index) {
      this.tabIndex5 = index
    },
    colorPipe(num) {
      if (num <= 50) {
        return 'rgba(0,228,0,0.2)'
      } else if (num <= 100) {
        return 'rgba(255,255,0,0.2)'
      } else if (num <= 150) {
        return 'rgba(255,126,0,0.2)'
      } else if (num <= 200) {
        return 'rgba(255,0,0,0.2)'
      } else if (num <= 300) {
        return 'rgba(153,0,76,0.2)'
      } else {
        return 'rgba(126,0,35,0.2)'
      }
    },
    renderChart1() {
      this.renderChart1_1()
      this.renderChart1_2()
      this.renderChart1_3()
      this.renderChart1_4()
    },
    renderChart1_1() {
      if (this.select1_1 && this.select1_2 && this.date1[0] && this.date1[1]) {
        environmentQuality({
          environmentType: 'airSta',
          analysisType: 'dynamic',
          type: 1,
          stationId: this.select1_1,
          factorType: this.select1_2,
          startDate: this.date1[0],
          endDate: this.date1[1]
        }).then((res) => {
          let result = res.data.datas[0]
          let data = result.airThermalAnalysis.map((v) => {
            return v.monitorData
          })
          let category = result.dayList
          let markArea = []
          for (let i = 1; i < result.airThermalAnalysis.length - 1; i++) {
            let num = result.airThermalAnalysis[i].monitorData
            let color = this.colorPipe(num)
            let data = [
              {
                xAxis: result.airThermalAnalysis[i - 1].reportDate,
                itemStyle: {
                  color: color
                }
              },
              {
                xAxis: result.airThermalAnalysis[i].reportDate
              }
            ]
            markArea.push(data)
          }
          this.chartData1_1 = {
            category,
            data,
            markArea
          }
        })
      }
    },
    renderChart1_2() {
      if (this.select1_1 && this.select1_2 && this.date1[0] && this.date1[1]) {
        environmentQuality({
          environmentType: 'airSta',
          analysisType: 'dynamic',
          type: 2,
          stationId: this.select1_1,
          factorType: this.select1_2,
          startDate: this.date1[0],
          endDate: this.date1[1]
        }).then((res) => {
          let result = res.data.datas[0]
          if (result.currentList) {
            let category = result.dayList.map((v) => {
              return v.substring(5, v.length)
            })
            // 标准值,现在标准值是在数据对接表里的一个字段,每传一条数据就会有个标准值,这个表结构设计的有问题
            // 我们暂时在前端处理一下
            let standard = 0
            for (let i = 0; i < result.currentList.length; i++) {
              if (result.currentList[i].standard !== 0) {
                standard = result.currentList[i].standard
                break
              }
            }
            let data1 = []
            let dataName2 = Number(this.date1[0].substring(0, 4))
            // 当前数据
            let data2 = []
            let dataName3 = dataName2 - 1
            // 去年数据
            let data3 = []
            result.currentList.forEach((v) => {
              data1.push(standard)
              data2.push(v.monitorData)
            })
            data3 = result.yearOnYearList.map((v) => v.monitorData)
            this.chartData1_2 = {
              category,
              data1,
              dataName2,
              data2,
              dataName3,
              data3
            }
          }
        })
      }
    },
    renderChart1_3() {
      if (this.select1_1 && this.select1_2 && this.date1[0] && this.date1[1]) {
        environmentQuality({
          environmentType: 'airSta',
          analysisType: 'dynamic',
          type: 3,
          stationId: this.select1_1,
          factorType: this.select1_2,
          startDate: this.date1[0],
          endDate: this.date1[1]
        }).then((res) => {
          let result = res.data.datas[0]
          if (result.currentList) {
            let category = result.dayList.map((v) => {
              return v.substring(5, v.length)
            })
            // 标准值,现在标准值是在数据对接表里的一个字段,每传一条数据就会有个标准值,这个表结构设计的有问题
            // 我们暂时在前端处理一下
            let standard = 0
            for (let i = 0; i < result.currentList.length; i++) {
              if (result.currentList[i].standard !== 0) {
                standard = result.currentList[i].standard
                break
              }
            }
            let data1 = []
            let dataName2 = result.currentList[0].reportDate.substring(0, 7)
            // 当前数据
            let data2 = []
            let dataName3 = result.monthOnMonthList[0].reportDate.substring(
              0,
              7
            )
            // 去年数据
            let data3 = []
            result.currentList.forEach((v) => {
              data1.push(standard)
              data2.push(v.monitorData)
            })
            data3 = result.monthOnMonthList.map((v) => v.monitorData)
            this.chartData1_3 = {
              category,
              data1,
              dataName2,
              data2,
              dataName3,
              data3
            }
          }
        })
      }
    },
    renderChart1_4() {
      if (
        this.select1_1 &&
        this.select1_2 &&
        this.select1_3 &&
        this.date1[0] &&
        this.date1[1] &&
        this.tabIndex1_1 === 4
      ) {
        environmentQualityLateralRatio({
          environmentType: 'airSta',
          stationId: this.select1_1,
          stationId1: this.select1_3,
          factorType: this.select1_2,
          startDate: this.date1[0],
          endDate: this.date1[1]
        }).then((res) => {
          let result = res.data.datas[0]
          if (result.dataList) {
            let category = result.dayList
            let dataName1 = result.dataList[0].name
            let dataName2 = result.dataList[1].name
            let data1 = result.dataList[0].list.map((v) => {
              return v.monitorData
            })
            let data2 = result.dataList[1].list.map((v) => {
              return v.monitorData
            })
            this.chartData1_4 = {
              category,
              dataName1,
              data1,
              dataName2,
              data2
            }
          }
        })
      }
    },
    renderChart2() {
      this.renderChart2_1()
      this.renderChart2_2()
      this.renderChart2_3()
      this.renderChart2_4()
    },
    renderChart2_1() {
      if (this.select2_1 && this.select2_2 && this.date2[0] && this.date2[1]) {
        environmentQuality({
          environmentType: 'waterSta',
          analysisType: 'dynamic',
          type: 1,
          stationId: this.select2_1,
          factorType: this.select2_2,
          startDate: this.date2[0],
          endDate: this.date2[1]
        }).then((res) => {
          let result = res.data.datas[0]
          let data = result.waterThermalAnalysis.map((v) => {
            return v.monitorData
          })
          let category = result.dayList
          let markArea = []
          for (let i = 1; i < result.waterThermalAnalysis.length - 1; i++) {
            let num = result.waterThermalAnalysis[i].monitorData
            let color = this.colorPipe(num)
            let data = [
              {
                xAxis: result.waterThermalAnalysis[i - 1].reportDate,
                itemStyle: {
                  color: color
                }
              },
              {
                xAxis: result.waterThermalAnalysis[i].reportDate
              }
            ]
            markArea.push(data)
          }
          this.chartData2_1 = {
            category,
            data,
            markArea
          }
        })
      }
    },
    renderChart2_2() {
      if (this.select2_1 && this.select2_2 && this.date2[0] && this.date2[1]) {
        environmentQuality({
          environmentType: 'waterSta',
          analysisType: 'dynamic',
          type: 2,
          stationId: this.select2_1,
          factorType: this.select2_2,
          startDate: this.date2[0],
          endDate: this.date2[1]
        }).then((res) => {
          let result = res.data.datas[0]
          if (result.currentList) {
            let category = result.dayList.map((v) => {
              return v.substring(5, v.length)
            })
            // 标准值,现在标准值是在数据对接表里的一个字段,每传一条数据就会有个标准值,这个表结构设计的有问题
            // 我们暂时在前端处理一下
            let standard = 0
            for (let i = 0; i < result.currentList.length; i++) {
              if (result.currentList[i].standard !== 0) {
                standard = result.currentList[i].standard
                break
              }
            }
            let data1 = []
            let dataName2 = Number(this.date2[0].substring(0, 4))
            // 当前数据
            let data2 = []
            let dataName3 = dataName2 - 1
            // 去年数据
            let data3 = []
            result.currentList.forEach((v) => {
              data1.push(standard)
              data2.push(v.monitorData)
            })
            data3 = result.yearOnYearList.map((v) => v.monitorData)
            this.chartData2_2 = {
              category,
              data1,
              dataName2,
              data2,
              dataName3,
              data3
            }
          }
        })
      }
    },
    renderChart2_3() {
      if (this.select2_1 && this.select2_2 && this.date2[0] && this.date2[1]) {
        environmentQuality({
          environmentType: 'waterSta',
          analysisType: 'dynamic',
          type: 3,
          stationId: this.select2_1,
          factorType: this.select2_2,
          startDate: this.date2[0],
          endDate: this.date2[1]
        }).then((res) => {
          let result = res.data.datas[0]
          if (result.currentList) {
            let category = result.dayList.map((v) => {
              return v.substring(5, v.length)
            })
            // 标准值,现在标准值是在数据对接表里的一个字段,每传一条数据就会有个标准值,这个表结构设计的有问题
            // 我们暂时在前端处理一下
            let standard = 0
            for (let i = 0; i < result.currentList.length; i++) {
              if (result.currentList[i].standard !== 0) {
                standard = result.currentList[i].standard
                break
              }
            }
            let data1 = []
            let dataName2 = result.currentList[0].reportDate.substring(0, 7)
            // 当前数据
            let data2 = []
            let dataName3 = result.monthOnMonthList[0].reportDate.substring(
              0,
              7
            )
            // 去年数据
            let data3 = []
            result.currentList.forEach((v) => {
              data1.push(standard)
              data2.push(v.monitorData)
            })
            data3 = result.monthOnMonthList.map((v) => v.monitorData)
            this.chartData2_3 = {
              category,
              data1,
              dataName2,
              data2,
              dataName3,
              data3
            }
          }
        })
      }
    },
    renderChart2_4() {
      if (
        this.select2_1 &&
        this.select2_2 &&
        this.select2_3 &&
        this.date2[0] &&
        this.date2[1] &&
        this.tabIndex2_1 === 4
      ) {
        environmentQualityLateralRatio({
          environmentType: 'waterSta',
          stationId: this.select2_1,
          stationId1: this.select2_3,
          factorType: this.select2_2,
          startDate: this.date2[0],
          endDate: this.date2[1]
        }).then((res) => {
          let result = res.data.datas[0]
          if (result.dataList) {
            let category = result.dayList
            let dataName1 = result.dataList[0].name
            let dataName2 = result.dataList[1].name
            let data1 = result.dataList[0].list.map((v) => {
              return v.monitorData
            })
            let data2 = result.dataList[1].list.map((v) => {
              return v.monitorData
            })
            this.chartData2_4 = {
              category,
              dataName1,
              data1,
              dataName2,
              data2
            }
          }
        })
      }
    },
    renderChart3() {
      this.renderChartData3()
      this.renderChart3_4()
    },
    renderChartData3() {
      if (this.select3_1 && this.select3_2) {
        let delta = -1
        if (this.tabIndex3_1 === 1) {
          delta = -1
        } else if (this.tabIndex3_1 === 2) {
          delta = -3
        } else if (this.tabIndex3_1 === 3) {
          delta = -12
        }
        let startDate = moment().add(delta, 'M').format('YYYY-MM-DD')
        let endDate = moment().format('YYYY-MM-DD')
        exhaustEmission({
          environmentType: 'wastegas',
          analysisType: 'count',
          mondeviceId: this.select3_1,
          factorTypeId: this.select3_2,
          startDate: startDate,
          endDate: endDate
        }).then((res) => {
          let result = res.data.datas[0]
          let category = []
          let data = []
          result.airThermalAnalysis.forEach((v) => {
            category.push(v.reportDate)
            data.push(v.monitorData)
          })
          this.chartData3 = { category, data }
        })
      }
    },
    // 废气的超标排行,每个top5
    renderChart3_1to3_3() {
      // 次数分析
      if (this.tabIndex3_2 === 1) {
        exhaustEmission({
          environmentType: 'wastegas',
          analysisType: 'rank',
          rankType: '1'
        }).then((res) => {
          let result = res.data.datas[0]
          let name = '超标次数'
          let category3_1 = []
          let category3_2 = []
          let category3_3 = []
          let data3_1 = []
          let data3_2 = []
          let data3_3 = []
          result.enterPriseList.reverse()
          result.enterPriseList.forEach((v) => {
            category3_1.push(v.entprName)
            data3_1.push(v.num)
          })
          // 不满5个就加空的,否则柱状图居中,不好看
          while (data3_1.length < 5) {
            category3_1.unshift('')
            data3_1.unshift(0)
          }
          result.factorTypeList.reverse()
          result.factorTypeList.forEach((v) => {
            category3_2.push(v.pollutionName)
            data3_2.push(v.num)
          })
          while (data3_2.length < 5) {
            category3_2.unshift('')
            data3_2.unshift(0)
          }
          result.deviceList.reverse()
          result.deviceList.forEach((v) => {
            category3_3.push(v.mondeviceName)
            data3_3.push(v.num)
          })
          while (data3_3.length < 5) {
            category3_3.unshift('')
            data3_3.unshift(0)
          }
          this.chartData3_1 = {
            name,
            category: category3_1,
            data: data3_1
          }
          this.chartData3_2 = {
            name,
            category: category3_2,
            data: data3_2
          }
          this.chartData3_3 = {
            name,
            category: category3_3,
            data: data3_3
          }
        })
      } else if (this.tabIndex3_2 === 2) {
        exhaustEmission({
          environmentType: 'wastegas',
          analysisType: 'rank',
          rankType: '2'
        }).then((res) => {
          let result = res.data.datas[0]
          let name = '超标时长'
          let category3_1 = []
          let category3_2 = []
          let category3_3 = []
          let data3_1 = []
          let data3_2 = []
          let data3_3 = []
          result.enterPriseList.reverse()
          result.enterPriseList.forEach((v) => {
            category3_1.push(v.name)
            data3_1.push((v.time / 3600).toFixed(2))
          })
          // 不满5个就加空的,否则柱状图居中,不好看
          while (data3_1.length < 5) {
            category3_1.unshift('')
            data3_1.unshift(0)
          }
          result.factorTypeList.reverse()
          result.factorTypeList.forEach((v) => {
            category3_2.push(v.name)
            data3_2.push((v.time / 3600).toFixed(2))
          })
          while (data3_2.length < 5) {
            category3_2.unshift('')
            data3_2.unshift(0)
          }
          result.deviceList.reverse()
          result.deviceList.forEach((v) => {
            category3_3.push(v.name)
            data3_3.push((v.time / 3600).toFixed(2))
          })
          while (data3_3.length < 5) {
            category3_3.unshift('')
            data3_3.unshift(0)
          }
          this.chartData3_1 = {
            name,
            category: category3_1,
            data: data3_1
          }
          this.chartData3_2 = {
            name,
            category: category3_2,
            data: data3_2
          }
          this.chartData3_3 = {
            name,
            category: category3_3,
            data: data3_3
          }
        })
      }
    },
    renderChart3_4() {
      if (this.select3_1 && this.select3_2 && this.date3[0] && this.date3[1]) {
        exhaustEmission({
          environmentType: 'wastegas',
          analysisType: 'dynamic',
          mondeviceId: this.select3_1,
          factorTypeId: this.select3_2,
          startDate: this.date3[0],
          endDate: this.date3[1]
        }).then((res) => {
          let result = res.data.datas[0]
          let category = []
          let data = []
          result.wastegasAnalysis.forEach((v) => {
            category.push(v.reportDate)
            data.push(v.monitorData)
          })
          this.chartData3_4 = { category, data }
        })
      }
    },
    renderChart4() {
      this.renderChartData4()
      this.renderChart4_4()
    },
    renderChartData4() {
      if (this.select4_1 && this.select4_2) {
        let delta = -1
        if (this.tabIndex4_1 === 1) {
          delta = -1
        } else if (this.tabIndex4_1 === 2) {
          delta = -3
        } else if (this.tabIndex4_1 === 3) {
          delta = -12
        }
        let startDate = moment().add(delta, 'M').format('YYYY-MM-DD')
        let endDate = moment().format('YYYY-MM-DD')
        exhaustEmission({
          environmentType: 'wastewater',
          analysisType: 'count',
          mondeviceId: this.select4_1,
          factorTypeId: this.select4_2,
          startDate: startDate,
          endDate: endDate
        }).then((res) => {
          let result = res.data.datas[0]
          let category = []
          let data = []
          result.airThermalAnalysis.forEach((v) => {
            category.push(v.reportDate)
            data.push(v.monitorData)
          })
          this.chartData4 = { category, data }
        })
      }
    },
    // 废水的超标排行,每个top5
    renderChart4_1to4_3() {
      // 次数分析
      if (this.tabIndex4_2 === 1) {
        exhaustEmission({
          environmentType: 'wastewater',
          analysisType: 'rank',
          rankType: '1'
        }).then((res) => {
          let result = res.data.datas[0]
          let name = '超标次数'
          let category4_1 = []
          let category4_2 = []
          let category4_3 = []
          let data4_1 = []
          let data4_2 = []
          let data4_3 = []
          result.enterPriseList.reverse()
          result.enterPriseList.forEach((v) => {
            category4_1.push(v.entprName)
            data4_1.push(v.num)
          })
          // 不满5个就加空的,否则柱状图居中,不好看
          while (data4_1.length < 5) {
            category4_1.unshift('')
            data4_1.unshift(0)
          }
          result.factorTypeList.reverse()
          result.factorTypeList.forEach((v) => {
            category4_2.push(v.pollutionName)
            data4_2.push(v.num)
          })
          while (data4_2.length < 5) {
            category4_2.unshift('')
            data4_2.unshift(0)
          }
          result.deviceList.reverse()
          result.deviceList.forEach((v) => {
            category4_3.push(v.mondeviceName)
            data4_3.push(v.num)
          })
          while (data4_3.length < 5) {
            category4_3.unshift('')
            data4_3.unshift(0)
          }
          this.chartData4_1 = {
            name,
            category: category4_1,
            data: data4_1
          }
          this.chartData4_2 = {
            name,
            category: category4_2,
            data: data4_2
          }
          this.chartData4_3 = {
            name,
            category: category4_3,
            data: data4_3
          }
        })
      } else if (this.tabIndex4_2 === 2) {
        exhaustEmission({
          environmentType: 'wastewater',
          analysisType: 'rank',
          rankType: '2'
        }).then((res) => {
          let result = res.data.datas[0]
          let name = '超标时长'
          let category4_1 = []
          let category4_2 = []
          let category4_3 = []
          let data4_1 = []
          let data4_2 = []
          let data4_3 = []
          result.enterPriseList.reverse()
          result.enterPriseList.forEach((v) => {
            category4_1.push(v.name)
            data4_1.push((v.time / 3600).toFixed(2))
          })
          // 不满5个就加空的,否则柱状图居中,不好看
          while (data4_1.length < 5) {
            category4_1.unshift('')
            data4_1.unshift(0)
          }
          result.factorTypeList.reverse()
          result.factorTypeList.forEach((v) => {
            category4_2.push(v.name)
            data4_2.push((v.time / 3600).toFixed(2))
          })
          while (data4_2.length < 5) {
            category4_2.unshift('')
            data4_2.unshift(0)
          }
          result.deviceList.reverse()
          result.deviceList.forEach((v) => {
            category4_3.push(v.name)
            data4_3.push((v.time / 3600).toFixed(2))
          })
          while (data4_3.length < 5) {
            category4_3.unshift('')
            data4_3.unshift(0)
          }
          this.chartData4_1 = {
            name,
            category: category4_1,
            data: data4_1
          }
          this.chartData4_2 = {
            name,
            category: category4_2,
            data: data4_2
          }
          this.chartData4_3 = {
            name,
            category: category4_3,
            data: data4_3
          }
        })
      }
    },
    renderChart4_4() {
      if (this.select4_1 && this.select4_2 && this.date4[0] && this.date4[1]) {
        exhaustEmission({
          environmentType: 'wastewater',
          analysisType: 'dynamic',
          mondeviceId: this.select4_1,
          factorTypeId: this.select4_2,
          startDate: this.date4[0],
          endDate: this.date4[1]
        }).then((res) => {
          let result = res.data.datas[0]
          let category = []
          let data = []
          result.wastewaterAnalysis.forEach((v) => {
            category.push(v.reportDate)
            data.push(v.monitorData)
          })
          this.chartData4_4 = { category, data }
        })
      }
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
    // 获取地图上的定位点
    getMapPoint() {
      this.$http
        .get('/ecologicalenvironment/ecologicalEnvironment')
        .then((res) => {
          if (res.data.code === 0) {
            let data = []
            res.data.datas[0].sensorDevice.forEach((item) => {
              item.type = 'sensorDevice'
              item.name = item.deviceName
              let lnglat = []
              lnglat.push(item.longitude, item.latitude)
              item.lnglat = lnglat
              data.push(item)
            })
            res.data.datas[0].enterpriseBaseInfo.forEach((item) => {
              item.type = 'enterpriseBaseInfo'
              item.name = item.entprName
              let lnglat = []
              lnglat.push(item.longitude, item.latitude)
              item.lnglat = lnglat
              data.push(item)
            })
            res.data.datas[0].solidWasteDepot.forEach((item) => {
              item.type = 'solidWasteDepot'
              item.name = item.depotName
              let lnglat = []
              lnglat.push(item.longitude, item.latitude)
              item.lnglat = lnglat
              data.push(item)
            })
            let item = {
              id: 'xxx',
              deviceCode: '01',
              deviceName: '地表水设备a',
              longitude: 106.58649,
              latitude: 37.464093,
              lnglat: [106.58649, 37.464093],
              type: 'waterStation',
              name: '地表水设备a',
              detail: {
                airMonData: {
                  id: '1',
                  createdDate: '2022-07-18 10:16:56',
                  updatedDate: null,
                  delFlag: 0,
                  creatorId: null,
                  updaterId: null,
                  deviceId: '1',
                  dataTime: '2022-07-18 10:32:17',
                  enterName: '宁夏地表水监测',
                  deviceName: '宁夏地表水监测',
                  mainPollute: 'PM2.5',
                  worstPeriod: '9:00-11:00',
                  aqi: 50,
                  so2: 5,
                  co: 0.8,
                  no2: 10,
                  o3: 20,
                  pm25: 28,
                  pm10: 51
                }
              }
            }
            data.push(item)
            this.mapData = data
            this.initMapData()
          } else {
            this.$Message.info(res.message)
            // layer.msg(res.message)
            this.mapData = []
            this.initMapData()
          }
        })
    },
    initMapData() {
      // let data = this.mapData
      if (!this.mapData) {
        return
      }
      let data = []
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      let data5 = []
      let data6 = []
      let data7 = []
      let data8 = []
      this.mapData.forEach((item) => {
        switch (item.type) {
          case 'sensorDevice':
            switch (item.deviceCode) {
              case '01':
                data1.push(item)
                break
              case '04':
                data2.push(item)
                break
              case '03':
                data3.push(item)
                break
              case '05':
                data4.push(item)
                break
              default:
                break
            }
            break
          case 'solidWasteDepot':
            data5.push(item)
            break
          case 'pwjk':
            data6.push(item)
            break
          case 'enterpriseBaseInfo':
            data7.push(item)
            break
          case 'waterStation':
            data8.push(item)
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
        data = [...data, ...data5]
      }
      // if (this.checkBox[5]) {
      //   data = [...data, ...data6]
      // }
      if (this.checkBox[6]) {
        data = [...data, ...data7]
      }
      if (this.checkBox[7]) {
        data = [...data, ...data8]
      }
      if (this.InfoWindow) {
        MapControl.clearInfoWindow()
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
    openInfowindow(coord, extData, detail) {
      const map = MapControl.map['map']
      // 判断是否存在弹出框
      if (this.InfoWindow) {
        map.clearInfoWindow()
      }
      let data = extData.data[0]
      let content = ''
      var that = this
      if (data.type === 'enterpriseBaseInfo') {
        this.markerData = JSON.parse(JSON.stringify(extData.data[0]))
        content = this.$refs.infoWindow.$el
        this.infowindowShow = true
      } else if (data.type === 'waterStation') {
        content = this.renderContent(data)
      } else {
        data.detail = detail
        content = this.renderContent(data)
      }

      that.InfoWindow = new AMap.InfoWindow({
        anchor: 'center', // 弹出框瞄点位置
        isCustom: true, // 使用自定义窗体
        content: content
      })
      that.InfoWindow.open(map, coord)

      if (data.type === 'sensorDevice') {
        let statusCharts = echarts.init(document.getElementById('chartT1'))
        if (extData.data[0].deviceCode === '01') {
          statusCharts.setOption(this.atmosphereOption)
        } else if (extData.data[0].deviceCode === '04') {
          statusCharts.setOption(this.alertChartOption1)
        } else if (extData.data[0].deviceCode === '03') {
          statusCharts.setOption(this.alertChartOption2)
        } else if (extData.data[0].deviceCode === '05') {
          statusCharts.setOption(this.alertChartOption3)
        }
      }
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
    getVirtulData(year) {
      year = year || '2022'
      let date = +echarts.number.parseDate(year + '-01-01')
      let end = +echarts.number.parseDate(+year + 1 + '-01-01')
      let dayTime = 3600 * 24 * 1000
      let data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          moment(time).format('yyyy-MM-dd'),
          Math.floor(Math.random() * 500)
        ])
      }
      return data
    },
    changeMonth(symbol) {
      let year = parseInt(this.canMonth.split('-')[0])
      let month = parseInt(this.canMonth.split('-')[1])
      if (symbol === '-') {
        if (month !== 1) {
          month--
        } else {
          month = 12
          year--
        }
      }
      if (symbol === '+') {
        if (month !== 12) {
          month++
        } else {
          month = 1
          year++
        }
      }
      if (month < 10) {
        month = '0' + month
      }
      this.canMonth = year + '-' + month
    },
    initEnvironmentQuality(id) {
      environmentQuality({
        stationId: id,
        analysisType: 'quality',
        environmentType: 'airSta',
        year: new Date().getFullYear()
      }).then((res) => {
        let result = res.data.datas[0]
        let atmosphere = ''
        if (result.AQI <= 50) {
          atmosphere = 'g1'
          result.overallQuality = '优'
        } else if (result.AQI <= 100) {
          atmosphere = 'g2'
          result.overallQuality = '良'
        } else if (result.AQI <= 150) {
          atmosphere = 'g3'
          result.overallQuality = '轻度'
        } else if (result.AQI <= 200) {
          atmosphere = 'g4'
          result.overallQuality = '中度'
        } else if (result.AQI <= 300) {
          atmosphere = 'g5'
          result.overallQuality = '重度'
        } else {
          atmosphere = 'g6'
          result.overallQuality = '严重'
        }
        this.atmosphere = atmosphere
        this.environmentQuality = result
        if (result.airStaDataList.length > 0) {
          this.canMonth = result.airStaDataList[
            result.airStaDataList.length - 1
          ][0].substring(0, 7)
        }
      })
    },
    initWaterQuality(id) {
      environmentQuality({
        stationId: id,
        analysisType: 'quality',
        environmentType: 'waterSta',
        year: new Date().getFullYear()
      }).then((res) => {
        let result = res.data.datas[0]
        this.waterQuality = result
        let data = []
        result.waterStaDataList.forEach((item) => {
          data.push({
            value: item.num,
            name: item.grade
          })
        })
        this.waterChart = data
      })
    },
    initEcologicalMonitoring() {
      this.$http
        .get('/ecologicalenvironment/ecologicalMonitoring')
        .then((res) => {
          this.ecologicalMonitoring = res.data.datas[0]
        })
    },
    initAlertChart() {
      let list = []
      for (let j = 0; j < 7; j++) {
        list.push(parseInt(Math.random() * 1000) + 1000)
      }
      this.alertChartData1 = list
      list = []
      for (let j = 0; j < 7; j++) {
        list.push(parseInt(Math.random() * 1000))
      }
      this.alertChartData2 = list
      list = []
      for (let j = 0; j < 7; j++) {
        list.push(parseInt(Math.random() * 1000))
      }
      this.alertChartData3 = list
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
        MapControl.addCesiumPupop(data, viewer, divcontent)
      } else {
        if (data.type === 'sensorDevice') {
          const params = {
            type: data.deviceCode,
            id: data.id
          }
          this.$http
            .post('/ecologicalenvironment/ecologicalEnvironmentDetail', params)
            .then((res) => {
              data.detail = res.data.datas[0]
              content = this.renderContent(data)
              divcontent.innerHTML = content
              MapControl.addCesiumPupop(data, viewer, divcontent)
            })
        } else if (data.type === 'solidWasteDepot') {
          const params = {
            type: '06',
            id: data.id
          }
          this.$http
            .post('/ecologicalenvironment/ecologicalEnvironmentDetail', params)
            .then((res) => {
              data.detail = res.data.datas[0]
              content = this.renderContent(data)
              divcontent.innerHTML = content
              MapControl.addCesiumPupop(data, viewer, divcontent)
            })
        }
      }
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
    /* cesium 相关方法--end */
    renderContent(data) {
      let detail = data.detail
      let content = ''
      if (data.type === 'sensorDevice') {
        if (data.deviceCode === '01') {
          this.atmosphereData = detail.airMonData.aqi
          let atmosphere = ''
          if (detail.airMonData.aqi <= 50) {
            atmosphere = '优'
          } else if (detail.airMonData.aqi <= 100) {
            atmosphere = '良'
          } else if (detail.airMonData.aqi <= 150) {
            atmosphere = '轻度'
          } else if (detail.airMonData.aqi <= 200) {
            atmosphere = '中度'
          } else if (detail.airMonData.aqi <= 300) {
            atmosphere = '重度'
          } else {
            atmosphere = '严重'
          }
          // 信息展示
          content = `<div class="infowindowContent" style="width: 520px;">
                    <div class="infowindowClose" onclick="closeInfoWindow()"></div>
                    <div class="contentDiv">
                      <div class="infotitle">
                        <div class="itemicon itemInfoicon"></div>
                        <div class="titlespan"><span>${detail.airMonData.enterName}</span></div>
                      </div>
                      <div class="infocontent">
                        <div class="infocontent1">更新日期:</div>
                        <div class="infocontent2">${detail.airMonData.dataTime}</div>
                      </div>
                      <div class="chartDiv">
                        <div id="chartT1" style="height: 230px;width: 40%;"></div>
                        <div class="chr">
                          <div class="chrTiele">空气质量</div>
                          <div class="chrContent yl">${atmosphere}</div>
                        </div>
                        <div class="chr">
                          <div class="chrTiele">首要污染物</div>
                          <div class="chrContent">${detail.airMonData.mainPollute}</div>
                          <div class="chrTiele">最差时段</div>
                          <div class="chrContent1">${detail.airMonData.worstPeriod}</div>
                        </div>
                      </div>
                      <div class="pmDiv">
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">PM2.5</div>
                            <div class="unit">(mg/m<sup>3</sup>)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.pm25}</div>
                        </div>
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">SO<sub>2</sub></div>
                            <div class="unit">(mg/m<sup>3</sup>)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.so2}</div>
                        </div>
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">NO<sub>2</sub></div>
                            <div class="unit">(mg/m<sup>3</sup>)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.no2}</div>
                        </div>
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">PM10</div>
                            <div class="unit">(mg/m<sup>3</sup>)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.pm10}</div>
                        </div>
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">CO</div>
                            <div class="unit">(mg/m<sup>3</sup>)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.co}</div>
                        </div>
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">O<sub>3</sub></div>
                            <div class="unit">(mg/m<sup>3</sup>)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.o3}</div>
                        </div>
                      </div>
                    </div>
                  </div>`
        } else if (data.deviceCode === '03') {
          this.alertChartData2 = detail.liquidwasteMonData.countData
          let table = `<div class="contentTable0"><table align="left" cellspacing="0" class="contentTable">
                      <thead>
                        <tr>
                            <th>序号</th>
                            <th>名称</th>
                            <th>监测值</th>
                            <th>标准值(mg/m<sup>3</sup>)</th>
                        </tr>
                      </thead>
                      <tbody>`
          table += `<tr>
                        <td>1</td>
                        <td>COD</td>
                        <td>${detail.liquidwasteMonData.dataList[0].COD}</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>氨氮</td>
                        <td>${detail.liquidwasteMonData.dataList[0].NH3N}</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>TP</td>
                        <td>${detail.liquidwasteMonData.dataList[0].TP}</td>
                        <td>0.5</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>TN</td>
                        <td>${detail.liquidwasteMonData.dataList[0].TN}</td>
                        <td>12</td>
                    </tr>`
          table += '</tbody></table></div>'
          // 信息展示
          content =
            '<div class="infowindowContent">' +
            '<div class="infowindowClose" onclick="closeInfoWindow()"></div>' +
            '<div class="contentDiv">' +
            '<div class="infotitle">' +
            '<div class="itemicon itemInfoicon"></div>' +
            '<div class="titlespan"><span>' +
            detail.liquidwasteMonData.enterName +
            '</span></div>' +
            '</div>' +
            '<div class="infoTitle1">' +
            '<div class="itemicon itemInfoicon"></div>' +
            '<div class=""><span>(' +
            detail.liquidwasteMonData.deviceName +
            ')</span></div>' +
            '</div>' +
            '<div class="infocontent">' +
            '<div class="infocontent1">更新日期:</div>' +
            '<div class="infocontent2">' +
            detail.liquidwasteMonData.dataTime +
            '</div>' +
            '</div>' +
            '<div class="infocontent">' +
            '<div class="infocontent1">流量:</div>' +
            '<div class="infocontent2">' +
            (detail.liquidwasteMonData.flow
              ? detail.liquidwasteMonData.flow
              : '-') +
            'm<sup>3</sup>/h</div>' +
            '</div>' +
            '</div>' +
            table +
            '<div id="chartT1" style="height: 230px;width=100%;">' +
            '</div>' +
            '</div>' +
            '</div>'
        } else if (data.deviceCode === '04') {
          this.alertChartData1 = detail.gasMonData.countData
          let table = `<div class="contentTable0"><table align="left" cellspacing="0" class="contentTable">
                      <thead>
                        <tr>
                            <th>序号</th>
                            <th>名称</th>
                            <th>监测值</th>
                            <th>标准值(mg/m<sup>3</sup>)</th>
                        </tr>
                      </thead>
                      <tbody>`
          table += `<tr>
                        <td>1</td>
                        <td>二氧化硫</td>
                        <td>${detail.gasMonData.dataList[0].SO2}</td>
                        <td>550</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>氮氧化物</td>
                        <td>${detail.gasMonData.dataList[0].NOX}</td>
                        <td>240</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>烟尘</td>
                        <td>${detail.gasMonData.dataList[0].soot}</td>
                        <td>120</td>
                    </tr>`
          table += '</tbody></table></div>'
          // 信息展示
          content =
            '<div class="infowindowContent">' +
            '<div class="infowindowClose" onclick="closeInfoWindow()"></div>' +
            '<div class="contentDiv">' +
            '<div class="infotitle">' +
            '<div class="itemicon itemInfoicon"></div>' +
            '<div class="titlespan"><span>' +
            detail.gasMonData.enterName +
            '</span></div>' +
            '</div>' +
            '<div class="infoTitle1">' +
            '<div class="itemicon itemInfoicon"></div>' +
            '<div class=""><span>(' +
            detail.gasMonData.deviceName +
            ')</span></div>' +
            '</div>' +
            '<div class="infocontent">' +
            '<div class="infocontent1">更新日期:</div>' +
            '<div class="infocontent2">' +
            detail.gasMonData.dataTime +
            '</div>' +
            '</div>' +
            '<div class="infocontent">' +
            '<div class="infocontent1">废气流量:</div>' +
            '<div class="infocontent2">' +
            (detail.gasMonData.gasFlow ? detail.gasMonData.gasFlow : '-') +
            'm<sup>3</sup>/h</div>' +
            '</div>' +
            '<div class="infocontent">' +
            '<div class="infocontent1">烟气温度:</div>' +
            '<div class="infocontent2">' +
            (detail.gasMonData.gasTemperature
              ? detail.gasMonData.gasTemperature
              : '-') +
            '℃</div>' +
            '</div>' +
            '</div>' +
            table +
            '<div id="chartT1" style="height: 230px;width=100%;">' +
            '</div>' +
            '</div>' +
            '</div>'
        } else if (data.deviceCode === '05') {
          this.alertChartData3 = detail.rainMonData.countData
          let table = `<div class="contentTable0"><table align="left" cellspacing="0" class="contentTable">
                      <thead>
                        <tr>
                            <th>序号</th>
                            <th>名称</th>
                            <th>监测值</th>
                            <th>标准值(mg/m<sup>3</sup>)</th>
                        </tr>
                      </thead>
                      <tbody>`
          table += `<tr>
                        <td>1</td>
                        <td>COD</td>
                        <td>${detail.rainMonData.dataList[0].COD}</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>SS</td>
                        <td>${detail.rainMonData.dataList[0].SS}</td>
                        <td>40</td>
                    </tr>`
          table += '</tbody></table></div>'
          // 信息展示
          content =
            '<div class="infowindowContent">' +
            '<div class="infowindowClose" onclick="closeInfoWindow()"></div>' +
            '<div class="contentDiv">' +
            '<div class="infotitle">' +
            '<div class="itemicon itemInfoicon"></div>' +
            '<div class="titlespan"><span>' +
            detail.rainMonData.enterName +
            '</span></div>' +
            '</div>' +
            '<div class="infoTitle1">' +
            '<div class="itemicon itemInfoicon"></div>' +
            '<div class=""><span>(' +
            detail.rainMonData.deviceName +
            ')</span></div>' +
            '</div>' +
            '<div class="infocontent">' +
            '<div class="infocontent1">更新日期:</div>' +
            '<div class="infocontent2">' +
            detail.rainMonData.dataTime +
            '</div>' +
            '</div>' +
            '</div>' +
            table +
            '<div id="chartT1" style="height: 230px;width=100%;">' +
            '</div>' +

            '</div>' +
            '</div>'
        }
      } else if (data.type === 'solidWasteDepot') {
        let table = `<div class="contentTable0"><table align="center" cellspacing="0" class="contentTable">
                      <thead>
                        <tr>
                            <th>危废名称</th>
                            <th>当前贮存量(t)</th>
                            <th>危废类别</th>
                            <th>废物代码</th>
                        </tr>
                      </thead>
                      <tbody>`
        detail.solidWasteDepot.solidwasteOrderList.forEach((item, index) => {
          table += `<tr>
                        <td>${item.solidwasteName}</td>
                        <td>${item.solidwasteNumber}</td>
                        <td>${item.solidwasteType}</td>
                        <td>${item.solidwasteNumber}</td>
                    </tr>`
        })
        table += '</tbody></table></div>'
        // 信息展示
        content = `<div class="infowindowContent">
                    <div class="infowindowClose" onclick="closeInfoWindow()"></div>
                    <div class="contentDiv">
                      <div class="infotitle">
                        <div class="itemicon itemInfoicon"></div>
                        <div class="titlespan">
                          <span>危废仓库</span>
                        </div>
                      </div>
                      <div class="infocontent">
                        <div class="infocontent1">更新日期:</div>
                        <div class="infocontent2">
                          ${detail.solidWasteDepot.updatedDate}
                        </div>
                      </div>
                      <div class="infocontent">
                        <div class="infocontent1">所属单位:</div>
                        <div class="infocontent2">
                          ${detail.solidWasteDepot.enterpriseName}
                        </div>
                                              </div>
                      <div class="infocontent">
                        <div class="infocontent1">贮存场大小:</div>
                        <div class="infocontent2">
                          ${detail.solidWasteDepot.area}
                        </div>
                      </div>
                      <div class="infocontent">
                        <div class="infocontent1">最大贮存量:</div>
                        <div class="infocontent2">
                          ${detail.solidWasteDepot.maxStorage}
                        </div>
                      </div>
                      ${table}
                    </div>
                  </div>`
      } else if (data.type === 'waterStation') {
        // 信息展示
        content = `<div class="infowindowContent" style="width: 520px;">
                    <div class="infowindowClose" onclick="closeInfoWindow()"></div>
                    <div class="contentDiv">
                      <div class="infotitle">
                        <div class="itemicon itemInfoicon"></div>
                        <div class="titlespan"><span>${detail.airMonData.enterName}</span></div>
                        <div class="class class3">三类</div>
                      </div>
                      <div class="infocontent">
                        <div class="infocontent1">更新日期:</div>
                        <div class="infocontent2">${detail.airMonData.dataTime}</div>
                      </div>
                      <div class="pmDiv">
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">高锰酸盐</div>
                            <div class="unit">(标准值≤6.0)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.pm25}</div>
                        </div>
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">溶解氧</div>
                            <div class="unit">(标准值≥5.0)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.so2}</div>
                        </div>
                        <div class="item">
                          <div class="itemTiele">
                            <div class="name">氨氮</div>
                            <div class="unit">(标准值≤1.0)</div>
                          </div>
                          <div class="itemContent">${detail.airMonData.no2}</div>
                        </div>
                      </div>
                    </div>
                  </div>`
      }
      return content
    },
    /* -- -- */
    // 实时查询告警数量
    getAlarmNumber() {
      countEcologicalEnvironment()
        .then((res) => {
          if (res.data.code === 0) {
            let data = res.data.datas
            this.alarmEventNum = data.total
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
    popoutTable1() {
      if (this.alarmEventNum && this.alarmEventNum > 0) {
        this.popoutTableShow = true
        this.popoutTableIndex = 1
        this.popoutTableForm = {}
        this.popoutTableTitle = '告警列表'
        this.popoutTableColumn = [
          {
            key: 'alarmTitle',
            title: '告警标题',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'alarmContent',
            title: '告警内容',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'alarmTypeName',
            title: '告警类型',
            align: 'center',
            minWidth: 10,
            tooltip: true
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
            key: 'alarmDate',
            title: '告警时间',
            align: 'center',
            width: 190
          }
        ]
        this.renderTable1()
      }
    },
    renderTable1() {
      ecologicalEnvironmentPage({
        ...this.popoutTableForm,
        page: this.popoutTablePage,
        size: 10
      }).then((res) => {
        this.popoutTableData = []
        if (res.data.code === 0) {
          let data = res.data
          let list = data.datas
          list.forEach(item => {
            item.alarmTitle = item.alarmTitle || '--'
            item.alarmContent = item.alarmContent || '--'
          })
          this.popoutTableData = list

          this.popoutTableTotal = data.totalCount
        }
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
      }
    }
  },
  computed: {
    chartOption1() {
      return {
        tooltip: {
          // position: 'top'
        },
        visualMap: [
          {
            min: 0,
            max: 300,
            type: 'piecewise',
            calculable: true,
            orient: 'horizontal',
            left: '0',
            textStyle: {
              // 设置标签颜色
              color: '#fff'
            },
            show: false,
            bottom: 20,
            pieces: [
              // 自定义每一段的范围，以及每一段的文字
              { gt: 300, color: 'rgb(126,0,35)' }, // 不指定 max，表示 max 为无限大（Infinity）。
              { gt: 200, lt: 300, color: 'rgb(153,0,76)' },
              { gt: 150, lt: 200, color: 'rgb(255,0,0)' },
              { gt: 100, lt: 150, color: 'rgb(255,126,0)' },
              { gt: 50, lt: 100, color: 'rgb(255,255,0)' },
              { gt: 0, lt: 50, color: 'rgb(0,228,0)' }
              // { lt: 0, color: '#3DB676' }
            ]
            // inRange: {
            //   color: [
            //     'rgb(0,228,0)',
            //     'rgb(255,255,0)',
            //     'rgb(255,126,0)',
            //     'rgb(255,0,0)',
            //     'rgb(153,0,76)',
            //     'rgb(153,0,76)',
            //     'rgb(126,0,35)'
            //   ]
            // }
          }
        ],
        calendar: [
          {
            orient: 'vertical',
            left: 0,
            top: 40,
            yearLabel: {
              show: false
            },
            dayLabel: {
              // firstDay: 1,
              color: '#fff',
              nameMap: ['日', '一', '二', '三', '四', '五', '六']
            },
            monthLabel: {
              show: false
            },
            cellSize: 'auto',
            range: this.canMonth
          }
        ],
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 0,
            tooltip: {
              show: false
            },
            label: {
              show: true,
              formatter: function (params) {
                let list = params.data[0].split('-')
                let day = list[2]
                if (day[0] === '0') {
                  day = day[1]
                }
                return day
              },
              fontSize: 12
            },
            data: this.environmentQuality.airStaDataList
          },
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            // calendarIndex: 0,
            data: this.environmentQuality.airStaDataList,
            label: {
              show: false
            }
          }
        ]
      }
    },
    chartOption2() {
      // let that = this
      return {
        color: [
          '#14A6EF',
          '#00e400',
          '#ffff00',
          '#ff7e00',
          '#ff0000',
          '#7e0023'
        ],
        tooltip: {},
        legend: {
          // right: '20%',
          bottom: '0',
          icon: 'circle',
          // orient: 'vertical',
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '水质类型',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: '#0b1322',
              borderWidth: 2
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: this.waterChart
          }
        ]
      }
    },
    atmosphereOption() {
      return {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            radius: '60%',
            startAngle: 230,
            endAngle: -50,
            min: 0,
            max: 100,
            splitNumber: 12,
            itemStyle: {
              color: '#00D6F7'
            },
            progress: {
              show: true,
              width: 5
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 5
              }
            },
            axisTick: {
              distance: -15,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: '#00D6F7'
              }
            },
            splitLine: {
              distance: -22,
              length: 14,
              lineStyle: {
                width: 2,
                color: '#00D6F7'
              }
            },
            axisLabel: {
              distance: -10,
              color: '#00D6F7',
              fontSize: 20,
              show: false
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '8%'],
              fontSize: 25,
              fontWeight: 'bolder',
              formatter: '{value}',
              color: '#00D6F7'
            },
            data: [
              {
                value: this.atmosphereData
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            radius: '70%',
            startAngle: 230,
            endAngle: -50,
            min: 0,
            max: 100,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: false,
              width: 2
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
              valueAnimation: true,
              // width: '60%',
              // lineHeight: 40,
              // borderRadius: 8,
              offsetCenter: [0, '78%'],
              fontSize: 15,
              // fontWeight: 'bolder',
              formatter: 'AQI',
              color: '#fff'
            },
            data: [
              {
                value: 20
              }
            ]
          }
        ]
      }
    },
    alertChartOption1() {
      return {
        legend: {
          data: ['二氧化硫', '氮氧化物', '烟尘'],
          textStyle: {
            color: '#fff'
          },
          right: '5%',
          icon: 'roundRect'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.alertChartData1.monthList,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // name: '单位:件',
          nameTextStyle: {
            color: 'white'
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
            name: '二氧化硫',
            data: this.alertChartData1.SO2List,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(253, 192, 0, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(253, 192, 0, 1)'
                }
              }
            }
          },
          {
            name: '氮氧化物',
            data: this.alertChartData1.NOXList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(254, 106, 0, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(254, 106, 0, 1)'
                }
              }
            }
          },
          {
            name: '烟尘',
            data: this.alertChartData1.sootList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(30, 191, 245, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(30, 191, 245, 1)'
                }
              }
            }
          }
        ]
      }
    },
    alertChartOption2() {
      return {
        legend: {
          data: ['COD', '氨氮', 'TP', 'TN'],
          textStyle: {
            color: '#fff'
          },
          right: '5%',
          icon: 'roundRect'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.alertChartData2.monthList,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // name: '单位:件',
          nameTextStyle: {
            color: 'white'
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
            name: 'COD',
            data: this.alertChartData2.CODList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(253, 192, 0, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(253, 192, 0, 1)'
                }
              }
            }
          },
          {
            name: '氨氮',
            data: this.alertChartData2.NH3NList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(254, 106, 0, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(254, 106, 0, 1)'
                }
              }
            }
          },
          {
            name: 'TP',
            data: this.alertChartData2.TPList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(30, 191, 245, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(30, 191, 245, 1)'
                }
              }
            }
          },
          {
            name: 'TN',
            data: this.alertChartData2.TNList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#37ffda',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: '#37ffda'
                }
              }
            }
          }
        ]
      }
    },
    alertChartOption3() {
      return {
        legend: {
          data: ['COD', 'SS'],
          textStyle: {
            color: '#fff'
          },
          right: '5%',
          icon: 'roundRect'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.alertChartData3.monthList,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // name: '单位:件',
          nameTextStyle: {
            color: 'white'
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
            name: 'COD',
            data: this.alertChartData3.CODList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(253, 192, 0, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(253, 192, 0, 1)'
                }
              }
            }
          },
          {
            name: 'SS',
            data: this.alertChartData3.SSList,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgba(254, 106, 0, 1)',
                // 线条的样式
                lineStyle: {
                  // 系列级个性化折线样式
                  type: 'solid',
                  color: 'rgba(254, 106, 0, 1)'
                }
              }
            }
          }
        ]
      }
    },
    chartOption1_1() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData1_1.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '20',
          bottom: '20'
        },
        visualMap: {
          show: false,
          dimension: 1,
          pieces: [
            { gt: 300, color: 'rgb(126,0,35)' }, // 不指定 max，表示 max 为无限大（Infinity）。
            { gt: 200, lt: 300, color: 'rgb(153,0,76)' },
            { gt: 150, lt: 200, color: 'rgb(255,0,0)' },
            { gt: 100, lt: 150, color: 'rgb(255,126,0)' },
            { gt: 50, lt: 100, color: 'rgb(255,255,0)' },
            { gt: 0, lt: 50, color: 'rgb(0,228,0)' }
          ]
        },
        series: [
          {
            name: '监测值',
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 6
            },
            symbolSize: 10,
            data: this.chartData1_1.data,
            markArea: {
              data: this.chartData1_1.markArea
            }
          }
        ]
      }
    },
    chartOption1_2() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        color: ['red', 'rgba(31, 204, 255, 1)', 'rgba(36, 226, 183, 1)'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData1_2.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '30',
          bottom: '20'
        },
        series: [
          {
            name: '标准值',
            type: 'line',
            symbol: 'none',
            data: this.chartData1_2.data1,
            lineStyle: {
              color: 'red',
              width: 4
            },
            zlevel: 3,
            endLabel: {
              show: true,
              formatter: '{a}',
              offset: [-40, -15],
              color: '#fff',
              fontWeight: 'bold'
            },
            legend: { show: false }
          },
          {
            name: this.chartData1_2.dataName2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData1_2.data2,
            lineStyle: {
              color: 'rgba(31, 204, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(31, 204, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(31, 204, 255, 0.2)'
                }
              ])
            }
          },
          {
            name: this.chartData1_2.dataName3,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData1_2.data3,
            lineStyle: {
              color: 'rgba(36, 226, 183, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(36, 226, 183, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(36, 226, 183, 0.2)'
                }
              ])
            }
          }
        ]
      }
    },
    chartOption1_3() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        color: ['red', 'rgba(31, 204, 255, 1)', 'rgba(36, 226, 183, 1)'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData1_3.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '30',
          bottom: '20'
        },
        series: [
          {
            name: '标准值',
            type: 'line',
            symbol: 'none',
            data: this.chartData1_3.data1,
            lineStyle: {
              color: 'red',
              width: 4
            },
            zlevel: 3,
            endLabel: {
              show: true,
              formatter: '{a}',
              offset: [-40, -15],
              color: '#fff',
              fontWeight: 'bold'
            },
            legend: { show: false }
          },
          {
            name: this.chartData1_3.dataName2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData1_3.data2,
            lineStyle: {
              color: 'rgba(31, 204, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(31, 204, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(31, 204, 255, 0.2)'
                }
              ])
            }
          },
          {
            name: this.chartData1_3.dataName3,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData1_3.data3,
            lineStyle: {
              color: 'rgba(36, 226, 183, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(36, 226, 183, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(36, 226, 183, 0.2)'
                }
              ])
            }
          }
        ]
      }
    },
    chartOption1_4() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        color: ['rgba(31, 204, 255, 1)', 'rgba(36, 226, 183, 1)'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData1_4.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '30',
          bottom: '20'
        },
        series: [
          {
            name: this.chartData1_4.dataName1,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData1_4.data1,
            lineStyle: {
              color: 'rgba(31, 204, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(31, 204, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(31, 204, 255, 0.2)'
                }
              ])
            }
          },
          {
            name: this.chartData1_4.dataName2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData1_4.data2,
            lineStyle: {
              color: 'rgba(36, 226, 183, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(36, 226, 183, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(36, 226, 183, 0.2)'
                }
              ])
            }
          }
        ]
      }
    },
    chartOption2_1() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData2_1.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '20',
          bottom: '20'
        },
        visualMap: {
          show: false,
          dimension: 1,
          pieces: [
            { gt: 300, color: 'rgb(126,0,35)' }, // 不指定 max，表示 max 为无限大（Infinity）。
            { gt: 200, lt: 300, color: 'rgb(153,0,76)' },
            { gt: 150, lt: 200, color: 'rgb(255,0,0)' },
            { gt: 100, lt: 150, color: 'rgb(255,126,0)' },
            { gt: 50, lt: 100, color: 'rgb(255,255,0)' },
            { gt: 0, lt: 50, color: 'rgb(0,228,0)' }
          ]
        },
        series: [
          {
            name: '监测值',
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              width: 6
            },
            symbolSize: 10,
            data: this.chartData2_1.data,
            markArea: {
              data: this.chartData2_1.markArea
            }
          }
        ]
      }
    },
    chartOption2_2() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        color: ['red', 'rgba(31, 204, 255, 1)', 'rgba(36, 226, 183, 1)'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData2_2.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '30',
          bottom: '20'
        },
        series: [
          {
            name: '标准值',
            type: 'line',
            symbol: 'none',
            data: this.chartData2_2.data1,
            lineStyle: {
              color: 'red',
              width: 4
            },
            zlevel: 3,
            endLabel: {
              show: true,
              formatter: '{a}',
              offset: [-40, -15],
              color: '#fff',
              fontWeight: 'bold'
            },
            legend: { show: false }
          },
          {
            name: this.chartData2_2.dataName2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData2_2.data2,
            lineStyle: {
              color: 'rgba(31, 204, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(31, 204, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(31, 204, 255, 0.2)'
                }
              ])
            }
          },
          {
            name: this.chartData2_2.dataName3,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData2_2.data3,
            lineStyle: {
              color: 'rgba(36, 226, 183, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(36, 226, 183, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(36, 226, 183, 0.2)'
                }
              ])
            }
          }
        ]
      }
    },
    chartOption2_3() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        color: ['red', 'rgba(31, 204, 255, 1)', 'rgba(36, 226, 183, 1)'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData2_3.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '30',
          bottom: '20'
        },
        series: [
          {
            name: '标准值',
            type: 'line',
            symbol: 'none',
            data: this.chartData2_3.data1,
            lineStyle: {
              color: 'red',
              width: 4
            },
            zlevel: 3,
            endLabel: {
              show: true,
              formatter: '{a}',
              offset: [-40, -15],
              color: '#fff',
              fontWeight: 'bold'
            },
            legend: { show: false }
          },
          {
            name: this.chartData2_3.dataName2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData2_3.data2,
            lineStyle: {
              color: 'rgba(31, 204, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(31, 204, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(31, 204, 255, 0.2)'
                }
              ])
            }
          },
          {
            name: this.chartData2_3.dataName3,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData2_3.data3,
            lineStyle: {
              color: 'rgba(36, 226, 183, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(36, 226, 183, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(36, 226, 183, 0.2)'
                }
              ])
            }
          }
        ]
      }
    },
    chartOption2_4() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        color: ['rgba(31, 204, 255, 1)', 'rgba(36, 226, 183, 1)'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: this.chartData2_4.category
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '30',
          bottom: '20'
        },
        series: [
          {
            name: this.chartData2_4.dataName1,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData2_4.data1,
            lineStyle: {
              color: 'rgba(31, 204, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(31, 204, 255, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(31, 204, 255, 0.2)'
                }
              ])
            }
          },
          {
            name: this.chartData2_4.dataName2,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.chartData2_4.data2,
            lineStyle: {
              color: 'rgba(36, 226, 183, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(36, 226, 183, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(36, 226, 183, 0.2)'
                }
              ])
            }
          }
        ]
      }
    },
    chartOption3() {
      return {
        tooltip: {
          trigger: 'axis'
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
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        xAxis: {
          type: 'category',
          data: this.chartData3.category,
          axisLabel: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '排放',
            type: 'line',
            smooth: true,
            data: this.chartData3.data
          }
        ]
      }
    },
    chartOption3_1() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData3_1.category,
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
            name: this.chartData3_1.name,
            data: this.chartData3_1.data,
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
    chartOption3_2() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData3_2.category,
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
            name: this.chartData3_2.name,
            data: this.chartData3_2.data,
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
    chartOption3_3() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData3_3.category,
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
            name: this.chartData3_3.name,
            data: this.chartData3_3.data,
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
    chartOption3_4() {
      return {
        tooltip: {
          trigger: 'axis'
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
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        xAxis: {
          type: 'category',
          data: this.chartData3_4.category,
          axisLabel: {
            color: '#fff'
          },
          boundaryGap: false
        },
        series: [
          {
            name: '排放',
            type: 'line',
            smooth: true,
            symbol: 'none',
            animationDuration: 10000,
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
            data: this.chartData3_4.data
          }
        ]
      }
    },
    chartOption4() {
      return {
        tooltip: {
          trigger: 'axis'
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
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        xAxis: {
          type: 'category',
          data: this.chartData4.category,
          axisLabel: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '排放',
            type: 'line',
            smooth: true,
            data: this.chartData4.data
          }
        ]
      }
    },
    chartOption4_1() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData4_1.category,
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
            name: this.chartData4_1.name,
            data: this.chartData4_1.data,
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
    chartOption4_2() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData4_2.category,
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
            name: this.chartData4_2.name,
            data: this.chartData4_2.data,
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
    chartOption4_3() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData4_3.category,
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
            name: this.chartData4_3.name,
            data: this.chartData4_3.data,
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
    chartOption4_4() {
      return {
        tooltip: {
          trigger: 'axis'
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
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        xAxis: {
          type: 'category',
          data: this.chartData4_4.category,
          axisLabel: {
            color: '#fff'
          },
          boundaryGap: false
        },
        series: [
          {
            name: '排放',
            type: 'line',
            smooth: true,
            symbol: 'none',
            animationDuration: 10000,
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
            data: this.chartData4_4.data
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
          }
        },
        yAxis: {
          type: 'category',
          data: ['废硫酸', '浮油', '废碱液', '反应残余物', '蒸馏残渣'],
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
            data: [5, 6, 7, 8, 9],
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
    chartOption5_1() {
      return {
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          right: '5%',
          icon: 'roundRect'
        },
        color: ['rgba(31, 204, 255, 1)', 'rgba(36, 226, 183, 1)'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
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
        grid: {
          top: '30',
          bottom: '20'
        },
        series: [
          {
            name: '2021',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [30, 40, 51, 60, 101, 99, 49],
            lineStyle: {
              color: 'rgba(31, 204, 255, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(31, 204, 255, 0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(31, 204, 255, 0.5)'
                }
              ])
            }
          },
          {
            name: '2022',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: [60, 50, 71, 67, 107, 99, 49],
            lineStyle: {
              color: 'rgba(36, 226, 183, 1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(36, 226, 183, 0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(36, 226, 183, 0.5)'
                }
              ])
            }
          }
        ]
      }
    }
  },
  watch: {
    // 环境空气质量-质量分析
    // 站点
    select1(val) {
      if (val) {
        this.initEnvironmentQuality(val)
      }
    },
    // 环境空气质量-动态分析
    // 站点1
    select1_1(val) {
      this.select1_2 = null
      if (this.tabIndex1_1 === 4) {
        if (val) {
          if (this.select1_3) {
            this.getFactorTypeList2('airSta', val, this.select1_3).then(
              (res) => {
                let result = res.data.datas[0]
                this.factorList1_2 = result
              }
            )
          }
        } else {
          this.factorList1_2 = []
        }
      } else {
        if (val) {
          this.getFactorTypeList('airSta', val).then((res) => {
            let result = res.data.datas[0]
            this.factorList1_2 = result
          })
        } else {
          this.factorList1_2 = []
        }
      }
    },
    // 因子
    select1_2(val) {
      if (val) {
        this.renderChart1()
      }
    },
    // 站点2
    select1_3(val) {
      this.select1_2 = null
      if (val) {
        if (this.select1_1) {
          this.getFactorTypeList2('airSta', val, this.select1_1).then((res) => {
            let result = res.data.datas[0]
            this.factorList1_2 = result
          })
        }
      } else {
        this.factorList1_2 = []
        this.select1_2 = null
      }
    },
    // 开始结束日期
    date1(val) {
      if (val[0] && val[1]) {
        this.renderChart1()
      }
    },
    // 水环境质量-质量分析
    select2(val) {
      if (val) {
        this.initWaterQuality(val)
      }
    },
    // 水环境质量-动态分析
    // 站点1
    select2_1(val) {
      this.select2_2 = null
      if (this.tabIndex2_1 === 4) {
        if (val) {
          if (this.select2_3) {
            this.getFactorTypeList2('waterSta', val, this.select2_3).then(
              (res) => {
                let result = res.data.datas[0]
                this.factorList2_2 = result
              }
            )
          }
        } else {
          this.factorList2_2 = []
        }
      } else {
        if (val) {
          this.getFactorTypeList('waterSta', val).then((res) => {
            let result = res.data.datas[0]
            this.factorList2_2 = result
          })
        } else {
          this.factorList2_2 = []
        }
      }
    },
    // 因子
    select2_2(val) {
      if (val) {
        this.renderChart2()
      }
    },
    // 站点2
    select2_3(val) {
      this.select2_2 = null
      if (val) {
        if (this.select2_1) {
          this.getFactorTypeList2('waterSta', val, this.select2_1).then(
            (res) => {
              let result = res.data.datas[0]
              this.factorList2_2 = result
            }
          )
        }
      } else {
        this.factorList2_2 = []
        this.select2_2 = null
      }
    },
    // 开始结束日期
    date2(val) {
      if (val[0] && val[1]) {
        this.renderChart2()
      }
    },
    // 废气监测站
    select3_1(val) {
      this.select3_2 = null
      if (val) {
        this.getFactorTypeList('wastegas', val).then((res) => {
          let result = res.data.datas[0]
          this.factorList3_2 = result
          this.select3_2 = result[0].factorTypes
        })
      } else {
        this.factorList3_2 = []
      }
    },
    // 废气监测因子
    select3_2(val) {
      if (val) {
        this.renderChart3()
      }
    },
    tabIndex3_1() {
      this.renderChart3()
    },
    // 开始结束日期
    date3(val) {
      if (val[0] && val[1]) {
        this.renderChart3()
      }
    },
    tabIndex3_2() {
      this.renderChart3_1to3_3()
    },
    // 废水监测站
    select4_1(val) {
      this.select4_2 = null
      if (val) {
        this.getFactorTypeList('wastewater', val).then((res) => {
          let result = res.data.datas[0]
          this.factorList4_2 = result
          this.select4_2 = result[0].factorTypes
        })
      } else {
        this.factorList4_2 = []
      }
    },
    // 废水监测因子
    select4_2(val) {
      if (val) {
        this.renderChart4()
      }
    },
    tabIndex4_1() {
      this.renderChart4()
    },
    // 开始结束日期
    date4(val) {
      if (val[0] && val[1]) {
        this.renderChart4()
      }
    },
    tabIndex4_2() {
      this.renderChart4_1to4_3()
    }
  }
}
</script>

<style>
</style>
