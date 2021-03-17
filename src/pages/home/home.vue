<template>
  <div>
    <!-- 容器 -->
    <div id="main"></div>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
  mounted(){


    var myChart = echarts.init(document.getElementById('main'),'light');

      // 指定图表的配置项和数据
        var option = {
            title: {
                text: '吃馒头比赛'
            },
            tooltip: {},
            legend: {
                data:['吃馒头个数']
            },
            xAxis: {
                data: ["向国亮","朱鹏","徐润宏","卢升","黄勇","我"]
            },
            yAxis: {},
            series: [{
                name: '吃馒头个数',
                type: 'line',
                data: [1000, 2000, 2000, 1500, 5000, 3000]
            }]
        };

      // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);

  }
}
</script>

<style scoped>
#main{
  width: 6oopx;
  height: 400px;
  margin: 20px auto;
}

</style>