package com.java.service;

import com.java.entity.RoomSale;

import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/2/25 20:47
 */
public interface RoomSaleService extends BaseService<RoomSale> {

    /**
     *根据房间编号分组统计房屋出租的总金额
     * @return
     * @throws Exception
     */
    Map<String,Object> findSalePriceGroupByRoomNum() throws Exception;
}
