<style lang="less" scoped>
@import "../../../base.less";
.header-nav {
  display: flex;
  align-items: center;
  height: 64px;
  color: @title-color;
  padding: 0 @padding;
  .bread-crumb {
    flex: 1 1 auto;
    margin-left: 16px;
    text-align: left;
    font-size: 1.25rem;
  }
  .config-wrapper {
    flex: 0 0 320px;
    line-height: 32px;
    text-align: left;
    display: flex;
    align-items: center;
    a {
      i {
        font-size: 1.25rem;
      }
    }
    .dark-a {
      margin-right: 16px;
    }
    .avator-wrapper {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #619fe7;
    }
  }
  li {
    text-align: center;
  }
}
.setting-wrapper {
  header {
    display: flex;
    align-items: center;
    span {
      font-size: .875rem;
      margin-left: 4px;
      font-weight: bold;
    }
  }
  .setting-label {
    font-size: .8125rem;
    margin: 4px 0;
  }
}
</style>

<template>
  <div class="header-nav">
    <Icon type="ios-menu-outline" style="cursor: pointer;" size="32" :style="styles" @click="toggleShrink"/>
    <div class="bread-crumb">
      <Breadcrumb>
        <BreadcrumbItem
          v-for="(path, index) in currentPath"
          :key="index"
          style="font-size: .875rem;"
        >{{path}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="config-wrapper clear-float">
      <a class="dark-a" href="javascript:void(0)" @click="toggleFullScreen">
        <Tooltip :content="isFullScreen ? $t('header.exitFullscreen') : $t('header.fullScreen')" placement="bottom">
          <Icon :type="isFullScreen ? 'md-contract' : 'md-expand'" :size="23"></Icon>
        </Tooltip>
      </a>
      <a href="javascript:void(0)" @click="showBigScreen">大屏</a>
      <!-- <Dropdown @on-click="setLang">
        <a href="javascript:void(0)">
          {{$t('header.langLabel')}}
          <Icon type="md-arrow-dropdown" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="zh_CN">{{this.$t('header.zhTip')}}</DropdownItem>
          <DropdownItem name="en_US">{{this.$t('header.enTip')}}</DropdownItem>
          <DropdownItem name="ja_JP">{{this.$t('header.jaTip')}}</DropdownItem>
          <DropdownItem name="ko_KR">{{this.$t('header.koTip')}}</DropdownItem>
        </DropdownMenu>
      </Dropdown> -->
      <Dropdown class="avator-wrapper" style="margin-left: 20px" @on-click="handleUserAction">
        <a href="javascript:void(0)">
            {{userName}}
          <Icon type="md-arrow-dropdown" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="userCenter">{{$t('header.userCenter')}}</DropdownItem>
          <DropdownItem name="logout">{{$t('header.logout')}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <img class="avatar" :src="avatorUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      browserKernel: '',
      canFullScreen: false,
      isFullScreen: false
    }
  },
  props: {
    currentPath: {
      type: Array,
      default: () => ['首页']
    },
    shrink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userName () {
      if (this.$store.state.user.userInfo !== null) {
        return `${this.$store.state.user.userInfo.familyName}${this.$store.state.user.userInfo.name}`
      } else {
        return ''
      }
    },
    avatorUrl () {
      if (this.$store.state.user.userInfo !== null) {
        return this.$store.state.user.userInfo.imgPath != null ? this.$store.state.user.userInfo.imgPath : require('@/assets/blank.png')
      } else {
        return ''
      }
    },
    styles () {
      return {
        transform: this.shrink ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'all 0.3s ease-in-out'
      }
    }
  },
  methods: {
    init () {
      this.getUserInfo()
    },
    getUserInfo () {
      this.$http.get('/api/system/cscpCurrentUserDetails').then(response => {
        this.$store.commit('user/setUserInfo', response.data)
      }).catch()
    },
    openSetting () {
      this.isSettingOpened = true
    },
    setLang (lang) {
      this.$i18n.locale = lang
    },
    toggleFullScreen () {
      if (this.canFullScreen) {
        if (this.isFullScreen) {
          // 关闭全屏
          this.exitFullScreen()
          this.isFullScreen = false
        } else {
          // 打开全屏
          this.requestFullScreen(document.body)
          this.isFullScreen = true
        }
      } else {
        this.$Message.warning({
          content: '当前浏览器暂不支持全屏模式，请切换浏览器后重新尝试！',
          duration: 3
        })
      }
    },
    requestFullScreen (element) {
      // 判断各种浏览器，找到正确的方法
      const requestMethod = element.requestFullScreen || // W3C
        element.webkitRequestFullScreen || // Chrome, safari
        element.mozRequestFullScreen || // FireFox
        element.msRequestFullscreen // IE11
      if (requestMethod) {
        requestMethod.call(element)
      }
    },
    exitFullScreen () {
      var exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // FireFox
        document.webkitExitFullscreen || // Chrome等
        document.msExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      }
    },
    addFullScreenListener () {
      const self = this
      document.onkeydown = function (e) {
        if (e && e.keyCode === 122) { // 捕捉F11键盘动作
          e.preventDefault() // 阻止F11默认动作
          self.toggleFullScreen()
        }
      }
      // 监听不同浏览器的全屏事件，并件执行相应的代码
      switch (self.browserKernel) {
        case 'webkit':
          document.onwebkitfullscreenchange = function () {
            if (document.webkitIsFullScreen) {
              self.isFullScreen = true
            } else {
              self.isFullScreen = false
            }
          }
          break
        case 'gecko':
          document.onmozfullscreenchange = function () {
            if (document.mozFullScreen) {
              self.isFullScreen = true
            } else {
              self.isFullScreen = false
            }
          }
          break
        case 'trident':
          document.onmsfullscreenchange = function () {
            if (document.msFullscreenElement) {
              self.isFullScreen = true
            } else {
              self.isFullScreen = false
            }
          }
          break
        case 'others':
          document.onfullscreenchange = function () {
            if (document.fullscreen) {
              self.isFullScreen = true
            } else {
              self.isFullScreen = false
            }
          }
          break
        default:
          break
      }
    },
    handleUserAction (action) {
      switch (action) {
        case 'logout':
          this.$router.push('/login')
          break
        case 'userCenter':
          this.$router.push({ name: 'self-edit' })
          break
        default:
          break
      }
    },
    toggleShrink () {
      this.$emit('toggleShrink')
    },
    //打开大屏
    showBigScreen () {
      this.$emit('showBigScreen')
    }
  },
  created () {
    this.init()
    // 检查浏览器是否支持全屏
    this.canFullScreen = document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    if (document.webkitFullscreenEnabled) {
      this.browserKernel = 'webkit'
    } else if (document.mozFullScreenEnabled) {
      this.browserKernel = 'gecko'
    } else if (document.msFullscreenEnabled) {
      this.browserKernel = 'trident'
    } else if (document.fullscreenEnabled) {
      this.browserKernel = 'others'
    }
    if (this.canFullScreen) {
      this.addFullScreenListener()
    }
  },
  destroyed () {
    document.onkeydown = null
    switch (this.browserKernel) {
      case 'webkit':
        document.onwebkitfullscreenchange = null
        break
      case 'gecko':
        document.onmozfullscreenchange = null
        break
      case 'trident':
        document.onmsfullscreenchange = null
        break
      case 'others':
        document.onfullscreenchange = null
        break
      default:
        break
    }
  }
}
</script>
