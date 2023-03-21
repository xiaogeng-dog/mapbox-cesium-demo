<style lang="less" scoped>
@import "./PopoutHeilimit.less";
</style>
<template>
  <transition name="custom-classes-transition" enter-active-class="animate__animated animate__backInLeft" leave-active-class="animate__animated animate__backOutDown">
    <div class="popout-container" v-if="show">
      <img src="@/assets/pop-close.png" alt="" class="close-img" @click="close" />
      <div class="title-container">
        <div class="title">查看详情</div>
      </div>
      <div class="body-container">
        <iframe :src="url" frameborder="0" class="body-frame"></iframe>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'PopoutHeilimit',
  components: {
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    url: {
      default: '',
      type: String
    }
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
