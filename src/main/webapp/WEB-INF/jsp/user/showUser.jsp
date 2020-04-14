<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() +request.getContextPath()+"/";
%>
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath %>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>用户信息管理</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入ztree相关css和js文件-->
    <link rel="stylesheet" href="lib/zTree/css/icomoon_styles.css" type="text/css">
    <link rel="stylesheet" href="lib/zTree/css/metroStyle.css" type="text/css">
    <script type="text/javascript" src="lib/zTree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.exedit.js"></script>
    <%--调整td宽高度--%>
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
    </style>
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
<div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>用户显示页面</legend>
    </fieldset>
    <div align="center">
        <!--权限树形容器-->
        <div id="ztreeDiv" class="content_wrap" style="display: none;">
            <div class="zTreeDemoBackground left">
                <ul id="test1" class="ztree"></ul>
            </div>
        </div>
        <!--角色信息数据显示的容器-->
        <table id="demo" lay-filter="test"></table>
    </div>
</div>
</body>
<!--引入layui的js文件-->
<script src="js/user/showUser.js"></script>
<!--表格操作模板-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="query"><i class="layui-icon">&#xe642;</i>查看</a>
</script>
<%--角色--%>
<script type="text/html" id="roleIdTpl">
    {{#  if(d.roleId == 1){ }}
    <font color="#FF9A2B">超级管理员</font>
    {{#  } else { }}
    <font color="#2BFF9A">前台</font>
    {{#  } }}
</script>
<%--是否可用--%>
<script type="text/html" id="useStatusTpl">
    {{#  if(d.useStatus == 1){ }}
    <font color="green">可用</font>
    {{#  } else { }}
    <font color="red">不可用</font>
    {{#  } }}
</script>
</html>

