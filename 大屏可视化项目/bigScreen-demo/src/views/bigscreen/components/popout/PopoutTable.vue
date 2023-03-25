<style lang="less" scoped>
@import "./PopoutTable.less";
</style>
<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutDown"
  >
    <div
      class="popout-container"
      v-if="popoutTableShow"
    >
      <img
        src="@/assets/pop-close.png"
        alt=""
        class="close-img"
        @click="close"
      />
      <div class="title-container">
        <div
          class="title"
          @click="show=!show"
        >{{title}}</div>
      </div>
      <div class="body-container">
        <Table
          :columns="columns"
          :data="tableData"
          class="table"
        ></Table>
        <Page
          :total="total"
          :page-size="10"
          @on-change="handlePageChange"
          show-total
          class="page"
        />
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'PopoutTable',
  props: {
    popoutTableShow: {
      default: false,
      type: Boolean
    },
    columns: {
      default: () => [],
      type: Array
    },
    tableData: {
      default: () => [],
      type: Array
    },
    total: {
      default: 0,
      type: Number
    },
    title: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      tableHeight: 550
    }
  },
  methods: {
    handlePageChange(page) {
      this.$emit('pageChange', page)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
