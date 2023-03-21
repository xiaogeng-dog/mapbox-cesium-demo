<template>
  <video ref="video" muted autoplay></video>
</template>

<script>
import Hls from 'hls.js'
export default {
  name: 'camera-item',
  props: {
    url: {
      type: String
    }
  },
  data() {
    return {
      hls: null,
      videourl: ''
    }
  },
  mounted() {
    this.getVideourl()
    // this.play()
  },
  beforeDestroy() {
    this.destroyHls()
  },
  watch: {
    url(newVal) {
      let video = this.$refs['video']
      if (video) {
        video.pause()
        video.removeAttribute('src') // empty source
        video.load()
        this.getVideourl()
      }
    }
  },
  methods: {
    getVideourl() {
      if (this.url) {
        this.$http.get('/bigScreen/getCameraUrl?cameraIndexCode=' + this.url).then((res) => {
          if (res.data.code === 0) {
            this.videourl = res.data.datas.url
            this.play()
          }
        })
      }
    },
    play() {
      var video = this.$refs['video']
      if (Hls.isSupported()) {
        this.hls = new Hls()
        this.hls.loadSource(this.videourl)
        // this.hls.loadSource(this.url)

        this.hls.attachMedia(video)
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.videourl
        // video.src = this.url
        video.addEventListener('loadedmetadata', function () {
          video.play()
        })
      }
    },
    destroyHls() {
      this.hls.destroy()
      this.hls = null
    }
  }
}
</script>

<style>
</style>
