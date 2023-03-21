<style lang="less" scoped>
@import "./PopoutRiskPointDetail.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="popout-container"
      v-if="show"
    >
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div class="title">详情</div>
      </div>
      <div class="body-container">
        <div
          v-for="item in detailList"
          :key="item.param"
          class="detail-container"
        >
          <div class="param">{{item.param}}</div>
          <div
            v-if="item.type!=='file'"
            class="value"
          >{{item.value}}</div>
          <div v-if="item.type==='file'">
            <a
              class="value"
              v-for="file in item.uploadFileInfo"
              :key="file.id"
              :download="file.annexName"
              :href="getUrl(file.id)"
            >{{file.annexName}}</a>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import util from '@/libs/util.js'
export default {
  name: 'PopoutRiskPointDetail',
  props: {
    show: {
      default: false,
      type: Boolean
    },
    detailList: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    // 转为文件的下载地址
    getUrl(id) {
      return `${util.baseUrl}/downloadFile/${id}`
    }
  }
}
</script>
