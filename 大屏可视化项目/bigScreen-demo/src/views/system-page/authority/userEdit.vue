<template>
  <div>
    <Row :gutter="16" type="flex" justify="center" align="top">
      <Col span="24" style="border: #fff 1px solid; margin:5px;">
      <Form ref="userDetailForm" :model="userDetail" :label-width="120" :rules="ruleValidate">
        <Row type="flex" justify="center" :gutter="16">
          <Col span="18">
          <FormItem prop="username" label="用户名">
            <Input type="text" v-model.trim="userDetail.username" placeholder="用户名" :disabled="!usernameEditable">
            <Icon type="md-person" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem prop="familyName" label="姓">
            <Input type="text" v-model.trim="userDetail.familyName" placeholder="姓">
            <Icon type="md-person" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem prop="name" label="名">
            <Input type="text" v-model.trim="userDetail.name" placeholder="名">
            <Icon type="md-person" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem prop="mobile" label="手机">
            <Input type="text" v-model="userDetail.mobile" placeholder="手机">
            <Icon type="md-call" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem prop="email" label="电子邮件">
            <Input type="text" v-model="userDetail.email" placeholder="电子邮件">
            <Icon type="md-mail" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem prop="imgPath" label="头像">
            <Input type="text" v-model="userDetail.imgPath" placeholder="头像" style="display:none">
            </Input>
            <Row type="flex" justify="start" align="middle">
              <img :src="userDetail.imgPath"
                style="width:32px;height:32px;background: #619fe7;margin: 0 10px;border-radius:50%;">
              <Button type="primary" shape="circle" icon="md-add" @click="showModal()"></Button>
            </Row>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem prop="discTitle" label="个人描述标题">
            <Input type="text" v-model="userDetail.discTitle" placeholder="个人描述标题">
            <Icon type="md-create" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem prop="discDetail" label="个人描述">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 10}" v-model="userDetail.discDetail"
              placeholder="个人描述">
            </Input>
          </FormItem>
          </Col>
          <Col span="9" v-if="userId !== null">
          <FormItem prop="registerTime" label="注册时间">
            <Input type="text" :value="formatTime(userDetail.registerTime)" placeholder="注册时间" disabled>
            <Icon type="md-time" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="9" v-if="userId !== null">
            <FormItem prop="lastLogin" label="最后登录时间">
              <Input type="text" :value="formatTime(userDetail.lastLogin)" placeholder="最后登录时间" disabled>
                <Icon type="md-time" size="14" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
          <hr style="margin-bottom:15px;">
          </hr>
          <Col span="18">
            <FormItem prop="roles" label="角色">
              <Select ref="roleSelect" v-model="userDetail.roles" multiple>
                <Option v-for="option in roleOptions" :value="option.value" :key="option.value">{{ option.label }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <hr style="margin-bottom:15px;">
          </hr>
          <template v-if="userId !== null">
            <!--用于避免表单自动填充用户名密码-->
            <FormItem prop="currentUserPwd1" label="新密码1" style="position:fixed;z-index:-10000;width:0;border:none">
              <Input type="text" v-model="userDetail.newPassword1" placeholder="输入新密码">
                <Icon type="md-lock" size="14" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <Col span="9">
              <FormItem prop="newPassword" label="新密码">
                <div style="display: flex;">
                  <Input type="password"  style='width:0;opacity:0;'/>
                  <Input type="password" v-model="newPassword" placeholder="输入新密码" style="margin-right: 8px;">
                    <Icon type="md-lock" size="14" slot="prepend"></Icon>
                  </Input>
                  <Tooltip :content="passwordRule" max-width="320" transfer>
                    <Icon type="md-help-circle" color="#ff9900" size="18" />
                  </Tooltip>
                </div>
              </FormItem>
            </Col>
            <!--用于避免表单自动填充用户名密码-->
            <FormItem prop="currentUserPwd1" label="当前登录密码1" style="position:fixed;z-index:-10000;width:0;border:none">
              <Input type="text" v-model="userDetail.currentUserPwd1" placeholder="输入新密码">
                <Icon type="md-lock" size="14" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <Col span="9">
              <FormItem prop="currentUserPwd" label="当前登录密码">
                <Input type="password" v-model="userDetail.currentUserPwd" placeholder="输入当前登录账号的密码">
                  <Icon type="md-lock" size="14" slot="prepend"></Icon>
                </Input><span style="color:#ed3f14;" v-if="currentPasswordError">登录密码错误，请重新填写！</span>
              </FormItem>
            </Col>
          </template>
        </Row>
        <Row type="flex" justify="center" style="margin-top: 16px;">
          <Button type="primary" @click="handleSubmit('userDetailForm')" :disabled="isSubmitDisabled">提交</Button>
          <Button type="default" @click="handleReset" style="margin: 0 16px">重置</Button>
          <Button type="default" @click="closeMe()">返回</Button>
        </Row>
      </Form>
      </Col>
    </Row>
    <Modal title="设置头像" v-model="modalShow" :mask-closable="false" :closable="false"
      class-name="vertical-center-modal" width="80%">
      <Row :gutter="10" class="image-editor">
        <Col span="14" class="image-editor-con1">
        <div class="cropper" style="max-height:100%;">
          <img id="cropimg1" alt="">
        </div>
        </Col>
        <Col span="10" class="image-editor-con1">
        <Row type="flex" justify="center" align="middle" class="image-editor-con1-preview-con">
          <div id="preview1"></div>
        </Row>
        <div class="image-editor-con1-btn-con margin-top-10">
          <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1"
            id="fileinput1" class="fileinput" />
          <label class="filelabel" for="fileinput1">
            <Icon type="md-image" size="20"></Icon>&nbsp;选择图片
          </label>
          <ButtonGroup style="margin-left: 16px;" v-if="zoomBoolean">
            <Button @click="cropper1.zoom(0.1)" type="primary">
              <Icon :size="14" type="md-add"></Icon>
            </Button>
            <Button @click="cropper1.zoom(-0.1)" type="primary">
              <Icon :size="14" type="md-remove"></Icon>
            </Button>
          </ButtonGroup>
        </div>
        </Col>
      </Row>
      <div slot="footer">
        <Row type="flex" justify="end">
          <Button type="default" @click="handleCancelCrop">取消</Button>
          <Button type="primary" @click="handlecrop1">确定</Button>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import moment from 'moment'
import './cropper.min.css'

export default {
  name: 'userDetailEdit',
  data () {
    // 自定义校验
    const validateUserName = (rule, value, callback) => {
      if (!this.usernameEditable) {
        callback()
        return
      }
      let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      if (pattern.test(value)) {
        callback(new Error('用户名称不允许存在特殊字符！'))
        return
      }
      if (value.length > 50) {
        callback(new Error('用户名称长度不允许超过50位！'))
        return
      }
      // 检查用户名是否存在
      const [url, httpConfig] = [
        '/api/system/cscpUserExistByUsername',
        {
          params: { username: this.userDetail.username }
        }
      ]
      this.$http.get(url, httpConfig).then(response => {
        if (response.data.success) {
          callback(new Error('当前账号已存在，请重新输入！'))
        } else {
          callback()
        }
      }).catch(() => {
        callback(new Error('异步校验出错！'))
      })
    }
    return {
      passwordRule: '',
      currentPasswordError: false,
      userId: null,
      usernameEditable: true,
      isSubmitDisabled: false,
      file: null,
      zoomBoolean: false,
      userDetail: {},
      newPassword: '',
      // roles: [],
      roleOptions: [],
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空！', trugger: 'blur' },
          { validator: validateUserName, trigger: 'blur' }
        ],
        familyName: [{ required: true, message: '姓不能为空！', trigger: 'blur' },
          { max: 30, trigger: 'blur', message: '姓长度不可以超过30位！' }],
        name: [{ required: true, message: '名不能为空！', trigger: 'blur' },
          { max: 30, trigger: 'blur', message: '名长度不可以超过30位！' }],
        mobile: [{ required: false, message: '请输入正确的手机号码', pattern: /^1[0-9]{10}$/ }],
        email: [{ required: false, message: '请输入正确的邮箱', pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/ },
          { max: 45, message: '邮箱长度不能超过45位' }],
        currentUserPwd: [{ required: true, message: '当前登录密码不能为空', trigger: 'blur' },
          { max: 15, message: '密码长度不能超过15位' }],
        discTitle: [{ max: 45, message: '个人描述标题不能超过45位' }],
        discDetail: [{ max: 500, message: '个人描述不能超过500位' }],
        roles: [{ required: true, message: '角色不能为空！', trigger: 'blur', type: 'array' }]
      },
      modalShow: false,
      cropper1: {},
      option1: {
        showCropedImage: false,
        cropedImg: ''
      },
      cropdata1: {
        x: '',
        y: '',
        w: '',
        h: '',
        deg: '',
        scaleX: '',
        scaleY: ''
      }
    }
  },
  computed: {
    roles () {
      return this.userDetail.roles
    }
  },
  methods: {
    init () {
      this.initRoles()
      this.handleReset()
      this.getPasswordRule()
    },
    async getUserInfo () {
      await this.$http.get('/api/system/cscpCurrentUserDetails').then(response => {
        this.$store.commit('user/setUserInfo', response.data)
      }).catch()
    },
    formatTime (time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSubmit: function (name) {
      this.isSubmitDisabled = true
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.userDetail)
          params.roles = this.userDetail.roles.join()
          delete params.roleIds
          delete params.roleNames
          let data = null
          if (this.userId !== null) {
            data = {
              cscpUserDetailDTO: params,
              currentUserPwd: params.currentUserPwd,
              newPassword: this.newPassword,
              status: '1'
            }
            delete params.currentUserPwd
          } else {
            data = params
          }
          const url = '/api/system/cscpUserDetails'
          this.submitUserDetails(this.userId, url, data)
        } else {
          this.isSubmitDisabled = false
        }
      })
    },
    dataURLtoFile (dataURL, fileName, fileType) {
      var arr = dataURL.split(',')
      var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], fileName, { type: fileType || 'image/jpg' }) // 返回file对象
    },
    submitUserDetails (userId, url, data) {
      let msg = this.$Message.loading({
        content: (this.userId !== null) ? '正在更新用户' : '正在创建新用户',
        duration: 0
      })
      if (userId !== null) {
        this.currentPasswordError = false
        this.$http.put(url, data).then(resposne => {
          this.getUserInfo()
          msg()
          this.$Message.success({
            content: (this.userId !== null) ? '更新用户成功！' : '新建用户成功！',
            onClose: () => {
              this.closeMe()
            }
          })
        }).catch(error => {
          msg()
          this.isSubmitDisabled = false
          if (error.response) {
            if (error.response.data.detail === '管理员密码不正确！') {
              this.currentPasswordError = true
              this.$Message.error('当前登录密码填写错误！')
            } else {
              this.$Message.error(error.response.data.detail)
            }
          }
        })
      } else {
        this.$http.post(url, data).then(resposne => {
          msg()
          this.$Message.success({
            content: (this.userId !== null) ? '更新用户成功！' : '新建用户成功！',
            onClose: () => {
              this.closeMe()
            }
          })
        }).catch(error => {
          msg()
          this.isSubmitDisabled = false
          if (error.response) {
            this.$Message.error((this.userId !== null) ? '更新用户失败！' : '新建用户失败！')
          }
        })
      }
    },
    handleReset () {
      if (this.$route.name === 'user-edit') {
        this.usernameEditable = false
        this.userId = this.$byStoreGet('user-edit').id
        this.getData(this.userId)
      } else {
        this.userDetail = {
          id: null,
          did: null,
          username: null,
          familyName: null,
          name: null,
          mobile: null,
          email: null,
          imgPath: null,
          lastLogin: null,
          discTitle: null,
          discDetail: null,
          registerTime: null,
          roleIds: [],
          roleNames: [],
          currentUserPwd: '',
          roles: []
        }
      }
    },
    getData (userId) {
      if (!userId) {
        return
      }
      let msg = this.$Message.loading({
        content: '正在获取用户信息',
        duration: 0
      })
      const [url, httpConfig] = [
        '/api/system/cscpUserDetailsByUserId',
        {
          params: { userId }
        }
      ]
      this.$http.get(url, httpConfig).then(response => {
        response.data.currentUserPwd = ''
        this.userDetail = response.data
        this.userDetail.roles = response.data.roleIds === null ? [] : response.data.roleIds.split(',')
        msg()
      }).catch(error => {
        msg()
        if (error.response) {
          this.$Message.error('获取用户信息失败！')
        }
      })
    },
    initRoles () {
      const [url, httpConfig] = [
        '/api/system/cscpRolessByCriteria',
        {
          params: { size: 1000 }
        }
      ]
      this.$http.get(url, httpConfig).then(response => {
        this.roleOptions = []
        for (const item of response.data.data) {
          this.roleOptions.push({
            value: item.id.toString(),
            label: item.name,
            icon: item.icon
          })
        }
      }).catch()
    },
    closeMe () {
      this.$store.commit('app/closePage', {
        vm: this,
        fromName: this.$route.name,
        toName: 'user-management'
      })
    },
    handleChange1 (e) {
      // eslint-disable-next-line no-unused-expressions
      e ? this.zoomBoolean = !!e : ''
      let file = e ? e.target.files[0] : this.file
      let reader = new FileReader()
      reader.onload = () => {
        this.cropper1.replace(reader.result)
        reader.onload = null
      }
      reader.readAsDataURL(file)
    },
    handlecrop1 () {
      if (!this.cropper1.getCroppedCanvas()) {
        return
      }
      let file = this.cropper1.getCroppedCanvas().toDataURL()
      if (file.length > 250 * 1024) {
        this.$Message.warning('选择的区域太大，超过了250K。请缩小选择区域！')
        return
      }
      this.option1.cropedImg = file
      this.userDetail.imgPath = file
      this.modalShow = false
    },
    handleCancelCrop () {
      this.modalShow = false
    },
    showModal () {
      this.modalShow = true
      if (this.userDetail.imgPath) {
        this.file = this.dataURLtoFile(this.userDetail.imgPath, 'portrait')
        this.handleChange1()
        this.zoomBoolean = true
      } else {
        this.zoomBoolean = false
      }
    },
    getPasswordRule () {
      this.$http.get('/api/system/cscpUserPasswordRule').then(res => {
        this.passwordRule = res.data
      })
    }
  },
  created () {
    this.init()
  },
  mounted () {
    let img1 = document.getElementById('cropimg1')
    this.cropper1 = new Cropper(img1, {
      dragMode: 'move',
      preview: '#preview1',
      restore: false,
      center: false,
      highlight: false,
      aspectRatio: 1,
      cropBoxMovable: true,
      toggleDragModeOnDblclick: true
    })
    img1.addEventListener('crop', e => {
      this.cropdata1.x = parseInt(e.detail.x)
      this.cropdata1.y = parseInt(e.detail.y)
      this.cropdata1.w = parseInt(e.detail.width)
      this.cropdata1.h = parseInt(e.detail.height)
      this.cropdata1.deg = parseInt(e.detail.rotate)
      this.cropdata1.scaleX = parseInt(e.detail.scaleX)
      this.cropdata1.scaleY = parseInt(e.detail.scaleY)
    })
  }
}
</script>

<style lang="less">
@import './image-editor.less';
@import '../../styles/common.less';

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
