   //测试接口
    @GetMapping("/xxx/user")
    public String myget(HttpServletRequest request) {

        //先用非对称算法RSA解密一下
        try {
            //从header里获取到参数
            String userId = request.getHeader("userId");
            log.debug("收到userId，内容为："+userId);
            
            
            //这里解密，注意先用URLDecode处理了下，如果前端没有用的话，这里也不用处理
            userId = RSAUtil.decrypt(URLDecoder.decode(userId,"UTF-8"), RSAUtil.private_key);
            
            
            log.debug("RSA解密成功，userId为"+userId);
            
        } catch (Exception e) {
            log.error("RSA解密失败",e);
            //如果解密失败，就返回null
            return null;
        }

        return "成功";

    }
