package com.java.service.impl;

import com.java.entity.Room;
import com.java.service.RoomService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Author: 乐科
 * Date: 2020/2/22 10:10
 * 房间业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomServiceImpl extends BaseServiceImpl<Room> implements RoomService {
}
