<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() +request.getContextPath()+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath %>">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>title</title>
    <%--引入jquery--%>
    <script src="lib/echarts/jquery.min.js"></script>
    <%--引入echarts文件--%>
    <script src="lib/echarts/echarts.min.js"></script>
</head>
<body>
    <div align="center">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main" style="width: 1000px;height:600px;"></div>
    </div>
</body>
<script src="js/idd/showIdd.js"></script>
</html>
