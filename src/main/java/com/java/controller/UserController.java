package com.java.controller;

import com.java.entity.User;
import com.java.service.impl.VerifyCodeUtils;
import com.java.utils.MD5;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Author: 乐科
 * Date: 2020/2/29 19:58
 * 用户控制器
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<User> {

    /**
     * 获取用户登录时的验证码
     * @param session
     * @param response
     */
    @RequestMapping("/getVerifyCode")
    public void getVerifyCode(HttpSession session, HttpServletResponse response){
        //1.通过工具类产生随机验证码
        String verifyCode = VerifyCodeUtils.generateVerifyCode(5);
        //2.将服务器产生的随机验证码放在session容器中,并将验证码中的英文字母转为小写
        session.setAttribute("verifyCode",verifyCode.toLowerCase());  //2ADf8--->2adf8
        //3.将产生的验证码转为图片显示(响应)到页面中
        try {
            //通过响应对象的输出流将图片写入到页面中去
            VerifyCodeUtils.outputImage(260,35,response.getOutputStream(),verifyCode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //验证用户输入的验证码
    @RequestMapping("/checkVerifyCode")
    public @ResponseBody String checkVerifyCode(HttpSession session, String verifyCodeInput){
        //1.从session容器中取出之前装入的验证码
        String verifyCode = (String) session.getAttribute("verifyCode");
        //2.此时将用户输入的验证码与session中取出的验证码进行比较
        if (verifyCodeInput.equals(verifyCode)){
            return "success";
        } else {
            return "fail";
        }
    }

    /**
     * 执行登录
     * @param user  用户参数(用户名,密码)
     * @param session  session容器
     * @return  返回登录结果
     */
    @RequestMapping("/login")
    public @ResponseBody String login(User user, HttpSession session){
        //将密码进行MD5加密(单向)
        user.setPwd(MD5.md5crypt(user.getPwd()));
        try {
            //根据用户名和密码查询数据库中的对象
            User loginUser = baseService.findByParams(user);
            //判断是否登录成功
            if (loginUser != null){  //有此用户,登录成功
                //将登录的用户对象装入到session容器中
                session.setAttribute("loginUser",loginUser);
                return "success";
            } else {  //登录失败
                return "fail";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     * 执行退出
     * @param session
     * @return
     */
    @RequestMapping("/exitUser")
    public @ResponseBody String exitUser(HttpSession session){
        try {
            //移出session容器中登录的用户对象
            session.removeAttribute("loginUser");
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
