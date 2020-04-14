layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //构建查询的订单条件参数对象
    var queryJsonRoomSale = {};

    //初始化容器
    loadRoomSale();

    //日期时间范围选择
    laydate.render({
        elem: '#test3'  //日期容器id
        ,type: 'datetime'  //日期格式类型
        ,format: 'yyyy/MM/dd HH:mm:ss'  //格式(SpringMVC)
        ,range: true  //开启范围选择
    });

    function loadRoomSale() {
        //订单信息的方法级渲染
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            ,height: 412  //容器高度
            ,url: 'roomSale/loadPageByParams' //数据接口或者访问服务器端的数据路径
            ,limit:5   //自定义每一页的数据条数
            ,where: queryJsonRoomSale
            ,limits:[2,3,5,8,10]
            ,even:true  //逐行背景色深浅不一
            ,page: true //开启分页
            ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
                ,{field: 'roomNum', title: '房间号', align:'center',width:120}
                ,{field: 'customerName', title: '客人姓名', width:120, align:'center',sort: true}
                ,{field: 'startDate', title: '入住时间', width:240,align:'center'}
                ,{field: 'endDate', title: '退房时间', width: 240,align:'center', sort: true}
                ,{field: 'roomPrice', title: '房间单价', width: 120,align:'center'}
                ,{field: 'days', title: '天数', width: 120, align:'center',sort: true}
                ,{field: 'rentPrice', title: '住宿金额', width: 120, align:'center',sort: true}
                ,{field: 'otherPrice', title: '其他消费', width: 120, align:'center',sort: true}
                ,{field: 'salePrice', title: '支付金额', width: 120, align:'center',sort: true}
                ,{field: 'discountPrice', title: '优惠金额', width: 120, align:'center',sort: true}
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

    //表单监听
    form.on('submit(demo1)', function(data){
        queryJsonRoomSale = {};  //每次点击查询时清空掉之前的条件
        queryJsonRoomSale['roomNum'] = data.field.roomNum;
        if (data.field.queryTimes != ''){
            var arrTime = data.field.queryTimes.split(" - ");  //切割起始时间和结束时间,得到的是一个数组
            queryJsonRoomSale['startDate'] = arrTime[0];
            queryJsonRoomSale['endDate'] = arrTime[1];
        }
        console.log(queryJsonRoomSale);
        loadRoomSale();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    
});