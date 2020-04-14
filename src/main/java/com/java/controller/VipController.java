package com.java.controller;

import com.java.entity.Vip;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author: 乐科
 * Date: 2020/2/20 16:35
 * 会员的控制器
 */
@Controller
@RequestMapping("/vip")
public class VipController extends BaseController<Vip> {
}
