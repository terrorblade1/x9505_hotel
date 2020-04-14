package com.java.service.impl;

import com.java.entity.RoomType;
import com.java.service.RoomTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Author: 乐科
 * Date: 2020/2/27 16:56
 * 客房类型业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomTypeServiceImpl extends BaseServiceImpl<RoomType> implements RoomTypeService {
}
