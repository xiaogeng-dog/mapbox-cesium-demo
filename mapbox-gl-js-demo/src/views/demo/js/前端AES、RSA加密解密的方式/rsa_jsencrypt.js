import JSEncrypt from "jsencrypt";

//TODO: 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
// encryptlong是基于jsencrypt扩展的长文本分段加解密功能。
// import Encrypt from 'encryptlong'
/**
 * 代码已做预留，不做演示
 *  npm i encryptlong -S
 */
/**
 * 1、密钥对生成地址 http://web.chacuo.net/netrsakeypair
 * 2、后端可以通过工具类生成自己的公私钥
 * 本人前端使用密钥时包含 密钥的头部 -----BEGIN PUBLIC KEY-----
后端要去掉头部。
 */

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6w6Jhd5FzO88rdPVdSfa
hNyRUoCav9z7eyiNxRNVjP3oPrIETAqu4FPp1aZ91fsEVcuTurXib3im5Qd29nqn
0156Exgn1NruP82aAJTi/XzY2vnURVGinXdsQw9dqI/bCL0swllYHWqEZSdTcTtf
1o/NgU4qUM3b3epq2+UBqI2Ljd3ACZNXy+YcBnzSzcvUenco01aIq6/0tkfwfSfS
alkPm+4k46sSOSxDWEsSY2xrgn7bO4ML9GpBWV6ujDq4xlWepAGZ03oexeyZ1nBu
Y9bX4A2rG6agRD+K0fYRcPF5VfW6+qNOITJV0KzUzf8nIb2JJNrKZu1IVQvine3D
mQIDAQAB
-----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDrDomF3kXM7zyt
09V1J9qE3JFSgJq/3Pt7KI3FE1WM/eg+sgRMCq7gU+nVpn3V+wRVy5O6teJveKbl
B3b2eqfTXnoTGCfU2u4/zZoAlOL9fNja+dRFUaKdd2xDD12oj9sIvSzCWVgdaoRl
J1NxO1/Wj82BTipQzdvd6mrb5QGojYuN3cAJk1fL5hwGfNLNy9R6dyjTVoirr/S2
R/B9J9JqWQ+b7iTjqxI5LENYSxJjbGuCfts7gwv0akFZXq6MOrjGVZ6kAZnTeh7F
7JnWcG5j1tfgDasbpqBEP4rR9hFw8XlV9br6o04hMlXQrNTN/ychvYkk2spm7UhV
C+Kd7cOZAgMBAAECggEBAMP81wXbku+Q+lMlsXGBzV3CWxkjSeR36OeDpNGRkV+B
xcegvpx4u98nmG0f6QQlzDONDpw7U5YGT4Hfe32AP7apq7eICI4eDVD9qU6a1bju
BBJxBGDX9HK/RHGVuk31xHfA5DUYMbQ1QDbnV1euXfaU6JDMD9RYEN8zue2nQH68
DVYP7TtuTHl+COzgIaUx7lvQl+DqH2AfAeUQ41jAOWfVxVh7xt6dg543BzTjn4bA
h/JpVjwcCOYVqCkpruVbw7Lt1z+2tkYQNRWfOGP51ljiYF57PWqCtOrFfVwbGQtt
PaBYAyL1hA+7VSn7oj/G8WXwBm2jYt7O+sjAIXVVBAECgYEA+wksYtiFneIQN6Q2
pDPaNFbIhwL6+ve9+s3VXIEKsdkCMekkjmo31L+8SlGqpzyOkCJevYsflXd/TNWP
42zIPnIei2jR/ug7JlSxEaXSIF1eXq9awnS9ujnSVGwSLFizZYmkgZV4GBZGrjBO
Gjs48H8Nu4Ksvikvo/zwZzH8rGECgYEA77R4+vGMN9f72NOkngBWnVuWQOLhsHkN
+3aJNqLEFfrKS7BFZw1lgyrxrkZFeVOUKSFqyi3bgNJ9L//fi9gX8UZI1Hckohx7
UMpWW4TN7f3PQAMWvAZsnv4Q5rXUp4FEPNlQluj14hV+D+fNGm2ztkjhZ6oKvYGg
EEjqKw9WojkCgYBGj4SHYB7miuVODn1BWEXMElyY/nB3XG1s8rA3KRpNdRbV2pdo
5Fg/F4mgRiY2jaHwx4hjtJgzFfyVJy4jma8LRl5phxQHl1UQ6BtBP5+5cyUUbiuP
nuq5ToldK2dMSb5bGv4/Yjj4ZEKHsZIyc1UE3GGKxCcz6DW43V7hUr6X4QKBgGoH
XWA7CjgFbJxLecx9/9IZGgxXj1cdJOcvVqB5PN0wEt2J+hkMXvO3QjJBWSfCpY3P
/0mxISAJe2CJARv9mRGbckmw7d5bVNy2s55Fz0VPeKYq95pyCQgG//jdQ1RYpJN5
2OD36RN5SErG0P24ur6N3E6bc6bBuMibSCGF5l9ZAoGAHE+yRLYWic2kYgZbKYln
HHJqghDlJm5QrZ89Dis2ZkTpeua25xFf7b7j5j5X6yMkczg7BDEhjohPlkOjhAfQ
gb4Q+kKE2/f9008Vvh2M9cFvRhy6BA1GKqjulfBotpqQOiMtiOg8OtwICM3SgxzD
mUlCkU2BLqcrVGiBORnRpxY=
-----END PRIVATE KEY-----
`;

class RsaJsencrypt {
  constructor() {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
  /* JSEncrypt加密 */
  rsaEncrypt(data) {
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(this.publicKey);
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.encrypt(data);
    return result;
  }
  /* JSEncrypt解密 */
  rsaDecrypt(data) {
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(this.privateKey);
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.decrypt(data);
    return result;
  }
}

// export default {

/* encryptlong加密 */
//   encrypt(data) {
//     const PUBLIC_KEY = publicKey;
//     var encryptor = new Encrypt();
//     encryptor.setPublicKey(PUBLIC_KEY);
//     // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
//     const result = encryptor.encryptLong(data);
//     return result;
//   },
//   /* encryptlong解密 - PRIVATE_KEY - 验证 */
//   decrypt(data) {
//     const PRIVATE_KEY = privateKey;
//     var encryptor = new Encrypt();
//     encryptor.setPrivateKey(PRIVATE_KEY);
//     // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
//     var result = encryptor.decryptLong(data);
//     return result;
//   },
// };

let rsaJsencrypt = null;
export default function () {
  return rsaJsencrypt || (rsaJsencrypt = new RsaJsencrypt());
}
