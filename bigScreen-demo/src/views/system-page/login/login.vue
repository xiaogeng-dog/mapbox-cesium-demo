<style lang="less" scoped>
@import "./login.less";
</style>

<template>
  <div class="page" @keydown.enter="handleSubmit">
    <div class="login">
      <div class="login-title">南通市域治理消防专题</div>
      <div class="login-con">
        <Card :bordered="false" style="border-radius: 20px;">
          <Tabs style="text-align: center;">
            <TabPane label="账号登录"></TabPane>
            <!-- <TabPane label="短信登录"></TabPane> -->
          </Tabs>
          <!-- <p slot="title">
          <Icon type="md-log-in"></Icon>欢迎登录
          </p>-->
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="userName">
                <Input
                  prefix="ios-person-outline"
                  v-model="form.userName"
                  placeholder="请输入用户名"
                  autocomplete="off"
                >
                  <!-- <span slot="prepend">
                  <Icon :size="16" type="md-person"></Icon>
                  </span>-->
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input
                  type="password"
                  prefix="ios-lock-outline"
                  v-model="form.password"
                  placeholder="请输入密码"
                  autocomplete="off"
                >
                  <!-- <span slot="prepend">
                  <Icon :size="16" type="md-lock"></Icon>
                  </span>-->
                </Input>
              </FormItem>
              <FormItem>
                <SecurityCode
                  :value.sync="value"
                  :biyiCaptchaKey.sync="biyiCaptchaKey"
                  width="260"
                  ref="securityCode"
                ></SecurityCode>
              </FormItem>
            </Form>
            <div
              style="margin-top:-5px;font-size: 0.625rem;display: flex;justify-content: space-between;align-items: center;"
            >
              <Checkbox style="marign-top:10px;" v-model="rememberme" @on-change="setRememberMe">记住我</Checkbox>
              <!-- <div style="    display: flex;justify-content: center;align-items: center;">
                <img
                  src="./icon-help.png"
                  style="width: 16px;height: 16px;"
                /><a style="font-size: 14px;">忘记密码</a>
              </div>-->
            </div>
            <Button
              @click="handleSubmit"
              type="primary"
              style="margin-top:10px;"
              long
              :loading="isLogining"
            >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
          </div>
        </Card>
      </div>
      <!-- <div class="login-bottom">
      <div>苏ICP备10010099号-64 CopyRight 2019 - 2021 JSICT Inc. 中电鸿信信息科技有限公司 版权所有 </div>
      <div>客服专线：400-8288-298</div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { SecurityCode } from 'biyi-captcha'
import { Tabs, TabPane } from 'view-design'
export default {
  data() {
    return {
      isLogining: false,
      loginBtnText: '登录',
      rememberme: null,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      },
      value: '',
      biyiCaptchaKey: ''
    }
  },
  components: {
    SecurityCode,
    Tabs,
    TabPane
  },
  methods: {
    setRememberMe(value) {
      if (value) {
        localStorage['rememberme'] = 1
      } else {
        localStorage['rememberme'] = 0
      }
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isShowModal = true
          this.isLogining = true
          let msg = this.$Message.loading({
            content: '正在登录中',
            duration: 0
          })
          var pswd = this.$util.encryptPassword
            ? this.$util.encryptPassword(this.form.password)
            : this.form.password
          const [url, data, config] = [
            '/api/system/login',
            {
              username: this.form.userName,
              password: pswd,
              rememberme: localStorage['rememberme']
            },
            {
              headers: {
                biyiCaptchaKey: this.biyiCaptchaKey,
                biyiCaptcha: JSON.stringify({
                  code: encodeURIComponent(this.value)
                })
              }
            }
          ]
          this.$http
            .post(url, data, config)
            .then(response => {
              localStorage.token = response.data.token
              msg()
              if (
                this.$route.meta.validatePaswd &&
                response.data.passwordStatus
              ) {
                this.isLogining = false
                this.$Message.warning({
                  content:
                    response.data.passwordStatus === 1
                      ? '初始密码强度较弱，请修改后再重新登录！'
                      : '密码已使用3个月，请修改后再重新登录！'
                })
                this.$byStoreSet('user-info', this.form)
                this.$router.push({ name: 'update-password' })
              } else {
                // localStorage.token = response.data.token
                this.$Message.success({
                  content: '登录成功！',
                  onClose: () => {
                    this.$router.push('/home')
                  }
                })
              }
            })
            .catch(error => {
              msg()
              this.$refs.securityCode.init()
              this.isLogining = false
              if (error.response) {
                switch (error.response.status) {
                  case 401:
                    if (error.response.data.attempts) {
                      this.$Message.error(
                        `登录失败，您还有 ${error.response.data.attempts} 尝试机会！`
                      )
                    } else {
                      const locktime = this.formatLockedTime(
                        error.response.data.lockoutTime
                      )
                      this.$Message.error({
                        content: `登录失败，您的账号已被锁定，请在<span style="font-weight: bold; color: #2d8cf0;">${locktime}</span>后重试！`
                      })
                    }
                    break
                  default:
                    this.$Message.error(
                      `登录失败，${error.response.data.message}！`
                    )
                    break
                }
              }
            })
        }
      })
    },
    formatLockedTime(time) {
      let str = ''
      const d = parseInt(time / (3600 * 24))
      let h = parseInt((time % (3600 * 24)) / 3600)
      let m = parseInt((time % 3600) / 60)
      let s = (time % 3600) % 60
      if (d > 0) {
        str = `${str}${d}天`
      }
      if (h > 0) {
        str = `${str}${h}小时`
      }
      if (m > 0) {
        str = `${str}${m}分`
      }
      if (s > 0) {
        str = `${str}${s}秒`
      }
      return str
    }
  },
  created() {
    this.$store.commit('user/logout')
    if (!localStorage['rememberme']) {
      localStorage['rememberme'] = 0
    }
    this.rememberme = !(localStorage['rememberme'] === '0')
  }
}
</script>
