import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;

public class RSAUtil {
    // 加密数据和秘钥的编码方式
    public static final String UTF_8 = "UTF-8";

    // 填充方式
    public static final String RSA_ALGORITHM = "RSA/ECB/PKCS1Padding";
    public static final String RSA_ALGORITHM_NOPADDING = "RSA";
    //私钥
    public static final String PRIVATE_KEY = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMsbzWNUjDWM0mgK\n" +
            "RbY7yd/4+2JcsR7R1C+1BCWoeYTA9+lZtmSqQEPxj+W8YAmUw+uvNF6ZGOM3bAlt\n" +
            "4DCgFVaqBUCPYh3gtUjtDoNd6OhQ1hab/i7HRYq+DU5bBfm0386X/GMqCbimGkIi\n" +
            "T8hDxOlSjrl90D6atbfm5aXg3+m/AgMBAAECgYBI+CcU7ZYl0v7wo+ghrV88mR3v\n" +
            "W6/Ci834iccApINr30vxyOpPRh8qicmR1tiF+K1eqiZdahFX6FxnEtN9hLXFNhqE\n" +
            "Tr2L3/qChICNHJl/ZG7NDJo4vbrDzDHc6GV/OxUoUjVYOABPt/MhjCWyLg3Ywrul\n" +
            "+kU+ZnFlNdBtJIjquQJBAObeQ4xfATBkP9hrabgpZoedzHKA3Cj2WWBk1S1QIW/C\n" +
            "S3Oe1mTmzi71D2+S6XUsp1IBedkhsRh0VLaJ4m727S0CQQDhN/IHBps+DNX9PPRX\n" +
            "XAVejj6qRl4tPNV1YuAej2RLX7DK/qL38zhP0e3C+qVhLnevi4MZWDRghPRs6brj\n" +
            "dD4bAkB6ypKw0UMHovpWOGMlYVe4H9TCvgja/JPy8g50KF9wWq3Y1A2B40Scsxi/\n" +
            "pirneJWRx1kwhHv13sHDyLiXflwNAkEA2t8NvLo04GaFB6fXJZbuOOgwCjZ8i6YV\n" +
            "JBFFES31IDMMkxpHsoOR9DBlyhjf48PO2LDSZS0NKcfL6pRy5V0whQJAIcxeDmSm\n" +
            "CIxDd4F+CRvu4aUBvKc/vWAnwtgO+SNboqbv07AjjvDoH4henkcWECPxpDAOPKte\n" +
            "tB7VUhbOfBxsNA==";


    /**
     * 非对称加密，根据公钥和原始内容产生加密内容
     */
    private static String encryptRSA(Key key, String plainText)
            throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException,
            BadPaddingException, IllegalBlockSizeException, InvalidAlgorithmParameterException {
        Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return Base64.encodeBase64(cipher.doFinal(plainText.getBytes(UTF_8))).toString();
    }

    /**
     * 根据私钥和加密内容产生原始内容
     */
    private static String decryptRSA(Key key, String content) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, DecoderException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException, InvalidAlgorithmParameterException {
        Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] contentArry = content.getBytes();
        return new String(cipher.doFinal(Base64.decodeBase64(contentArry)), UTF_8);
    }

    /**
     * 创建RSA的公钥和私钥示例 将生成的公钥和私钥用Base64编码后打印出来
     * @throws NoSuchAlgorithmException
     */
    public static void createKeyPairs() throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        System.out.println("公钥"+Base64.encodeBase64(publicKey.getEncoded()));
        System.out.println("私钥"+Base64.encodeBase64(privateKey.getEncoded()));
    }

    /**
     *  Description:默认的RSA解密方法 一般用来解密 参数 小数据
     */
    public static String decryptRSADefault(String privateKeyStr,String data) {
        try{
            KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM_NOPADDING);
            byte[] privateKeyArray = privateKeyStr.getBytes();
            byte[] dataArray = data.getBytes();
            PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(Base64.decodeBase64(privateKeyArray));
            PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);

            Cipher cipher = Cipher.getInstance(RSA_ALGORITHM_NOPADDING);
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            return new String(cipher.doFinal(Base64.decodeBase64(dataArray)), UTF_8);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "";
    }

    public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeySpecException, DecoderException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, UnsupportedEncodingException, BadPaddingException, InvalidKeyException {
        String messageEn = "mLSTatgmYvhk8SGvny5grdYOisiYK2kX4tpnvgRL75GmP1oqjhnQa91u0Ch+/yZnclmKeu6Uid4DEkBBqeQyDj9oeZu8sEsvEHF/yIPbXFe4sKdBC5WbhDEH3TkbCrE/Y0zKQqlfdlbG9nGrbjDCts59w7e1Y/OoVtyryStedJ8=";
        //base64编码的私钥
        byte[] decoded = Base64.decodeBase64(PRIVATE_KEY);
        PrivateKey priKey = KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decoded));
        String s = URLDecoder.decode(RSAUtil.decryptRSADefault(RSAUtil.PRIVATE_KEY,messageEn) ,"UTF-8");
        System.out.println(s);
    }
}