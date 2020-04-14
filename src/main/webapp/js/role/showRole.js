layui.use(['layer','table','form','laydate'], function() {
    var //$ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期


    //订单信息的方法级渲染
    table.render({  //每一次查询都重新渲染table容器
        elem: '#demo' //数据存放的容器，为table标签，其id="demo"
        ,height: 412  //容器高度
        ,url: 'role/loadPageByParams' //数据接口或者访问服务器端的数据路径
        ,limit:3   //自定义每一页的数据条数
        //,where: queryJsonOrder  //传到服务器端的额外参数
        ,limits:[2,3,5,8,10]
        ,even:true  //逐行背景色深浅不一
        ,page: true //开启分页
        ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
            {type:'checkbox'}
            ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
            ,{field: 'roleName', title: '角色名称', align:'center',width:120}
            ,{field: 'firstAuthorityNames', title: '角色权限', width:605, align:'center',sort: true}
            ,{field: 'createDate', title: '创建时间', width:220,align:'center'}
            ,{field: 'status', title: '是否可用', width: 140,align:'center', sort: true,templet:'#statusTpl'}
            ,{field: 'flag', title: '是否显示', width: 140, align:'center',sort: true,templet:'#flagTpl'}
            ,{fixed: 'right',title: '操作', width:120, align:'center', toolbar: '#barDemo'}//工具条
        ]],
        done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            //console.log(res);  //就是控制器所响应回的Map集合中数据(当前页的所有数据,格式为JSON)
            //console.log(curr);  //当前页码
        }
    });

    //监听工具条
    table.on('tool(test)', function(obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event;

        if (layEvent === 'query'){
            //查看此角色拥有的权限结构
            //1.查询数据并渲染到树型结构容器中
            loadZtree('authority/loadAuthoritiesByRoleId?roleId='+data.id);  //访问路径
            //2.弹框显示树型结构容器
            layer.open({
                type:1,  //弹框类型
                title:"权限的树型结构界面", //弹框标题
                area:['400px','500px'],  //弹框的宽高度
                anim: 4,  //弹框弹出时的动画效果
                shade:0.5,  //背景的透明度
                content:$("#ztreeDiv"),  //弹出的内容
                cancel: function(index, layero){
                    //将树型图的div重新隐藏起来
                    $("#ztreeDiv").hide();
                }
            });
        }
    });

    //加载角色的权限树形图
    function loadZtree(dataUrl) {
        var setting = {
            data : {
                simpleData : {
                    enable : true,   //使用格式化后的数据
                    idKey : "id",       // 结点的id,对应到Json数据中的节点对象的id
                    pIdKey : "parent",     // 结点的pId,父节点id,对应到Json数据中的节点对象pid,最后跟实体对象中的id和pId名字一致
                    rootPId : 0         // 根节点设置为0
                },
                key : {
                    name : "authorityName" // 结点显示的name属性，对应到Json中的rName
                }
            },
            check: {
                enable: true   //是否使用节点复选框，默认为false(不使用)
            },
            async : {
                enable : true,  //使用异步数据：从服务器端获取数据
                url:dataUrl,    //服务器端访问路径
                autoParam:["id", "name=n", "level=lv"],  //使用异步加载的默认配置
                otherParam:{"otherParam":"zTreeAsyncTest"}
            }
        };
        $.fn.zTree.init($("#test1"), setting);  //树形结构的数据初始化
    }


});