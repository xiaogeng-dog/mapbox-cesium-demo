<style lang="less" scoped>
@import "./PopoutEnterpriseTable.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div
      class="popout-container"
      v-if="popoutTableShow"
    >
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div
        class="type-container"
        v-if="param.index===1"
      >
        <div
          :class="typeIndex===1?'type active':'type'"
          @click="changeType(1)"
        >基本信息</div>
        <div
          :class="typeIndex===2?'type active':'type'"
          @click="changeType(2)"
        >企业从业人员</div>
      </div>
      <div
        class="type-container"
        v-if="param.index===2"
      >
        <div
          :class="typeIndex===1?'type active':'type'"
          @click="changeType(1)"
        >建设项目三同时</div>
        <div
          :class="typeIndex===2?'type active':'type'"
          @click="changeType(2)"
        >安全评价报告</div>
        <div
          :class="typeIndex===3?'type active':'type'"
          @click="changeType(3)"
        >SIL等级评估报告</div>
        <div
          :class="typeIndex===4?'type active':'type'"
          @click="changeType(4)"
        >安全生产许可</div>
        <div
          :class="typeIndex===5?'type active':'type'"
          @click="changeType(5)"
        >专项督导检查报告</div>
      </div>
      <div
        class="type-container"
        v-if="param.index===3"
      >
        <div
          :class="typeIndex===1?'type active':'type'"
          @click="changeType(1)"
        >重大危险源</div>
        <div
          :class="typeIndex===2?'type active':'type'"
          @click="changeType(2)"
        >重点工艺</div>
        <div
          :class="typeIndex===3?'type active':'type'"
          @click="changeType(3)"
        >关键生产装置</div>
        <div
          :class="typeIndex===4?'type active':'type'"
          @click="changeType(4)"
        >生产原料</div>
        <div
          :class="typeIndex===5?'type active':'type'"
          @click="changeType(5)"
        >中间产品</div>
        <div
          :class="typeIndex===6?'type active':'type'"
          @click="changeType(6)"
        >最终产品</div>
      </div>
      <div
        class="type-container"
        v-if="param.index===4"
      >
        <div
          :class="typeIndex===1?'type active':'type'"
          @click="changeType(1)"
        >企业应急预案</div>
      </div>
      <div
        v-if="param.index===1&&typeIndex===1"
        class="detail-container"
      >
        <Row>
          <Col
            span="4"
            class="param"
          >
          企业名称:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.entprName}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          社会统一信用代码:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.uscCode}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          注册资金(万元):
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.regCapi}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          成立日期:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.setupDate}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          经营状态:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{getDicName(enterpriseAllInfo.operatingStatus)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          法定代表人:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.legalPerson}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          经营范围:
          </Col>
          <Col
            span="19"
            class="value"
          >
          {{enterpriseAllInfo.businessScope}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          规模情况:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.scale?enterpriseAllInfo.scale.split('|')[3]:''}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          从业人员数量:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.employeeNum}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          母公司名称:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(enterpriseAllInfo.parentCompName)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          集团公司名称:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(enterpriseAllInfo.groupCompName)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          是否为国有企业:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{enterpriseAllInfo.stateOwed==='0'?'否':'是'}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          隶属关系:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(enterpriseAllInfo.affiliation)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          监管部门:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(enterpriseAllInfo.supervisorDept)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          占地面积:
          </Col>
          <Col
            span="8"
            class="value"
          >
          {{emptyStr(enterpriseAllInfo.floorArea)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          经济类型:
          </Col>
          <Col
            span="19"
            class="value"
          >
          {{getDicName(enterpriseAllInfo.ecoTypeLarge)}}-{{getDicName(enterpriseAllInfo.ecoTypeSmall)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          行业类别:
          </Col>
          <Col
            span="19"
            class="value"
          >
          {{getDicName(enterpriseAllInfo.indusTypeClass)}}-{{getDicName(enterpriseAllInfo.indusTypeLagre)}}-{{getDicName(enterpriseAllInfo.indusTypeMiddle)}}-{{getDicName(enterpriseAllInfo.indusTypeSmall)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          所在地区:
          </Col>
          <Col
            span="19"
            class="value"
          >
          {{getDicName(enterpriseAllInfo.province)}}-{{getDicName(enterpriseAllInfo.city)}}-{{getDicName(enterpriseAllInfo.county)}}-{{getDicName(enterpriseAllInfo.subdistrict)}}
          </Col>
          <Col
            span="4"
            class="param"
          >
          注册地址:
          </Col>
          <Col
            span="19"
            class="value"
          >
          {{enterpriseAllInfo.regAddr}}
          </Col>
        </Row>
      </div>
      <div
        class="body-container"
        v-else
      >
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
import { enterpriseInfo } from '../../../api/index'
export default {
  name: 'PopoutEnterpriseTable',
  props: {
    param: {
      default: () => {},
      type: Object
    },
    popoutTableShow: {
      default: false,
      type: Boolean
    },
    enterpriseAllInfo: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      typeIndex: 1,
      tableHeight: 550,
      columns: [],
      tableData: [],
      total: 0,
      page: {
        currentPage: 0,
        size: 10
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
      if (this.param.index === 1 && this.typeIndex === 1) {
        return
      }
      const msg = this.$Message.loading({
        content: '查询中...',
        duration: 0
      })
      enterpriseInfo({
        enterpriseId: this.param.id,
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
      if (this.param.index === 1) {
        if (this.typeIndex === 2) {
          this.renderTable1_2()
        }
      } else if (this.param.index === 2) {
        if (this.typeIndex === 1) {
          this.renderTable2_1()
        } else if (this.typeIndex === 2) {
          this.renderTable2_2()
        } else if (this.typeIndex === 3) {
          this.renderTable2_3()
        } else if (this.typeIndex === 4) {
          this.renderTable2_4()
        } else if (this.typeIndex === 5) {
          this.renderTable2_5()
        }
      } else if (this.param.index === 3) {
        if (this.typeIndex === 1) {
          this.renderTable3_1()
        } else if (this.typeIndex === 2) {
          this.renderTable3_2()
        } else if (this.typeIndex === 3) {
          this.renderTable3_3()
        } else if (this.typeIndex === 4) {
          this.renderTable3_4()
        } else if (this.typeIndex === 5) {
          this.renderTable3_5()
        } else if (this.typeIndex === 6) {
          this.renderTable3_6()
        }
      } else if (this.param.index === 4) {
        if (this.typeIndex === 1) {
          this.renderTable4_1()
        }
      }
    },
    // 企业从业人员
    renderTable1_2() {
      this.columns = [
        {
          key: 'employeeName',
          title: '员工姓名',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'employeeNumber',
          title: '员工代码',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'gender',
          title: '性别',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.gender))
          }
        },
        {
          key: 'moible',
          title: '联系电话',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'deptName',
          title: '所属部门',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'post',
          title: '所属岗位',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 建设项目三同时
    renderTable2_1() {
      this.columns = [
        {
          key: 'enterpriseName',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'projName',
          title: '建设项目名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'projType',
          title: '建设项目类型',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.projType))
          }
        },
        {
          key: 'projStatus',
          title: '项目状态',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.projStatus))
          }
        }, {
          key: 'createTime',
          title: '录入时间',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 安全评价报告
    renderTable2_2() {
      this.columns = [
        {
          key: 'enterpriseName',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'safereportName',
          title: '报告名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'safeReportOrg',
          title: '评价机构',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'reportProjectHeader',
          title: '评价项目负责人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'completeDate',
          title: '完成日期',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // SIL等级评估报告
    renderTable2_3() {
      this.columns = [
        {
          key: 'enterpriseName',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'silreportName',
          title: '报告名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'safeReportOrg',
          title: '评价机构',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'projectHeader',
          title: '项目负责人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'completeDate',
          title: '完成日期',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 安全生产许可
    renderTable2_4() {
      this.columns = [
        {
          key: 'enterpriseName',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'licenseName',
          title: '许可证名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'validStartDate',
          title: '有效期始',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'validEndDate',
          title: '有效期止',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'isValid',
          title: '许可证状态',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            if (!param.row.validEndDate) {
              return h('div', '有效')
            }
            let validEndDate = new Date(param.row.validEndDate)
            let date = new Date()
            if (validEndDate < date) {
              return h('div', '过期')
            } else {
              return h('div', '有效')
            }
          }
        }, {
          key: 'licenseStatus',
          title: '审核状态',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.licenseStatus))
          }
        }
      ]
    },
    // 专项督导检查报告
    renderTable2_5() {
      this.columns = [
        {
          key: 'enterpriseName',
          title: '企业名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'checkreportName',
          title: '报告名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'checkDept',
          title: '督导部门',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'header',
          title: '负责人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'completeDate',
          title: '完成日期',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 重大危险源
    renderTable3_1() {
      this.columns = [
        {
          key: 'majorHazardName',
          title: '重大危险源名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'unifiedCode',
          title: '统一编码',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'majorHazardGrade',
          title: '重大危险源等级',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.majorHazardGrade))
          }
        }, {
          key: 'majorName',
          title: '主要负责人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'technologyName',
          title: '技术负责人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }, {
          key: 'operationName',
          title: '操作负责人',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 重点工艺
    renderTable3_2() {
      this.columns = [
        {
          key: 'processName',
          title: '生产工艺名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'unifiedCode',
          title: '统一编码',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'reactionType',
          title: '反应类型',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.reactionType))
          }
        },
        {
          key: 'chemicalProcess',
          title: '是否重点监管化工工艺',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', param.row.iskeySupervisionProcess === '1' ? '是' : '否')
          }
        }
      ]
    },
    // 关键生产装置
    renderTable3_3() {
      this.columns = [
        {
          key: 'deviceName',
          title: '装置名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'deviceCode',
          title: '装置编号',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'deviceModel',
          title: '设备型号',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'keyDevice',
          title: '是否关键装置',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', param.row.keyDevice === 1 ? '是' : '否')
          }
        },
        {
          key: 'dangerousProcess',
          title: '所属危险化工工艺',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.dangerousProcess))
          }
        },
        {
          key: 'deviceState',
          title: '装置状态',
          align: 'center',
          minWidth: 10,
          tooltip: true
        }
      ]
    },
    // 生产原料
    renderTable3_4() {
      this.columns = [
        {
          key: 'productName',
          title: '品名',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.productName))
          }
        },
        {
          key: 'type',
          title: '危化品类别',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.type))
          }
        },
        {
          key: 'annualConsumption',
          title: '年消耗量',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'actualReserves',
          title: '实际储存量',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'keyHazardChem',
          title: '是否重点监管危险化学品',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', param.row.keyHazardChem === '1' ? '是' : '否')
          }
        }
      ]
    },
    // 中间产品
    renderTable3_5() {
      this.columns = [
        {
          key: 'productName',
          title: '品名',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.productName))
          }
        },
        {
          key: 'type',
          title: '危化品类别',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.type))
          }
        },
        {
          key: 'annualThroughput',
          title: '年消耗量',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'store',
          title: '实际储存量',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'keyHazardChem',
          title: '是否重点监管危险化学品',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', param.row.keyHazardChem === '1' ? '是' : '否')
          }
        }
      ]
    },
    // 最终产品
    renderTable3_6() {
      this.columns = [
        {
          key: 'productName',
          title: '品名',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.productName))
          }
        },
        {
          key: 'materialForm',
          title: '物质形态',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.materialForm))
          }
        },
        {
          key: 'annualThroughput',
          title: '年生产能力',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'store',
          title: '实际储存量',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'keyHazardChem',
          title: '是否重点监管危险化学品',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', param.row.keyHazardChem === '1' ? '是' : '否')
          }
        }
      ]
    },
    // 企业应急预案
    renderTable4_1() {
      this.columns = [
        {
          key: 'planName',
          title: '预案名称',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'enterpriseName',
          title: '发布单位',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'planVersion',
          title: '预案版本',
          align: 'center',
          minWidth: 10,
          tooltip: true
        },
        {
          key: 'plantypeCode',
          title: '预案类型',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', this.getDicName(param.row.plantypeCode))
          }
        },
        {
          key: 'issueStatus',
          title: '发布状态',
          align: 'center',
          minWidth: 10,
          tooltip: true,
          render: (h, param) => {
            return h('div', param.row.issueStatus === '00' ? '发布' : '废止')
          }
        }
      ]
    }
  },
  computed: {
    typeName() {
      if (this.param.index === 1) {
        if (this.typeIndex === 1) {
          return 'enterpriseAllInfo'
        } else if (this.typeIndex === 2) {
          return 'enteremployee'
        }
      } else if (this.param.index === 2) {
        if (this.typeIndex === 1) {
          return 'threesimtsly'
        } else if (this.typeIndex === 2) {
          return 'majorhazardSafereport'
        } else if (this.typeIndex === 3) {
          return 'majorhazardSilreport'
        } else if (this.typeIndex === 4) {
          return 'safeproduclicense'
        } else if (this.typeIndex === 5) {
          return 'majorhazardCheckrepor'
        }
      } else if (this.param.index === 3) {
        if (this.typeIndex === 1) {
          return 'majorHazardInfo'
        } else if (this.typeIndex === 2) {
          return 'keyProcess'
        } else if (this.typeIndex === 3) {
          return 'keyDeviceInfo'
        } else if (this.typeIndex === 4) {
          return 'rawMateriallInfo'
        } else if (this.typeIndex === 5) {
          return 'semiProductInfo'
        } else if (this.typeIndex === 6) {
          return 'finalProductInfo'
        }
      } else if (this.param.index === 4) {
        if (this.typeIndex === 1) {
          return 'basicinfoEnterplaninfo'
        }
      }
      return ''
    }
  },
  watch: {
    param() {
      // 点其他按钮或者其他企业时,会到这里
      this.init()
      this.renderTable()
      this.getList()
    }
  }
}
</script>
