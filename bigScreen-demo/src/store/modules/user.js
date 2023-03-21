const user = {
  namespaced: true,
  state: {
    userInfo: null
  },
  mutations: {
    logout (state) {
      // 清理账号数据
      this.state.app.menuList = []
      this.state.app.routesTree = []
      this.state.app.btnLimitedCodes = []
      this.state.app.asyncRoutesCompleted = false
      state.userInfo = null
      localStorage.clear()
      sessionStorage.clear()
    },
    setUserInfo (state, info) {
      state.userInfo = info
    }
  }
}

export default user
