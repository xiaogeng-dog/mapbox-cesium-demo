import router from '../../router/router'

const app = {
  namespaced: true,
  state: {
    routesTree: [], // 路由数据原始的关系树
    menuList: [],
    pageOpenedList: [{
      title: '首页',
      name: 'home',
      selected: true
    }],
    currentPath: ['首页'],
    currentMenuOpenNames: [],
    asyncRoutesCompleted: false, // 是否添加过动态路由数据
    btnLimitedCodes: [],
    cacheList: [],
    // 是否第一次打开大屏
    isFirst: true
  },
  mutations: {
    // 添加动态路由
    updateAppRouter(state, routes) {
      router.addRoutes(routes)
      state.asyncRoutesCompleted = true
    },
    // 新增页面添加缓存
    setCacheList(state, cache) {
      if (!state.cacheList.includes(cache)) {
        state.cacheList.push(cache)
      }
    },
    // 删除页面缓存
    removeCacheList(state, cache) {
      state.cacheList = state.cacheList.filter(i => {
        return i != cache
      })
    },
    // 设置左侧菜单数据
    setMenuList(state, menus) {
      state.menuList = state.menuList.concat(menus)
    },
    // 保存路由数据原始的关系树
    setRoutesTree(state, tree) {
      state.routesTree = state.routesTree.concat(tree)
    },
    // 设置PageOpenedList数据
    setPageOpenedList(state, params = null) {
      // 设置前先读取本地保存的打开列表数据
      state.pageOpenedList = sessionStorage.pageOpenedList
        ? JSON.parse(sessionStorage.pageOpenedList) : [{
          title: '首页',
          name: 'home',
          selected: true
        }]
      if (!params) {
        return
      }
      if (params.index === -1) {
        // 新打开一个页面
        state.pageOpenedList.push({
          title: params.route.meta.title,
          name: params.route.name,
          selected: false
        })
        params.index = state.pageOpenedList.length - 1
      }
      // 更新selected值
      for (let i = 0; i < state.pageOpenedList.length; i++) {
        if (params.index === i) {
          state.pageOpenedList[i].selected = true
        } else {
          state.pageOpenedList[i].selected = false
        }
      }
      // 更新下本地新的打开页面列表数据
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 移除PageOpenedList
    removePageOpenedList(state, params = null) {
      console.log('state', state)
      if (!params) {
        return
      }
      if (typeof params.action === 'number') {
        state.pageOpenedList.splice(params.action, 1)
      } else {
        state.pageOpenedList = [{
          title: '首页',
          name: 'home',
          selected: true
        }]
        if (params.action === 'closeOthers' && params.route.name !== 'home') {
          state.pageOpenedList[0].selected = false
          state.pageOpenedList.push({
            title: params.route.meta.title,
            name: params.route.name,
            selected: true
          })
        }
      }
      // 更新下本地新的打开页面列表数据
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 设置当前header上面包屑路径
    setCurrentPath(state, currentPathArr = []) {
      // state.currentPath = ['首页']
      state.currentPath = currentPathArr.length ? currentPathArr : ['首页']
    },
    // 设置当前左侧菜单的openNames属性
    setCurrentMenuOpenNames(state, routeMatched) {
      if (routeMatched.length === 0 || typeof routeMatched[0] === 'string') {
        state.currentMenuOpenNames = routeMatched
      } else {
        state.currentMenuOpenNames = []
        for (const menu of state.menuList) {
          if (menu.name === routeMatched[0].name) {
            state.currentMenuOpenNames.push(menu.name)
            if (routeMatched[1] && routeMatched[1].meta.parentName) {
              state.currentMenuOpenNames.push(routeMatched[1].meta.parentName)
            }
            break
          }
        }
      }
    },
    closePage(state, params) {
      // 移除fromName的tag
      for (let i = 0; i < state.pageOpenedList.length; i++) {
        if (state.pageOpenedList[i].name === params.fromName) {
          state.pageOpenedList.splice(i, 1)
          break
        }
      }
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
      params.vm.$router.push({ name: params.toName })
    },
    // 保存权限码
    setBtnLimitedCodes(state, codes) {
      state.btnLimitedCodes = codes
    },
    setIsFirst(state, isFirst) {
      state.isFirst = isFirst
    }
  }
}

export default app
