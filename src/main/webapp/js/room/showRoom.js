layui.use(['jquery','layer','table','form','upload'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        upload = layui.upload;   //文件上传组件

    //初始化客房数据
    loadAllRoom();

    //初始化客房类型数据
    loadAllRoomType();

    //验证房间号唯一性的判断变量
    var roomNumIf = false;

    //加载所有客房及其类型数据
    function loadAllRoom() {
        $.ajax({
            url:"room/loadAll",
            type:"POST",
            data:{},
            success:function (rs) {
                var roomStatus0 = '';
                var roomStatus1 = '';
                var roomStatus2 = '';
                //根据客房状态分别显示不同状态的客房信息
                $.each(rs,function (i,item) {
                    if(item.roomStatus=='0'){  //空闲
                        roomStatus0 += '<li style="background-color: #009688;">';
                        roomStatus0 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus0 += '<div class="code">';
                        roomStatus0 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus0 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus0 += '</div>';
                        roomStatus0 += '</li>';
                    }else if(item.roomStatus=='1'){  //已入住
                        roomStatus1 += '<li style="background-color: red;">';
                        roomStatus1 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus1 += '<div class="code">';
                        roomStatus1 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus1 += '</div>';
                        roomStatus1 += '</li>';
                    }else {  //打扫
                        roomStatus2 += '<li style="background-color: blueviolet;">';
                        roomStatus2 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus2 += '<div class="code">';
                        roomStatus2 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus2 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus2 += '<button type="button" value="upd" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        roomStatus2 += '</div>';
                        roomStatus2 += '</li>';
                    }
                });
                //将数据标签填充到ul列表容器中
                $("ul").eq(0).html(roomStatus0);
                $("ul").eq(1).html(roomStatus1);
                $("ul").eq(2).html(roomStatus2);
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //加载客房类型
    function loadAllRoomType() {
        $.ajax({
            url:"roomType/loadAll",
            type:"POST",
            data:{},
            success:function (rs) {
                var roomTypeStr = '<option value="" selected>-- 请选择房间类型 --</option>';
                $.each(rs,function (i, item) {
                    roomTypeStr += '<option value="'+item.id+'">'+item.roomTypeName+' - '+item.roomPrice+'</option>';
                });
                //将客房类型填充到下拉框
                $("#selRoomType").html(roomTypeStr);
                form.render("select");  //渲染下拉框
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加客房信息
    $("#saveRoomsUI").click(function () {
        //清空上一次输入的房间号
        $("#roomNum").val("");
        //弹出添加页面
        layer.open({
            type:1,  //弹框类型
            title:"客房信息添加界面", //弹框标题
            area:['400px','500px'],  //弹框的宽高度
            anim: 4,  //弹框弹出时的动画效果
            shade:0.5,  //背景的透明度
            content:$("#saveRoomDiv")  //弹出的内容
        });
    });

    //监听表单添加
    form.on('submit(demo3)',function (data) {
        var saveJsonRoom = data.field;
        saveJsonRoom['flag'] = 1;  //显示
        saveJsonRoom['roomStatus'] = '0';  //空闲
        saveRoom(saveJsonRoom);  //执行添加操作
        layer.closeAll(); //关闭所有弹框
        return false;
    });

    //自定义表单验证
    form.verify({
        roomNum: function (value, item) { //value：表单的值,item：表单的DOM对象
            if (value.length != 4) {
                return '房间号为4位';  //长度验证
            } else {
                checkRoomNum(value);  //唯一性验证
                if (!roomNumIf){
                    return '此房间号已被占用';
                }
            }
        }
    });

    //房间号的唯一性验证
    function checkRoomNum(roomNum) {
        $.ajax({
            url:"room/getCountByParams",
            type:"POST",
            async:false,  //允许ajax外的变量获取数据
            data:{
                "roomNum":roomNum
            },
            success:function (rs) {
                if (rs > 0){
                    roomNumIf = false;
                } else {
                    roomNumIf = true;
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加房间信息
    function saveRoom(saveJsonRoom) {
        $.ajax({
            url:"room/save",
            type:"POST",
            data:saveJsonRoom,
            success:function (rs) {
                if (rs == 'success'){
                    layer.msg('房间信息添加成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRoom();  //重新加载客房信息
                } else {
                    layer.msg('房间信息添加失败',{icon:2,time:2000,anim:3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //房间删除或修改为空闲状态
    $("ul").on("click","button",function () {
        var event = $(this).val();  //当前点击的button标签的值(del/upd)
        var roomid = $(this).attr("roomid");  //获取要删除/修改的房间id
        if (event == 'del'){  //删除
            layer.confirm('确定要删除此房间吗',function (index) {
                updRoomFlag(roomid);  //删除房间的方法
                layer.close(index);  //关闭弹框
            });
        } else {  //修改
            layer.confirm('确定要将此房间的状态改为空闲吗',function (index) {
                updRoomStatus(roomid);  //修改房间状态的方法
                layer.close(index);  //关闭弹框
            });
        }
    });

    //删除房间(flag改为0,不显示)
    function updRoomFlag(roomid) {
        $.ajax({
            url:"room/updByPrimaryKeySelective",
            type:"POST",
            data:{
                "id":roomid,
                "flag":0
            },
            success:function (rs) {
                if (rs == 'success'){
                    layer.msg('房间信息删除成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRoom();  //重新加载客房信息
                } else {
                    layer.msg('房间信息删除失败',{icon:2,time:2000,anim:3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //房间状态 打扫--->空闲 (roomStatus 2-->0)
    function updRoomStatus(roomid) {
        $.ajax({
            url:"room/updByPrimaryKeySelective",
            type:"POST",
            data:{
                "id":roomid,
                "roomStatus":0
            },
            success:function (rs) {
                if (rs == 'success'){
                    layer.msg('房间状态修改成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRoom();  //重新加载客房信息
                } else {
                    layer.msg('房间状态修改失败',{icon:2,time:2000,anim:3,shade:0.5});
                }
            },
            error:function (rs) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    /*******************************文件上传*******************************/

        //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'  //绑定文件上传的容器
        ,accept: 'file'  //允许上传的文件类型(file:所有类型)
        ,size: 1024  //上传文件的最大值(kb)
        //,auto: false  //设置不自动上传,默认为true
        //,bindAction: '#test9'  //绑定手动上传的按钮
        ,url: 'room/uploadRoomPic' //改成您自己的上传接口
        ,field: 'myFile'  //服务器端接收文件的名字
        ,before: function(obj){  //文件上传之前的函数回调
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){  //将图片回显到img标签中
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){  //执行上传后的函数回调
            if(res.code == 0){
                $("#roomPicId").val(res.newFileName);  //将上传后的新文件名替换到隐藏域,做客房信息添加的表单提交
                return layer.msg('上传成功', {icon: 1,time:1500,anim: 4,shade:0.5});
            } else {
                return layer.msg('上传失败',{icon:2,time:1500,anim:3,shade:0.5});
            }
        }
        ,error: function(){  //异常时的函数回调
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
});