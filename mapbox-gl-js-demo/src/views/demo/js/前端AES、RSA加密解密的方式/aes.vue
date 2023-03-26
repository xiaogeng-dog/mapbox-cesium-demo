<template>
  <div></div>
</template>

<script>
/**
 * 应项目需要需要使用AES进行数据的加密解密。
 *
 * npm install crypto-js -S
 */
/**
 * @author xiaogeng
 * @date 2023/03/26 12:18 下午
 * @description 使用AES加密解密
 * @returns CryptoFiles的实例化对象
 **/

import aec_secret from "./aes_crypto";
export default {
  mounted() {
    const cryptoFiles = new aec_secret();
    const word = "xiaogeng";
    console.log(cryptoFiles.encrypt(word));
    console.log(cryptoFiles.decrypt(cryptoFiles.encrypt(word)));

    let data = {
      name: "我是测试",
    };
    // 对象或者数据格式，注意：需要先JSON.stringify转一下。
    let enc = cryptoFiles.encrypt(JSON.stringify(data));
    // 解密, 注意：需要JSON.parse转一下，注意它的使用位置
    let dec = JSON.parse(cryptoFiles.decrypt(enc));
    console.log(dec);
  },
};
</script>

<style lang="less" scoped></style>
