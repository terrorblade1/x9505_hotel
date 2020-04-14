package com.java.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author: 乐科
 * Date: 2020/2/19 10:42
 * 页面跳转的控制器
 */
@Controller
@RequestMapping("/model")
public class ModelController {

    /**
     * 跳转到主页面
     * @return
     *//*
    @RequestMapping("/toIndex")
    public String toIndex(){
        return "index";
    }*/

    /**
     * 跳转到入住信息查询页面
     * @return
     */
    @RequestMapping("/toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inroominfo/showInRoomInfo";
    }

    /**
     * 跳转到入住信息添加页面
     * @return
     */
    @RequestMapping("/toSaveInRoomInfo")
    public String toSaveInRoomInfo(){
        return "inroominfo/saveInRoomInfo";
    }

    /**
     * 跳转到订单显示页面
     * @return
     */
    @RequestMapping("/toShowOrder")
    public String toShowOrder(){
        return "order/showOrder";
    }

    /**
     * 跳转到消费记录页面
     * @return
     */
    @RequestMapping("/toShowRoomSale")
    public String toShowRoomSale(){
        return "roomsale/showRoomSale";
    }


    /**
     * 跳转到会员显示页面
     * @return
     */
    @RequestMapping("/toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }

    /**
     * 跳转到添加会员页面
     * @return
     */
    @RequestMapping("/toSaveVip")
    public String toSaveVip(){
        return "vip/saveVip";
    }


    /**
     * 跳转到添加会员页面
     * @return
     */
    @RequestMapping("/toShowRoom")
    public String toShowRoom(){
        return "room/showRoom";
    }

    /**
     * 跳转到登录页面
     * @return
     */
    @RequestMapping("/loginUI")
    public String loginUI(){
        return "login/login";
    }

    /**
     * 跳转到角色信息管理页面
     * @return
     */
    @RequestMapping("/toShowRole")
    public String toShowRole(){
        return "role/showRole";
    }

    /**
     * 跳转到用户信息管理页面
     * @return
     */
    @RequestMapping("/toShowUser")
    public String toShowUser(){
        return "user/showUser";
    }

    /**
     * 跳转到用户添加页面
     * @return
     */
    @RequestMapping("/toSaveUser")
    public String toSaveUser(){
        return "user/saveUser";
    }

    /**
     * 跳转到数据分析页面
     * @return
     */
    @RequestMapping("/toShowRoomType")
    public String toShowRoomType(){
        return "roomType/showRoomType";
    }

    /**
     * 跳转到房型信息管理页面
     * @return
     */
    @RequestMapping("/toShowIdd")
    public String toShowIdd(){
        return "idd/showIdd";
    }
}
