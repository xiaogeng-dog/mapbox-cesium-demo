import CryptoJS from "crypto-js";

class CryptoFiles {
  constructor() {
    // this.key = CryptoJS.enc.Utf8.parse("***"); // 密钥
    //秘钥, 建议设置其他的字符, 这里只是为了演示，一般长度是16位
    this.key = CryptoJS.enc.Latin1.parse("1234567890123456");
    this.options = {
      iv: this.key, //偏移量
      mode: CryptoJS.mode.CBC, // CBC ｜ ECB
      padding: CryptoJS.pad.ZeroPadding,
    };
  }
  // 加密 word需要加密的字符串
  encrypt(word) {
    let words = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(words, this.key, this.options);
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }
  // 解密 word需要解密的字符串
  decrypt(word) {
    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);
    let decrypt = CryptoJS.AES.decrypt(src, this.key, this.options);
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
}

let cryptoFiles = null;
export default function () {
  return cryptoFiles || (cryptoFiles = new CryptoFiles());
}
