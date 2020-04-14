layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //初始化所有角色
    loadAllRole();

    //验证用户名唯一性变量
    var usernameIf = false;

    //日期时间选择器,显示入住时间
    laydate.render({
        elem: '#createDate'  //日期插件加入的容器
        ,type: 'datetime'  //日期类型
        ,format:'yyyy/MM/dd HH:mm:ss'  //显示日期的格式
        ,min:0
        ,value:new Date()  //值为当前时间
    });


    //加载所有角色
    function loadAllRole() {
        $.ajax({
            url:"role/loadAll",
            type:"POST",
            success:function (rs) {
                var roleStr = '<option value="">--请选择角色--</option>';
                $.each(rs,function (i, role) {
                    roleStr += '<option value="'+role.id+','+role.roleName+'">'+role.roleName+'</option>';
                });
                $("#roleSel").html(roleStr);
                form.render('select');
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //监听用户数据的添加提交
    form.on('submit(demo2)', function(data){
        //得到角色id和角色名数组
        var roleArr = data.field.roleId.split(",");
        //删除roleId的数据(有,)
        delete data.field.roleId;
        var saveJsonUser = data.field;
        saveJsonUser['roleId'] = roleArr[0];
        saveJsonUser['isAdmin'] = roleArr[1];
        saveJsonUser['useStatus'] = '1';
        saveUser(saveJsonUser);  //执行添加
        return false;
    });

    //自定义表单验证
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length < 4 || value.length > 10) {
                return '用户名必须为4-10位';
            }
            checkUsername(value);  //验证用户名的唯一性
            if(!usernameIf){
                return '此用户名已被占用';
            }
        },
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        pwd2:function (value, item) {
            if(value!=$("#pwd").val()){
                return '两次密码不一致';
            }
        }
    });

    //用户名唯一性验证
    function checkUsername(username){
        $.ajax({
            url:"user/getCountByParams",
            type:"POST",
            async: false,  //允许ajax外部的变量获取数据
            data:{
                "username":username
            },
            success:function (rs) {
                if (rs > 0){
                    usernameIf = false;
                } else {
                    usernameIf = true;
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加用户数据
    function saveUser(saveJsonUser) {
        $.ajax({
            url:"user/save",
            type:"POST",
            data:saveJsonUser,
            success:function (rs) {
                if (rs == 'success'){
                    layer.msg('用户信息添加成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //用定时器完成系统的路径跳转
                    setTimeout('window.location = "model/toShowUser"',2000);
                } else {
                    layer.msg('用户信息添加失败', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});