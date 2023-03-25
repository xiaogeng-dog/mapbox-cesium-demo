import Vue from 'vue'
import iView from 'view-design'
import Router from 'vue-router'
import { staticRoutes, staticMenuList, staticTree } from './static-routes'
import store from '../store/store'
import initAsyncRouter from './async-router'

// Uncaught (in promise) NavigationDuplicated解决方法
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routerConfig = {
  routes: [
    ...staticRoutes
  ]
}

const createRouter = () => new Router(routerConfig)
const router = createRouter()

export default router

router.beforeEach((to, from, next) => {
  if (window.location.href === 'https://dx.kseysj.com:10000/#/' && to.fullPath !== '/empty') {
    router.push({ path: '/empty' })
    return
  }

  iView.LoadingBar.start()
  getTargetComponent(to.matched[0]).then(target => {
    navigate(target, to, next)
  }).catch(err => {
    console.log(new Error('function getTargetComponent error!'))
    console.log(err)
  })
})

router.afterEach(() => {
  iView.LoadingBar.finish()
})

function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

function getTargetComponent(argu) {
  return new Promise((resolve, reject) => {
    try {
      if (!argu) {
        resolve(null)
      }
      if (typeof argu.components.default === 'function') {
        argu.components.default().then(res => {
          resolve(res.default.name)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(argu.components.default.name)
      }
    } catch (error) {
      reject(error)
    }
  })
}

function navigate(target, to, next) {
  if (to.fullPath === '/' || to.fullPath === '/bigscreen2' || to.fullPath === '/bigscreen3') {
    // 大屏暂定不用登录
    next()
  } else if ((target === 'Main' || target === null) && !store.state.app.asyncRoutesCompleted) {
    // 初始化静态菜单
    store.commit('app/setMenuList', staticMenuList || [])
    // 保存静态路由数据原始的关系树
    store.commit('app/setRoutesTree', staticTree || [])
    // 重新获取异步菜单和权限数据
    initAsyncRouter().then(menus => {
      next(router.resolve(to).route.fullPath)
    }).catch(() => {
      next('/login')
    })
  } else {
    if (to.matched.length > 0) {
      if (to.path === '/login') {
        resetRouter()
      }
      next()
    } else {
      next('/404')
    }
  }
}
