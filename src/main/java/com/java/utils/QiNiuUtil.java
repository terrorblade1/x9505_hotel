package com.java.utils;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Author: 乐科
 * Date: 2020/2/29 10:04
 * 上传图片到七牛云的工具类
 */
public class QiNiuUtil {

    //设置好账号的ACCESS_KEY和SECRET_KEY;这两个登录七牛账号里面可以找到
    static String ACCESS_KEY = "S0r3Zs-mhjztDHM50ufuODbUyZxQza8UHbz1-0Mv";
    static String SECRET_KEY = "gOUcPMbOWdiExVpefCfh-jZ4UD3ziA7dbMEf3fsz";
    //要上传的空间;对应到七牛上（自己建文件夹 注意设置公开）
    static String bucketname = "yk-x9505-hotel";
    //访问此空间的域名
    static String yName = "http://q6eyfu13z.bkt.clouddn.com/";


    //密钥配置
    static Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
    //创建上传对象
    static UploadManager uploadManager = new UploadManager(new Configuration(Zone.zone2()));
    //简单上传，使用默认策略，只需要设置上传的空间名就可以了
    public static String getUpToken(){
        return auth.uploadToken(bucketname);
    }

    //普通上传
    public static Map<String,Object> fileUpload(MultipartFile myFile) throws IOException {
        Map<String,Object> map = new HashMap<String, Object>();
        //上传到七牛后保存的文件名
        String key = UUID.randomUUID().toString().replace("-", "");  //key不能作为静态变量放在方法外面
        try {
            //调用put方法上传
            Response res = uploadManager.put(myFile.getBytes(),key,getUpToken());
            //打印返回的信息
            System.out.println(res.bodyString());
            //上传成功 将新文件访问路径传入到页面中
            map.put("newFileName", yName+key);
            map.put("code",0);  //成功
        } catch (QiniuException e) {
            e.printStackTrace();
            map.put("code",200);  //失败
        }
        return map;
    }

}
