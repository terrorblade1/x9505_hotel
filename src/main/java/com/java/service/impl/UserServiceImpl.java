package com.java.service.impl;

import com.java.entity.Authority;
import com.java.entity.User;
import com.java.service.UserService;
import com.java.utils.MD5;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/2/29 20:00
 * 用户业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    /**
     * 重写分页查询方法
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param user  查询条件
     * @return
     * @throws Exception
     */
    @Override
    public Map<String, Object> findPageByParams(Integer page, Integer limit, User user) throws Exception {
        //调用父类得到分页查询的map集合
        Map<String, Object> map = super.findPageByParams(page, limit, user);
        //得到用户数据
        List<User> list = (List<User>) map.get("data");
        //通过循环查出每个角色的一级权限
        for (int i = 0; i < list.size(); i++) {
            User u = list.get(i);
            //每个角色的一级权限
            List<Authority> firstAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(u.getRoleId(),0);
            StringBuffer firstAuthorityNames = new StringBuffer();
            for (int j = 0; j < firstAuthorities.size(); j++) {
                firstAuthorityNames.append(firstAuthorities.get(j).getAuthorityName() + ",");
            }
            u.setFirstAuthorityNames(firstAuthorityNames.toString().substring(0,firstAuthorityNames.length() - 1));
        }
        return map;
    }

    /**
     * 重写添加用户信息
     * @param user
     * @return
     * @throws Exception
     */
    @Override
    public String save(User user) throws Exception {
        //对密码进行MD5加密
        user.setPwd(MD5.md5crypt(user.getPwd()));
        return super.save(user);
    }
}
