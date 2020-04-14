package com.java.service.impl;

import com.java.entity.InRoomInfo;
import com.java.entity.Order;
import com.java.entity.Room;
import com.java.entity.RoomSale;
import com.java.service.OrderService;
import com.java.utils.DateUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Author: 乐科
 * Date: 2020/2/21 20:10
 * 订单业务层实现类
 */
@Service
@Transactional(readOnly = false)  //管理事务
public class OrderServiceImpl extends BaseServiceImpl<Order> implements OrderService {

    //当基础业务层方法无法完成复杂的业务层功能时，可以将基础的业务层方法进行重写
    //重写订单添加的基础业务层方法,要完成订单数据添加,入住信息和房间信息修改

    @Override
    public String save(Order order) throws Exception {
        //1.完成订单的添加,baseMapper此对象中的泛型为Orders(因为此类为订单的业务层实现类)
        Integer insOrderCount = baseMapper.insert(order);
        //2.1.完成入住信息的修改
        InRoomInfo inRoomInfo = new InRoomInfo();  //新建修改的入住信息对象
        inRoomInfo.setId(order.getIriId());
        inRoomInfo.setOutRoomStatus("1");  //已退房
        //2.2.执行入住信息状态修改
        Integer updINICount = inRoomInfoMapper.updateByPrimaryKeySelective(inRoomInfo);
        //3.完成房间状态的修改
        //3.1.根据入住信息id查出房间id
        Integer roomId = inRoomInfoMapper.selectByPrimaryKey(order.getIriId()).getRoomId();
        //3.2.新建房间修改对象
        Room room = new Room();
        room.setId(roomId);
        room.setRoomStatus("2");  //已打扫
        //3.3.执行房间状态的修改
        Integer updRoomCount = roomMapper.updateByPrimaryKeySelective(room);
        //返回操作结果
        if (insOrderCount > 0 && updINICount > 0 && updRoomCount > 0){
            return "success";
        } else {
            return "fail";
        }
    }

    /**
     * 订单支付完成后的路径回调(1.修改订单状态 2.生成消费记录)
     * @param out_trade_no  订单编号
     * @return
     */
    @Override
    public String afterOrderPay(String out_trade_no) throws Exception {
        //1.新建查询的条件订单对象
        Order praOrder = new Order();
        praOrder.setOrderNum(out_trade_no);
        //2.根据订单编号查询订单数据
        Order order = baseMapper.selectByParams(praOrder);
        //3.修改订单状态
        order.setOrderStatus("1");
        //执行修改订单状态
        Integer updOrdersCount = baseMapper.updateByPrimaryKeySelective(order);
        //4.完成消费记录的生成
        //获取订单中其他字段数组
        String[] orderOther = order.getOrderOther().split(",");
        //获取订单中其他金额数组
        String[] orderPrice = order.getOrderPrice().split(",");
        //新建消费记录的对象
        RoomSale roomSale = new RoomSale();
        roomSale.setRoomNum(orderOther[0]);
        roomSale.setCustomerName(orderOther[1]);
        roomSale.setStartDate(DateUtils.stringToDate(orderOther[2]));
        roomSale.setEndDate(DateUtils.stringToDate(orderOther[3]));
        roomSale.setDays(Integer.valueOf(orderOther[4]));
        roomSale.setRoomPrice(Double.valueOf(orderPrice[0]));
        roomSale.setOtherPrice(Double.valueOf(orderPrice[1]));
        roomSale.setRentPrice(Double.valueOf(orderPrice[2]));
        roomSale.setSalePrice(order.getOrderMoney());  //订单实际支付金额
        //优惠金额:单价*天数-租金
        Double discountPrice = Double.valueOf(orderPrice[0])*Integer.valueOf(orderOther[4])-Double.valueOf(orderPrice[2]);
        roomSale.setDiscountPrice(discountPrice);
        System.out.println(roomSale);
        //完成添加消费记录
        Integer insRoomSalesCount = roomSaleMapper.insert(roomSale);
        if(updOrdersCount > 0 && insRoomSalesCount > 0){
            return "redirect:/authority/toIndex";
        }else {
            return "payError";
        }
    }
}
