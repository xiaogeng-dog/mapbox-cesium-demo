<template>
  <div id="container"></div>
</template>

<script>
import drawMap from "@/assets/js/drawMapFigure";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    this.map = drawMap("container");
    // this.listenPage();
    // this.requestData("cluster_net").then((res) => {
    //   console.log(res);
    //   drawMap.drawClusterNet(this.map, res);
    // });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#container {
  width: 100%;
  height: 1000px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
