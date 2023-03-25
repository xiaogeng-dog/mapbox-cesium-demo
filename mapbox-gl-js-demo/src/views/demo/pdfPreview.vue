<template>
  <div class="main-container">
    <input type="file" ref="fielinput" @change="uploadFile" />
    <div class="canvas-container">
      <canvas ref="myCanvas" class="pdf-container"> </canvas>
    </div>
    <div class="pagination-wrapper">
      <button @click="clickPre">上一页</button>
      <span>第{{ pageNo }} / {{ pdfPageNumber }}页</span>
      <button @click="clickNext">下一页</button>
    </div>
  </div>
</template>
<script>
/**
 *TODO npm install --save pdfjs-dist@2.0.943  (旧：兼容IE)  已实现
这里需要指定2.0.943的版本，试过其他版本的都会多多少少在引入，执行行数时报错
（3）原理
首先是要传递给pdfjs-dist展示的是以base64的方式传递，
这里用了上传文件，
将文件流转化成base64进行模拟，
一般是由后台传给前端base64数据直接渲染

loadPdfData函数接受到base64数据后，
调用pdf-dist的方法将pdf转换成canvas,
相当于用图片的方式展示pdf,
而各个浏览器都支持图片，
那么就少了很多兼容的问题了
再配合pdf的页数，
点击按钮上下切换，
功能基本实现

===========================================================================
 *TODO npm install pdfjs-dist -S （换api了,搞不懂） 未实现
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
const pdfJS = require("pdfjs-dist");
pdfJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");
export default {
  mounted() {},
  data() {
    return {
      pageNo: null,
      pdfPageNumber: null,
      pdfTotalPages: 1,
      renderingPage: false,
      pdfData: null, // PDF的base64
      scale: 1, // 缩放值
    };
  },
  methods: {
    uploadFile() {
      let inputDom = this.$refs.fielinput;
      let file = inputDom.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let data = atob(
          reader.result.substring(reader.result.indexOf(",") + 1)
        );
        this.loadPdfData(data);
      };
    },
    loadPdfData(data) {
      // 引入pdf.js的字体
      let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
      //读取base64的pdf流文件
      this.pdfData = pdfJS.getDocument({
        data: data, // PDF base64编码
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      });
      console.log(this.pdfData);
      this.renderPage(1);
      this.renderScrollPdf();
    },

    // 根据页码渲染相应的PDF
    renderPage(num) {
      this.renderingPage = true;
      this.pdfData.promise.then((pdf) => {
        this.pdfPageNumber = pdf.numPages;

        pdf.getPage(num).then((page) => {
          // 获取DOM中为预览PDF准备好的canvasDOM对象
          let canvas = this.$refs.myCanvas;
          let viewport = page.getViewport(this.scale);
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          let ctx = canvas.getContext("2d");
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          page.render(renderContext).then(() => {
            this.renderingPage = false;
            this.pageNo = num;
          });
        });
      });
    },
    clickPre() {
      if (!this.renderingPage && this.pageNo && this.pageNo > 1) {
        this.renderPage(this.pageNo - 1);
      }
    },
    clickNext() {
      if (
        !this.renderingPage &&
        this.pdfPageNumber &&
        this.pageNo &&
        this.pageNo < this.pdfPageNumber
      ) {
        this.renderPage(this.pageNo + 1);
      }
    },
    renderScrollPdf() {
      this.pdfData.promise.then((pdf) => {
        this.pdfTotalPages = pdf.numPages;
        this.renderScrollPdfPage(1);
      });
    },
  },
};
</script>
<style scoped lang="less">
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.canvas-container {
  width: 400px;
  height: 500px;
  border: 1px dashed black;
  position: relative;
  display: flex;
  justify-content: center;
}
.scroll-pdf-contanier {
  width: 400px;
  height: 500px;
  border: 1px dashed black;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.pdf-container {
  width: 100%;
  height: 100%;
}
.scroll-pdf-container {
  width: 350px;
}
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
