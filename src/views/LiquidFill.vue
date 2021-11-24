<template>
    <div id="container">

    </div>
</template>

<script>
import 'echarts-liquidfill';

export default {
    mounted() {
        const data = [0.68, {
            // 特殊处理
            value: 0.5,
            direction: 'left' // 向左滑动
        }, 0.4, {
            value: 0.3,
            itemStyle: {
                opacity: 0.6
            },
            emphasis: {
                itemStyle: {
                    opacity: 0.9
                }
            }
        }];
        const chart = this.$echarts.init(document.getElementById('container'));
        chart.setOption({
            series: [{
                type: 'liquidFill',
                data,
                color: ['pink', 'aqua', 'yellow'],
                amplitude: 20, // 波浪幅度
                backgroundStyle: {
                    color: 'purple',
                    borderWidth: 3,
                    borderColor: '#fff'
                },
                outline: {
                    show: true, // 外层显示
                    borderDistance: 2, // 边框距离
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: 'black',
                        shadowBlur: 'none'
                    }
                },
                shape: 'circle' // 水球图形状
            }]
        });
    }
};
</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
}
</style>
