package com.java.utils;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 *   普通的文件上传工具类
 */
public class FileUploadUtil {

    /**
     * 普通上传(传统的方式)
     * myFile 被上传的文件  源文件
     * path 上传的路径(绝对路径：真实磁盘路径)
     * 思路：1.获取源文件输入流对象  2.构建目标文件的输出对象  3.完成流的复制  4.关闭流资源（先开后关）
     */
    public static Map<String,Object> upload(MultipartFile myFile,String path){
        //新建map集合
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            //得到文件输入流对象（有值）
            InputStream is = myFile.getInputStream();
            //得到目标文件（上传后的文件）
            //1.得到目标文件名uuid+'.'+'jpg'
            String fileName = myFile.getOriginalFilename();  //得到源文件名  12.jpg
            //得到目标文件名
            String newFileName = UUID.randomUUID().toString()+"."+ FilenameUtils.getExtension(fileName);  //uuid.jpg   后缀：.jpg
            //2.得到目标文件的文件路径
            //若目标文件夹不存在，则创建
            File file = new File(path);
            if(!file.exists()){ //判断目标文件夹是否存在
                file.mkdirs();//不存在，则创建文件夹
            }
            //创建空的目标文件（空的）
            File newFile = new File(path,newFileName);
            //得到目标文件的输出流对象（空的）
            OutputStream os = new FileOutputStream(newFile);
            //完成复制
            IOUtils.copy(is,os);
            //关闭资源
            os.close();
            is.close();
            //上传成功将新文件名字传入到页面中
            map.put("newFileName",newFileName);
            map.put("code",0);  //成功
        } catch (IOException e) {
            e.printStackTrace();
            map.put("code",200);  //失败
        }
        return map;
    }
}
