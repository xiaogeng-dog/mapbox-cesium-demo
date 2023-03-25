<style lang="less" scoped>
@import "./PopoutInfo.less";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animate__animated animate__backInLeft" leave-active-class="animate__animated animate__backOutDown">
    <div class="popout-container" v-if="show">
      <img src="@/assets/pop-close.png" alt="" class="close-img" @click="close" />
      <div class="title-container">
        <div class="title">查看详情</div>
      </div>
      <div class="body-container" v-for="item in list" :key="item.title">
        <div class="title">{{item.title}}</div>
        <Row>
          <Col v-for="item1 in item.data" :key="item1.param" :span="item1.col" class="detail">
          <Row>
            <Col :span="item1.paramCol" class="param">{{item1.param}}:</Col>
            <Col :span="item1.valueCol" class="value">{{item1.value}}</Col>
          </Row>
          </Col>
        </Row>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'PopoutInfo',

  props: {
    show: {
      default: false,
      type: Boolean
    },
    list: {
      default: () => [],
      type: Array
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
    }
  }
}
</script>
