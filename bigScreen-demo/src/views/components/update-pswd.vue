<template>
  <div class="update-password">
    <div class="form-wrap">
      <h3>修改密码</h3>
      <Form ref="updatePswd" :model="updatePswd" :rules="ruleUpdatePswd" :label-width="68">
        <FormItem prop="userName" label="账号">
          <Input type="text" v-model="updatePswd.userName" readonly placeholder="请输入账号" style="padding-right: 26px;">
          </Input>
        </FormItem>
        <FormItem prop="oldPassword" label="原密码">
          <Input type="password" v-model="updatePswd.oldPassword" placeholder="请输入原密码" style="padding-right: 26px;">
          </Input>
        </FormItem>
        <FormItem prop="newPassword" label="新密码">
          <div style="display: flex;">
            <Input type="password" v-model="updatePswd.newPassword" placeholder="请输入新密码" style="margin-right: 8px;"></Input>
            <Tooltip :content="passwordRule" max-width="320" transfer>
              <Icon type="md-help-circle" color="#ff9900" size="18" />
            </Tooltip>
          </div>
        </FormItem>
        <FormItem style="padding-right: 26px">
          <Button type="primary" :loading="loading" long @click="handleSubmit('updatePswd')">更新密码</Button>
          <Button style=" margin-top: 8px" long @click="cancel">取消</Button>
        </FormItem>
      </Form>
      <p class="tip">
        <Icon type="md-information-circle" size="18" color="#ff9900" />
        <span>
          您的密码存在一定风险，出于安全考虑，需更新密码后才能继续登录。
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      passwordRule: '',
      loading: false,
      updatePswd: {
        userName: '',
        newPassword: '',
        oldPassword: ''
      },
      ruleUpdatePswd: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        oldPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          this.submit()
        }
      })
    },
    submit () {
      let msg = this.$Message.loading({
        content: '正在更新密码',
        duration: 0
      })
      const [url, data] = [
        '/api/system/cscpUserPassword',
        this.updatePswd
      ]
      this.$http.put(url, data).then(response => {
        msg()
        if (response.data.token) {
          localStorage.token = response.data.token
          this.$Message.success({
            content: '修改密码成功！',
            onClose: () => {
              this.$router.replace('/home')
            }
          })
        } else {
          this.loading = false
          this.$Message.error(`修改失败：${response.data.msg}！`)
        }
      }).catch(err => {
        this.loading = false
        msg()
        this.$Message.error(`修改失败：${err.response.data.msg}！`)
      })
    },
    cancel () {
      this.$router.replace('/home')
    },
    getPasswordRule () {
      this.$http.get('/api/system/cscpUserPasswordRule').then(res => {
        this.passwordRule = res.data
      })
    }
  },
  created () {
    this.getPasswordRule()
    this.updatePswd.userName = this.$byStoreGet('user-info').userName
  }
}

</script>

<style lang="less" scoped>
  .update-password {
    position: relative;
    width: 100%;
    height: 1152px;
    background-color: #f8f8f9;
    .form-wrap {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border-radius: 4px;
      width: 36%;
      min-width: 560px;
      padding: 32px;
      h3 {
        text-align: center;
        margin-bottom: 24px;
        border-bottom: 1px solid #e8eaec;
        padding-bottom: 4px;
      }
      .tip {
        margin-top: 24px;
        color: #808695;
        text-align: center;
      }
    }
  }
</style>
