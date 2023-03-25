<template>
  <i-button
    v-if="accessible"
    :type="type"
    :ghost="ghost"
    :size="size"
    :shape="shape"
    :long="long"
    :htmlType="htmlType"
    :disabled="disabled"
    :loading="loading"
    :icon="icon"
    :customIcon="customIcon"
    :to="to"
    :replace="replace"
    :target="target"
    :append="append"
    @click="handleClick">
    <slot></slot>
  </i-button>
</template>

<script>
export default {
  name: 'button-limited',
  data () {
    return {
      accessible: null
    }
  },
  props: {
    code: {
      type: String
    },
    type: {
      type: String
    },
    ghost: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    },
    shape: {
      type: String
    },
    long: {
      type: Boolean,
      default: false
    },
    htmlType: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    customIcon: {
      type: String
    },
    to: {
      type: [String, Object]
    },
    replace: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: '_self'
    },
    append: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init () {
      if (this.code) {
        this.accessible = this.$store.state.app.btnLimitedCodes.includes(this.code)
      } else {
        this.accessible = true
      }
    },
    handleClick () {
      this.$emit('click')
    }
  },
  created () {
    this.init()
  }
}
</script>
