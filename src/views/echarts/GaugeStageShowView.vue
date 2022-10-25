<script>
import * as echarts from 'echarts';
    export default {
        data() {
            return {
                myChart: null
            }
        },
        mounted(){
            // 1. 将图表和标签绑定
            this.myChart = echarts.init(document.getElementById('box'))

            // 2. 给图表添加数据
            this.myChart.setOption({
                series: [
                    {
                    type: 'gauge',
                    axisLine: {
                        lineStyle: {
                        width: 30,
                        color: [
                            [0.3, '#67e0e3'],
                            [0.7, '#37a2da'],
                            [1, '#fd666d']
                        ]
                        }
                    },
                    pointer: {
                        itemStyle: {
                        color: 'auto'
                        }
                    },
                    axisTick: {
                        distance: -30,
                        length: 8,
                        lineStyle: {
                        color: '#fff',
                        width: 2
                        }
                    },
                    splitLine: {
                        distance: -30,
                        length: 30,
                        lineStyle: {
                        color: '#fff',
                        width: 4
                        }
                    },
                    axisLabel: {
                        color: 'auto',
                        distance: 40,
                        fontSize: 20
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value} km/h',
                        color: 'auto'
                    },
                    data: [
                        {
                        value: 70
                        }
                    ]
                    }
                ]
            })

let num = 0
setInterval( ()=> {
    console.log(this);
    if(num >= 100){
        num = 0
    }
  this.myChart.setOption({
    series: [
      {
        data: [
          {
            value: num += 10
          }
        ]
      }
    ]
  });
}, 2000);


        }
    }
</script>
<template>
    <div>
        
        <div id="box"></div>
    </div>
</template>
<style lang="scss" scoped>
    #box {
        height: 600px;
    }
</style>