<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import "./base.less";
html {
  width: 100%;
  height: 100%;
  background-color: #020b35;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
}

html {
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: #aaa;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: rgba(0, 0, 0, 0);
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #294066;
    -webkit-box-shadow: rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: #294066;
  }

  ::-webkit-scrollbar-corner {
    background: #aaa;
  }
}

#app {
  width: 100%;
  height: 100%;
}

.ivu-select-dropdown {
  ul {
    max-width: 120px;
    padding-top: 8px;
    li {
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; /**不换行**/
      display: inline-block;
    }
  }
}

.amap-logo {
  opacity: 0;
}
.amap-copyright {
  opacity: 0;
}
</style>
