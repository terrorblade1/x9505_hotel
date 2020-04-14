package com.java.mapper;

import com.java.entity.RoomSale;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 房间消费记录的Mapper代理对象
 */
public interface RoomSaleMapper extends BaseMapper<RoomSale> {

    /**
     * 查询房间的销售金额,返回List
     * @return
     * @throws Exception
     */
    @Select("SELECT room_num,SUM(sale_price) as saleprices from roomsale GROUP BY room_num")
    List<Map<String,Object>> selectSalePriceGroupByRoomNum() throws Exception;
}