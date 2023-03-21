
<style lang="less" scoped>
@import "./Bigscreen8.less";
@import "./commonless.less";
</style>
<template>
  <div>
    <Menu :index="8"></Menu>
    <!-- 左上角菜单结束 -->

    <div class="main-container">
      <!-- 顶部开始 -->
      <Header></Header>
      <!-- 左侧开始 -->
      <div class="col2">

      </div>
      <!-- 左侧结束 -->
      <!-- 中间开始 -->
      <div class="col3">

      </div>

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

      </div>
      <!-- 右侧结束 -->
    </div>
     <!-- <InfoWindow ref="infoWindow" :markerData="markerData" @openTable="openTable" @close="closeInfoWindow" v-show="infowindowShow"></InfoWindow> -->
    <div class="body-container">
    <Row style="margin:10px 0">
    <Col span=3 offset="12">
    <Select  style="width:220px" clearable v-model="alarmtype"  class="select">

      <Option
       v-for="item in alarmTypedata"
       :value="item.val"
       :key="item.id"

            :label="item.lab"

        >
        </Option>
    </Select>
    </Col>
    <Col span=5 >
      <DatePicker
        v-model="daterange"
        type="datetimerange"

                  :options="dateOptions"
           placement="bottom-end"
            placeholder="请选择时间"
            style="width: 320px"
             class="date-select"

                  transfer/>
    </Col>
<Col span=2 >  <Button class="button" type="primary" @click="search" style="margin-right:10px">查询</Button> <Button class="button" type="primary" @click="reset">重置</Button></Col>

      </Row>

    </Row>

<!-- <Button type="primary" @click="search" z-index:33>查询</Button> -->
        <Table
          :columns="columns"
          :data="tableData"
          class="table"
        ></Table>
        <Page
          :total="total"
          :page-size="10"
  @on-change="handlePageChange"

        :current="currentPageIndex"

          show-total
          class="page"
        />
      </div>
    <warninfo
    :id="id"
    :alarmType="alarmType"
    :warninfoshow="warninfoshow"
     @close="warninfoshow = false" />

  </div>
</template>

<script>
import moment from 'moment'
import Menu from './components/menu/Menu.vue'
import Header from './components/header/Header.vue'
import warninfo from './components/popout/warninfo.vue'
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
    Menu,
    Header,
    warninfo
  },
  data() {
    return {
      alarmStartTime: null,
      alarmEndTime: null,
      alarmtype: null,
      daterange: [],
      dateOptions: {
        disabledDate(date) {
          return date.valueOf() > Date.now()
        }
      },
      id: null,
      alarmType: null,
      searchParams: {},
      currentPageIndex: 1,
      date: null,
      weekday: null,
      time: null,
      alarmTypedata: [
        { val: '01', lab: '封闭园区告警数据' },
        { val: '02', lab: '重大危险源告警数据' },
        { val: '03', lab: '废气' },
        { val: '04', lab: '地表水' },
        { val: '05', lab: '大气环境' },
        { val: '06', lab: '废水' },
        { val: '07', lab: '气象告警' }
      ],
      warninfoshow: false,
      tableData: [

      ],
      total: null,
      columns: [
        {
          key: 'name',
          title: '企业名称/园区',
          align: 'center',
          width: 190,
          tooltip: true
        },
        {
          key: 'object',
          title: '告警对象',
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
        {
          key: 'alarmDate',
          title: '告警时间',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },

        {
          key: 'route',
          title: '操作',
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
                    this.open(params.row)
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
    }
  },
  mounted() {
    this.getdata()
    this.date = moment(new Date()).format('YYYY年MM月DD日')
    this.weekday = weekdayList[moment().weekday() - 1]
    this.time = moment(new Date()).format('HH:mm')
    setInterval(() => {
      this.time = moment(new Date()).format('HH:mm')
    }, 60000)
  },
  methods: {
    reset() {
      this.daterange = []
      this.alarmtype = null
      this.search()
    },
    search() {
      console.log(this.daterange)
      if (this.daterange && this.daterange[0]) {
        this.alarmStartTime = moment(new Date(this.daterange[0])).format('YYYY-MM-DD HH:mm:ss')
        this.alarmEndTime = moment(new Date(this.daterange[1])).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.daterange = []
        this.alarmStartTime = null
        this.alarmEndTime = null
      }

      this.currentPageIndex = 1
      this.getdata()
    },
    handlePageChange(current) {
      this.currentPageIndex = current
      this.getdata()
    },
    getdata() {
      this.searchParams.page = this.currentPageIndex
      this.searchParams.size = 10
      this.searchParams.alarmType = this.alarmtype

      this.searchParams.alarmStartTime = this.alarmStartTime
      this.searchParams.alarmEndTime = this.alarmEndTime

      this.$http.post('/alarmcenter/allAlarmPage',
        this.searchParams
      ).then((res) => {
        this.tableData = res.data.datas
        this.total = res.data.totalCount

        this.$Message.info(res.data.message)
      })
    },
    open(row) {
      // console.log(row)
      this.id = row.id
      this.alarmType = row.alarmType
      // console.log(this.id)
      this.warninfoshow = true
    }
  }
}
</script>

<style>
</style>
