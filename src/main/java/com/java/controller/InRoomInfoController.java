package com.java.controller;

import com.java.entity.InRoomInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author: 乐科
 * Date: 2020/2/19 13:02
 * 入住信息的控制器
 * 实现数据交互控制器
 */
@Controller
@RequestMapping("/inRoomInfo")
public class InRoomInfoController extends BaseController<InRoomInfo> {
}
