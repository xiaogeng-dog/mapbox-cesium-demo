<style lang="less">
@import "./Menu.less";
</style>
<template>
  <div class="menu-container">
    <!-- <div class="light"></div> -->
    <img
      src="@/assets/light.png"
      class="light1"
      alt=""
    >
    <img
      src="@/assets/light.png"
      class="light2"
      alt=""
    >
    <img
      src="@/assets/light.png"
      class="light3"
      alt=""
    >
    <img
      src="@/assets/light.png"
      class="light4"
      alt=""
    >
    <div
      :class="index===1?'menu-chosen':'menu'"
      @click="goPage(1)"
    >园区概览</div>
    <div
      :class="index===2?'menu-chosen':'menu'"
      @click="goPage(2)"
    >安全监督</div>
    <div
      :class="index===3?'menu-chosen':'menu'"
      @click="goPage(3)"
    >应急指挥</div>
    <div
      :class="index===4?'menu-chosen':'menu'"
      @click="goPage(4)"
    >生态环境</div>
    <div
      :class="index===5?'menu-chosen':'menu'"
      @click="goPage(5)"
    >封闭园区</div>
    <div
      :class="index===6?'menu-chosen':'menu'"
      @click="goPage(6)"
    >智慧能源</div>
    <div
      :class="index===7?'menu-chosen':'menu'"
      @click="goPage(7)"
    >智慧管网</div>
    <div
      :class="index===8?'menu-chosen':'menu'"
      @click="goPage(8)"
    >告警中心</div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number
    }
  },
  methods: {
    goPage(i) {
      switch (i) {
        case 1:
          this.$router.push({
            name: 'bigscreen1'
          })
          break
        case 2:
          this.$router.push({
            name: 'bigscreen2'
          })
          break
        case 3:
          this.$router.push({
            name: 'bigscreen3'
          })
          break
        case 4:
          this.$router.push({
            name: 'bigscreen4'
          })
          break
        case 5:
          this.$router.push({
            name: 'bigscreen5'
          })
          break
        case 6:
          this.$router.push({
            name: 'bigscreen6'
          })
          break
        case 7:
          this.$router.push({
            name: 'bigscreen7'
          })
          break
        case 8:
          this.$router.push({
            name: 'bigscreen8'
          })
          break
        default:
      }
    }
  }
}
</script>
