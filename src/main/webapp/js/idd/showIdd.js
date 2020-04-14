$(function () {
    var myChart = echarts.init(document.getElementById('main'));
    // 显示标题，图例和空的坐标轴
    myChart.setOption({
        title: {
            text: '异步数据加载示例'
        },
        tooltip: {},
        toolbox: {  //工具
            feature: {
                dataView: {}, //数据视图按钮(显示原始数据)
                saveAsImage: {
                    pixelRatio: 5  //保存为图片,数字代表清晰度
                },
                restore: {},
                magicType : {show: true, type: ['line', 'bar']}  //切换线形图和柱状图
            }
        },
        legend: {
            data:[]
        },
        xAxis: {
            data: []  //横轴数据
        },
        yAxis: {},
        series: []  //图标数据
    });
    // 异步加载数据
    $.get('roomSale/loadSalePriceGroupByRoomNum').done(function (data) {
        // 填入数据
        myChart.setOption({
            legend: {
                data: data.legend
            },
            xAxis: {
                data: data.xAxis
            },
            series: data.series
        });
    });
});