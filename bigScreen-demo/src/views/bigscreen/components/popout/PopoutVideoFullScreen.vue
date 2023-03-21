<style lang="less" scoped>
@import "./PopoutVideoFullScreen.less";
</style>
<template>
  <div v-if="show" class="main-container" @dblclick="close">
    <CameraItem class="video" :url="cameraUrl" ref="cameraItem"></CameraItem>
  </div>
</template>

<script>
import CameraItem from '../../../components/camera-item.vue'
export default {
  name: 'PopoutVideoFullScreen',
  components: {
    CameraItem
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    cameraUrl: {
      default: '',
      type: String
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close')
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$Message.info({
          content: '加载中...',
          duration: 5
        })
      }
    }
  }
}
</script>
