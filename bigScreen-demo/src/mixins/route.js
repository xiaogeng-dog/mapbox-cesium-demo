/**
 * 路由相关混合
 * */
import { mapState, mapMutations } from 'vuex'
export default {
  // 获取当前的路由参数
  computed: {
    ...mapState('route', {
      params (state) {
        return state.params[this.$route.name]
      }
    })
  },
  methods: {
    ...mapMutations('route', ['removeRouteParams'])
  },
  // 删除当前路由参数
  beforeRouteLeave (to, from, next) {
    // this.removeRouteParams(this.$route.name)
    next()
  }
}
