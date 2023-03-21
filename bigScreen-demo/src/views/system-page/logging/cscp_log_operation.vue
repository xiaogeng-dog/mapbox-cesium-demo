<style lang="less">
@import "../../styles/common.less";
@import "./table.less";
</style>

<template>
  <div>
    <Row>
      <Input
        v-model="searchUsername"
        placeholder="搜索用户名"
        style="width: 200px"
      />
      <span @click="handleSearch" style="margin: 0 10px;">
        <Button type="primary" icon="md-search">搜索</Button>
      </span>
      <Button @click="handleCancel" type="default">取消</Button>
    </Row>
      <Table :columns="columns" :data="dataList"></Table>
      <Row type="flex" justify="end" align="middle">
        <Page
          :total="dataCount"
          :page-size="pageSize"
          @on-change="handlePageChange"
          show-elevator
          show-total
          style="padding: 10px;"
          :current="currentPageNum"
        ></Page>
      </Row>
  </div>
</template>

<script>
export default {
  name: 'searchable-table',
  data () {
    return {
      dataCount: 0,
      currentPageNum: 1,
      pageSize: 13,
      columns: [
        {
          key: 'id',
          title: 'ID'
        },
        {
          key: 'username',
          title: '用户'
        },
        {
          key: 'uri',
          title: '访问路径'
        },
        {
          key: 'ip',
          title: 'IP'
        },
        {
          key: 'time',
          title: '时间'
        },
        {
          key: 'params',
          title: '参数'
        },
        {
          key: 'message',
          title: '操作信息'
        },
        {
          key: 'error',
          title: '错误信息'
        },
        {
          key: 'status',
          title: '状态'
        }
      ],
      searchUsername: '',
      dataList: []
    }
  },
  methods: {
    init () {
      this.currentPageNum = 1
      this.search({
        page: this.currentPageNum - 1,
        size: this.pageSize,
        'username.contains': this.searchUsername,
        sort: 'time,desc'
      })
    },
    search (argumentObj) {
      this.$http.get('/api/system/cscpLogOperationsByCriteria', {
        params: argumentObj
      }).then(response => {
        this.dataList = response.data.data
        this.dataCount = response.data.recordsTotal
      }).catch()
    },
    handleSearch () {
      this.init()
    },
    handleCancel () {
      this.searchUsername = ''
      this.init()
    },
    handlePageChange (pageNum) {
      this.currentPageNum = pageNum
      this.search({
        page: this.currentPageNum - 1,
        size: this.pageSize,
        'username.contains': this.searchUsername,
        sort: 'time,desc'
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
