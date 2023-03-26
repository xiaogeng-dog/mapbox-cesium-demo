<template>
  <div></div>
</template>

<script>
/**
 *
 * RSA加密算法诞生于1977年，
 * 它的命名是根据三位研究人员的名字首字母命名的。
 * RSA加密算法含有两个密钥，分别是：公钥、私钥。
 * 公钥可以是随机生成也可以是一个生成的常量，公钥可以公开，
 * 私钥是用户个人使用的，对公钥的加密对象进行解密。
 * 因为RSA加密算法用 n = p * q 的原理进行加密，反而p和q值越大，n的二进制位数越长反而解密越复杂。
 *
 */
/**
 * 
（1）导入JSEncrypt插件
    npm install jsencrypt --save
    (2)引入插件
    全局引入和局部引入的区别：如果插件在项目的多个文件中使用建议全局引入，如果在单个文件中使用建议局部引入
    //main.js全局引入并挂载
    import JSEncrypt from "jsencrypt"; 
    Vue.prototype.$jsEncrypt = JSEncrypt;
    在要引入的单个文件中导入
    import JSEncrypt from 'jsencrypt';
(3)代码编写
    //以下代码使用全局引入方式编写;
    //公钥获取有两种方式：1.跟后端要密钥生成的接口 2.后端直接给你一个公钥字符串
    const publicKeyStr = '公钥xxxxxxxxxxxxxxxxxxxxxxxxxx';
    //创建jsencrypt加密对象
    const jsRsa = new this.$jsEncrypt();
    //设置公钥
    jsRsa.setPublicKey(publicKeyStr);
    //使用加密对象给密码加密也可以对用户名等加密
    let Rsapassword = jsRsa.encrypt(this.userForm.credential);
 */

/**
  *  TODO:前端rsa加密，后端去解密(乱码问题)
  * 前端rsa加密，后端去解密，但是呢有中文的时候解密出来就乱了，想了各种办法未果；
             结论，既然中文乱码，我就不传中文就行了哈。在加密之前用
             这个方法很巧妙的利用了解决url加密的工具，何乐而不为呢。
 *    前端加密前将所有中文encoder掉
             此函数是js原生函数
             var en = encodeURIComponent(str);
  *   后台再转换回来就行了
             String result = java.net.URLDecoder.decode(en ,"UTF-8");
  */

/**
 *  TODO:前后端解密不通过情况：
        密钥对的获取：主要涉及到两个参数：秘钥格式、秘钥长度
    （1）常见秘钥格式：PKCS8（java适用）、PKCS1（其他），
        如果不是java平台生成的秘钥，有可能报以下错误：
        java.security.InvalidKeyException: invalid key format //秘钥格式不合法
    （2）秘钥长度：1024、2048（越长越安全，效率越低），详细介绍可以参考 ：https://blog.csdn.net/luoluo_onion/article/details/78354799
        注意：分段加解密时：1024的秘钥每次加密最大长度为117（128-11）,长度为2048秘钥每次加解密长度为256，
        如果加密时设置的长度不匹配，可能会报以下错误：
        javax.crypto.BadPaddingException : Decryption error //解码失败
 */

/**
  * TODO:后端的坑   （本人前端 =。=）
  * 由于本人是首次接触RSA，并且对加密算法一片空白，所以过程中几乎把能遇见的错误碰了个遍，总结以下几个常见错误，引以为戒：
（1）java.security.InvalidKeyException: invalid key format
        秘钥格式不合法，或者是秘钥被修改了。
（2）java.security.spec.InvalidKeySpecException: java.security.InvalidKeyException: IOException : DerInputStream.getLength(): lengthTag=111, too big. 
        秘钥字符串主体前后有空格，或者是换行，或者有多余字段，如（-----BEGIN RSA PRIVATE KEY-----）（秘钥格式不正确）
（3）java.security.spec.InvalidKeySpecException: java.security.InvalidKeyException: IOException : algid parse error, not a sequence
        原因可能是没有使用 PKCS8（java适用）
（4）javax.crypto.BadPaddingException : Decryption error
        解密时报这个错误，很可能是填充格式不匹配，请确认加密时使用的填充格式，解密时保持统一即可，我这里使用功能的是RSA/ECB/PKCS1Padding
（5）javax.crypto.BadPaddingException: Message is larger than modulus
        解密时出现这个错误（这个错误我是羞于启齿的），可能是因为要解密的字符串中混入了什么奇怪的东西，你可以在解密前打印下要解密的字符串，再打印下转为base64后的字节数组长度（正常应该为128的倍数），否则应该是手残多加了什么东西呢。
  */

import rsa_secret from "./rsa_jsencrypt";
export default {
  mounted() {
    const rsaSecret = new rsa_secret();
    const word = "xiaogeng";
    console.log(rsaSecret.rsaEncrypt(word));
    console.log(rsaSecret.rsaDecrypt(rsaSecret.rsaEncrypt(word)));
  },
};
</script>

<style lang="less" scoped></style>
