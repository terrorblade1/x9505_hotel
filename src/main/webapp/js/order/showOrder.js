layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //构建查询的订单条件参数对象
    var queryJsonOrder = {};

    //初始化容器
    loadOrder();

    //日期时间范围选择
    laydate.render({
        elem: '#test3'  //日期容器id
        ,type: 'datetime'  //日期格式类型
        ,format: 'yyyy/MM/dd HH:mm:ss'  //格式(SpringMVC)
        ,range: true  //开启范围选择
    });

    function loadOrder() {
        //订单信息的方法级渲染
        table.render({  //每一次查询都重新渲染table容器
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            ,height: 412  //容器高度
            ,url: 'order/loadPageByParams' //数据接口或者访问服务器端的数据路径
            ,limit:5   //自定义每一页的数据条数
            ,where: queryJsonOrder  //传到服务器端的额外参数
            ,limits:[2,3,5,8,10]
            ,even:true  //逐行背景色深浅不一
            ,page: true //开启分页
            ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
                ,{field: 'orderNum', title: '订单编号', align:'center',width:240}
                ,{field: 'customerName', title: '客人姓名', width:120, align:'center',sort: true,templet:'<div>{{d.inRoomInfo.customerName}}</div>'}
                ,{field: 'idcard', title: '身份证号', width:220,align:'center',templet:'<div>{{d.inRoomInfo.idcard}}</div>'}
                ,{field: 'isVip', title: 'VIP', width: 85,align:'center', sort: true,templet:'#isVipTpl'}
                ,{field: 'customerName', title: '手机号', width: 140,align:'center',templet:'<div>{{d.inRoomInfo.phone}}</div>'}
                ,{field: 'createDate', title: '下单时间', width: 220, align:'center',sort: true}
                ,{field: 'orderMoney', title: '总价', width: 100, align:'center',sort: true}
                ,{field: 'remark', title: '备注', width: 240, align:'center',sort: true}
                ,{field: 'orderStatus', title: '状态', width: 100, align:'center',sort: true,templet:'#orderStatusTpl'}
                ,{fixed: 'right',title: '操作', width:120, align:'center', toolbar: '#barDemo'}//工具条
            ]],
            done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //console.log(res);  //就是控制器所响应回的Map集合中数据(当前页的所有数据,格式为JSON)
                //console.log(curr);  //当前页码
            }
        });
    }

    //监听订单查询的form表单
    form.on('submit(demo1)', function(data){
        queryJsonOrder = {};  //每次进到条件拼接前清空以前的条件
        queryJsonOrder['orderNum'] = data.field.orderNum;
        queryJsonOrder['orderStatus'] = data.field.orderStatus;
        if (data.field.queryTimes != ''){
            var arrTime = data.field.queryTimes.split(" - ");  //切割起始和结束时间
            queryJsonOrder['beginDate'] = arrTime[0];  //起始时间
            queryJsonOrder['endDate'] = arrTime[1];  //结束时间
        }
        //执行条件查询
        console.log(queryJsonOrder);
        //refreshTable();
        loadOrder();
        return false;  //阻止表单进行action提交
    });

    //数据表格工具条监听
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                obj.del();  //删除对应行（tr）的DOM结构，并更新缓存
                //向服务端发送删除指令
                updFlag(obj);  //删除订单的方法
                layer.close(index);
                loadOrder();
            });
        } else if(layEvent === 'payUI'){  //支付
            layer.confirm('确定要支付此订单么？', function (index) {
                //由系统另外开启一个浏览器对话框     提供订单编号,支付金额
                window.open('order/toPay?orderNum='+data.orderNum+'&orderMoney='+data.orderMoney);
                layer.close(index);
            });
        }
    });

    //批量删除
    $("#batchBtn").click(function () {
        //获取选中行
        var checkStatus = table.checkStatus('demo'); //demo 即为基础参数 id 对应的值
        var data = checkStatus.data;  //获取选中行的数据,这是一个数组
        //1.判断是否有选中行数据
        if (data.length != 0){
            //2.验证选中的行数据中有没有未支付的
            var result = true;  //判断是否批量删除数据的变量
            var ids = '';  //定义一个空字符串
            //通过循环找到每个选中的数据的支付状态
            for (var i = 0;i < data.length;i ++){
                if (data[i].orderStatus == 0){
                    result = false;  //有未支付的数据
                    break;  //终止循环
                } else{
                    ids += data[i].id + ',';  //将选中的id值拼接成字符串,SpringMVC会将该字符串自动转化成数组,所以只能用逗号
                }
            }
            if (result){  //true(没有未支付的,可删除)
                layer.confirm('真的删除选中订单吗', function(index){
                    ids = ids.substring(0,ids.length-1);  //去除最后面的逗号,得到12,32,27这样的字符串
                    //批量修改订单的显示状态
                    updBatchFlag(ids);
                    layer.close(index);  //关闭询问框
                });


            } else {  //false(有未支付的,不可删除)
                layer.msg('您选中的订单中有未支付的',{icon:2,time:2500,anim:3,shade:0.5});
            }
        } else {
            layer.msg('您还没有选择要删除的订单',{icon:2,time:2000,anim:3,shade:0.5});
        }
    });

    /*--------------------------------------------------自定义函数--------------------------------------------------*/

    //刷新数据表格
    function refreshTable() {  //layui在此处如果将where参数传回服务器,则后面无法再修改参数值
        table.reload('demo', {  //解决上述问题的方法: 每一次查询时都重新渲染table容器
            //where: queryJsonOrder//设定异步数据接口的额外参数，任意设
            page: {
                curr: 1 //重新从第 1 页开始
            }
        }); //只重载数据
    }

    //删除订单信息
    function updFlag(obj) {
        $.ajax({
            url:"order/updByPrimaryKeySelective",
            type:"POST",
            data:{
                "id":obj.data.id,
                "flag":0
            },  //删除就是将flag值改为0,然后不显示,并不是真的从数据库中给删除
            success:function (rs) {
                if (rs === 'success'){
                    layer.msg('订单信息删除成功',{icon:1,time:2000,anim:4,shade:0.5});
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                } else {
                    layer.msg('订单信息删除失败',{icon:2,time:2000,anim:3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //批量删除订单信息
    function updBatchFlag(ids) {
        $.ajax({
            url:"order/updBatchByPrimaryKeySelective",
            type:"POST",
            data:{
                "ids":ids,
                "flag":0
            },  //删除就是将flag值改为0,然后不显示,并不是真的从数据库中给删除
            success:function (rs) {
                if (rs === 'success'){
                    layer.msg('订单信息批量删除成功',{icon:1,time:2000,anim:4,shade:0.5});
                    refreshTable();  //刷新表格,全查询,从第一页开始
                } else {
                    layer.msg('订单信息批量删除失败',{icon:2,time:2000,anim:3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});