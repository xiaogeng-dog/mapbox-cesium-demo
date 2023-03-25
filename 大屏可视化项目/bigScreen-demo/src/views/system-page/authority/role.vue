<template>
  <div>
    <Row style="background: #fff; padding: 0px">
      <Col span="6" v-for="role in roles" style="padding: 10px" :key="role.id">
        <Card style="cursor: pointer">
          <div style="text-align: center" v-on:click="showDetail(role.id)">
            <div
              style="position: absolute; right: 5px; top: 5px; cursor: pointer"
              v-on:click.stop="deleteConfirm(role.id)"
            >
              <Icon type="md-close" size="20"></Icon>
            </div>
            <Icon :type="role.icon" size="50"></Icon>
            <h3>{{ role.name }}</h3>
          </div>
        </Card>
      </Col>
      <Col span="6" style="padding: 10px">
        <Card style="cursor: pointer">
          <div style="text-align: center" v-on:click="newRole()">
            <Icon type="ios-add" size="50"></Icon>
            <h3>新增</h3>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'roleList',
  data () {
    return {
      roles: [],
      item: {
        url: '/api/system/cscpRolessByCriteria'
      }
    }
  },
  methods: {
    init () {
      this.roleList()
    },
    roleList () {
      let msg = this.$Message.loading({
        content: '正在获取数据',
        duration: 0
      })
      const [url, httpConfig] = [
        '/api/system/cscpRolessByCriteria',
        {
          params: { size: 1000 }
        }
      ]
      this.$http.get(url, httpConfig).then(response => {
        this.roles = response.data.data
        msg()
      }).catch(error => {
        msg()
        if (error.response) {
          this.$Message.error('获取数据失败！')
        }
      })
    },
    showDetail (id) {
      this.$byStoreSet('role-edit', { id })
      this.$router.push({ name: 'role-edit' })
    },
    deleteConfirm (id) {
      this.$http.get(`/api/system/cscpRoleUsers/${id}`).then(res => {
        if (res.data) {
          this.$Message.warning(`该角色已被 ${res.data} 个账号使用，禁止删除。`)
        } else {
          this.deleteRole(id)
        }
      })
    },
    deleteRole (id) {
      const url = `/api/system/cscpRoless/${id}`
      this.$http.delete(url).then(() => {
        this.$Message.success('角色删除成功！')
        this.roleList()
      }).catch(error => {
        if (error.response) {
          if (error.response.data && error.response.data.msg) {
            this.$Message.error(error.response.data.msg)
          } else {
            this.$Message.error('角色删除失败！')
          }
        }
      })
    },
    newRole () {
      this.$router.push({ name: 'role-add' })
    }
  },
  created () {
    this.init()
  }
}
</script>
