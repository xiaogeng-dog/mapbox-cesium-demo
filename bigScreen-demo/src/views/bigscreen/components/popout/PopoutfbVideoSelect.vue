<style lang="less" scoped>
@import "./PopoutVideoSelect.less";
/deep/.ivu-select {
    color: white!important;
}
/deep/.ivu-select-selection {
    background-color: #1a2846;
    border: 1px solid #32EEFF;
}
/deep/.ivu-select-input {
    color: white;
}
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animate__animated animate__backInLeft" leave-active-class="animate__animated animate__backOutDown">
    <div class="popout-container" v-if="popoutVideoSelectShow">
      <img src="@/assets/pop-close.png" alt class="close-img" @click="close" />
      <div class="title-container">
        <div class="title" @click="show=!show">视频监控</div>
      </div>
      <div class="body-container" @dblclick="fullscreen">
        <Select v-model="id" style="width:40%" placeholder="视频列表" clearable filterable filter-by-label @on-change="selectchange">
          <Option v-for="item in camerlist" :value="item.url" :key="item.id" :label="item.videoName">{{ item.videoName}}</Option>
        </Select>
        <CameraItem class="video" :url="cameraUrls" ref="cameraItem"></CameraItem>
      </div>
    </div>
  </transition>
</template>

<script>
import CameraItem from '../../../components/camera-item.vue'
export default {
  name: 'PopoutfbVideoSelect',
  components: {
    CameraItem
  },
  props: {
    popoutVideoSelectShow: {
      default: false,
      type: Boolean
    },
    cameraUrl: {
      default: '',
      type: String
    }
  },
  watch: {
    popoutVideoSelectShow () {
      this.id = this.cameraUrl
      this.cameraUrls = this.cameraUrl
    }
  },
  data() {
    return {
      cameraUrls: '',
      id: '',
      camerlist: []
    }
  },
  mounted() {
    this.getcamerlist()
    this.id = this.cameraUrl
    this.cameraUrls = this.cameraUrl
  },
  methods: {
    getcamerlist() {
      this.$http.get('/bigScreen/getCameraList?videoType=2').then((res) => {
        this.camerlist = res.data.datas
      })
    },
    selectchange(e) {
      this.cameraUrls = e
    },
    close() {
      this.$emit('close', this.cameraUrls)
    },
    fullscreen() {
      this.$emit('fullscreen', this.cameraUrls)
    }
  }
}
</script>
<style>

</style>
