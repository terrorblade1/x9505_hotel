layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //初始化可入住（空闲）的房间数据
    loadRoomByRoomStatus("0");

    //日期时间选择器,显示入住时间
    laydate.render({
        elem: '#create_date'  //日期插件加入的容器
        ,type: 'datetime'  //日期类型
        ,format:'yyyy/MM/dd HH:mm:ss'  //显示日期的格式
        ,min:0
        ,value:new Date()  //值为当前时间
    });

    //监听单选框(是否会员)
    form.on('radio(isVip)', function(data){
        if (data.value == 1){
            vipTrue();  //执行会员操作
        } else {
            vipFalse();  //执行非会员操作
            $("form").eq(0).find("input:text").val("");  //清空表单

        }
    });

    //输入会员卡号时,查询会员信息
    $("#vip_num").blur(function () {
        var vipNum = $(this).val();
        //验证
        if ($(this).val().length == 16){
            layer.tips('会员卡号正确', this, {tips: [2,'green'],time:2000,});
            //发送请求查询会员的数据
            loadVipByVipNum(vipNum);
        } else {
            layer.tips('会员卡号为16位', this, {tips: [2,'#EE7811'],time:3000,});
        }
    });

    //自定义表单验证
    /*form.verify({
        vip_num: function (value, item) { //value：表单的值,item：表单的DOM对象
            if (value.length != 16) {
                return '会员卡号为16位';
            }
        }
    });*/

    //监听提交
    form.on('submit(demo1)', function(data){
        //构建要被添加的入住信息数据
        var saveJsonInRoomInfo = data.field;
        saveJsonInRoomInfo['status'] = '1';
        saveJsonInRoomInfo['outRoomStatus'] = '0';
        //添加入住信息数据
        //1.完成入住信息的添加
        //2.完成房间状态的修改：可入住状态-->已入住状态
        saveInRoomInfo(saveJsonInRoomInfo);
        return false;  //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    /*--------------------------------------------------自定义函数--------------------------------------------------*/

    //是会员时输入框的修改
    function vipTrue() {  //除了会员卡号让其输入外,姓名、身份证号等均不可输入
        $("#vip_num").removeAttr("disabled");  //将会员卡号的输入框设为可用
        $("#customerName").attr("disabled","disabled");
        $("#idcard").attr("disabled","disabled");
        $("#phone").attr("disabled","disabled");
        $("input[name=gender]").attr("disabled","disabled");
    }

    //非会员时输入框的修改
    function vipFalse() {  //与上面相反
        $("#vip_num").attr("disabled","disabled");
        $("#customerName").removeAttr("disabled");
        $("#idcard").removeAttr("disabled");
        $("#phone").removeAttr("disabled");
        $("input[name=gender]").removeAttr("disabled");
    }

    //根据会员卡号查询单个会员数据
    function loadVipByVipNum(vipNum) {
        $.ajax({
            url:"vip/loadByParams",
            type:"POST",
            data:{"vipNum":vipNum},
            success:function (data) {
                //将会员数据回显到form表单中
                form.val("example",{  //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                    "customerName":data.customerName,
                    "gender":data.gender,
                    "idcard":data.idcard,
                    "phone":data.phone
                });
            },
            error:function (data) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //根据房间的状态加载多个房间数据
    function loadRoomByRoomStatus(roomStatus) {
        $.ajax({
            url:"room/loadManyByParams",
            type:"POST",
            data:{"roomStatus":roomStatus},
            success:function (data) {
                var roomStr = '<option value="" selected>--请选择房间--</option>';
                $.each(data,function (i, room) {
                    roomStr += '<option value="'+room.id+'">'+room.roomNum+'-'+room.roomType.roomTypeName+'-'+room.roomType.roomPrice+'</option>';
                });
                //填充到页面中的下拉框
                $("#selRoomNumId").html(roomStr);
                form.render("select");  //渲染下拉框
            },
            error:function (data) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加入住信息
    function saveInRoomInfo(saveJsonInRoomInfo){
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"inRoomInfo/save",   //访问服务器端的路径
            data:saveJsonInRoomInfo,  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                if(data = "success"){
                    layer.msg('入住信息添加成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //用定时器完成系统的路径跳转
                    setTimeout('window.location = "model/toShowInRoomInfo"',2000);
                }else {
                    layer.msg('入住信息添加失败', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});