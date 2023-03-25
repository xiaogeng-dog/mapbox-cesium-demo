<style lang="less" scoped>
@import "./PopoutRiskPoint.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div
      class="popout-container"
      v-if="show"
    >
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div class="itemicon"></div>
        <div class="title">{{markerData.name}}</div>
        <div class="code">001</div>
        <div
          class="level"
          :class="'level'+markerData.riskLevel.split('|')[2]"
        >{{markerData.riskLevel.split('|')[3]}}</div>
      </div>
      <div class="detail-container">
        <Row>
          <Col
            span="4"
            class="param"
          >
          所属企业:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{markerData.enterpriseBaseInfo.entprName}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          所属单元:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(markerData.riskUnitName)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          风险点类型:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{getDicName(markerData.pointType)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          风险值:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(markerData.rnum)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          所在位置:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(markerData.location)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          风险点描述:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(markerData.pointDes)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          备注:
          </Col>
          <Col
            span="19"
            class="value"
          >
          {{emptyStr(markerData.remark)}}
          </Col>
        </Row>
      </div>
      <div class="type-container">
        <div
          :class="typeIndex===1?'type active':'type'"
          @click="changeType(1)"
        >危险因素辨识清单</div>
        <div
          :class="typeIndex===2?'type active':'type'"
          @click="changeType(2)"
        >安全风险分级管控清单</div>
        <div
          :class="typeIndex===3?'type active':'type'"
          @click="changeType(3)"
        >应知卡</div>
        <div
          :class="typeIndex===4?'type active':'type'"
          @click="changeType(4)"
        >承诺卡</div>
        <div
          :class="typeIndex===5?'type active':'type'"
          @click="changeType(5)"
        >应急卡</div>
      </div>
      <div class="body-container">
        <Table
          :columns="columns"
          :data="tableData"
          class="table"
        ></Table>
        <Page
          :total="total"
          :page-size="10"
          @on-change="handlePageChange"
          show-total
          class="page"
        />
      </div>
    </div>
  </transition>

</template>

<script>
import { riskTabInfo } from '../../../api/index'
import util from '@/libs/util.js'
export default {
  name: 'PopoutRiskPoint',
  props: {
    show: {
      default: false,
      type: Boolean
    },
    markerData: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      typeIndex: 1,
      tableHeight: 270,
      columns: [],
      tableData: [],
      total: 0,
      page: {
        currentPage: 0,
        size: 5
      }
    }
  },
  methods: {
    init() {
      this.typeIndex = 1
      this.page.currentPage = 0
      this.total = 0
      this.tableData = []
      this.columns = []
    },
    handlePageChange(page) {
      this.page.currentPage = page - 1
      this.getList()
    },
    close() {
      this.typeIndex = 1
      this.page.currentPage = 0
      this.$emit('close')
    },
    changeType(index) {
      this.typeIndex = index
      this.tableData = []
      this.renderTable()
      this.getList()
    },
    getList() {
      const msg = this.$Message.loading({
        content: '查询中...',
        duration: 0
      })
      riskTabInfo({
        pointId: this.markerData.id,
        type: this.typeName,
        page: this.page.currentPage,
        size: this.page.size
      }).then(res => {
        msg()
        if (res.data.datas) {
          this.tableData = res.data.datas.data
          this.total = res.data.datas.count
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    getDicName(str) {
      if (!str) {
        return ''
      } else {
        let list = str.split('|')
        return list[list.length - 1]
      }
    },
    emptyStr(str) {
      if (str) {
        return str
      } else {
        return '--'
      }
    },
    renderTable() {
      if (this.typeIndex === 1) {
        this.renderTable1()
      } else if (this.typeIndex === 2) {
        this.renderTable2()
      } else if (this.typeIndex === 3) {
        this.renderTable3()
      } else if (this.typeIndex === 4) {
        this.renderTable4()
      } else if (this.typeIndex === 5) {
        this.renderTable5()
      }
    },
    // 危险因素辨识清单
    renderTable1() {
      this.columns = [
        {
          key: 'pointType',
          title: '风险点类别',
          align: 'center',
          minWidth: 10,
          maxWidth: 120,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.riskPointInfo.pointType))
          }
        },
        {
          key: 'mainHazard',
          title: '存在的主要危险（有害因素）',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'accidentTypeName',
          title: '易发生的事故类型',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 安全风险分级管控清单
    renderTable2() {
      this.columns = [
        {
          key: 'pointType',
          title: '风险点类别',
          align: 'center',
          minWidth: 10,
          maxWidth: 140,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.riskPointInfo.pointType))
          }
        },
        {
          key: 'status',
          title: '管控状态',
          align: 'center',
          minWidth: 10,
          maxWidth: 120,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.status))
          }
        },
        {
          key: 'controlClass',
          title: '管控措施类别',
          align: 'center',
          minWidth: 10,
          maxWidth: 140,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.controlClass))
          }
        },
        {
          key: 'manageMeasure',
          title: '管控措施',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 感知卡
    renderTable3() {
      this.columns = [
        {
          key: 'postName',
          title: '岗位名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'postDevice',
          title: '岗位设备/工具',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'material',
          title: '使用物料（危化品）',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'projectHeader',
          title: '详情',
          align: 'center',
          minWidth: 10,
          maxWidth: 100,
          tooltip: true,
          render: (h, params) => {
            return h(
              'a',
              {
                style: {
                },
                props: {
                  type: 'info'
                },
                on: {
                  click: () => {
                    this.openDetail(params.row, 'knowCard')
                  }
                }
              },
              '查看'
            )
          }
        }
      ]
    },
    // 承诺卡
    renderTable4() {
      this.columns = [
        {
          key: 'cardType',
          title: '承诺卡类型',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.cardType))
          }
        },
        {
          key: 'promisor',
          title: '承诺人',
          align: 'center',
          minWidth: 10,
          maxWidth: 120,
          tooltip: true
        },
        {
          key: 'promiseDate',
          title: '承诺日期',
          align: 'center',
          minWidth: 10,
          maxWidth: 160,
          tooltip: true
        },
        {
          key: 'promiseContent',
          title: '承诺内容',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'isValid',
          title: '附件',
          align: 'center',
          minWidth: 10,
          maxWidth: 100,
          tooltip: true,
          render: (h, params) => {
            if (params.row.uploadFileInfo && params.row.uploadFileInfo.length > 0) {
              return h(
                'a',
                {
                  style: {
                  },
                  props: {
                    type: 'info'
                  },
                  on: {
                    click: () => {
                      this.download(params.row.uploadFileInfo[0].id)
                    }
                  }
                },
                '下载'
              )
            } else {
              return h('div', '--')
            }
          }
        }
      ]
    },
    // 应急卡
    renderTable5() {
      this.columns = [
        {
          key: 'postName',
          title: '岗位名称',
          align: 'center',
          minWidth: 10,
          maxWidth: 160,
          tooltip: true
        },
        {
          key: 'postEmnMeasure',
          title: '岗位异常紧急处理',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'checkDept',
          title: '详情',
          align: 'center',
          minWidth: 10,
          maxWidth: 100,
          tooltip: true,
          render: (h, params) => {
            return h(
              'a',
              {
                style: {
                },
                props: {
                  type: 'info'
                },
                on: {
                  click: () => {
                    this.openDetail(params.row, 'emergencyCard')
                  }
                }
              },
              '查看'
            )
          }
        }
      ]
    },
    download(id) {
      let link = document.createElement('a')
      // 创建一个a标签
      link.style.display = 'none'
      // 将a标签隐藏
      link.href = `${util.baseUrl}/downloadFile/${id}`
      document.body.appendChild(link)
      // 将上面创建的a标签加入到body的尾部
      link.click()
      // 执行a标签
    },
    openDetail(data, type) {
      this.$emit('openDetail', { data, type })
    }
  },
  computed: {
    typeName() {
      if (this.typeIndex === 1) {
        return 'hazardIdentit'
      } else if (this.typeIndex === 2) {
        return 'riskGradeControl'
      } else if (this.typeIndex === 3) {
        return 'knowCard'
      } else if (this.typeIndex === 4) {
        return 'commitmentCard'
      } else if (this.typeIndex === 5) {
        return 'emergencyCard'
      }
      return ''
    }
  },
  watch: {
    markerData() {
      // 点其他的风险点时
      this.init()
      this.renderTable()
      this.getList()
    }
  }
}
</script>
