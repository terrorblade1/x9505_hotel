package com.java.controller;

import com.java.entity.Role;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author: 乐科
 * Date: 2020/3/2 16:13
 */
@Controller
@RequestMapping("/role")
public class RoleController extends BaseController<Role> {
}
