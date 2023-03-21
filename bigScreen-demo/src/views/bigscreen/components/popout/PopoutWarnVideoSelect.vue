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
    <div class="popout-container" v-if="popoutWarnVideoShow">
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
  name: 'PopoutVideoSelect',
  components: {
    CameraItem
  },
  props: {
    popoutWarnVideoShow: {
      default: false,
      type: Boolean
    },
    row: {
      type: Object
    }

  },
  watch: {
    row () {
      this.getcamerlist()
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
      this.$http.post('/bigScreen/majorhazardAlarminfoGetCameraList?enterpriseId=' + this.row.enterpriseId + '&majorhazardId=' + this.row.majorhazardId).then((res) => {
        this.camerlist = res.data.datas
        this.cameraUrls = res.data.datas[0].url
      })
    },
    selectchange(e) {
      this.cameraUrls = e
    },
    close() {
      this.$emit('close')
    },
    fullscreen() {
      this.$emit('fullscreen', this.cameraUrls)
    }
  }
}
</script>
<style>

</style>
