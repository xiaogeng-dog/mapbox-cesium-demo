<style lang="less" scoped>
@import "./PopoutChart.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div
      class="popout-container"
      v-if="popoutChartShow"
    >
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div class="title">{{title}}</div>
      </div>
      <div class="body-container">
        <charts
          class="chart"
          :options="chartOption"
          :id="'popoutChart'"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import charts from '@/views/components/charts.vue'
import * as echarts from 'echarts'
export default {
  name: 'PopoutChart',
  components: {
    charts
  },
  props: {
    popoutChartShow: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    chartData: {
      default: () => [],
      type: Array
    },
    category: {
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
    }
  },
  computed: {
    chartOption() {
      return {
        xAxis: {
          type: 'category',
          data: this.category,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(216, 214, 214, 1)'
            }
          },
          axisLabel: {
            color: 'white',
            fontSize: 20
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(216, 214, 214, 0.5)'
            }
          },
          axisLabel: {
            color: 'white',
            fontSize: 20
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(216, 214, 214, 0.5)'
            }
          }
        },
        series: [
          {
            type: 'pictorialBar',
            name: 'pictorial element',
            tooltip: {
              show: false
            },
            symbol: 'diamond',
            symbolSize: ['28%', 15],
            symbolOffset: [0, -8],
            symbolPosition: 'end',
            z: 10,
            itemStyle: {
              color: 'rgba(6, 168, 255, 1)'
            },
            data: this.chartData
          },
          {
            data: this.chartData,
            type: 'bar',
            barWidth: '20%',
            label: {
              show: true,
              position: 'top',
              formatter: '{c}亿元',
              fontSize: 20,
              color: '#fff'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(118, 179, 244, 0.9)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(118, 179, 244, 0.9)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(53, 117, 232, 0.9)'
                },
                {
                  offset: 1,
                  color: 'rgba(53, 117, 232, 0.9)'
                }
              ])
            }
          }
        ]
      }
    }
  }
}
</script>
