<template>
  <div>
    <Row :gutter="16" type="flex" justify="center" align="top">
      <Col span="24" style="border: #fff 1px solid; margin:5px;">
        <Form ref="workGroupForm" :model="workGroup" :label-width="100" :rules="ruleValidate">
          <Row type="flex" justify="center" :gutter="16">
            <Col span="18">
              <FormItem prop="title" label="ID" style="display:none;">
                <Input type="text" v-model="workGroup.id" placeholder="ID" disabled>
                </Input>
              </FormItem>
              <FormItem prop="groupName" label="工作组名称">
                <Input type="text" v-model.trim="workGroup.groupName" placeholder="工作组名称">
                <Icon type="md-people" size="16" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="description" label="描述">
                <Input type="text" v-model.trim="workGroup.description" placeholder="工作组描述">
                <Icon type="md-create" size="16" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="orgId" label="部门ID" style="display:none;">
                <Input type="text" v-model="workGroup.orgId" placeholder="部门ID">
                </Input>
              </FormItem>
              <FormItem prop="users" label="人员">
                <Select ref="userSelect" v-model="workGroup.users"
                  multiple
                  filterable
                  @on-change="userChange">
                  <Option v-for="(option, index) in userOptions" :value="option.value" :key="option.value + index">
                    {{option.label}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Row type="flex" justify="center" style="margin-top: 16px;">
              <Button type="primary" @click="handleSubmit('workGroupForm')" :disabled="isSubmitDisabled">提交</Button>
              <Button type="default" @click="handleReset()" style="margin: 0 16px">重置</Button>
              <Button type="default" @click="handleCancel">返回</Button>
            </Row>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'workGroupEdit',
  data () {
    let validateworkGroupName = (rule, value, callback) => {
      let pattern = new RegExp("[`~!@#$^&*()=|{}%':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      if (pattern.test(value) || value.length > 50) {
        callback(new Error('工作组名称不可以超过50位，且不允许存在特殊字符！'))
        return
      }
      const [url, httpConfig] = [
        '/api/validation/workGroup',
        {
          params: { name: value }
        }
      ]
      if (value !== this.workGroupName) {
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
      workGroupId: null,
      isSubmitDisabled: false,
      workGroupName: null,
      workGroup: {
        id: null,
        groupName: null,
        description: null,
        orgId: null,
        users: [],
        usersObj: []
      },
      userOptions: [],
      ruleValidate: {
        groupName: [{ required: true, message: '工作组名称不能为空!', trigger: 'blur' },
          { validator: validateworkGroupName, trigger: 'blur' }],
        description: [{ required: true, message: '描述不能为空', trigger: 'blur' },
          { max: 50, message: '描述不可以超过50位', trigger: 'blur' }],
        users: [{ required: true, type: 'array', message: '人员不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    init () {
      this.handleReset()
      this.remoteUserMethod('')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const msg = this.$Message.loading({
            content: this.workGroupId !== null ? '正在更新工作组' : '正在创建新工作组',
            duration: 0
          })
          this.isSubmitDisabled = true
          const [method, url, data] = [
            (this.workGroupId !== null) ? 'put' : 'post',
            '/api/system/cscpWorkGroups',
            {
              id: this.workGroup.id,
              groupName: this.workGroup.groupName,
              description: this.workGroup.description,
              orgId: this.workGroup.orgId,
              userDetail: this.workGroup.usersObj
            }
          ]
          const httpConfig = { method, url, data }
          this.$http(httpConfig).then(response => {
            msg()
            this.$Message.success({
              content: (this.workGroupId !== null) ? '更新工作组成功！' : '新建工作组成功！',
              onClose: () => {
                this.closeMe()
              }
            })
          }).catch(error => {
            msg()
            this.isSubmitDisabled = false
            if (error.response) {
              this.$Message.error((this.workGroupId !== null) ? '更新工作组失败！' : '新建工作组失败！')
            }
          })
        }
      })
    },
    handleReset () {
      if (this.$route.name === 'workgroup-edit') {
        this.workGroupId = this.$byStoreGet('workgroup-edit').id
        this.getData(this.workGroupId)
      } else {
        this.workGroup = {
          id: null,
          groupName: null,
          description: null,
          orgId: null,
          users: [],
          usersObj: []
        }
      }
    },
    getData (id) {
      this.isSubmitDisabled = true
      const msg = this.$Message.loading({
        content: '正在获取数据',
        duration: 0
      })
      this.$http.get(`/api/system/cscpWorkGroups/${id}`).then(response => {
        this.workGroup.id = response.data.id
        this.workGroupName = response.data.groupName
        this.workGroup.groupName = response.data.groupName
        this.workGroup.description = response.data.description
        this.workGroup.users = response.data.userDetail.map(el => el.userId)
        msg()
        this.isSubmitDisabled = false
      }).catch(error => {
        msg()
        this.isSubmitDisabled = false
        if (error.response) {
          this.$Message.error('数据获取失败！')
        }
      })
    },
    closeMe () {
      this.$store.commit('app/closePage', {
        vm: this,
        fromName: this.$route.name,
        toName: 'workgroup-management'
      })
    },
    remoteUserMethod (query) {
      const [url, httpConfig] = [
        '/api/system/cscpUserDetailsOr',
        {
          params: {
            page: 0,
            size: 1000,
            username: query,
            familyName: query,
            name: query,
            mobile: query,
            email: query,
            discTitle: query,
            discDetail: query
          }
        }
      ]
      this.$http.get(url, httpConfig).then(response => {
        const op = []
        for (let item of response.data.data) {
          op.push({
            value: item.userId,
            label: `${item.familyName} ${item.name} (${item.username}) (${item.mobile ? item.mobile : '暂无号码'})`
          })
        }
        this.userOptions = op
      }).catch()
    },
    userChange (data) {
      const tempArr = [...new Set(this.workGroup.usersObj.concat(data))]
      this.workGroup.usersObj = []
      for (let ele of tempArr) {
        if (data.includes(ele)) {
          this.workGroup.usersObj.push({
            userId: ele
          })
        }
      }
    },
    handleCancel () {
      this.$store.commit('app/closePage', {
        vm: this,
        fromName: this.$route.name,
        toName: 'workgroup-management'
      })
    }
  },
  created () {
    this.init()
  }
}

</script>

<style></style>
