package com.java.controller;

import com.java.entity.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Author: 乐科
 * Date: 2020/2/21 20:06
 * 订单控制器
 */
@Controller
@RequestMapping("/order")
public class OrderController extends BaseController<Order> {

    /**
     * 跳转到订单支付页面
     * @param orderNum
     * @param orderMoney
     * @return
     */
    @RequestMapping("/toPay")
    public String toPay(String orderNum, Double orderMoney){
        return "alipay/orderPay";
    }

    /**
     * 订单支付完成后的路径回调(1.修改订单状态 2.生成消费记录)
     * 获取订单的相关数据
     * @param out_trade_no  订单编号
     * @return
     */
    @RequestMapping("/myOrderPay")
    public String myOrderPay(String out_trade_no){
        System.out.println(out_trade_no);
        try {
            return orderService.afterOrderPay(out_trade_no);
        } catch (Exception e) {
            e.printStackTrace();
            return "payError";
        }
    }
}
