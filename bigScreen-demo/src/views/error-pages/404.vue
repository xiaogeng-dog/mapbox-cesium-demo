<style lang="less" scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  span:first-of-type {
    font-size: 11.5rem;
    font-weight: bold;
    text-shadow: 5px 1px 5px rgba(0, 0, 0, 1)
  }
  span:last-of-type {
    font-size: 2rem;
  }
  a {
    font-size: 1.25rem;
  }
}
</style>

<template>
  <div class="page-404">
    <span>404</span>
    <span>您访问的页面暂不在地球服务区内！o(╥﹏╥)o</span><br>
    <a href="javascript:void(0)" @click="$router.push('/home')">返回首页</a>
  </div>
</template>

<script>
export default {}
</script>
