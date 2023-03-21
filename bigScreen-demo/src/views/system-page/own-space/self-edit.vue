
<template>
  <div>
    <Row :gutter="16" type="flex" justify="center" align="top">
      <Col span="24" style="border: #fff 1px solid; margin:5px;">
      <Form ref="userDetailForm" :model="userDetail" :label-width="100" :rules="ruleValidate">
        <Row type="flex" justify="center" :gutter="16">
          <Col span="18">
          <FormItem prop="username" label="用户名">
            <Input type="text" v-model="userDetail.username" placeholder="用户名" disabled>
            <Icon type="md-person" size="14" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem label="登录密码：">
            <Button type="primary" size="small" @click="showEditPassword">修改密码</Button>
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
          <Col span="9">
          <FormItem prop="register_time" label="注册时间">
            <Input type="text" v-model="userDetail.registerTime" placeholder="注册时间" disabled>
            <Icon type="md-time" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem prop="lastLogin" label="最后登录时间">
            <Input type="text" v-model="userDetail.lastLogin" placeholder="最后登录时间" disabled>
            <Icon type="md-time" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          </Col>
          <hr style="margin-bottom:15px;">
          </hr>
          <Col span="18">
          <FormItem prop="roleIds" label="角色">
            <Select ref="roleSelect" v-model="roles" multiple disabled>
              <Option v-for="option in roleOptions" :value="option.value" :key="option.value">{{ option.label }}
              </Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="15">
          <FormItem>
            <Button type="primary" @click="handleSubmit('userDetailForm')" :disabled="isSubmitDisabled">提交</Button>
            <Button type="default" @click="closeMe()" style="margin-left: 8px">返回</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
    <Modal title="设置头像" v-model="modalShow" :mask-closable="false" :closable="false"
      class-name="vertical-center-modal" width="80%">
      <Row :gutter="10" class="image-editor">
        <Col span="14" class="image-editor-con1">
        <div class="cropper" style="max-height:100%;">
          <img id="cropimg1" alt="" :src="avatorUrl">
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
          <ButtonGroup style="margin-left: 16px;">
            <Button @click="cropperZoom(0.1)" type="primary">
              <Icon :size="14" type="md-add"></Icon>
            </Button>
            <Button @click="cropperZoom(-0.1)" type="primary">
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
    <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500" @on-hidden="handlePassword">
      <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
      <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right"
        :rules="passwordValidate">
        <FormItem label="原密码" prop="oldPass" :error="oldPassError">
          <Input v-model.trim="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" type="password" style="width: 346px;"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPass">
          <div style="display: flex;">
            <Input v-model.trim="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" type="password" style="margin-right: 8px;"></Input>
            <Tooltip :content="passwordRule" max-width="320" transfer>
              <Icon type="md-help-circle" color="#ff9900" size="18" />
            </Tooltip>
          </div>
        </FormItem>
        <FormItem label="确认新密码" prop="rePass">
          <Input v-model.trim
                   ="editPasswordForm.rePass" placeholder="请再次输入新密码" type="password" style="width: 346px;"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelEditPass">取消</Button>
        <Button type="primary" @click="saveEditPass" :disabled="isSubmitDisabled">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import '../authority/cropper.min.css'
export default {
  name: 'userDetailEdit',
  data () {
    return {
      isSubmitDisabled: false,
      passwordRule: '',
      avatorUrl: '',
      file: null,
      userDetail: {
        id: null,
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
        roleIds: '',
        roleNames: ''
      },
      roleOptions: [],
      ruleValidate: {
        familyName: [
          {
            required: true,
            message: '姓不能为空！',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '姓不可以超过30位',
            trigger: 'blur'
          }
        ],
        mobile: [{ required: false, message: '请输入正确的手机号码', pattern: /^1[0-9]{10}$/ }],
        email: [{ required: false, message: '请输入正确的邮箱', pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/ },
          { max: 45, message: '邮箱长度不能超过45位' }],
        name: [
          {
            required: true,
            message: '名不能为空！',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '名不可以超过30位',
            trigger: 'blur'
          }
        ],
        discTitle: [{ max: 45, message: '个人描述标题不能超过45位' }],
        discDetail: [{ max: 500, message: '个人描述不能超过500位' }]
      },
      modalShow: false,
      editPasswordModal: false,
      oldPassError: '',
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
      },
      editPasswordForm: {
        oldPass: '',
        newPass: '',
        rePass: ''
      },
      passwordValidate: {
        oldPass: [
          {
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          }
        ],
        newPass: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }
        ],
        rePass: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            validator: this.valideRePassword,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    roles: {
      get () {
        return this.userDetail.roleIds === null ? [] : this.userDetail.roleIds.split(',')
      },
      set () {}
    }
  },
  methods: {
    async init () {
      this.initRoles()
      this.initUserDetail()
      await this.getUserInfo()
      this.getPasswordRule()
    },
    cropperZoom (val) {
      if (this.cropper1.getImageData().naturalWidth < this.cropper1.getImageData().width || val > 0) {
        this.cropper1.zoom(val)
      }
    },
    initUserDetail () {
      this.$http.get('/api/system/cscpCurrentUserDetails').then(response => {
        this.userDetail = response.data
      }).catch()
    },
    showEditPassword () {
      this.editPasswordModal = true
    },
    cancelEditPass () {
      this.editPasswordModal = false
    },
    saveEditPass () {
      this.$refs['editPasswordForm'].validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true
          let msg = this.$Message.loading({
            content: '正在更新密码',
            duration: 0
          })
          const data = {
            userId: this.userDetail.userId,
            oldPassword: this.editPasswordForm.oldPass,
            newPassword: this.editPasswordForm.newPass,
            userName: this.userDetail.username
          }
          this.$http.put('/api/system/cscpUserPassword', data).then(response => {
            msg()
            this.isSubmitDisabled = false
            if (response.data.token) {
              this.$Message.success('更新密码成功！')
              this.editPasswordModal = false
            } else {
              this.$Message.error(`更新密码失败：${response.data.msg}`)
            }
          }).catch(error => {
            msg()
            this.isSubmitDisabled = false
            if (error.response) {
              this.$Message.success('更新密码失败！')
            }
          })
        }
      })
    },
    handlePassword () {
      if (this.oldPassError !== '') {
        this.showEditPassword()
      }
    },
    async handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true
          let msg = this.$Message.loading({
            content: '正在更新信息',
            duration: 0
          })
          const params = Object.assign({}, this.userDetail)
          params.roles = params.roleIds
          const data = {
            cscpUserDetailDTO: params,
            currentUserPwd: '',
            newPassword: '',
            status: '0'
          }
          this.$http.put('/api/system/cscpUserDetails', data).then(response => {
            msg()
            this.getUserInfo()
            this.$Message.success({
              content: '更新信息成功！',
              onClose: () => {
                this.closeMe()
              }
            })
          }).catch(error => {
            msg()
            this.isSubmitDisabled = false
            if (error.response) {
              this.$Message.error(error.response.data.title)
            }
          })
        }
      })
    },
    async getUserInfo () {
      await this.$http.get('/api/system/cscpCurrentUserDetails').then(response => {
        this.$store.commit('user/setUserInfo', response.data)
      }).catch()
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
        toName: 'home'
      })
    },
    handleChange1 (e) {
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
      }
    },
    dataURLtoFile (dataURL, fileName, fileType) {
      var arr = dataURL.split(',')
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], fileName, { type: fileType || 'image/jpg' }) // 返回file对象
    },
    valideRePassword (rule, value, callback) {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    },
    initMounted () {
      let img1 = document.getElementById('cropimg1')
      this.cropper1 = new Cropper(img1, {
        dragMode: 'move',
        preview: '#preview1',
        restore: false,
        center: false,
        highlight: false,
        aspectRatio: 1,
        cropBoxMovable: true,
        toggleDragModeOnDblclick: true,
        viewMode: 1
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
    this.initMounted()
  }
}
</script>

<style lang="less">
@import '../authority/image-editor.less';
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
