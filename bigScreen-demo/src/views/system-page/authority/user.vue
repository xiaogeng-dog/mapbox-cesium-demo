<style lang="less" scoped></style>

<template>
  <div class="user-mg">
    <Row>
      <Col span="8">
        <Input v-model="query" search placeholder="请根据表格中任意信息进行查询" @on-search="handleSearch"/>
      </Col>
      <Col span="16" style="text-align: right;">
        <Button code="cscp.user.add" type="primary" icon="md-add" @click="handleCreateOrEditItem">新建</Button>
      </Col>
    </Row>
      <Table :columns="columns" :data="data" :loading="isDisabled"></Table>
    <Row style="margin-top: 8px;" type="flex" justify="end">
      <Page v-if="dataTotal > pageSize" :total="dataTotal" @on-page-size-change="changeSize" :page-size="pageSize" @on-change="handlePageChange" show-elevator show-total :current="currentPageIndex"></Page>
    </Row>
  </div>
</template>

<script>
import dateMixin from '../../mixins/date.js'
export default {
  mixins: [dateMixin],
  data () {
    return {
      isDisabled: false,
      query: '',
      dataTotal: 0,
      currentPageIndex: 1,
      pageSize: 10,
      data: [],
      columns: [
        {
          key: 'userId',
          title: 'ID'
        },
        {
          key: 'username',
          title: '用户名',
          align: 'center'
        },
        {
          key: 'familyName',
          title: '姓',
          align: 'center'
        },
        {
          key: 'name',
          title: '名',
          align: 'center'
        },
        {
          key: 'mobile',
          title: '手机',
          align: 'center'
        },
        {
          key: 'email',
          title: '电子邮件'
        },
        {
          key: 'lastLogin',
          title: '最后登录时间',
          width: 168,
          align: 'center'
        },
        {
          key: 'discTitle',
          title: '描述标题'
        },
        {
          key: 'discDetail',
          title: '个人介绍'
        },
        {
          key: 'registerTime',
          title: '注册时间',
          align: 'center',
          width: 168
        },
        {
          title: '操作',
          align: 'center',
          width: 190,
          key: 'handle',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    code: 'cscp.user.edit',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.handleCreateOrEditItem(params.row.userId)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '确定删除这条数据吗？',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteUser(params.row.userId)
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      style: {
                        margin: '0 5px'
                      },
                      props: {
                        code: 'cscp.user.del',
                        type: 'error',
                        placement: 'top'
                      }
                    },
                    '删除'
                  )
                ]
              )
            ])
          }
        }
      ]
    }
  },
  methods: {
    init () {
      this.currentPageIndex = 1
      this.getUserList()
    },
    handleSearch () {
      this.init()
    },
    changeSize (val) {
      this.pageSize = val
      this.handleSearch()
    },
    getUserList () {
      let msg = this.$Message.loading({
        content: '正在更新数据',
        duration: 0
      })
      this.isDisabled = true
      const [url, httpConfig] = [
        '/api/system/cscpUserDetailsOr',
        {
          params: {
            'usernameLike': this.query,
            'familyNameLike': this.query,
            'nameLike': this.query,
            'mobileLike': this.query,
            'emailLike': this.query,
            'discTitleLike': this.query,
            'discDetailLike': this.query,
            sort: 'user_id',
            page: this.currentPageIndex,
            size: this.pageSize
          }
        }
      ]
      this.$http.get(url, httpConfig).then(response => {
        this.data = response.data.data.map(el => {
          el.lastLogin = el.lastLogin ? this.formatDate(new Date(el.lastLogin)) : null
          el.registerTime = el.registerTime ? this.formatDate(new Date(el.registerTime)) : null
          return el
        })
        this.dataTotal = response.data.recordsTotal
        msg()
        this.isDisabled = false
      }).catch(error => {
        msg()
        this.isDisabled = false
        if (error.response) {
          this.$Message.error('数据获取失败！')
        }
      })
    },
    handleCreateOrEditItem (id) {
      if (id) {
        this.$byStoreSet('user-edit', { id })
        this.$router.push({
          name: 'user-edit'
        })
      } else {
        this.$router.push({
          name: 'user-add'
        })
      }
    },
    handlePageChange (index) {
      this.currentPageIndex = index
      this.getUserList()
    },
    deleteUser (id) {
      this.$http.delete(`/api/system/cscpUsers/${id}`).then(resposne => {
        this.init()
        this.$Message.success('删除成功！')
      }).catch(error => {
        if (error.response) {
          this.$Message.error('删除失败！')
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
