<style>
  .security-code-wrapper {
    display: flex;
    align-items: center;
  }
  .security-code-wrapper > img {
    margin-left: 20px;
    height: 34px;
    cursor: pointer;
  }
</style>

<template>
  <div class="security-code-wrapper" :style="{width: `${width}px`}">
    <Input
      v-model="securityCode"
      placeholder="请输入验证码"
      @on-change="$emit('update:value', securityCode)"
    />
    <img :src="imgUrl" alt="验证码图片加载错误" title="点击刷新验证码" @click="init">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'VerificationCode',
  data () {
    return {
      imgUrl: '',
      securityCode: '',
      isDisabled: true
    }
  },
  props: {
    width: {
      type: [String, Number],
      default: '300'
    },
    value: {
      type: String,
      default: ''
    },
    biyiCaptchaKey: {
      type: String,
      default: ''
    }
  },
  methods: {
    init () {
      this.getSecurityCode()
    },
    getSecurityCode () {
      this.$http.get('/api/catpcha/digitalCaptcha').then(response => {
        if (response) {
          let key = Object.keys(response.data)[0]
          this.imgUrl = response.data[key]
          this.$emit('update:biyiCaptchaKey', Object.keys(response.data)[0])
        }
      }).catch()
    }
  },
  created () {
    this.init()
  }
}
</script>
