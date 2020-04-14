package com.java.service.impl;

import com.java.entity.InRoomInfo;
import com.java.entity.Room;
import com.java.service.InRoomInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Author: 乐科
 * Date: 2020/2/19 13:00
 * 入住信息业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements InRoomInfoService {

    //重写入住信息添加的方法:  完成入住信息添加和房间状态修改
    @Override
    public String save(InRoomInfo inRoomInfo) throws Exception {
        //1.完成入住信息添加
        Integer insINICount = baseMapper.insert(inRoomInfo);
        //2.完成房间状态的修改
        //2.1.新建修改的房间对象
        Room room = new Room();
        //2.2.设置参数
        room.setId(inRoomInfo.getRoomId());
        room.setRoomStatus("1");
        //2.3.执行房间状态的修改
        Integer updRoomCount = roomMapper.updateByPrimaryKeySelective(room);
        if (insINICount > 0 && updRoomCount > 0){
            return "success";
        } else {
            return "fail";
        }
    }
}
