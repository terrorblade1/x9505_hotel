package com.java.service.impl;

import com.java.entity.RoomSale;
import com.java.service.RoomSaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/2/25 20:48
 * 销售记录业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {

    /**
     * 根据房间编号分组统计房屋出租的总金额
     * @return
     * @throws Exception
     */
    /*
    /*{
        "xAxis":["8203","8204","8205","8206","8207","8208"],
        "legend":["消费金额"],
        "series":[{
                    "name": "消费金额",
                    "type": "bar",
                    "data": [15000.0, 20000.0, 16000.0, 14000.0, 40000.0, 25000.0]
                }]
        }*/
    @Override
    public Map<String, Object> findSalePriceGroupByRoomNum() throws Exception {
        //新建一个Map
        Map<String, Object> dataMap = new HashMap<String, Object>();
        //往dataMap中装入legend说明数据
        dataMap.put("legend","消费金额");
        //调用Mapper里的方法查询房间的销售金额
        List<Map<String, Object>> mapList = roomSaleMapper.selectSalePriceGroupByRoomNum();
        //定义横轴的List集合
        List<String> xAxis = new ArrayList<>();
        //定义图表的Map集合
        Map<String, Object> series = new HashMap<String, Object>();
        //往series中装入图表的类型及名称
        series.put("type","bar");
        series.put("name","消费金额");
        //定义图表的销售金额的List集合
        List<Double> data = new ArrayList<>();
        for (Map<String,Object> map:mapList){
            //将房间编号装入到xAxis中
            xAxis.add(map.get("room_num").toString());
            //将销售金额装入到data中
            data.add((Double) map.get("saleprices"));
        }
        //将data装入series
        series.put("data",data);
        //将横轴数据集合和图表数据集合都装入dataMap中
        dataMap.put("xAxis",xAxis);
        dataMap.put("series",series);
        //返回结果
        return dataMap;
    }
}
