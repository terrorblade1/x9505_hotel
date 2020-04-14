layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //定义会员查询的条件
    var queryJsonVip = {};

    var phoneIf = true;

    //初始化会员信息
    loadVip();

    function loadVip() {
        //订单信息的方法级渲染
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            ,height: 412  //容器高度
            ,url: 'vip/loadPageByParams' //数据接口或者访问服务器端的数据路径
            ,limit:5   //自定义每一页的数据条数
            ,where: queryJsonVip
            ,limits:[2,3,5,8,10]
            ,even:true  //逐行背景色深浅不一
            ,page: true //开启分页
            ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', align:'center', width:120, sort: true}
                ,{field: 'vipNum', title: '会员卡号', align:'center',width:250}
                //edit: 'text'为可以直接单击编辑此列中的单元格
                ,{field: 'customerName', title: '客人姓名', width:130, align:'center',sort: true,edit: 'test'}
                ,{field: 'vipRate', title: '会员类型', width:150, align:'center',sort: true,templet:'#vipRateTpl'}
                ,{field: 'gender', title: '性别', width:100,align:'center',templet:'#genderTpl'}
                ,{field: 'idcard', title: '身份证号', width: 270,align:'center', sort: true}
                ,{field: 'phone', title: '手机号', width: 210,align:'center'}
                ,{field: 'createDate', title: '创建时间', width: 270, align:'center',sort: true}
                ,{fixed: 'right',title: '操作', width:260, align:'center', toolbar: '#barDemo'}//工具条
            ]],
            done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //console.log(res);  //就是控制器所响应回的Map集合中数据(当前页的所有数据,格式为JSON)
                //console.log(curr);  //当前页码
            }
        });
    }

    //表单监听
    form.on('submit(demo1)', function(data){
        queryJsonVip = {};  //每次点击查询时先清空
        queryJsonVip['idcard'] = data.field.idcard;
        queryJsonVip['vipNum'] = data.field.vipNum;
        queryJsonVip['vipRate'] = data.field.vipRate;
        console.log(queryJsonVip);
        loadVip();
        return false;
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'query'){ //查询
            layer.msg("查询,id: "+data.id)

        } else if(layEvent === 'upd'){ //修改
            //1.回显手机号和会员类型
            $("#phone").val(data.phone);  //手机号
            $("#vip_id").val(data.id);  //会员id
            var vipRateStr = "";
            if (data.vipRate == 0.9){
                vipRateStr = "<option value='0.9' selected>普通会员</option><option value='0.8'>超级会员</option>";
            } else if (data.vipRate == 0.8){
                vipRateStr = "<option value='0.8' selected>超级会员</option><option value='0.9'>普通会员</option>";
            }
            $("#vipRate").html(vipRateStr);  //会员类型
            form.render("select");  //渲染下拉框
            //2.弹出修改界面
            layer.open({
                type:1,  //弹框类型
                title:"修改会员信息界面", //弹框标题
                area:['400px','280px'],  //弹框的宽高度
                anim: 4,  //弹框弹出时的动画效果
                shade:0.5,  //背景的透明度
                content:$("#updVipDiv")  //弹出的内容
            });
            //3.执行
            //监听修改的form表单
            form.on('submit(demo3)', function(data){
                console.log(data);
                if (phoneIf){
                    updVip(data.field,obj);  //执行修改
                    layer.closeAll();  //关闭弹窗
                } else {
                    layer.msg('手机号有误', {icon: 2,time:2000,anim: 6,shade:0.5});
                }
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });

        }
    });

    //修改会员姓名
    table.on('edit(test)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        console.log(obj.value); //得到修改后的值
        console.log(obj.field); //当前编辑的字段名
        console.log(obj.data); //所在行的所有相关数据
        var updJsonVip = {};
        updJsonVip['id'] = obj.data.id;  //会员id
        updJsonVip[obj.field] = obj.value;  //会员姓名
        updVip(updJsonVip,"customerName");  //执行修改
    });

    //手机号的唯一性验证
    $("#phone").change(function () {  //元素的值改变时触发change()事件
        checkPhone($(this).val());
    });

    //手机号的唯一性验证
    function checkPhone(phone) {
        $.ajax({
            url:"vip/getCountByParams",
            async:false,  //允许ajax外部的变量去获取数据
            type:"POST",
            data:{
                "phone":phone
            },
            success:function (rs) {
                if (rs > 0){
                    phoneIf = false;
                    layer.tips('手机号已使用', $("#phone"), {tips: [2,'#fc1505'],time:2000});
                } else {
                    phoneIf = true;
                    layer.tips('手机号可用', $("#phone"), {tips: [2,'green'],time:2000});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //修改会员信息
    function updVip(updJsonVip,obj){
        $.ajax({
            url:"vip/updByPrimaryKeySelective",
            type:"POST",
            data:updJsonVip,
            success:function (rs) {
                if (rs == "success"){  //修改成功
                    layer.msg('会员信息修改成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    if (obj != 'customerName') {
                        //同步更新缓存对应的值
                        obj.update({
                            phone: updJsonVip.phone
                            , vipRate: updJsonVip.vipRate
                        });
                    }
                } else {  //修改失败
                    layer.msg('会员信息修改失败',{icon:2,time:2000,anim:3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

});