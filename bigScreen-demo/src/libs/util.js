import axios from 'axios'
import vm from '../main'
import { JSEncrypt } from 'jsencrypt'
import qs from 'qs'

const util = {}
const rsaPubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDP2nBLFOX+0TMh9G1+2wz4hJUPFwmBAIVWq031VzvGp5skYL0e4/1LNm/sgQ0wjME8uwulq0ylDt0Kt1S4V54MkPmkdHHD5AlHLzmlr0bN4kEFkaU9l/slMDNMwxx0KT/1m6ETlg+fX3iaC66wIRijK5FSmvC10fBuuRutqisBEwIDAQAB'
const appsecret = 'kunshanBuilding'
// read env from configs file
const env = window['$env'] ? window['$env'] : process.env.NODE_ENV

// 本地端口
util.baseUrl = env === 'development' ? '/api' : '/tysyq'
// 单点登录跳转登录页面
util.loginUrl = env === 'development' ? 'http://localhost:8080/tysyq_war_exploded/login' : 'http://10.2.14.66:8099/tysyq/login'

// 将需要外挂文件覆盖的属性写在该函数执行前
loadConfigs()

util.http = axios.create({
  baseURL: util.baseUrl,
  timeout: 500000
})

// http请求拦截
util.http.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.token
  config.headers.nowtime = new Date().getTime()
  config.headers.sign = util.encryptPassword(appsecret + config.headers.nowtime)
  config.headers.token = localStorage.getItem('token')
  return config
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error)
})

// http响应拦截
util.http.interceptors.response.use(function (res) {
  // 在这里对返回的数据进行处理
  if (!res.config.url.includes('refreshToken')) {
    // 记录ajax调用的时间
    sessionStorage.lastHttpRequestTime = +new Date()
  }
  return res
}, function (error) {
  console.log('error:', error)
  // Do something with response error
  if (error.response) {
    switch (error.response.status) {
      case 401:
        if (vm.$route.name !== 'login') {
          // 防止重复提示
          vm.$Message.destroy()
          vm.$Message.warning({
            content: '身份认证信息已失效，请重新登录。',
            duration: 2,
            onClose: () => {
              window.location.href = util.loginUrl
            }
          })
        } else {
          return Promise.reject(error)
        }
        break
      case 403:
        vm.$Message.warning({
          content: error.response.data.message,
          duration: 3
        })
        break
      default:
        return Promise.reject(error)
    }
  } else if (error.message) {
    if (error.message === 'Network Error') {
      vm.$Message.error('网络连接错误，请检查网络环境！')
    } else if (error.message.indexOf('timeout') >= 0) {
      vm.$Message.error('网络连接超时，请重试！')
    } else {
      vm.$Message.error(error.message)
    }
  } else {
    vm.$Message.error('知识盲区的错误，联系程序员小哥哥吧！')
  }
})

/**
 * 将请求参数转换为URLSearchParams格式
 * post、put等，axios默认使用json格式，如果需要使用form格式的，调用该函数进行转换
 * data: object
 */
util.formUrlencoded = function (data) {
  return qs.stringify(data)
}

// 定位新打开的页面在pageOpenedList中位置
util.indexOfCurrentPageOpened = function (name, pageOpenedList) {
  for (let index = 0; index < pageOpenedList.length; index++) {
    if (pageOpenedList[index].name === name) {
      return index
    }
  }
  return -1
}

// 初始化header中的面包屑路径
util.initCurrentPath = function (route, routesTree) {
  if (!(routesTree instanceof Array) || routesTree.length === 0) {
    return []
  }
  if (route.name === 'home') {
    return []
  }
  let res = []
  for (let item of routesTree) {
    if (item.children && item.children.length > 0) {
      const temp = getPathOfChild(route, item.children)
      if (temp.done) {
        res = temp.value
        if (item.type === 'menu') {
          res.splice(0, 0, item.title)
        }
        break
      }
    }
  }
  return res
}
function getPathOfChild(route, sourceArr) {
  let res = { value: [], done: false }
  if (!(sourceArr instanceof Array) || sourceArr.length === 0) {
    return res
  }
  const name = route.name
  for (let item of sourceArr) {
    const temp = []
    temp.push(item.title)
    if (name === item.name) {
      return { value: temp, done: true }
    } else {
      if (item.children && item.children.length > 0) {
        const tempRes = getPathOfChild(route, item.children)
        if (tempRes.done) {
          return { value: temp.concat(tempRes.value), done: true }
        }
      }
    }
  }
  return res
}

// 数据加密方法
util.encryptPassword = function (str) {
  if (rsaPubKey) {
    // 对密码进行加密
    let encryptor = new JSEncrypt() // 新建JSEncrypt对象
    encryptor.setPublicKey(rsaPubKey) // 设置公钥
    return encryptor.encrypt(str) // 加密
  } else {
    return str
  }
}

util.getMenuList = function (menus) {
  const tempList = []
  menus.forEach(ele => {
    if (ele.type && ele.type === 'menu') {
      const tempObj = {}
      if (ele.children) {
        tempObj.children = util.getMenuList(ele.children)
      }
      tempObj.name = ele.name
      tempObj.icon = ele.icon || 'ios-cube-outline'
      tempObj.title = ele.title
      tempList.push(tempObj)
    }
  })
  return tempList
}

util.getMenuRoutes = function (tree) {
  const menuRoutes = buildMenuRoutesStep1(tree)
  buildMenuRoutesStep2(menuRoutes)
  buildMenuRoutesStep3(menuRoutes)
  return menuRoutes
}

function buildMenuRoutesStep1(menus) {
  const tempRoutes = []
  menus.forEach(ele => {
    const tempObj = {}
    if (ele.children) {
      tempObj.children = buildMenuRoutesStep1(ele.children)
    }
    tempObj.path = ele.path
    tempObj.name = ele.name
    tempObj.meta = {
      title: ele.title
    }
    tempObj.component = ele.component
    tempRoutes.push(tempObj)
  })
  return tempRoutes
}

function buildMenuRoutesStep2(routes, root) {
  routes.forEach(ele => {
    if (ele.children) {
      // rootEle保存根节点对象
      const rootEle = root || ele
      buildMenuRoutesStep2(ele.children, rootEle)
      if (JSON.stringify(ele) !== JSON.stringify(rootEle)) {
        if (!ele.component) {
          ele.children.forEach(item => {
            // 将二级菜单的信息放入子路由中
            item.meta.parentName = ele.name
          })
        }
        rootEle.children = rootEle.children.concat(ele.children)
        delete ele.children
      }
    }
  })
}

function buildMenuRoutesStep3(routes) {
  routes.forEach((ele, index) => {
    if (ele.children) {
      buildMenuRoutesStep3(ele.children)
    }
    if (!ele.component) {
      routes.splice(index, 1)
    }
  })
}

function loadConfigs() {
  // load api from config file
  Object.keys(window).forEach(key => {
    if (key.startsWith('$')) {
      if (window[key]) {
        util[key.slice(1)] = window[key]
      }
      delete window[key]
    }
  })
}

export default util
