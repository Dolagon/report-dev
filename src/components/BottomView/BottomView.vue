<template>
    <div class="bottom-view">
        <div class="view">
            <el-card shadow="hover">
                <template v-slot:header>
                    <div class="title-wrapper">关键词搜索</div>
                </template>
                <template>
                    <div class="chart-wrapper">
                        <div class="chart-inner">
                            <div class="chart">
                                <div class="chart-title">搜索用户数</div>
                                <div class="chart-data">{{ userCount | format }}</div>
                                <v-chart :options="searchUserOption"/>
                            </div>
                            <div class="chart">
                                <div class="chart-title">搜索量</div>
                                <div class="chart-data">{{ searchCount | format }}</div>
                                <v-chart :options="searchNumberOption"/>
                            </div>
                        </div>
                        <div class="table-wrapper">
                            <el-table :data="tableData">
                                <el-table-column prop="rank" label="排名"/>
                                <el-table-column prop="keyword" label="关键词"/>
                                <el-table-column prop="count" label="总搜索量"/>
                                <el-table-column prop="users" label="搜索用户数"/>
                                <el-table-column prop="range" label="搜索占比"/>
                            </el-table>
                            <el-pagination
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                background
                                @current-change="onPageChange"
                            />
                        </div>
                    </div>
                </template>
            </el-card>
        </div>
        <div class="view">
            <el-card shadow="hover">
                <template v-slot:header>
                    <div class="title-wrapper">
                        <div class="title">分类销售排行</div>
                        <div class="radio-wrapper">
                            <el-radio-group v-model="radioSelect" size="small" @change="onCategoryChange">
                                <el-radio-button label="品类"></el-radio-button>
                                <el-radio-button label="商品"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </template>
                <template>
                    <div class="chart-wrapper">
                        <v-chart :options="categoryOptions"/>
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin';

const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']; // 调色盘

export default {
    mixins: [commonDataMixin],
    name: 'BottomView',
    data() {
        return {
            searchUserOption: {},
            searchNumberOption: {},
            tableData: [],
            totalData: [],
            total: 0, // 总数据量
            pageSize: 4,
            userCount: 0,
            searchCount: 0,
            radioSelect: '品类',
            categoryOptions: {}
        };
    },
    watch: {
        'wordCloud'(value) {
            let totalData = [];
            value.forEach((item, index) => {
                totalData.push({
                    id: index + 1,
                    rank: index + 1,
                    keyword: item.word,
                    count: item.count,
                    users: item.user,
                    range: `${((item.user / item.count) * 100).toFixed(2)}%`
                });
            });
            this.totalData = totalData;
            this.total = totalData.length;
            this.renderTable(1);
            this.userCount = totalData.reduce((prev, cur) => cur.users + prev, 0);
            this.searchCount = totalData.reduce((prev, cur) => cur.count + prev, 0);
            this.renderLineChart();
        },
        'category1'() {
            this.renderPieChart();
        }
    },
    methods: {
        onPageChange(page) {
            this.renderTable(page);
        },
        onCategoryChange(type) {
            this.radioSelect = type;
            this.renderPieChart();
        },
        renderPieChart() {
            let data, axis;
            let total = 0;
            if (this.radioSelect === '品类') {
                data = this.category1.data1.slice(0, 6);
                axis = this.category1.axisX.slice(0, 6);
                total = data.reduce((prev, cur) => prev + cur, 0);
            } else {
                data = this.category2.data1.slice(0, 6);
                axis = this.category2.axisX.slice(0, 6);
                total = data.reduce((prev, cur) => prev + cur, 0);
            }
            let chartData = [];
            data.forEach((item, index) => {
                const percent = `${(item / total * 100).toFixed(2)}%`;
                const name = `${axis[index]} | ${percent}`;
                chartData.push({
                    legendName: axis[index],
                    value: item,
                    percent,
                    itemStyle: {
                        // 当前区域样式
                        color: colors[index]
                    },
                    name
                });
            });
            this.categoryOptions = {
                title: [{
                    text: `${this.radioSelect}分布`,
                    textStyler: {
                        fontSize: 14,
                        color: '#666'
                    },
                    left: 20,
                    top: 20
                }, {
                    // 定制副标题
                    text: '累计订单量',
                    subtext: total,
                    x: '34.5%',
                    y: '42.5%',
                    textStyle: {
                        fontSize: 14,
                        color: '#999'
                    },
                    subtextStyle: {
                        fontSize: 28,
                        color: '#333'
                    },
                    textAlign: 'center'
                }],
                series: [{
                    name: '品类分布',
                    type: 'pie',
                    data: chartData,
                    label: {
                        normal: {
                            show: true,
                            position: 'putter', // label 显示位置
                            formatter: params => {
                                return params.data.legendName;
                            }
                        }
                    },
                    center: ['35%', '50%'], // 改变位置 依据中心点
                    radius: ['45%', '60%'], // 内半径 外半径 设置环形
                    labelLine: {
                        normal: {
                            length: 5, // 线段长度
                            length2: 3,
                            smooth: true
                        }
                    },
                    clockwise: true, // 排列顺序
                    itemStyle: {
                        borderWidth: 4, // 增加边距
                        borderColor: '#fff'
                    }
                }],
                // 图例 legend必须有那么
                legend: {
                    type: 'scroll', // 滑动
                    orient: 'vertical', // 垂直
                    height: 250,
                    left: '70%',
                    top: 'middle', // 居中
                    textStyle: {
                        color: '#bcbcbc'
                    }
                },
                // 弹出层
                tooltip: {
                    trigger: 'item',
                    formatter: params => {
                        // 显示信息 series里的name
                        const str = params.seriesName + '<br/>' + params.marker + params.data.legendName + '<br/>' + '数量:' + params.data.value + '<br/>' + '占比:' + params.data.percent + '%';
                        return str;
                    }
                }
            };
        },
        renderTable(page) {
            const start = (page - 1) * this.pageSize;
            const end = start + this.pageSize;
            this.tableData = this.totalData.slice(start, end);
        },
        renderLineChart() {
            const createOption = key => {
                let data = [];
                let axis = [];
                this.wordCloud.forEach(item => data.push(item[key]));
                this.wordCloud.forEach(item => axis.push(item.word));
                return {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: axis
                    },
                    yAxis: {
                        show: false
                    },
                    tooltip: {},
                    series: [{
                        type: 'line',
                        data,
                        areaStyle: {
                            color: 'rgba(95,187,255,.5)'
                        },
                        lineStyle: {
                            color: 'rgb(95,187,255)'
                        },
                        itemStyle: {
                            opacity: 0
                        },
                        smooth: true
                    }],
                    grid: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }
                };
            };
            this.searchUserOption = createOption('user');
            this.searchNumberOption = createOption('count');
        }
    }
};
</script>

<style lang="scss" scoped>
.bottom-view {
    display: flex;
    margin-top: 20px;
    .view {
        flex: 1;
        width: 50%;
        box-sizing: border-box;
        &:first-child {
            padding: 0 10px 0 0;
        }
        &:last-child {
            padding: 0 0 0 10px;
        }
        .title-wrapper {
            display: flex;
            align-items: center;
            height: 60px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            font-weight: bold;
            padding: 0 0 0 20px;
            .radio-wrapper {
                flex: 1;
                display: flex;
                justify-content: flex-end;
                padding-right: 20px;
            }
        }
        .chart-wrapper {
            display: flex;
            flex-direction: column;
            height: 452px;
            .chart-inner {
                display: flex;
                padding: 0 10px;
                margin-top: 20px;
                .chart {
                    flex: 1;
                    padding: 0 10px;
                    .chart-title {
                        color: #999;
                        font-size: 14px;
                    }
                    .chart-data {
                        font-size: 22px;
                        color: #333;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                    .echarts {
                        height: 50px;
                    }
                }
            }
        }
        .table-wrapper {
            flex: 1;
            margin-top: 20px;
            padding: 0 20px 20px;
            .el-pagination {
                display: flex;
                justify-content: flex-end;
                margin-top: 15px;
            }
        }
    }
}
</style>
