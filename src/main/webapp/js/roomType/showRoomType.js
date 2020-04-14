layui.use(['layer','jquery','form','element','laypage'], function() {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form,
        element = layui.element,
        laypage = layui.laypage;

    var limit = 3;  //每一页显示的数据条数

    var page = 1;  //当前页

    var count = 0;  //总的数据条数

    var deleteRoomTypeIf = false;  //判断是否可以删除客房类型的全局变量

    var roomTypeNameIf = false;  //判断房间名是否存在的全局变量

    //首次进行数据的初始化
    loadPageRoomType();

    //初始化分页
    loadLayPage();

    //分页
    function loadLayPage() {
        laypage.render({
            elem: 'test1'  //分页容器
            ,count: count  //总的数据条数
            ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
            ,limit: limit  //默认的每页数据条数
            ,limits: [3,5,8,10,15]  //供选择的每页数据条数
            ,jump: function(obj,first){  //分页时的函数回调
                if (!first){  //首页不加载
                    page = obj.curr;  //将分页的页面赋值给全局变量当前页
                    limit = obj.limit;  //将每页的数据条数赋值给全局变量
                    loadPageRoomType();
                }
            }
        });
    }

    //加载房间类型信息
    function loadPageRoomType() {
        $.ajax({
            type:"post",
            url:"roomType/loadPageByParams",
            async: false,
            data:{"page":page,"limit":limit},
            success:function (data) {
                count = data.count;  //将数据总条数赋值给全局变量
                var roomTypeStr = '';
                $.each(data.data,function (i,roomType) {
                    roomTypeStr += '<div class="layui-colla-item" style="margin-top: 10px;">';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" event="del" value="'+roomType.id+'" style="float: right;">删除</button>';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-warm" event="upd" value="'+roomType.id+','+roomType.roomTypeName+','+roomType.roomPrice+'" style="float: right;">修改</button>';
                    roomTypeStr += '<h2 class="layui-colla-title" roomTypeId="'+roomType.id+'">'+roomType.roomTypeName+'--'+roomType.roomPrice+'元/天'+'</h2>';
                    roomTypeStr += '<div class="layui-colla-content">';
                    roomTypeStr += '<p id="p'+roomType.id+'"></p>';
                    roomTypeStr += '</div>';
                    roomTypeStr += '</div>';
                })
                $("#collapseDiv").html(roomTypeStr);
                //将面板渲染
                element.render('collapse');
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5});
            }
        });
    }

    //监听折叠
    element.on('collapse(test)', function(data){
        if(data.show){  //打开时查询
            //根据房间类型id查询房间数据
            loadRoomByRoomTypeId($(this).attr("roomTypeId"));
        }
    });

    //根据房间类型id查询房间数据
    function loadRoomByRoomTypeId(roomTypeId){
        $.ajax({
            type:"post",
            url:"room/loadManyByParams",
            data:{"roomTypeId":roomTypeId},
            success:function (data) {
                //添加房间li标签的背景色
                var roomStr = '<ul class="site-doc-icon site-doc-anim">';
                $.each(data,function (i,item) {
                    if(item.roomStatus=='0'){
                        roomStr += '<li style="background-color: #009688;">';
                    }else if(item.roomStatus=='1'){
                        roomStr += '<li style="background-color: red;">';
                    }else {
                        roomStr += '<li style="background-color: blueviolet;">';
                    }
                    roomStr += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                    roomStr += '<div class="code">';
                    roomStr += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                    roomStr += '</div>';
                    roomStr += '</li>';
                });
                roomStr += '</ul>';
                $("#p"+roomTypeId).html(roomStr);
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5});
            }
        });
    }

    //删除&修改
    $("#collapseDiv").on('click','button',function () {
        var event = $(this).attr("event");  //获取具体的操作(删除/修改)
        var roomTypeId = $(this).val();  //获取类型数据(删除: 房间类型id, 修改: 对象数据字符串)
        if (event == 'del'){  //删除
            //删除之前判断类型是否存在客房数据
            checkRoomByRoomTypeId(roomTypeId);
            if (deleteRoomTypeIf){  //无数据,可删除
                layer.confirm("确认删除此客房类型吗",function (index) {
                    //执行删除
                    deleteRoomTypeById(roomTypeId);
                    layer.close(index);
                });
            } else {  //有数据,不可删除
                layer.msg("此类型有客房数据, 不能删除",{icon: 7,time: 2000,anim:6,shade:0.5})
            }
        } else {  //修改
            //数据回显
            var roomTypeArr = $(this).val().split(",");
            form.val("updRoomTypeFromFilter", {
                "id": roomTypeArr[0],
                "roomTypeName": roomTypeArr[1],
                "roomPrice": roomTypeArr[2],
            });
            //弹框显示
            layer.open({
                type: 1,
                title: "房间类型的修改界面",
                area: ['400px', '320px'],
                anim: 3,
                shade: 0.6,
                content: $("#updRoomTypeDiv"),
            });
            //监听提交修改
            form.on('submit(demo4)', function(data){
                updateRoomType(data.field);  //执行修改
                layer.closeAll();  //关闭所有弹框
                return false;  //阻止表单的action提交
            });
        }
    });

    //添加房间类型
    $("#saveRoomTypeBtn").click(function () {
        $("form").eq(0).find("input").val("");  //将添加的表单清空
        //弹框显示
        layer.open({
            type: 1,
            title: "房间类型的添加界面",
            area: ['400px', '270px'],
            anim: 3,
            shade: 0.6,
            content: $("#saveRoomTypeDiv"),
        });
        //监听提交添加
        form.on('submit(demo3)', function(data){
            saveRoomType(data.field);  //执行添加
            layer.closeAll();  //关闭所有弹框
            return false;  //阻止表单的action提交
        });
    });

    //自定义表单验证
    form.verify({
        roomTypeName: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length < 3 || value.length > 8) {
                return '房间类型名称必须为4-10位';
            }
            checkRoomTypeName(value);  //验证房间类型名的唯一性
            if(!roomTypeNameIf){
                return '此房间类型名称已被占用';
            }
        },
        roomPrice:function (value, item) {
            if(value < 100 || value > 1000){
                return '房间价格在100 ~ 1000之间';
            }
        }
    });

    //判断类型是否存在客房数据
    function checkRoomByRoomTypeId(roomTypeId) {
        $.ajax({
            type:"post",
            url:"room/getCountByParams",
            async: false,
            data:{"roomTypeId":roomTypeId},
            success:function (data) {
                if (data > 0){
                    deleteRoomTypeIf = false;  //存在客房,不能删除
                } else {
                    deleteRoomTypeIf = true;  //不存在客房,能删除
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5});
            }
        });
    }

    //根据主键删除
    function deleteRoomTypeById(roomTypeId) {
        $.ajax({
            type:"post",
            url:"roomType/delByPrimaryKey",
            async: false,
            data:{"id":roomTypeId},
            success:function (data) {
                if (data == 'success'){
                    layer.msg("房间类型删除成功",{icon: 1,time: 2000,anim:4,shade:0.5});
                    loadPageRoomType();  //加载当前页的房型数据
                    loadLayPage();  //加载分页插件
                } else {
                    layer.msg("房间类型删除失败",{icon: 2,time: 2000,anim:5,shade:0.5});
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5});
            }
        });
    }

    //验证房间类型名的唯一性
    function checkRoomTypeName(roomTypeName) {
        $.ajax({
            type:"post",
            url:"roomType/getCountByParams",
            async: false,
            data:{"roomTypeName":roomTypeName},
            success:function (data) {
                if (data > 0){
                    roomTypeNameIf = false;  //存在客房类型
                } else {
                    roomTypeNameIf = true;  //不存在客房类型
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5});
            }
        });
    }

    //添加房间类型
    function saveRoomType(saveJsonRoomType) {
        $.ajax({
            type:"post",
            url:"roomType/save",
            //async: false,
            data:saveJsonRoomType,
            success:function (data) {
                if (data == 'success'){
                    layer.msg("房间类型添加成功",{icon: 1,time: 2000,anim:4,shade:0.5});
                    page = 1;  //当前页
                    loadPageRoomType();  //加载第一页的房型数据
                    loadLayPage();  //加载分页插件
                } else {
                    layer.msg("房间类型添加失败",{icon: 2,time: 2000,anim:5,shade:0.5});
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5});
            }
        });
    }

    //修改房间类型
    function updateRoomType(updateJsonRoomType) {
        $.ajax({
            type:"post",
            url:"roomType/updByPrimaryKeySelective",
            //async: false,
            data:updateJsonRoomType,
            success:function (data) {
                if (data == 'success'){
                    layer.msg("房间类型修改成功",{icon: 1,time: 2000,anim:4,shade:0.5});
                    loadPageRoomType();  //加载当前页的房型数据
                    //loadLayPage();  //加载分页插件
                } else {
                    layer.msg("房间类型修改失败",{icon: 2,time: 2000,anim:5,shade:0.5});
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5});
            }
        });
    }
});