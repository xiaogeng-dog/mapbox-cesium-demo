<template>
  <div>
    <el-tree
      ref="async-router-tree"
      :props="props"
      node-key="id"
      :expand-on-click-node="false"
      :default-expanded-keys="[0]"
      lazy
      :load="loadNode"
      draggable
      @node-drag-end="handleDragEnd"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <template v-if="data.id === 0">
            <Button
              class="add-root-btn"
              type="primary"
              size="small"
              icon="ios-add"
              @click="editNode(node, data, 'append')"
            ></Button>
          </template>
          <template v-else>
            <Button
              type="default"
              icon="ios-add"
              size="small"
              @click="editNode(node, data, 'append')"
            ></Button>
            <Button
              type="default"
              icon="ios-remove"
              size="small"
              @click="removeNodeConfirmed(node, data)"
            ></Button>
            <Button
              type="default"
              icon="md-create"
              size="small"
              @click="editNode(node, data, 'update')"
            ></Button>
          </template>
        </span>
      </span>
    </el-tree>
    <div class="modal-mask" v-if="isNodeEdited">
      <Card class="modal-mask-form">
        <p slot="title">
          <Icon type="ios-create-outline" size="24" />
          <span>节点信息编辑</span>
        </p>
        <Form
          ref="organization"
          :model="organization"
          :rules="ruleOrganization"
          :label-width="80"
        >
          <FormItem prop="orgName" label="机构名称">
            <Input
              type="text"
              v-model.trim="organization.orgName"
              placeholder="机构名称"
            >
              <Icon type="md-create" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="description" label="机构描述">
            <Input
              type="text"
              v-model="organization.description"
              placeholder="机构描述"
            >
              <Icon type="md-create" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="groups" label="工作组">
            <Select
              ref="groupSelect"
              v-model="organization.groups"
              multiple
              filterable
            >
              <Option
                v-for="option in groupOptions"
                :value="option.value"
                :key="option.value"
              >
                {{ option.label }}</Option
              >
            </Select>
          </FormItem>
          <FormItem prop="users" label="人员">
            <Select
              ref="userSelect"
              v-model="organization.users"
              multiple
              filterable
            >
              <Option
                v-for="(option, index) in userOptions"
                :value="option.value"
                :key="option.value + index"
              >
                {{ option.label }}</Option
              >
            </Select>
          </FormItem>
          <Row type="flex" justify="center">
            <Button
              type="primary"
              @click="handleSubmit('organization')"
              :disabled="isSubmitDisabled"
              >保存</Button
            >
            <Button type="default" @click="cancel" style="margin-left: 8px"
              >取消</Button
            >
          </Row>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validateOrgName = (rule, value, callback) => {
      let pattern = new RegExp("[`~!@#$^&*()=|{}%':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      if (pattern.test(value) || value.length > 50) {
        callback(new Error('机构名称不可以超过50位，且不允许存在特殊字符！'))
      }
      const [url, httpConfig] = [
        '/api/validation/org',
        {
          params: { name: value,
            parentId: this.organization.parentId }
        }
      ]
      if (value !== this.organizationDetail) {
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
      props: {
        label: 'orgName',
        children: 'children'
      },
      currentNode: null,
      organizationDetail: null,
      isSubmitDisabled: false,
      orgName: null,
      isNodeEdited: false,
      organization: null,
      groupOptions: [],
      userOptions: [],
      ruleOrganization: {
        orgName: [
          { required: true, message: '请填写机构名称', trigger: 'blur' },
          { validator: validateOrgName, trigger: 'blur' }
        ],
        description: [
          { max: 200, trigger: 'blur', message: '描述长度不可超过200位' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.initWorkGroupOptions()
      this.initUserOptions()
      this.initOrganization()
    },
    initWorkGroupOptions () {
      this.$http.get('/api/system/cscpWorkGroupsOr').then(response => {
        this.groupOptions = response.data.data.reduce((res, next) => {
          res.push({
            value: next.id,
            label: next.groupName
          })
          return res
        }, [])
      }).catch()
    },
    initUserOptions () {
      const [url, httpConfig] = [
        '/api/system/cscpUserDetailsOr',
        {
          params: {
            size: 1000
          }
        }
      ]
      this.$http.get(url, httpConfig).then(response => {
        this.userOptions = response.data.data.reduce((res, next) => {
          res.push({
            value: next.id,
            label: `${next.familyName}${next.name} (${next.username})`
          })
          return res
        }, [])
      }).catch()
    },
    initOrganization () {
      this.organization = {
        orgName: '',
        description: '',
        groups: [],
        users: [],
        id: null,
        parentId: null,
        orderby: 0
      }
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        // init root of tree
        let root = {
          id: 0,
          orgName: '机构管理',
          parentId: null
        }
        resolve([root])
      } else {
        // init leaves of tree
        this.getNodes(node.data.id).then(value => {
          return resolve(value)
        })
      }
    },
    getNodes (parentId) {
      return new Promise((resolve, reject) => {
        const msg = this.$Message.loading({
          content: '正在获取数据',
          duration: 0
        })
        const [url, httpConfig] = [
          '/api/system/cscpOrgs/all',
          {
            params: {
              parentId
            }
          }
        ]
        this.$http.get(url, httpConfig).then(response => {
          const map = {}
          response.data.cscpOrgDTOs.forEach(item => {
            item.groups = []
            item.users = []
            map[item.id] = item
          })
          response.data.cscpUserOrgDTOs.forEach(item => {
            map[item.orgId].users.push(item.userId)
          })
          response.data.cscpWorkGroupOrgDTOs.forEach(item => {
            map[item.orgId].groups.push(item.groupId)
          })
          resolve(response.data.cscpOrgDTOs)
          msg()
        }).catch(error => {
          msg()
          this.$Message.error('获取数据失败！')
          reject(error)
        })
      })
    },
    editNode (node, data, act) {
      this.currentNode = node
      if (act === 'append') {
        this.initOrganization()
        this.organization.parentId = data.parentId === null ? 0 : data.id
      } else if (act === 'update') {
        this.organization = data
        this.organizationDetail = data.orgName
      }
      this.isNodeEdited = true
    },
    removeNodeConfirmed (node, data) {
      this.$Modal.confirm({
        title: '警告',
        content: '确定删除该节点（包括子节点）数据？',
        onOk: () => {
          this.deleteNode(node, data)
        }
      })
    },
    deleteNode (node, data) {
      const url = `/api/system/cscpOrgs/delCscpOrg`
      this.$http.delete(url, {
        data: {
          'cscpOrgDTOs': [{ id: data.id }]
        }
      }).then(() => {
        this.$Message.success('删除成功！')
        this.remove(node)
      }).catch(() => {
        this.$Message.error('删除失败！')
      })
    },
    remove (node) {
      this.$refs['async-router-tree'].remove(node)
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true
          const isAppendNode = this.organization.id === null
          const msg = this.$Message.loading({
            content: isAppendNode ? '正在添加新节点' : '正在更新节点',
            duration: 0
          })
          const [url, data] = [
            '/api/system/cscpOrgs/save',
            this.getSubmitParams(this.organization)
          ]
          this.$http.post(url, data).then(response => {
            if (isAppendNode) {
              this.organization.id = Number(response.data.id)
              this.append(this.organization, this.currentNode)
            }
            msg()
            this.$Message.success(isAppendNode ? '添加节点成功！' : '更新节点成功！')
            this.isNodeEdited = false
            this.isSubmitDisabled = false
          }).catch(() => {
            msg()
            this.isNodeEdited = false
            this.isSubmitDisabled = false
            this.$Message.error(isAppendNode ? '添加节点失败！' : '更新节点失败！')
          })
        }
      })
    },
    getSubmitParams (organization) {
      const cscpOrgDTOs = []
      const cscpUserOrgDTOs = []
      const cscpWorkGroupOrgDTOs = []
      cscpOrgDTOs.push({
        id: organization.id,
        orgName: organization.orgName,
        description: organization.description,
        parentId: organization.parentId,
        orderby: organization.orderby
      })
      if (organization.users.length > 0) {
        organization.users.forEach(userId => {
          cscpUserOrgDTOs.push({
            userId,
            orgId: organization.id
          })
        })
      }
      if (organization.groups.length > 0) {
        organization.groups.forEach(groupId => {
          cscpWorkGroupOrgDTOs.push({
            groupId,
            orgId: organization.id
          })
        })
      }
      return {
        cscpOrgDTOs,
        cscpUserOrgDTOs,
        cscpWorkGroupOrgDTOs
      }
    },
    initPutData (node, referenceNode, dropType) {
      const data = this.getItemsUpdated(node, referenceNode, dropType)
      this.updateDragData(data)
    },
    getItemsUpdated (node, referenceNode, dropType) {
      switch (dropType) {
        case 'inner':
          if (referenceNode.childNodes.length > 1) {
            return this.filterItemsUpdated(referenceNode.childNodes)
          } else {
            node.data.parentId = referenceNode.data.id
            node.data.orderby = 0
            return [node.data]
          }
        case 'before':
        case 'after':
          return this.filterItemsUpdated(referenceNode.parent.childNodes, referenceNode.data.parentId)
        default:
          break
      }
    },
    filterItemsUpdated (children, parentId) {
      const tempArray = []
      for (let i = 0; i < children.length; i++) {
        if (children[i].data.orderby !== (i + 1)) {
          children[i].data.orderby = i + 1
          tempArray.push(children[i].data)
        }
        if (children[i].data.parentId !== parentId) {
          children[i].data.parentId = parentId
          if (!tempArray.includes(children[i].data)) {
            tempArray.push(children[i].data)
          }
        }
      }
      return tempArray
    },
    updateDragData (data) {
      const url = '/api/system/cscpOrgs/updateOrg'
      this.$http.post(url, data).catch(() => {
        this.$Message.error('拖拽的节点数据更新失败，请刷新数据重新尝试！')
      })
    },
    append (data, node) {
      this.$refs['async-router-tree'].append(data, node)
    },
    cancel () {
      this.isNodeEdited = false
      this.organization.orgName = this.organizationDetail
      this.organizationDetail = ''
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      if (dropType !== 'none') {
        // drag success
        this.initPutData(draggingNode, dropNode, dropType)
      }
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.id === 0) {
        return type === 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.id !== 0
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  .ivu-btn {
    margin-left: 8px;
  }
}

.add-root-btn {
  width: 89px !important;
}

.modal-mask {
  position: fixed;
  width: 2304px;
  height: 1152px;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  &-form {
    width: 56%;

    span {
      font-size: 1rem;
    }

    .ivu-btn {
      margin: 0 8px;
    }
  }
}
</style>
