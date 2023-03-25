<style lang="less" scoped>
@import "./PopoutVideoMove.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div
      class="popout-container"
      v-if="popoutVideoShow"
    >
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div class="title">视频监控</div>
      </div>
      <div class="body-container">
        <div
          class="window"
          id="window"
        >
          <CameraItem
            class="video"
            id="videoitem"
            :style="videoStyle"
            :url="cameraUrl"
          ></CameraItem>
        </div>
        <div class="button-container">
          <Button
            icon="md-arrow-dropleft"
            @mousedown.native="move('left')"
            @mouseup.native="cancel()"
            @mouseleave.native="cancel()"
          ></Button>
          <Button
            icon="md-arrow-dropup"
            @mousedown.native="move('up')"
            @mouseup.native="cancel()"
            @mouseleave.native="cancel()"
          ></Button>
          <Button
            icon="md-arrow-dropdown"
            @mousedown.native="move('down')"
            @mouseup.native="cancel()"
            @mouseleave.native="cancel()"
          ></Button>
          <Button
            icon="md-arrow-dropright"
            @mousedown.native="move('right')"
            @mouseup.native="cancel()"
            @mouseleave.native="cancel()"
          ></Button>
          <Button
            icon="md-add-circle"
            @click="zoomin"
          >放大</BUtton>
          <Button
            icon="md-remove-circle"
            @click="zoomout"
          >缩小</BUtton>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import CameraItem from '../../../components/camera-item.vue'
export default {
  name: 'PopoutVideoMove',
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
      videoStyle: {
        marginTop: '0',
        marginLeft: '0',
        height: '800px'
      },
      intervalFlag: null
    }
  },
  mounted() {

  },
  methods: {
    close() {
      this.$emit('close')
    },
    up() {
      let marginTop = Number(this.videoStyle.marginTop.split('px')[0]) + 10
      if (marginTop > 0) {
        this.$Message.info('已到达顶部')
        return
      }
      this.videoStyle.marginTop = marginTop + 'px'
    },
    down() {
      let marginTop = Number(this.videoStyle.marginTop.split('px')[0]) - 10
      let window = document.getElementById('window')
      let windowHeight = window.offsetHeight
      let video = document.getElementById('videoitem')
      let videoHeight = video.offsetHeight
      if (marginTop < windowHeight - videoHeight) {
        this.$Message.info('已到达底部')
        return
      }
      this.videoStyle.marginTop = marginTop + 'px'
    },
    left() {
      let marginLeft = Number(this.videoStyle.marginLeft.split('px')[0]) + 10
      if (marginLeft > 0) {
        this.$Message.info('已到达最左侧')
        return
      }
      this.videoStyle.marginLeft = marginLeft + 'px'
    },
    right() {
      let marginLeft = Number(this.videoStyle.marginLeft.split('px')[0]) - 10
      let window = document.getElementById('window')
      let windowWidth = window.offsetWidth
      let video = document.getElementById('videoitem')
      let videoWidth = video.offsetWidth
      if (marginLeft < windowWidth - videoWidth) {
        this.$Message.info('已到达最右侧')
        return
      }
      this.videoStyle.marginLeft = marginLeft + 'px'
    },
    move(direction) {
      if (direction === 'up') {
        this.intervalFlag = setInterval(this.up, 100)
      } else if (direction === 'down') {
        this.intervalFlag = setInterval(this.down, 100)
      } else if (direction === 'left') {
        this.intervalFlag = setInterval(this.left, 100)
      } else if (direction === 'right') {
        this.intervalFlag = setInterval(this.right, 100)
      }
    },
    cancel() {
      clearInterval(this.intervalFlag)
    },
    zoomin() {
      let height = Number(this.videoStyle.height.split('px')[0])
      this.videoStyle.height = height + 100 + 'px'
    },
    zoomout() {
      let window = document.getElementById('window')
      let windowHeight = window.offsetHeight
      let videoHeight = Number(this.videoStyle.height.split('px')[0]) - 100
      if (videoHeight <= windowHeight) {
        return
      }
      this.videoStyle.height = videoHeight + 'px'
      this.$nextTick(() => {
        this.resizeCheck()
      })
    },
    resizeCheck() {
      let marginTop = Number(this.videoStyle.marginTop.split('px')[0])
      let window = document.getElementById('window')
      let windowHeight = window.offsetHeight
      let video = document.getElementById('videoitem')
      let videoHeight = video.offsetHeight
      if (marginTop < windowHeight - videoHeight) {
        this.videoStyle.marginTop = windowHeight - videoHeight + 'px'
      }
      let marginLeft = Number(this.videoStyle.marginLeft.split('px')[0])
      let windowWidth = window.offsetWidth
      let videoWidth = video.offsetWidth
      if (marginLeft < windowWidth - videoWidth) {
        this.videoStyle.marginLeft = windowWidth - videoWidth + 'px'
      }
    }
  }
}
</script>
