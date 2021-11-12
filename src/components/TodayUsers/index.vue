<template>
    <card
        title="今日交易用户数"
        value="81,014"
    >
        <template>
            <v-chart :options="getOptions()" />
        </template>
        <!-- footer -->
        <template v-slot:footer>
            <span>退货率 </span>
            <span class="emphasis">5.14%</span>
        </template>
    </card>
</template>

<script>
import commonCardMixin from '@/components/mixins/commonCardMixin';

export default {
    name: 'index',
    mixins: [commonCardMixin],
    methods: {
        getOptions() {
            return {
                series: [{
                    color: ['#3398db'],
                    type: 'bar', // 柱状图
                    data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150],
                    barWidth: '60%' // 控制柱状图间隔宽度
                }],
                xAxis: {
                    type: 'category',
                    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
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
            }
        }
    }
};
</script>

<style scoped>

</style>
