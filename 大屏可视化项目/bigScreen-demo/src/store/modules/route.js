/*
 * 路由隐式传参
 */
export default {
  namespaced: true,
  state: {
    params: {}
  },
  mutations: {
    /**
        * @description: 设置指定路由参数
        * @param {Object} state vuex state
        * @param {Object} params params
      */
    setRouteParams (state, params = {}) {
      Object.assign(state.params, params)
    },
    /**
        * @description: 移除指定路由参数
        * @param {Object} state vuex state
        * @param {String} name 路由名
      */
    removeRouteParams (state, name = '') {
      if (name) {
        delete state.params[name]
      }
    },
    /**
        * @description: 清空所有路由参数
        * @param {Object} state vuex state
      */
    clearRouteParams (state) {
      state.params = {}
    }
  }
}
