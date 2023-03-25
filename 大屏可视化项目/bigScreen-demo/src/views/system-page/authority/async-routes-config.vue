<template>
  <div>
    <Alert type="warning" show-icon closable>
      本页操作提示：
      <template slot="desc">
        <p>1. 一级节点（【异步路由配置】下一级节点）只允许平级拖拽移动。</p>
        <p>2. 非一级节点不允许拖拽成为一级节点。</p>
        <p>3. 节点完成拖拽移动后，刷新页面即可。</p>
      </template>
    </Alert>
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
          ref="asyncRoute"
          :model="asyncRoute"
          :rules="ruleAsyncRoute"
          :label-width="180"
        >
          <FormItem prop="type" label="类型（type）">
            <Select v-model="asyncRoute.type">
              <Option value="menu1" label="一级菜单"></Option>
              <Option
                value="menu2"
                label="二级菜单（不含三级菜单），三级菜单"
              ></Option>
              <Option value="menu2-sp" label="二级菜单（含三级菜单）"></Option>
              <Option value="non-menu" label="非菜单页面"></Option>
              <Option value="button" label="按钮"></Option>
            </Select>
          </FormItem>
          <FormItem prop="title" label="标题（title）">
            <Input
              type="text"
              v-model.trim="asyncRoute.title"
              placeholder="路由标题"
            >
              <Icon type="md-create" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <template v-if="asyncRoute.type !== 'button'">
            <FormItem prop="icon" label="菜单图标名（icon）">
              <icon-change :icon.sync="asyncRoute.icon"></icon-change>
            </FormItem>
            <FormItem prop="name" label="路由名（name）">
              <Input
                type="text"
                v-model.trim="asyncRoute.name"
                placeholder="路由名"
              >
                <Icon type="md-create" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <template v-if="asyncRoute.type !== 'menu2-sp'">
              <FormItem prop="url" label="路由访问路径（path）">
                <Input
                  type="text"
                  v-model.trim="asyncRoute.url"
                  placeholder="一级菜单路径必须以 ' / '开头，二级及其他路径可不以 ' / '开头，区别详见前端readme文档 "
                >
                  <Icon type="md-create" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="component" label="vue组件（component）">
                <Input
                  type="text"
                  v-model.trim="asyncRoute.component"
                  placeholder="组件位于src下路径，例如：views/main/main.vue"
                >
                  <Icon type="md-create" slot="prepend"></Icon>
                </Input>
              </FormItem>
            </template>
          </template>
          <FormItem prop="permissionCode" label="权限码">
            <Input
              type="text"
              v-model="asyncRoute.permissionCode"
              placeholder="权限码，例如：cscp.user.query"
            >
              <Icon type="md-create" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <Row type="flex" justify="center">
            <Button
              type="primary"
              @click="handleSubmit('asyncRoute')"
              :disabled="isSubmitDisabled"
              >保存</Button
            >
            <Button type="default" @click="cancel">取消</Button>
          </Row>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import iconChange from '../../components/iconChange'
export default {
  data () {
    return {
      props: {
        label: 'title',
        children: 'children'
      },
      currentNode: null,
      asyncDetail: null,
      isSubmitDisabled: false,
      isNodeEdited: false,
      asyncRoute: null,
      ruleAsyncRoute: {
        title: [
          { required: true, message: '请填写路由标题', trigger: 'blur' },
          { max: 30, message: '标题不可以超过30位', trigger: 'blur' }
        ],
        name: [
          {
            required: true,
            message: '请填写路由名',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value.length > 50) {
                callback(new Error('路由名长度不可以超过50位。'))
              }
              let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
              if (!reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入合法的路由名，不能包含中文。'))
              }
            },
            trigger: 'blur'
          }
        ],
        permissionCode: [
          { max: 50, message: '权限码长度不可超过50位。', trigger: 'blur' }
        ],
        url: [
          {
            required: true,
            message: '请填写路由访问路径',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value.length > 100) {
                callback(new Error('路由访问路径长度不可以超过100位。'))
              }
              if (this.asyncRoute.type === 'menu1' && value.substring(0, 1) !== '/') {
                callback(new Error('一级菜单路径必须以/作为开头。'))
              }
              let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
              if (!reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入合法的路由路径，不能包含中文。'))
              }
            },
            trigger: 'blur'
          }
        ],
        component: [
          {
            required: true,
            message: '请填写路由对应的Vue组件',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value.length > 100) {
                callback(new Error('Vue组件长度不可以超过100位。'))
              }
              // if (this.asyncRoute.type === 'menu1' && value !== 'views/main/main.vue') {
              //   callback(new Error('一级菜单路径对应的Vue组件需为\'views/main/main.vue\'。'))
              // }
              let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
              if (!reg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入合法的组件路径，不能包含中文。'))
              }
            },
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择该节点的数据类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    iconChange
  },
  methods: {
    initAsyncRoute () {
      this.asyncRoute = {
        type: '',
        name: '',
        icon: 'ios-folder-outline',
        title: '',
        url: '',
        component: '',
        permissionCode: '',
        parentId: null,
        id: null,
        orderby: 0,
        scollshow: false,
        iconTotal: 0,
        page: 1
      }
    },
    scollListClick (item) {
      this.asyncRoute.icon = item
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
    loadNode (node, resolve) {
      if (node.level === 0) {
        // init root of tree
        let root = {
          id: 0,
          title: '异步路由配置',
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
          '/api/system/menu/getMenu',
          {
            params: {
              parentId
            }
          }
        ]
        this.$http.get(url, httpConfig).then(response => {
          msg()
          resolve(response.data.data)
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
        this.initAsyncRoute()
        this.asyncRoute.parentId = data.parentId === null ? 0 : data.id
      } else if (act === 'update') {
        this.asyncDetail = data.title
        this.asyncRoute = data
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
      const url = `/api/system/menu/deleteMenu/${data.id}`
      this.$http.delete(url).then(() => {
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
          const isAppendNode = this.asyncRoute.id === null
          const msg = this.$Message.loading({
            content: isAppendNode ? '正在添加新节点' : '正在更新节点',
            duration: 0
          })
          const [url, data] = [
            '/api/system/menu/addMenu',
            this.asyncRoute
          ]
          this.$http.put(url, data).then(response => {
            if (isAppendNode) {
              this.asyncRoute.id = Number(response.data.id)
              this.append(this.asyncRoute, this.currentNode)
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
      const url = '/api/system/menu/updateMenu'
      this.$http.put(url, data).catch(() => {
        this.$Message.error('拖拽的节点数据更新失败，请刷新数据重新尝试！')
      })
    },
    append (data, node) {
      this.$refs['async-router-tree'].append(data, node)
    },
    cancel () {
      this.isNodeEdited = false
      this.asyncRoute.title = this.asyncDetail
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      if (dropType !== 'none') {
        // drag success
        this.initPutData(draggingNode, dropNode, dropType)
      }
    },
    allowDrop (draggingNode, dropNode, type) {
      if (draggingNode.data.parentId === 0 && dropNode.data.parentId === 0 && type === 'inner') {
        // 一级菜单节点不允许降为二、三级节点
        return false
      } else if (draggingNode.data.parentId !== 0 && !dropNode.data.parentId) {
        // 非一级节点不允许拖拽成为一级节点
        return false
      } else if (dropNode.data.id === 0) {
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
    this.initAsyncRoute()
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
