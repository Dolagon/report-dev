<template>
    <card
        title="累计订单量"
        value="￥ 2,157,420"
    >
        <template>
            <div id="total-orders-chart" :style="{ width: '100%', height: '100%' }"></div>
        </template>
        <!-- footer -->
        <template v-slot:footer>
            <span>昨日订单量</span>
            <span class="emphasis">￥ 20,000,000</span>
        </template>
    </card>
</template>

<script>
import commonCardMixin from '@/components/mixins/commonCardMixin';

export default {
    mixins: [commonCardMixin],
    mounted() {
        const chartDom = document.getElementById('total-orders-chart');
        // 绘制图标
        const chart = this.$echarts.init(chartDom);
        chart.setOption({
            xAxis: {
                type: 'category',
                show: false,
                boundaryGap: false // 默认距离x轴会有间距
            },
            yAxis: {
                show: false // 隐藏y轴
            },
            // 系列对应图标
            series: [{
                type: 'line',
                data: [620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220, 620],
                areaStyle: { // 控制面积
                    color: 'purple'
                },
                lineStyle: { // 控制线
                    width: 0
                },
                itemStyle: { // 设置坐标点
                    opacity: 0
                },
                smooth: true // 线段平滑展示
            }],
            grid: { // 设置布局
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        });
    }
};
</script>

<style scoped>

</style>
