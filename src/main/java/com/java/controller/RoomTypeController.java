package com.java.controller;

import com.java.entity.RoomType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author: 乐科
 * Date: 2020/2/27 16:58
 * 客房类型控制器
 */
@Controller
@RequestMapping("/roomType")
public class RoomTypeController extends BaseController<RoomType> {
}
