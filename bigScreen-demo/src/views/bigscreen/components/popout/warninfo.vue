<style lang="less" scoped>
.popout-container {
  height: 73vh;
  width: 50vw;
  background-image: url("../../../../assets/popout-back.png");
  background-size: 100% 100%;
  position: absolute;
  z-index: 3;
  left: 25vw;
  top: 18vh;
  .close-img {
    position: absolute;
    right: 1vw;
    top: 2.5vh;
    cursor: pointer;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
  .title-container {
    background-image: url("../../../../assets/title-container.png");
    background-size: 100% 100%;
    height: 5.2vh;
    width: 15vw;
    margin: auto;
    margin-top: 2.5vh;
    position: relative;

    .title {
      font-size: 0.9vw;
      background: url("../../../../assets/pop-title.png") no-repeat center
        center;
      background-size: contain;
      text-align: center;
      width: 10vw;
      color: rgba(189, 240, 255, 1);
      position: absolute;
      left: 2.5vw;
      top: 1.3vh;
    }
  }
  .body-container {
    margin: 1.8vh auto;
    width: 46vw;
    height: 60vh;
    display: flex;
    align-items: center;
    color: #fff;

    /deep/ .table {
      width: 100%;
      .ivu-table {
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        background-color: rgba(10, 31, 60, 0.7);

        &::before {
          background-color: transparent;
        }

        & th {
          background-color: rgba(18, 91, 155, 1);
          color: rgba(189, 240, 255, 1);
          border: none;
          font-weight: 300;
        }

        .ivu-table td,
        .ivu-table th {
          height: 4.8vh;
        }

        .ivu-table-tbody {
          & > tr {
            color: white;

            & > td {
              background-color: transparent;
              border: none;
            }
          }

          .ivu-table-column-center {
            height: 4.8vh;
          }

          & > tr:nth-of-type(odd) {
            background-color: transparent;
          }

          & > tr:nth-of-type(even) {
            background-color: rgba(69, 126, 207, 0.24);
          }
        }

        .ivu-table-tip {
          td {
            background-color: transparent;
            color: white;
            border: none;
          }
        }
      }
    }

    /deep/ .page {
      position: absolute;
      bottom: 4vh;
      right: 3vw;

      .ivu-page-total {
        color: rgba(255, 255, 255, 0.9);
      }

      & > li {
        background-color: rgba(60, 124, 224, 0.3);
        border: 1px solid rgba(217, 217, 217, 0.3);
      }

      & > .ivu-page-item-active {
        background-color: rgba(24, 144, 255, 1);
      }

      & > li > a {
        color: rgba(255, 255, 255, 0.65);
      }

      & > .ivu-page-item-active > a {
        color: white;
      }
    }
  }
  .value {
    color: rgba(34, 217, 254, 1);
  }
  .flex-direction-column {
    flex-direction: column;
  }
  .bodyItem {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .justContent-between {
    justify-content: space-between;
  }
  .justContent-center {
    justify-content: space-around;
  }
  .itemBtn {
    width: 6vw;
    color: #fff;
    background: rgba(5, 29, 50, 0.9);
    border: 1px solid rgba(31, 171, 222, 1);
    padding-top: 0.5vh;
    padding-bottom: 0.5vh;
    cursor: pointer;
    text-align: center;
  }
  .itemBtnClick {
    background: rgba(31, 171, 222, 1);
    border: 1px solid rgba(5, 29, 50, 0.9);
  }
  .titleicon {
    width: 10px;
    height: 10px;
    background: rgba(31, 171, 222, 1);
    border-radius: 10px;
    margin-right: 5px;
  }

  .type-container {
    margin-top: 3.5vh;
    color: rgba(255, 255, 255, 1);
    font-size: 0.8vw;
    display: flex;
    justify-content: center;
    margin-bottom: 1vh;
    .type {
      padding: 0.5vh 1vw;
      border: 1px solid rgba(23, 210, 230, 0.4);
      border-radius: 6px;
      margin: 0 0.2vw;
      cursor: pointer;

      &.active {
        color: rgba(34, 217, 254, 1);
        background: url("../../../../assets/popout/tab-back.png");
        background-size: 100% 100%;
        border: none;
      }

      &:hover {
        color: rgba(34, 217, 254, 1);
      }
    }
  }
}
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div class="popout-container" v-if="warninfoshow">
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div class="title">告警详情</div>
      </div>
      <div class="body-container flex-direction-column">
        <!-- 基本信息 -->
        <div class="bodyItem justContent-between" style="height: 20vh">
          <!-- 园区图片 -->
          <!-- <div style="width: 30%; height: 100%; padding: 10px">
            <img src="@/assets/111.png" style="width: 100%; height: 100%" />
          </div> -->
          <div

            style="width: 100%; height: 100%; padding: 10px"
          >
            <Row style="width: 100%; height: 100%; align-items: center" v-if='alarmType=="01"'>
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警目标" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.sentrymanageName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警内容" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.alarmName}}</span>
                </div></Col
              ><Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.alarmDate}}</span>
                </div></Col
              >
            </Row>
            <Row style="width: 100%; height: 100%; align-items: center" v-if='alarmType=="02"'>
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "企业名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.enterpriseName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警对象" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.majorhazardName}}</span>
                </div></Col
              >

              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "设备类型" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.unitType.split('|')[3]}}</span>
                </div></Col
              ><Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.alarmTime}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警级别" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.alarmGrade.split('|')[3]}}</span>
                </div></Col
              >
            </Row>

                  <Row style="width: 100%; height: 100%; align-items: center" v-if='alarmType=="03"'>
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "企业名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.enterpriseName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测设备名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.mondeviceName}}</span>
                </div></Col
              >

              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测设备编号" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.mondeviceCode}}</span>
                </div></Col
              ><Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "对应排口名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.ouletName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测因子" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.factorNames}}</span>
                </div></Col
              >
               <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "预警阈值设定" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.threshold}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "投入使用时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.useDate}}</span>
                </div></Col
              >
            </Row>

               <Row style="width: 100%; height: 100%; align-items: center" v-if='alarmType=="04"'>
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测站点名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.stationName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测站点编号" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.stationCode}}</span>
                </div></Col
              >

              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "功能区等级" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.ribbonLevel.split('|')[3]}}</span>
                </div></Col
              ><Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "管控级别" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.controlLevel.split('|')[3]}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测站类型" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.stationType.split('|')[3]}}</span>
                </div></Col
              >
               <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "使用时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.useDate}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "所在河流湖泊" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.onRiver}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "经纬度" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.longitude}}- {{data.latitude}}</span>
                </div></Col
              >
            </Row>
             <Row style="width: 100%; height: 100%; align-items: center" v-if='alarmType=="05"'>
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测站点名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.stationName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测站点编号" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.stationCode}}</span>
                </div></Col
              >

              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "功能区等级" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.ribbonLevel.split('|')[3]}}</span>
                </div></Col
              ><Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "管控级别" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.controlLevel.split('|')[3]}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测站类型" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.stationType.split('|')[3]}}</span>
                </div></Col
              >
               <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "使用时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.useDate}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "所在位置" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.location}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "经纬度" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.longitude}}- {{data.latitude}}</span>
                </div></Col
              >
            </Row>
            <Row style="width: 100%; height: 100%; align-items: center" v-if='alarmType=="06"'>
               <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "企业名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.enterpriseName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测设备名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.mondeviceName}}</span>
                </div></Col
              >

              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测设备编号" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.mondeviceCode}}</span>
                </div></Col
              ><Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "对应排口名称" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.ouletName}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "监测因子" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.factorNames}}</span>
                </div></Col
              >
               <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "预警阈值设定" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.threshold}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "更新时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.updatedDate}}</span>
                </div></Col
              >
            </Row>
               <Row style="width: 100%; height: 100%; align-items: center" v-if='alarmType=="07"'>
               <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "信息标题" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.warningTitle}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警对象" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.issuedBy}}</span>
                </div></Col
              >

              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警类型" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{"气象告警"}}</span>
                </div></Col
              ><Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "事件类型" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.eventTypeC}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "预警级别" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.warningLevel}}</span>
                </div></Col
              >
               <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "告警时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.taskEffectTime}}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "解除时间" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                  ><span class="value">{{ data.releaseTime}}</span>
                </div></Col
              >
               <Col span="24"
                ><div class="bodyItem" style="margin:10px 0">
                  <div class="titleicon"></div>
                  <span>{{ "信息正文" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="value">{{ data.warningContent}}</span></span
                  >
                </div></Col
              >
              <Col span="24"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "应对措施" }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="value">{{ data.countermeasures}}</span></span
                  >
                </div></Col
              >
            </Row>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>

export default {

  components: {},
  props: {
    warninfoshow: {
      default: false,
      type: Boolean
    },
    id: {
      type: String
    },
    alarmType: {
      type: String
    }
  },
  data() {
    return {
      data: {}
    }
  },
  watch: {
    id () {
      console.log(this.id)
      console.log(this.alarmType)
      this.getdata()
    },
    alarmType () {
      console.log(this.id)
      console.log(this.alarmType)
      this.getdata()
    }
  },
  // mounted() {
  //   console.log(this.id)
  //   console.log(this.alarmType)
  //   this.getdata()
  // },
  methods: {
    close() {
      this.$emit('close')
    },
    // 初始化
    init() {
      this.getListData()
    },
    // 获取园区基本信息
    getAreaInfo() {},

    // 切换type

    // 获取表格数据
    getdata() {
      let a = {}
      a.alarmType = this.alarmType
      a.id = this.id
      this.$http.post('/alarmcenter/allAlarmDetail',
        a
      ).then((res) => {
        if (
          res.data.code === 0
        ) {
          this.data = res.data.datas[0]
        } else {
          this.$Message.info('获取数据失败')
        }
      })
    }

  }
}
</script>
