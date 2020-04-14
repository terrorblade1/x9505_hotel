package com.java.service.impl;

import com.java.entity.Authority;
import com.java.entity.Role;
import com.java.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/3/2 16:14
 * 角色业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {

    /**
     * 重写角色根据条件分页查询的方法
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param role
     * @return
     * @throws Exception
     */
    @Override
    public Map<String, Object> findPageByParams(Integer page, Integer limit, Role role) throws Exception {
        //1.执行父类的分页查询方法,得到分页数据
        Map<String, Object> map = super.findPageByParams(page, limit, role);
        //2.取出map中的角色分页数据List<Role>
        List<Role> list = (List<Role>) map.get("data");
        //3.通过循环将每个角色拥有的一级权限数据查询出来
        for (int i = 0; i < list.size(); i++) {
            //3.1.获取每一次循环的角色对象
            Role role1 = list.get(i);
            //3.2.根据角色id查询其角色拥有的一级权限数据
            List<Authority> firstAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(role1.getId(), 0);
            //3.3.将一级权限循环得到权限名称字符串
            StringBuffer firstAuthorityNames = new StringBuffer();
            //3.4.得到角色的一级权限名称
            for (int j = 0; j < firstAuthorities.size(); j++) {
                firstAuthorityNames.append(firstAuthorities.get(j).getAuthorityName() + ",");
            }
            //4.将此字符串设置进角色对象中
            role1.setFirstAuthorityNames(firstAuthorityNames.toString().substring(0,firstAuthorityNames.length() - 1));
        }
        return map;
    }
}
