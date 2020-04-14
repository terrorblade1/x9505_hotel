package com.java.service;

import com.java.entity.Authority;
import com.java.entity.User;

import java.util.List;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/3/2 10:20
 */
public interface AuthorityService extends BaseService<Authority> {


    /**
     * 根据用户登录之后查询其拥有的权限
     * @param user
     * @return
     * @throws Exception
     */
    List<Map<String,Object>> findAuthorityByLogin(User user) throws Exception;

    /**
     * 根据角色id查询权限数据
     * @return
     * @throws Exception
     */
    List<Authority> findAuthoritiesByRoleId(Integer roleId) throws Exception;
}
