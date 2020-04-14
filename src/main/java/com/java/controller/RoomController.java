package com.java.controller;

import com.java.entity.Room;
import com.java.utils.FileUploadUtil;
import com.java.utils.QiNiuUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/2/22 10:12
 * 房间控制器
 */
@Controller
@RequestMapping("/room")
public class RoomController extends BaseController<Room> {

    /**
     * 房间图片上传
     * @return
     */
    @RequestMapping("/uploadRoomPic")
    public @ResponseBody Map<String,Object> uploadRoomPic(MultipartFile myFile){
        //return FileUploadUtil.upload(myFile,"E:\\img");
        try {
            return QiNiuUtil.fileUpload(myFile);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
