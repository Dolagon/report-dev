<template>
    <card
        title="累计用户数"
        value="1,087,503"
    >
        <template>
            <v-chart :options="getOptions()" />
        </template>
        <!-- footer -->
        <template v-slot:footer>
            <div class="total-users-footer">
                <span>日同比</span>
                <span class="emphasis">8.73%</span>
                <div class="increase"></div>
                <span class="month">月同比</span>
                <span class="emphasis">35.91%</span>
                <div class="decrease"></div>
            </div>
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
                    type: 'bar',
                    stack: '总量', // 相同stack可以合并
                    data: [150],
                    barWidth: 10,
                    itemStyle: {
                        color: '#45c946'
                    }
                }, {
                    type: 'bar',
                    stack: '总量',
                    data: [250],
                    itemStyle: {
                        color: '#eee'
                    }
                }, {
                    type: 'custom', // 自定义绘图
                    stack: '总量',
                    data: [150],
                    // 自定义图形定义属性 renderItem 绘制
                    renderItem: (params, api) => {
                        const value = api.value(0); // 拿到第一个值 200
                        const endPoint = api.coord([value, 0]); // 自动计算传入点的坐标
                        return {
                            type: 'group', // 将图形变为分组
                            children: [{
                                position: endPoint, // 绘图坐标系
                                type: 'path', // 绘制path线段
                                shape: {
                                    // 形状
                                    d: 'M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z', // iconfont svg d里面的内容
                                    x: -5,
                                    y: 10, // xy 轴的相对偏移量
                                    width: 10,
                                    height: 10,
                                    layout: 'cover' // 指定缩放策略 完全填满
                                },
                                style: {
                                    fill: '#45c946' // 填充色
                                }
                            }, {
                                position: endPoint, // 绘图坐标系
                                type: 'path', // 绘制path线段
                                shape: {
                                    // 形状
                                    d: 'M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z', // iconfont svg d里面的内容
                                    x: -5,
                                    y: -20, // xy 轴的相对偏移量
                                    width: 10,
                                    height: 10,
                                    layout: 'cover'
                                },
                                style: {
                                    fill: '#45c946' // 填充色
                                }
                            }]
                        };
                    }
                }],
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
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

<style lang="scss" scoped>
.total-users-footer {
    display: flex;
    align-items: center;

    .month {
        margin-left: 10px;
    }
}
</style>
