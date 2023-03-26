<template>
  <div></div>
</template>

<script>
//TODO:注意：以下提供的压缩、下载、解码、
// 使用的方式只支持 Polygon、MultiPolygon、MultiLineString三种geojson格式的数据

/**
 * 
 * npm install jszip -D
   npm install file-saver - D
 */
import { decodeGeojson } from "./decodeGeojson";
import { convert2Echarts } from "./encodeGeojson";
import { DownloadUtil } from "./download";
export default {
  name: "encodeGeojson",
  data() {
    return {};
  },
  mounted() {
    /**
     * 压缩
     */
    // this.encodeGeojson();
    /**
     * 解压
     */
    this.decodeGeojson();
  },
  methods: {
    encodeGeojson() {
      const zip = convert2Echarts(require("@/assets/mapData/单元网格.geojson"));
      const load = new DownloadUtil();
      load.addFileInZip("下载的文件名", zip);
      load.packageZipAndDownload("下载的文件名");
    },
    decodeGeojson() {
      const resultGeojson = decodeGeojson(
        require("@/assets/mapData/test.geojson")
      );
      console.log(resultGeojson);

      //TODO: 在mapboxgljs中使用
      //       map.addSource('testDecodeJson', {
      //   'type': 'geojson',
      //   'data': decodeGeojson(require('./resultjson/json文件名.json'))
      // })
      // map.addLayer({
      //   'id': 'testDecodeJson',
      //   type: 'line',
      //   source: 'testDecodeJson',
      //   paint: {
      //     'line-color': 'red',
      //     'line-width': 2,
      //     'line-opacity': 0.5
      //   }
      // })
    },
  },
};
</script>

<style lang="less" scoped></style>
