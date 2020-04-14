<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() +request.getContextPath()+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath %>">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>入住信息查询</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <%--调整td和img的宽高度--%>
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
        .layui-table td img{
            width:60px;
            height: 60px;
        }
    </style>
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
    <div>
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>入住信息显示</legend>
        </fieldset>
        <!--入住信息数据显示的容器-->
        <table id="demo" lay-filter="test"></table>
        <%--引入退房操作页面--%>
        <jsp:include page="checkOut.jsp"/>
    </div>
</body>
<!--引入layui的js文件-->
<script src="js/inroominfo/showInRoomInfo.js"></script>
<!--表格操作模板-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="query"><i class="layui-icon">&#xe642;</i>查看</a>
    {{#  if(d.outRoomStatus == 1){ }}
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    {{#  } else { }}
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="checkOut"><i class="layui-icon">&#xe642;</i>退房</a>
    {{#  } }}
</script>
<%--性别显示--%>
<script type="text/html" id="genderTpl">
    {{#  if(d.gender == 1){ }}
        <font color="#6495ed">男</font>
    {{#  } else { }}
        <font color="#ff7f50">女</font>
    {{#  } }}
</script>
<%--退房信息显示--%>
<script type="text/html" id="outRoomStatusTpl">
    {{#  if(d.outRoomStatus == 1){ }}
        <font color="green">已退房</font>
    {{#  } else { }}
        <font color="red">未退房</font>
    {{#  } }}
</script>
<%--是否会员显示--%>
<script type="text/html" id="isVipTpl">
    {{#  if(d.isVip == 1){ }}
        <font color="green">是</font>
    {{#  } else { }}
        <font color="red">否</font>
    {{#  } }}
</script>
</html>
