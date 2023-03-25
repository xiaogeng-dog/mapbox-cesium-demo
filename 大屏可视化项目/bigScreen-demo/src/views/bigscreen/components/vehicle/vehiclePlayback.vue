<style lang="less" scoped>
@import "./vehiclePlayback.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div
      class="popout-container"
      v-if="show"
    >
      <span class="text">
        历史轨迹：
      </span>
      <!-- <div class="time-str">{{startTime}} - {{endTime}}</div> -->
      <TimePicker
        size="small"
        confirm
        format="HH:mm"
        v-model="t1"
        style="width: 112px"
        @on-ok="tChange1"
      />-
      <TimePicker
        size="small"
        confirm
        format="HH:mm"
        v-model="t2"
        style="width: 112px"
        @on-ok="tChange2"
      />
      <div class="text">选择倍速：</div>
      <Slider
        class="slider"
        show-tip="never"
        v-model="sliderValue"
        @on-change="sliderChange"
        :step="25"
        :marks="marks"
      ></Slider>
      <div class="time-str"></div>
      <Button
        @click="close"
        type="primary"
      >返回</Button>
    </div>
  </transition>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'vehiclePlayback',
  props: {
    show: {
      default: false,
      type: Boolean
    },
    startTime: {
      default: '',
      type: String
    },
    endTime: {
      default: '',
      type: String
    }

  },

  mounted () {
    console.log(this.startTime)
  },
  data() {
    return {
      t1: null,
      t2: null,
      // 范围选择
      sliderValue: 0,
      marks: {
        0: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '1x')
        },
        25: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '5x')
        },
        50: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '10x')
        },
        75: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '50x')
        },
        100: {
          style: {
            color: '#fff',
            whiteSpace: 'nowrap'
          },
          label: this.$createElement('strong', '100x')
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    tChange1(val) {
      this.$emit('sliderChange', { 'val': this.sliderValue, 't1': this.t1, 't2': this.t2 })
    },
    tChange2(val) {
      this.$emit('sliderChange', { 'val': this.sliderValue, 't1': this.t1, 't2': this.t2 })
    },
    sliderChange(val) {
      this.$emit('sliderChange', { 'val': val, 't1': this.t1, 't2': this.t2 })
    }
  },
  // computed: {
  //   t1({
  //     process: state => state.map.process
  //   })
  // },
  watch: {
    startTime() {
      this.t1 = this.startTime
    },
    endTime() {
      this.t2 = this.endTime
    }
  }
}
</script>
