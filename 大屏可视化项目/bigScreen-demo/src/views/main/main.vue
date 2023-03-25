<style lang="less" scoped>
@import "./main.less";
</style>

<template>
  <div class="main">
    <div
      class="main-sider menu-scrollbar"
      :style="siderStyles"
    >
      <div class="left-top">
        <div
          class="logo"
          :style="logoImgStyles"
        ></div>
        <div
          class="left-title"
          :style="titleStyles"
        >
          <div class="logo-title">市域治理消防专题</div>
        </div>
      </div>

      <!--菜单最多支持三级菜单-->
      <sider-menu-shrinked
        v-if="shrink"
        :menuList="menuList"
      ></sider-menu-shrinked>
      <sider-menu
        v-else
        :menuList="menuList"
        :openNames="openNames"
      ></sider-menu>
    </div>
    <div
      class="main-header"
      :style="otherStyles"
    >
      <header-nav
        :currentPath="currentPath"
        :shrink="shrink"
        @toggleShrink="toggleShrink"
        @showBigScreen="showBigScreen"
      ></header-nav>
      <!-- <tags-nav
        :pageOpenedList="pageOpenedList"
        @closeTags="closeTags"
        @tagSelected="tagSelected"
      ></tags-nav>-->
    </div>
    <div
      class="main-content common-scrollbar"
      :style="otherStyles"
    >
      <keep-alive :include="cache">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      shrink: false
    }
  },
  components: {
    'sider-menu': () => import('./components/sider-menu'),
    'sider-menu-shrinked': () => import('./components/sider-menu-shrinked'),
    'header-nav': () => import('./components/header-nav')
    // 'tags-nav': () => import('./components/tags-nav')
  },
  computed: {
    logoImgStyles() {
      return {
        backgroundImage: `url(${
          this.shrink
            ? require('../../assets/logo.png')
            : require('../../assets/logo.png')
        })`,
        padding: this.shrink ? '11px' : '4px'
      }
    },
    siderStyles() {
      return {
        width: this.shrink ? '64px' : '208px',
        overflow: this.shrink ? 'visible' : 'auto'
      }
    },
    titleStyles() {
      return {
        display: this.shrink ? 'none' : 'flex'
      }
    },
    cache() {
      return this.$store.state.app.cacheList
    },
    otherStyles() {
      return {
        left: this.shrink ? '64px' : '208px'
      }
    },
    menuList() {
      return this.$store.state.app.menuList
    },
    currentPath() {
      return this.$store.state.app.currentPath
    },
    pageOpenedList() {
      return this.$store.state.app.pageOpenedList
    },
    openNames() {
      return this.$store.state.app.currentMenuOpenNames
    }
  },
  watch: {
    $route(to) {
      // 路由变化，更新PageOpenedList
      let index = this.$util.indexOfCurrentPageOpened(
        to.name,
        this.$store.state.app.pageOpenedList
      )
      this.$store.commit('app/setPageOpenedList', { route: to, index })
      // 设置header的面包屑路径
      let currentPathArr = this.$util.initCurrentPath(
        to,
        this.$store.state.app.routesTree
      )
      this.$store.commit('app/setCurrentPath', currentPathArr)
      // 设置左侧菜单的选中项
      this.$store.commit('app/setCurrentMenuOpenNames', to.matched)
    }
  },
  methods: {
    init() {
      this.initWebConfig()
      this.timingRefreshToken()
    },
    initWebConfig() {
      // 初始化PageOpenedList
      this.$store.commit('app/setPageOpenedList')
      // 设置header的面包屑路径
      let currentPathArr = this.$util.initCurrentPath(
        this.$route,
        this.$store.state.app.routesTree
      )
      this.$store.commit('app/setCurrentPath', currentPathArr)
      // 设置左侧菜单的选中项
      this.$store.commit('app/setCurrentMenuOpenNames', this.$route.matched)
    },
    timingRefreshToken() {
      // 定时每1min刷新token，如果时间间隔为半小时，停止刷新token
      if (!sessionStorage.lastHttpRequestTime) {
        sessionStorage.lastHttpRequestTime = +new Date()
      }
      this.tokenInterval = setInterval(() => {
        if (+new Date() - sessionStorage.lastHttpRequestTime > 30 * 60 * 1000) {
          clearInterval(this.tokenInterval)
        } else {
          this.refreshToken()
        }
      }, 60000)
    },
    closeTags(action) {
      let isRemoveSelected
      if (typeof action === 'number') {
        isRemoveSelected = this.$store.state.app.pageOpenedList[action].selected
      }
      this.$store.commit('app/removePageOpenedList', {
        route: this.$route,
        action
      })
      if (isRemoveSelected) {
        // 移除单个tag，导航到最后一个tag的页面
        this.$router.push({
          name: this.$store.state.app.pageOpenedList[
            this.$store.state.app.pageOpenedList.length - 1
          ].name
        })
      } else if (action === 'closeAll') {
        this.$router.push('/home')
      }
    },
    tagSelected(index) {
      if (
        this.$route.name !== this.$store.state.app.pageOpenedList[index].name
      ) {
        this.$router.push({
          name: this.$store.state.app.pageOpenedList[index].name
        })
      }
    },
    refreshToken() {
      const url = `/api/system/refreshToken?rememberme=${localStorage['rememberme']}`
      this.$http
        .get(url)
        .then(response => {
          localStorage.token = response.data.token
        })
        .catch()
    },
    toggleShrink() {
      this.shrink = !this.shrink
    },
    showBigScreen() {
      let url = this.$router.resolve({
        path: '/'
      })
      window.open(url.href, '_blank')
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
    clearInterval(this.tokenInterval)
  }
}
</script>
