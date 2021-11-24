<template>
    <card
        title="今日交易用户数"
        :value="orderUser"
    >
        <template>
            <v-chart :options="getOptions()"/>
        </template>
        <!-- footer -->
        <template v-slot:footer>
            <span>退货率 </span>
            <span class="emphasis">{{ returnRate }}</span>
        </template>
    </card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin';
import commonDataMixin from '@/mixins/commonDataMixin';

export default {
    name: 'index',
    mixins: [commonCardMixin, commonDataMixin],
    methods: {
        getOptions() {
            return {
                tooltip: {},
                series: [{
                    name: '用户实时交易量',
                    color: ['#3398db'],
                    type: 'bar', // 柱状图
                    data: this.orderUserTrend,
                    barWidth: '60%' // 控制柱状图间隔宽度
                }],
                xAxis: {
                    type: 'category',
                    data: this.orderUserTrendAxis,
                    show: false
                },
                yAxis: {
                    show: false
                },
                grid: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            };
        }
    }
};
</script>

<style scoped>

</style>
