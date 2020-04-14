package com.java.service;

import com.java.entity.Order;

/**
 * Author: 乐科
 * Date: 2020/2/21 20:09
 */
public interface OrderService extends BaseService<Order> {

    /**
     * 订单支付完成后的路径回调(1.修改订单状态 2.生成消费记录)
     * @param out_trade_no  订单编号
     * @return
     */
    String afterOrderPay(String out_trade_no) throws Exception;
}
