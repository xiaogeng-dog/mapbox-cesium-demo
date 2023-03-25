<style lang="less" scoped>
@import "./PopoutVideo.less";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animate__animated animate__backInLeft" leave-active-class="animate__animated animate__backOutDown">
    <div class="popout-container" v-if="popoutVideoShow">
      <img src="@/assets/pop-close.png" alt="" class="close-img" @click="close" />
      <div class="title-container">
        <div class="title" @click="show=!show">视频监控</div>
      </div>
      <div class="body-container" @dblclick="fullscreen">
        <CameraItem class="video" :url="cameraUrl" ref="cameraItem"></CameraItem>
      </div>
    </div>
  </transition>

</template>

<script>
import CameraItem from '../../../components/camera-item.vue'
export default {
  name: 'PopoutVideo',
  components: {
    CameraItem
  },
  props: {
    popoutVideoShow: {
      default: false,
      type: Boolean
    },
    cameraUrl: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      // cameraUrl: ''
    }
  },
  mounted() {
    // let id
    // if (Math.random() <= 0.5) {
    //   id = 1
    // } else {
    //   id = 3
    // }
    // this.initCameraUrl(id)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    initCameraUrl(id) {
      this.$http.get('/bigScreen/getCameraUrl?id=' + id).then((res) => {
        this.cameraUrl = res.data.datas.data.url
      })
    },
    fullscreen() {
      this.$emit('fullscreen')
    }
  }
}
</script>
