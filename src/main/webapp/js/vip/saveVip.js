layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //手机号与身份证号验证的判断变量
    var phoneIf = false;
    var idcardIf = false;

    //身份证号验证
    $("#idcard").blur(function () {
        //开启验证
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test($(this).val())){  //正则表达式的验证
            checkIdcard($(this).val());
        } else {
            layer.tips('身份证号格式不正确', $("#idcard"), {tips: [2,'#fc1505'],time:2000});
        }

    });

    //手机号验证
    $("#phone").blur(function () {
        //开启验证
        var reg = /^1[3456789]\d{9}$/;
        if(reg.test($(this).val())){  //正则验证
            checkPhone($(this).val());
        } else {
            layer.tips('手机号格式不正确', $("#phone"), {tips: [2,'#fc1505'],time:2000});
        }

    });

    //身份证号的唯一性验证
    function checkIdcard(idcard) {
        $.ajax({
            url:"vip/getCountByParams",
            async:false,  //允许ajax外部的变量去获取数据
            type:"POST",
            data:{
                "idcard":idcard
            },
            success:function (rs) {
                if (rs > 0){
                    idcardIf = false;
                    layer.tips('身份证号已使用', $("#idcard"), {tips: [2,'#fc1505'],time:2000});
                } else {
                    idcardIf = true;
                    layer.tips('身份证号可用', $("#idcard"), {tips: [2,'green'],time:2000});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

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

    //监听下拉框,生成会员卡号
    form.on('select(vipRate)', function(data){
        //console.log(data.value); //得到被选中的值
        var nowDate = new Date();  //当前时间
        $("#createDate").val(getNowDate(nowDate));  //将当前时间加入到表单中
        var vipNum = dateReplace(getNowDate(nowDate));// + getRandom(2)  要生成随机数的话可以加上这个
        if (data.value == 0.8){
            vipNum += '01';
        } else {
            vipNum += '02';
        }
        $("#vipNum").val(vipNum);  //填充生成的会员卡号

    });

    //监听会员的添加提交
    form.on('submit(demo2)', function(data){
        //将之前的身份证号和手机号唯一性验证的结果进行判断
        if (idcardIf && phoneIf){
            //执行添加操作
            saveVip(data.field);
            layer.closeAll();  //关闭弹窗
        } else if (!idcardIf && phoneIf){
            layer.msg('身份证号已被使用', {icon: 2,time:2000,anim: 6,shade:0.5});
        } else if (idcardIf && !phoneIf){
            layer.msg('手机号已被使用', {icon: 2,time:2000,anim: 6,shade:0.5});
        } else {
            layer.msg('身份证号和手机号都已被使用', {icon: 2,time:2000,anim: 6,shade:0.5});
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //添加会员信息
    function saveVip(saveJsonVip){
        $.ajax({
            url:"vip/save",
            type:"POST",
            data:saveJsonVip,
            success:function (rs) {
                if (rs == "success"){
                    layer.msg('会员信息添加成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //用定时器完成系统的路径跳转
                    setTimeout('window.location = "model/toShowVip"',2000);
                } else {
                    layer.msg('会员信息添加失败',{icon:2,time:2000,anim:3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }

    //获取随机数
    function getRandom(num) {
        var count = '';   //随机数
        for (var i=0;i<num;i++){
            count += parseInt(Math.random()*10)  //0.123123123...
        }
        return count;
    }

});