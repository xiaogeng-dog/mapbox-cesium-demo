import Vue from 'vue'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './app.vue'
import util from './libs/util'
import router from './router/router'
import store from './store/store'
import VueI18n from 'vue-i18n'
import localeI18n from './i18n/index'
import ButtonLimited from './views/components/button-limited'
import byStore from 'biyi-store'
import { Tree, Calendar } from 'element-ui'
import 'animate.css'

import {
  iconList
} from './libs/icon.js'
Vue.prototype.$iconList = iconList
Vue.config.productionTip = false
Vue.prototype.$util = util
Vue.prototype.$http = util.http

Vue.use(VueI18n)
Vue.use(byStore)
Vue.use(Tree)
Vue.use(Calendar)
Vue.use(iView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})

Vue.component('Button', ButtonLimited)

Vue.locale = () => { }

const i18n = new VueI18n(localeI18n)

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default vm
