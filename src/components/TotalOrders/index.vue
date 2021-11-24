<template>
    <card
        title="累计订单量"
        :value="orderToday"
    >
        <template>
            <v-chart :options="getOptions()" />
        </template>
        <!-- footer -->
        <template v-slot:footer>
            <span>昨日订单量</span>
            <span class="emphasis">{{ orderLastDay }}</span>
        </template>
    </card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin';
import commonDataMixin from '@/mixins/commonDataMixin';

export default {
    mixins: [commonCardMixin, commonDataMixin],
    methods: {
        getOptions() {
            if (!this.orderTrend.length) return;
            return {
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
                    data: this.orderTrend,
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
            }
        }
    }
};
</script>

<style scoped>

</style>
