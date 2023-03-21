<template>
  <div>
    <Row :gutter="16" type="flex" justify="center" align="top">
      <Col span="24" style="border: #fff 1px solid; margin:5px;">
      <Form ref="roleForm" :model="role" :label-width="100" :rules="ruleValidate">
        <Row type="flex" justify="center" :gutter="16">
          <Col span="18">
          <FormItem prop="id" label="ID" style="display:none">
            <Input type="text" v-model="role.id" placeholder="主键" disabled>
            </Input>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem prop="name" label="名称" style="">
            <Input type="text" v-model.trim="role.name" placeholder="名称">
            </Input>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem prop="roleExtent" label="扩展属性" style="">
            <Input type="text" v-model="role.roleExtent" placeholder="扩展属性">
            </Input>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem prop="parentId" label="父ID" style="display:none">
            <Input type="text" v-model="role.parent_id" placeholder="父ID" disabled>
            </Input>
          </FormItem>
          </Col>
          <Col span="18">
            <FormItem prop="icon" label="图标" style="">
              <icon-change :icon.sync="role.icon"></icon-change>
            </FormItem>
          </Col>
          <Col span="18">
          <FormItem prop="menus" label="菜单" style="">
            <Tree ref="menuSelectTree" :data="menuData" show-checkbox multiple
              style="background-color:#f9f9f9;line-height: 24px;padding:10px;"></Tree>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
    <Row type="flex" justify="center" style="margin-top: 16px;">
      <Button type="primary" @click="handleSubmit('roleForm')" :disabled="isSubmitDisabled">提交</Button>
      <Button type="default" @click="handleReset" style="margin: 0 16px">重置</Button>
      <Button type="default" @click="closeMe()">返回</Button>
    </Row>
  </div>
</template>

<script>
import iconChange from '../../components/iconChange'
export default {
  name: 'roleEdit',
  data () {
    const validateRoleName = (rule, value, callback) => {
      let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      if (pattern.test(value)) {
        callback(new Error('角色名称不允许存在特殊字符！'))
        return
      }
      if (value.length > 50) {
        callback(new Error('角色名称长度不允许超过50位！'))
        return
      }
      // 检查角色名是否存在
      const [url, httpConfig] = [
        '/api/validation/role',
        {
          params: { name: this.role.name }
        }
      ]
      if (value !== this.roleName) {
        this.$http.get(url, httpConfig).then(response => {
          if (response.data.code === -1) {
            callback(new Error(response.data.msg))
          } else {
            callback()
          }
        }).catch(() => {
          callback(new Error('异步校验出错！'))
        })
      } else {
        callback()
      }
    }
    return {
      isSubmitDisabled: false,
      roleName: null,
      role: { id: null, name: '', roleExtent: '', parentId: 0, icon: '' },
      ruleValidate: {
        name: [
          { required: true, message: '名称不能为空!', trigger: 'blur' },
          { validator: validateRoleName, trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '图标不能为空!', trigger: 'blur' }
        ],
        roleExtent: [
          { type: 'string', max: 50, message: '扩展属性最大不可以超过50位！', trigger: 'blur' }
        ]
      },
      form: {
        tableId: 6
      },
      menuData: [],
      scollshow: false,
      iconTotal: 0,
      page: 1
    }
  },
  components: {
    iconChange
  },
  methods: {
    init () {
      this.handleReset()
    },
    handleReset () {
      if (this.$route.name === 'role-edit') {
        this.role.id = this.$byStoreGet('role-edit').id
        this.getData(this.role.id)
      } else {
        this.role = { id: null, name: '', roleExtent: '', parentId: 0, icon: '' }
        this.getMenusByRole(0)
      }
    },
    getData (roleId) {
      const msg = this.$Message.loading({
        content: '正在初始化角色数据',
        duration: 0
      })
      const url = `/api/system/cscpRoless/${roleId}`
      this.$http.get(url).then(response => {
        this.role = response.data
        this.roleName = this.role.name
        this.getMenusByRole(this.role.id, msg)
      }).catch(error => {
        msg()
        if (error.response) {
          this.$Message.error('角色数据初始化失败！')
        }
      })
    },
    scollListClick (item) {
      this.role.icon = item
      this.scollshow = false
    },
    tableShow () {
      this.scollshow = true
    },
    tableHide () {
      this.scollshow = false
    },
    clickFocus (event) {
      event || (event = window.event)
      event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true)
      this.scollshow ? this.tableHide() : this.tableShow()
      document.addEventListener('click', this.selectHideList, false)
    },
    clickblur () {
      this.scollshow = false
    },
    getMenusByRole (roles, msg) {
      const url = '/api/system/menu/queryByRoleId'
      const data = this.$util.formUrlencoded({ roles })
      this.$http.post(url, data).then(response => {
        const menuTree = this.initTreeData(response.data.items)
        this.menuData = menuTree.children
        if (msg) {
          msg()
          this.$Message.success('角色数据初始化成功！')
        }
      }).catch(error => {
        if (msg) {
          msg()
          if (error.response) {
            this.$Message.error('角色数据初始化失败！')
          }
        }
      })
    },
    initTreeData (items) {
      const children = []
      let selected = false
      let checked = true
      for (let item of items) {
        const obj = {
          id: item.id,
          title: item.title,
          checked: item.checked
        }
        if (item.items) {
          obj.expand = true
          const tempRes = this.initTreeData(item.items)
          obj.selected = tempRes.selected
          obj.checked = tempRes.checked
          obj.children = tempRes.children
        }
        selected = (selected || obj.checked)
        checked = (checked && obj.checked)
        children.push(obj)
      }
      return {
        selected,
        checked,
        children
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isSubmitDisabled = true
          const msg = this.$Message.loading({
            content: this.role.id === null ? '正在创建新角色' : '正在更新角色数据',
            duration: 0
          })
          const httpConfig = {
            method: this.role.id === null ? 'post' : 'put',
            url: '/api/system/cscpRoless',
            data: this.role
          }
          this.$http(httpConfig).then(response => {
            this.saveRoleMenus(response.data.id, msg)
          }).catch(error => {
            msg()
            this.isSubmitDisabled = false
            if (error.response) {
              this.$Message.error(this.role.id === null ? '创建新角色失败！' : '更新角色数据失败！')
            }
          })
        }
      })
    },
    saveRoleMenus (roleId, msg) {
      const checkedNodes = this.$refs.menuSelectTree.getCheckedAndIndeterminateNodes()
      let menus = []
      for (let item of checkedNodes) {
        menus.push(item.id)
      }
      menus = menus.join()
      const url = '/api/system/menu/save'
      const data = this.$util.formUrlencoded({ roles: roleId, menus, permissions: '' })
      this.$http.post(url, data).then(response => {
        msg()
        this.$Message.success({
          content: this.role.id === null ? '创建新角色成功！' : '更新角色数据成功！',
          onClose: () => {
            this.closeMe()
          }
        })
      }).catch(error => {
        msg()
        this.isSubmitDisabled = false
        if (error.response) {
          this.$Message.error(this.role.id === null ? '创建新角色失败！' : '更新角色数据失败！')
        }
      })
    },
    getSelectItems (items, idArr) {
      for (let item of items) {
        if (item.children && item.children.length > 0) {
          this.getSelectItems(item.children, idArr)
        }
        if (item.selected) {
          idArr.push(item.id)
        } else if (item.checked) {
          idArr.push(item.id)
        }
      }
    },
    closeMe () {
      this.$store.commit('app/closePage', {
        vm: this,
        fromName: this.$route.name,
        toName: 'role-management'
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
