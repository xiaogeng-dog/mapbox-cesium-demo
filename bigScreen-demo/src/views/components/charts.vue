<template>
  <div
    :id="id"
    class="charts"
  ></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {}
  },
  props: {
    options: {},
    id: {}
  },
  watch: {
    options: {
      handler (newVal, oldVal) {
        this.draw()
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  methods: {
    draw () {
      let statusCharts = echarts.init(document.getElementById(this.id))
      statusCharts.off('click')
      statusCharts.on('click', param => {
        this.$emit('chartClick', param)
      })
      statusCharts.setOption(this.options)
      window.addEventListener('resize', function () {
        statusCharts.resize()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.draw()
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
}
</style>
