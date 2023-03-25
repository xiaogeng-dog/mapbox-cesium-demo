import util from '../libs/util'
/**
 * 配置静态路由
 * 分为两种路由：
 * 1.路由出口在App.vue
 * 2.路由出口在main.vue
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 */

// 1.路由出口在App.vue
const singleRoutes = [
  {
    // 设置初始页面
    path: '',
    name: 'bigscreen1',
    component: () => import('../views/bigscreen/Bigscreen1.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/system-page/login/login.vue'),
    meta: {
      // 密码规则校验开关
      validatePaswd: true
    }
  },
  {
    path: '/update-password',
    name: 'update-password',
    component: () => import('../views/components/update-pswd.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error-pages/404.vue')
  },
  {
    path: '/empty',
    name: 'empty',
    component: () => import('../views/error-pages/empty.vue')
  },
  {
    path: '/bigscreen2',
    name: 'bigscreen2',
    component: () => import('../views/bigscreen/Bigscreen2.vue')
  },
  {
    path: '/bigscreen3',
    name: 'bigscreen3',
    component: () => import('../views/bigscreen/Bigscreen3.vue')
  },
  {
    path: '/bigscreen4',
    name: 'bigscreen4',
    component: () => import('../views/bigscreen/Bigscreen4.vue')
  },
  {
    path: '/bigscreen5',
    name: 'bigscreen5',
    component: () => import('../views/bigscreen/Bigscreen5.vue')
  },
  {
    path: '/bigscreen6',
    name: 'bigscreen6',
    component: () => import('../views/bigscreen/Bigscreen6.vue')
  },
  {
    path: '/bigscreen7',
    name: 'bigscreen7',
    component: () => import('../views/bigscreen/Bigscreen7.vue')
  }, {
    path: '/bigscreen8',
    name: 'bigscreen8',
    component: () => import('../views/bigscreen/Bigscreen8.vue')
  },
  {
    path: '/bigscreenBackup',
    name: 'bigscreenBackup',
    component: () => import('../views/bigscreen/BigscreenBackup.vue')
  }
]

/**
 * 路由出口在main.vue，包括了菜单项和非菜单页面
 * 若该页面属于菜单页面，需要添加type: 'menu'属性
 */
const staticTree = [
  {
    path: '/main',
    name: 'main-home',
    title: '首页',
    icon: 'ios-paper',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   title: '首页',
      //   icon: 'ios-paper',
      //   type: 'menu',
      //   component: () => import('../views/home/home.vue')
      // }
    ]
  }
]
const staticMenuList = util.getMenuList(staticTree)
const staticMainRoutes = util.getMenuRoutes(staticTree)

// 汇总所有的路由
const staticRoutes = [...staticMainRoutes, ...singleRoutes]

export { staticRoutes, staticMenuList, staticTree }
