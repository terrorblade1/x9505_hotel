package com.java.test;

import com.java.entity.Authority;
import com.java.entity.User;
import com.java.service.AuthorityService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;

/**
 * Author: 乐科
 * Date: 2020/3/2 11:28
 */

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthorityServiceTest {

    @Autowired
    private AuthorityService authorityService;

    //日志对象
    private static final Logger log = Logger.getLogger(AuthorityServiceTest.class);

    //测试登陆后的权限菜单查询
    @Test
    public void test01(){
        //新建模拟的登陆用户
        User user = new User();
        user.setRoleId(1);  //角色id为1
        try {
            //执行查询
            List<Map<String, Object>> mapList = authorityService.findAuthorityByLogin(user);
            for (Map<String,Object> map:mapList) {
                log.info("一级权限id："+map.get("firstAuthorityId"));
                log.info("一级权限名字："+map.get("firstAuthorityName"));
                List<Authority> secondAuthorities = (List<Authority>)map.get("secondAuthorities");
                for (Authority secAuthority:secondAuthorities) {
                    log.info("二级权限："+secAuthority);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
