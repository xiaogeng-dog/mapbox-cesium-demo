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
    <div class="popout-container" v-if="areaInfoshow">
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div class="title">园区信息</div>
      </div>
      <div class="body-container flex-direction-column">
        <!-- 基本信息 -->
        <div class="bodyItem justContent-between" style="height: 20vh">
          <!-- 园区图片 -->
          <div style="width: 30%; height: 100%; padding: 10px">
            <img src="@/assets/111.png" style="width: 100%; height: 100%" />
          </div>
          <div
            class="flex-direction-column"
            style="width: 70%; height: 100%; padding: 10px"
          >
            <Row style="width: 100%; height: 100%; align-items: center">
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "园区名称：" }}</span
                  ><span class="value">{{ areaData.parkName }}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "成立日期：" }}</span
                  ><span class="value">{{ areaData.buildTime }}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "规划面积：" }}</span
                  ><span class="value">{{ areaData.planArea + "公顷" }}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "园区内注册企业：" }}</span
                  ><span class="value">{{ areaData.parkRegistenter }}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "产业定位：" }}</span
                  ><span class="value">{{
                    areaData.industryDrientation
                      ? areaData.industryDrientation
                      : "--"
                  }}</span>
                </div></Col
              >
              <Col span="12"
                ><div class="bodyItem">
                  <div class="titleicon"></div>
                  <span>{{ "注册资金：" }}</span
                  ><span class="value">{{
                    areaData.registeredCapital + "万元"
                  }}</span>
                </div></Col
              >
              <Col span="24"
                ><div class="bodyItem">
                  <span>{{
                    "太阳山开发区位于宁夏版图的几何中心，地处盐池、同心、红寺堡、利通区、灵武市五县（市、区）交界地带，是宁东能源化工基地的重要组成部分。在多年的开发建设中，始终秉承“绿色、质量、效益”并重，坚持产业集聚发展，工业经济成为吴忠市发展的重要支撑。"
                  }}</span>
                </div></Col
              >
            </Row>
          </div>
        </div>
        <!-- 表单信息 -->
        <div class="type-container">
          <div
            class="type"
            :class="{ active: type === 'setupinfo' }"
            @click="typeChange('setupinfo')"
          >
            设立信息
          </div>
          <div
            class="type"
            :class="{ active: type === 'industrialpositioning' }"
            @click="typeChange('industrialpositioning')"
          >
            产业定位
          </div>
        </div>
        <!-- 其他表单信息 -->
        <div class="bodyItem">
          <Table :columns="columns" :data="list" class="table"></Table>
          <!-- <Page
            :total="total"
            :page-size="10"
            @on-change="handlePageChange"
            show-total
            class="page"
          /> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { parkBaseinfo } from '../../api/index'

export default {
  name: 'PopoutVideo',
  components: {},
  props: {
    areaInfoshow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      areaData: {
        parkName: '',
        buildTime: '',
        planArea: '',
        parkRegistenter: '',
        industryDrientation: '',
        registeredCapital: ''
        // parkName: ''
      },
      type: 'setupinfo', // industrialpositioning,envrecordplanapproval
      list: [],
      columns: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    // 初始化
    init() {
      this.initColums()
      this.getListData()
    },
    // 获取园区基本信息
    getAreaInfo() {},

    // 切换type
    typeChange(type) {
      if (type !== this.type) {
        this.type = type
        this.initColums()
        this.getListData()
      }
    },
    // 初始化Colums
    initColums() {
      if (this.type === 'setupinfo') {
        this.columns = [
          {
            key: 'planName',
            title: '规划名称',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'parkAttr',
            title: '园区性质',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'planDate',
            title: '规划时间',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'parkArea',
            title: '规划面积(k㎡)',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'subdivisionName',
            title: '文号',
            align: 'center',
            minWidth: 10,
            tooltip: true
          }
        ]
      } else if (this.type === 'industrialpositioning') {
        this.columns = [
          {
            key: 'industrialStructType',
            title: '产业结构调整导向目录类别',
            align: 'center',
            minWidth: 150,
            tooltip: true
          },
          {
            key: 'industrialType',
            title: ' 产业类别',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'industrialName',
            title: '重点产业名称',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'subdivisionName',
            title: '细分领域名称',
            align: 'center',
            minWidth: 10,
            tooltip: true
          }
        ]
      } else if (this.type === 'envrecordplanapproval') {
        this.columns = [
          {
            key: 'approvalDate',
            title: '批复时间 ',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'approvalName',
            title: '批复名称',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'approvalDept',
            title: '审查部门 ',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'approvalNumber',
            title: '批复文号',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'approvalArea',
            title: '批复面积',
            align: 'center',
            minWidth: 10,
            tooltip: true
          },
          {
            key: 'remark',
            title: '园区简介',
            align: 'center',
            minWidth: 10,
            tooltip: true
          }
        ]
      }
    },
    // 获取表格数据
    getListData() {
      let params = {
        type: this.type,
        page: 0,
        size: 100
      }
      parkBaseinfo(params).then((res) => {
        if (res.data.code === 0) {
          let data = res.data.datas[0]
          this.areaData = data
          let list = data.list
          list.forEach((element) => {
            if (element.parkAttr) {
              element.parkAttr = element.parkAttr.split('|')[3]
            }
            if (element.planDate) {
              element.planDate = element.planDate.split(' ')[0]
            }
            if (element.industrialStructType) {
              element.industrialStructType =
                element.industrialStructType.split('|')[3]
            }
            if (element.approvalDate) {
              element.approvalDate = element.approvalDate.split(' ')[0]
            }
          })
          this.list = list
        }
      })
    }
  }
}
</script>
