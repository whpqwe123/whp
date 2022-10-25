<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            myChart: null
        }
    },
    methods: {
        changeType(type,  x , y) {
            // console.log(type, x , y);
            // 绘制图表
            this.myChart.setOption({
                toolbox: {
                    feature: {
                        saveAsImage:{}
                    },
                },
                title: {
                    text: 'ECharts展示'
                },
                tooltip: {},
                xAxis: {
                    data: x || ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: type || 'line',
                        data: y || [5, 20, 36, 10, 10, 20],
                       
                    }
                ]
            });
        }
    },
    mounted() {
        // 1. 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('main'));
        // 2. 给图表添加数据
        this.changeType()
    }

}
</script>
<template>
    <!-- 点击按钮请求数据，通过拿到的数据来设置在图表上 -->
    <el-button type="primary" @click="changeType('line')">折线图</el-button>
    <el-button type="success" @click="changeType('bar')">柱状图</el-button>
    <el-button type="info" @click="changeType('pie')">饼状图</el-button>
    <el-button type="warning" @click="changeType('scatter')">散点图</el-button>


    <el-button type="danger" @click="changeType('line',['冰箱', '彩电', '洗衣机' , 'VCD、DVD', '电风扇', '缝纫机'], [1000, 899, 666, 888, 231, 599])">电器销售</el-button>
    <el-button type="danger" @click="changeType('bar', ['榴莲', '火龙果', '车厘子' , '牛油果', '猕猴桃', '苹果'], [345, 657, 263, 736, 325, 622])">水果销售</el-button>

    <div id="main">
    </div>
</template>
<style lang="scss" scoped>
#main {
    height: 600px;
    background-color: white;
}
</style>