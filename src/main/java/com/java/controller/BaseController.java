package com.java.controller;

/**
 * Author: 乐科
 * Date: 2020/2/19 9:58
 */

import com.java.service.AuthorityService;
import com.java.service.BaseService;
import com.java.service.OrderService;
import com.java.service.RoomSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 基础控制器层  要进行数据交互
 * @param <T>  传入的实体对象泛型
 */
public class BaseController<T> {

    //依赖基础的业务层对象
    @Autowired
    protected BaseService<T> baseService;

    //订单的业务层对象
    @Autowired
    protected OrderService orderService;

    //权限的业务层对象
    @Autowired
    protected AuthorityService authorityService;

    //房间消费记录的业务层对象
    @Autowired
    protected RoomSaleService roomSaleService;

    /**
     * 根据主键删除单个数据
     * @param id  主键id
     * @return  删除结果
     */
    @RequestMapping("/delByPrimaryKey")
    public @ResponseBody String delByPrimaryKey(Integer id){
        try {
            return baseService.removeByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     * 添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    @RequestMapping("/save")
    public @ResponseBody String save(T t){
        try {
            return baseService.save(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     * 动态添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    @RequestMapping("/saveSelective")
    public @ResponseBody String saveSelective(T t){
        try {
            return baseService.saveSelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     * 根据主键查询单条数据
     * @param id  主键id
     * @return  单个数据结果
     */
    @RequestMapping("/loadByPrimaryKey")
    public @ResponseBody T loadByPrimaryKey(Integer id){
        try {
            return baseService.findByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 根据主键动态修改数据
     * @param t  要修改的对象数据
     * @return  修改结果
     */
    @RequestMapping("/updByPrimaryKeySelective")
    public @ResponseBody String updByPrimaryKeySelective(T t){
        try {
            return baseService.modifyByPrimaryKeySelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     * 根据主键修改所有字段数据
     * @param t  要修改的对象数据
     * @return  修改结果
     */
    @RequestMapping("/updByPrimaryKey")
    public @ResponseBody String updByPrimaryKey(T t){
        try {
            return baseService.modifyByPrimaryKey(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据条件分页加载数据
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t  查询的条件
     * @return  Layui的table方法渲染需要的分页数据集合
     */
    @RequestMapping("/loadPageByParams")
    public @ResponseBody Map<String,Object> loadPageByParams(Integer page,Integer limit,T t){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            map = baseService.findPageByParams(page,limit,t);
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",200);
            map.put("msg","数据加载异常");
        }
        return map;
    }

    /**
     * 根据条件加载单个数据
     * @param t  条件参数对象
     * @return  查询的单个数据
     */
    @RequestMapping("/loadByParams")
    public @ResponseBody T loadByParams(T t){
        try {
            return baseService.findByParams(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 根据条件加载多个数据
     * @param t  条件参数对象
     * @return  多条数据
     */
    @RequestMapping("/loadManyByParams")
    public @ResponseBody List<T> loadManyByParams(T t){
        try {
            return baseService.findManyByParams(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 根据多个主键动态修改数据(批量修改)
     * @param ids  多个主键ids数组
     * @param t  修改的数据
     * @return  操作结果
     * js中的字符串数据如12,32,27可以在SpringMVC中通过Integer[]接收到[12,32,27]
     */
    @RequestMapping("/updBatchByPrimaryKeySelective")
    public @ResponseBody String updBatchByPrimaryKeySelective(Integer[] ids, T t){
        try {
            return baseService.findBatchByPrimaryKeySelective(ids,t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     * 根据条件查询数据条数
     * @param t  查询的条件
     * @return  数据条数
     */
    @RequestMapping("/getCountByParams")
    public @ResponseBody Integer getCountByParams(T t){
        try {
            return baseService.findCountByParams(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 查询所有数据
     * @return  数据结果集
     */
    @RequestMapping("/loadAll")
    public @ResponseBody List<T> loadAll(){
        try {
            return baseService.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
