package com.java.service.impl;

import com.java.entity.Authority;
import com.java.entity.User;
import com.java.service.AuthorityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/3/2 10:23
 * 权限业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements AuthorityService {

    /**
     * 根据用户登录之后查询其拥有的权限*
     * @param user
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> findAuthorityByLogin(User user) throws Exception {
        //新建装入一级和二级权限的List集合
        List<Map<String,Object>> mapList = new ArrayList<Map<String, Object>>();
        //根据登录用户的角色id查询其拥有的一级权限
        List<Authority> firstAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(user.getRoleId(), 0);
        //根据登录用户的拥有一级权限分别查询其拥有的二级权限(二级权限的parent对应一级权限的id)
        for (int i = 0; i < firstAuthorities.size(); i++) {
            //得到一级权限的对象
            Authority firstAuthority = firstAuthorities.get(i);
            //新建装一级权限的Map集合
            Map<String,Object> map = new HashMap<String, Object>();
            //装入一级权限的id
            map.put("firstAuthorityId",firstAuthority.getId());
            //装入一级权限的名称
            map.put("firstAuthorityName",firstAuthority.getAuthorityName());
            //根据一级权限的id查询该一级权限拥有的二级权限
            List<Authority> secondAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(user.getRoleId(), firstAuthority.getId());
            //装入此一级权限拥有的二级权限
            map.put("secondAuthorities",secondAuthorities);
            //将装好权限的一级权限map集合装入到mapList并返回
            mapList.add(map);
        }
        return mapList;
    }

    /**
     * 根据角色id查询权限数据
     * @return
     * @throws Exception
     */
    @Override
    public List<Authority> findAuthoritiesByRoleId(Integer roleId) throws Exception {
        return authorityMapper.selectAuthoritiesByRoleId(roleId);
    }
}
