<template>
  <div class="pdf-container" v-if="showPdf">
    <canvas v-for="page in pages" :id="'canvas' + page" :key="page"></canvas>
  </div>
</template>
<script>
/**
 *TODO npm install pdfjs-dist -S
 * 
 * 如果报这个错，需要加bable 插件
 * TODO Class private methods are not enabled. Please add `@babel/plugin-proposal-private-methods` to your configuration.
 * 1、npm install @babel/plugin-proposal-private-methods --save-dev
 * 2、babel.config.json 里设置
 * {
  "plugins": ["@babel/plugin-proposal-private-methods"]
   }
*  TODO   #号还挺有意思的，下次研究一下
   class Counter extends HTMLElement {
  #xValue = 0;

  get #x() {
    return this.#xValue;
  }
  set #x(value) {
    this.#xValue = value;
    window.requestAnimationFrame(this.#render.bind(this));
  }

  #clicked() {
    this.#x++;
  }
}
 * 
 *
 */
// import PDF from "pdfjs-dist";
// PDF.disableWorker = true;
export default {
  name: "pdfPreview",
  data() {
    return {
      width: 100,
      pdfDoc: null,
      pages: 0,
    };
  },
  mounted() {
    // this.loadFile("/test.pdf");
  },
  methods: {
    /*
     * 加载PDF文件
     * url：后台提供的pdf地址或者项目中public/pdf文件（test.pdf）
     * 在需要的位置调用 this.loadFile(url)
     * */
    loadFile(url) {
      PDF.getDocument(url).then((pdf) => {
        this.pdfDoc = pdf;
        this.pages = this.pdfDoc.numPages;
        this.$nextTick(() => {
          this.renderPage(1);
        });
      });
    },
    /*
     * 渲染PDF文件
     * */
    renderPage(num) {
      this.pdfDoc.getPage(num).then((page) => {
        let canvas = document.getElementById("canvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1; // 设备像素比
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1; // 浏览器在渲染canvas之前会用几个像素来来存储画布信息,类似img
        let ratio = dpr / bsr;
        let viewport = page.getViewport(1.5);
        canvas.width = viewport.width * ratio; // 画布大小,默认值是width:300px,height:150px
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px"; // 画布的框架大小
        canvas.style.height = viewport.height + "px";
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        page.render(renderContext);
        if (this.pages > num) {
          this.renderPage(num + 1);
        } else {
          this.closeServerLoadingHandle();
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.pdf-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
