package com.java.controller;

import com.java.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/2/25 21:41
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale> {

    /**
     * 根据房间编号分组统计房屋出租的总金额
     * @return
     */
    @RequestMapping("/loadSalePriceGroupByRoomNum")
    public @ResponseBody Map<String,Object> loadSalePriceGroupByRoomNum(){
        try {
            return roomSaleService.findSalePriceGroupByRoomNum();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
