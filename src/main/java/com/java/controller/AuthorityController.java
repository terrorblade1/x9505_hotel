package com.java.controller;

import com.java.entity.Authority;
import com.java.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/3/1 20:20
 * 权限控制器
 */
@Controller
@RequestMapping("/authority")
public class AuthorityController extends BaseController<Authority> {

    /**
     * 登录完成后加载用户所拥有的权限并转发到首页
     * @param model
     * @param session
     * @return
     */
    @RequestMapping("/toIndex")
    public String toIndex(Model model, HttpSession session){
        //1.登录后从session容器中取出登录的用户数据
        User loginUser = (User) session.getAttribute("loginUser");
        try {
            //2.根据登录用户角色id查询用户拥有的权限
            List<Map<String, Object>> mapList = authorityService.findAuthorityByLogin(loginUser);
            //3.将查询出的权限装入model容器中
            model.addAttribute("mapList",mapList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //转发到首页
        return "index";
    }

    /**
     * 根据角色id查询权限数据
     * @param roleId
     * @return
     */
    @RequestMapping("/loadAuthoritiesByRoleId")
    public @ResponseBody List<Authority> loadAuthoritiesByRoleId(Integer roleId){
        try {
            return authorityService.findAuthoritiesByRoleId(roleId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}


