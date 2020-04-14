package com.java.service.impl;

import com.java.entity.Vip;
import com.java.service.VipService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Author: 乐科
 * Date: 2020/2/20 16:37
 * 会员业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class VipServiceImpl extends BaseServiceImpl<Vip> implements VipService {
}
