<style lang="less" scoped>
@import "./PopoutTech.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div
      class="popout-container"
      v-if="popoutTechShow"
    >
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div
          class="title"
          @click="show=!show"
        >数据监测</div>
      </div>
      <div class="body-container">
        <div class="contentleft">
          <!-- <%--左测标题--%> -->
          <div class="listtitle">
            <div class="titleicon"></div><span>构成列表（{{list.length}}）</span>
          </div>
          <!-- <%--左侧列表--%> -->
          <div class="contentlist">
            <div
              class="listitem"
              :class="{'select':selected==index}"
              v-for="(item,index) in list"
              :key="index"
              @click="selectvedio(item,index)"
            >
              <!-- <%--列表图片--%> -->
              <div class="itemleft">
                <div :class="icon(item.deviceType)"></div>
              </div>
              <!-- <%--列表内容--%> -->
              <div class="itemcenter">
                <div class="itemcentertitle">
                  {{item.majorHazardForm}}
                </div>
                <div class="itemcenterinfo">
                  <span class="itemslabel">类型：</span><span class="itemsvalue">{{item.deviceType.split('|')[3]}}</span>
                </div>
                <div class="itemcenterinfo">
                  <span class="itemslabel">编号：</span><span class="itemsvalue">{{item.deviceSerialNumber}}</span>
                </div>
              </div>
              <div class="itemright">
                <div class="itemarrow"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- <%--右侧内容--%> -->
        <div class="contentright">
          <!-- <%--温度、压力、液位切换--%> -->
          <div class="rightbuttonbox">
            <div class="buttondiv">
              <div
                class="itembutton"
                :class="{'buttonchecked':rightcontenname==item.id}"
                v-for="(item,index) in majorhazardSensorinfoList"
                :key="index"
                @click="rightcontenname=item.id;getchartdata()"
              >
                <span>{{item.unitType.split('|')[3]}}</span>
              </div>
            </div>
          </div>
          <!-- <%--文字信息内容--%> -->
          <div class="rightconten">
            <div class="itemleftcontent">
              <div class="iteminfo"><span class="infolabel">所属重大危险源：</span><span class="infovalue">{{infolist.majorhazardName}}</span></div>
              <div class="iteminfo"><span class="infolabel">监测介质：</span><span class="infovalue">{{infolist.monitoringMedium}}</span></div>
              <div class="iteminfo"><span class="infolabel">监测日期：</span><span class="infovalue">{{infolist.realtimeAlarmTime}}</span></div>
              <div class="iteminfo"><span class="infolabel">传感器状态：</span><span class="infovalue">{{infolist.status==='00'?'正常':'告警'}}</span></div>
            </div>
            <div class="itemrightcontent">
              <div class="iteminfo"><span class="infolabel">指标位号：</span><span class="infovalue">{{infolist.sensorNumber}}</span></div>
              <div class="iteminfo"><span class="infolabel">是否属于可燃有毒气体：</span><span class="infovalue">{{infolist.whetherToxicGas}}</span></div>
              <div class="iteminfo"><span class="infolabel">实时监测值：</span><span class="infovalue">{{infolist.realtimeValue}}</span></div>
            </div>

          </div>
          <!-- <%--图表类型--%> -->
          <div class="chartbutton">
            <div class="buttondiv">
              <div
                class="itembutton leftradius"
                :class="{'buttonchecked':datatype=='actual'}"
                @click="datatype='actual'"
              >
                <span>实时数据</span>
              </div>
              <div
                class="itembutton rightradius"
                :class="{'buttonchecked':datatype=='history'}"
                @click="datatype='history'"
              >
                <span>历史数据</span>
              </div>
            </div>
          </div>
          <!-- <%--历史选择框--%> -->
          <div
            class="historybox"
            v-show="datatype=='history'"
          >
            <div><span style="color: #fff;">选择日期:</span></div>
            <date-picker
              type="date"
              placeholder="请选择日期"
              style="width: 20vw"
              v-model="hisDate"
            ></date-picker>
            <i-button @click="getchartdata()">确定</i-button>
          </div>
          <!-- <%--图表内容--%> -->
          <div class="chartbox">
            <charts
              class="chart"
              :options="chartOption"
              :id="'popoutChart'"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import charts from '@/views/components/charts.vue'
import moment from 'moment'
export default {
  name: 'PopoutTech',
  components: {
    charts
  },
  props: {
    popoutTechShow: {
      default: false,
      type: Boolean
    },
    list: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      // 图层选择
      vediolist: [],
      majorHazardDeviceId: '',
      rem: 0,
      selected: 0,
      rightcontenname: '', //  temperature  pressure liquidlevel
      datatype: 'actual', // actual  , history
      infolist: {},
      majorhazardSensorinfoList: [],
      chartData: {
        xData: [],
        yData: []
      },
      hisDate: ''
    }
  },
  watch: {
    // 最上面button切换
    rightcontenname() {
      this.datatype = 'actual'
      // this.getchartdata()
    },
    // 实时数据和历史数据切换
    datatype() {
      this.hisDate = ''
      this.getchartdata()
    },
    list() {
      this.majorhazardSensorinfoList = this.list[0].majorhazardSensorinfoList
      this.rightcontenname = this.list[0].majorhazardSensorinfoList[0].id
      this.getchartdata()
    }
  },
  created: function () {
    this.initStyle()
  },
  mounted: function () {
    // this.majorhazardSensorinfoList = this.list[0].majorhazardSensorinfoList
    // this.rightcontenname = this.list[0].majorhazardSensorinfoList[0].id
    // this.getchartdata()
  },
  methods: {
    close() {
      // this.majorhazardSensorinfoList = []
      // this.rightcontenname = ''
      this.$emit('close')
    },
    initStyle: function () {
      var rem = document.documentElement.clientWidth / 1920 * 20
      this.rem = rem
    },
    icon(item) {
      let icon = ''
      if (item.indexOf('储罐') !== -1) {
        icon = 'cwon'
      }
      if (item.indexOf('生产') !== -1) {
        icon = 'scon'
      }
      if (item.indexOf('库房') !== -1) {
        icon = 'kfon'
      }
      return icon
    },
    // 获取戳品列表
    getvediolist() {
      // let list = [{
      //   isonline: true, name: '测试A灌'
      // }, {
      //   isonline: false, name: '测试B灌'
      // }, {
      //   isonline: true, name: '测试C灌'
      // }, {
      //   isonline: true, name: '测试D灌'
      // }]
      // this.vediolist = list

      this.$http.get('/bigScreen/getMajorHazardDeviceInfoList/' + this.id).then(res => {
        this.vediolist = res.data.datas[0]
      })
    },
    // 选择需要播放的视频
    selectvedio(item, index) {
      if (this.selected === index) {
        return
      }
      this.majorHazardDeviceId = item.id
      this.selected = index
      this.majorhazardSensorinfoList = item.majorhazardSensorinfoList
      this.rightcontenname = item.majorhazardSensorinfoList[0].id
      this.datatype = 'actual'
      this.getchartdata()
    },
    // 获取图表数据
    getchartdata() {
      let params = `sensorinfoId=${this.rightcontenname}`
      console.log(this.hisDate)
      let date = ''
      if (this.hisDate !== '') {
        date = moment(this.hisDate).format('YYYY-MM-DD')
        params = params + '&startTime=' + date
        params = params + '&endTime=' + date
      }
      this.$http.get('bigScreen/getMajorHazardSensorinfoData?' + params).then(res => {
        this.initechart(res.data.datas[0])
      })
    },
    // initechart
    initechart(data) {
      // var xData = []
      var xData = data.dateList

      var yData = []
      // var yData = data.dataMonitoringList
      data.dataMonitoringList.forEach(item => {
        // xData.push(item.alarmTime)
        yData.push(item.realtimeValue)
      })
      this.chartData = {
        xData: xData,
        yData: yData,
        upLimit: data.majorhazardSensorinfores.upLimit,
        lowerLimit: data.majorhazardSensorinfores.lowerLimit,
        upUpLimit: data.majorhazardSensorinfores.upUpLimit,
        lowerLowerLimit: data.majorhazardSensorinfores.lowerLowerLimit
      }
      this.infolist = data.majorhazardSensorinfores
    }
  },
  computed: {
    chartOption() {
      var that = this
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '10%',
          right: '3%',
          bottom: '2%',
          top: '20%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '时',
            axisLabel: {
              color: '#fff',
              fontSize: 12
              // rotate: 45 //是否旋转
            },
            axisLine: {
              lineStyle: {
                color: '#EBEBEB'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#EBEBEB'
              }
            },
            data: this.chartData.xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '温度：°C',
            max: function (value) {
              if (value.max > Number(that.chartData.upUpLimit)) {
                return value.max
              } else {
                return Number(that.chartData.upUpLimit)
              }
            },
            nameTextStyle: {
              color: '#fff', // 单位样式修改
              fontSize: 12
            },
            axisLabel: { // 左侧样式修改
              color: '#fff',
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: '#EBEBEB'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#EBEBEB'
                // type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            // name: '温度',
            symbol: 'circle',
            symbolSize: 6,
            smooth: true,
            type: 'line',
            stack: '总量',
            itemStyle: {
              color: function(params) {
                if (Number(params.value) < Number(that.chartData.lowerLimit)) {
                  return '#ff0000'
                } else if (Number(params.value) > Number(that.chartData.upLimit)) {
                  return '#ff0000'
                } else {
                  return '#44D7B6'
                }
              }
            },
            lineStyle: {
              color: '#44D7B6'
            },
            data: this.chartData.yData,
            markLine: {
              symbol: 'none',
              data: [
                {
                  silent: false,
                  yAxis: that.chartData.upLimit, // 表现自定义的位置，可赋值
                  label: {
                    position: 'middle', // 表现内容展示的位置
                    formatter: '上限', // 标线展示的内容
                    color: '#d76338' // 展示内容颜色
                  },
                  lineStyle: { type: 'solid', color: '#d76338', width: 1 } // 样式： 线型、颜色、线宽
                },
                {
                  silent: false,
                  yAxis: that.chartData.upUpLimit, // 表现自定义的位置，可赋值
                  label: {
                    position: 'middle', // 表现内容展示的位置
                    formatter: '上上限', // 标线展示的内容
                    color: '#ff0000' // 展示内容颜色
                  },
                  lineStyle: { type: 'solid', color: '#ff0000', width: 1 } // 样式： 线型、颜色、线宽
                },
                {
                  silent: false,
                  yAxis: that.chartData.lowerLimit, // 表现自定义的位置，可赋值
                  label: {
                    position: 'middle', // 表现内容展示的位置
                    formatter: '下限', // 标线展示的内容
                    color: '#d76338' // 展示内容颜色
                  },
                  lineStyle: { type: 'solid', color: '#d76338', width: 1 } // 样式： 线型、颜色、线宽
                },
                {
                  silent: false,
                  yAxis: that.chartData.lowerLowerLimit, // 表现自定义的位置，可赋值
                  label: {
                    position: 'middle', // 表现内容展示的位置
                    formatter: '下下限', // 标线展示的内容
                    color: '#ff0000' // 展示内容颜色
                  },
                  lineStyle: { type: 'solid', color: '#ff0000', width: 1 } // 样式： 线型、颜色、线宽
                }
              ]
            }
          }
        ]
      }
    }
  }
}
</script>
