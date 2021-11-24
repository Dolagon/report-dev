<template>
    <!-- 使用 v-charts组件开发 -->
    <ve-bmap
        :settings="chartSettings"
        :title="title"
        :tooltip="{}"
        :series="chartSeries"
        height="100%"
    />
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin';

// 转换为 { name: 'beijing', value: [121,1, 121,1, 100] }
const converData = (data, geo) => {
    const res = [];
    data.forEach(item => {
        const { name, value } = item;
        const coord = geo[name];
        res.push({ name, value: [...coord, value] });
    });
    return res;
};
export default {
    mixins: [commonDataMixin],
    name: 'Bmap2',
    data() {
        return {
            title: {
                text: '销售数据大盘',
                subtext: '销售趋势统计',
                sublink: 'http://www.imooc.com',
                left: 'center'
            },
            chartSettings: {
                key: 'G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb', // 百度地图key
                bmap: {
                    center: [104.114129, 37.550339], // 中心点位置
                    zoom: 5,
                    roam: false,
                    mapStyle: {
                        styleJson: [{
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'land',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#f3f3f3'
                            }
                        }, {
                            'featureType': 'railway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fdfdfd'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'poi',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'green',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'subway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'local',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'building',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'label',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#999999'
                            }
                        }]
                    }
                }
            },
            chartSeries: []
        };
    },
    watch: {
        'mapData'(value) {
            const { data, geo } = value;
            this.chartSeries = [
                {
                    name: '销售额', // 鼠标悬停信息
                    type: 'scatter', // 散点图类型
                    coordinateSystem: 'bmap', // 坐标系统
                    data: converData(data, geo),
                    encode: {
                        value: 2
                    },
                    itemStyle: {
                        color: 'purple'
                    },
                    symbolSize: val => {
                        // val 为数据源中的 value
                        return val[2] / 10;
                    }, // 设置点的大小
                    label: {
                        show: false,
                        position: 'right',
                        formatter: v => {
                            return `${v.data.name} - ${v.data.value[2]}`;
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    } // 鼠标悬停显示label
                },
                // 效果散点图 显示前10数据
                {
                    name: 'Top 10',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: converData(data.sort((a, b) => {
                        return b.value - a.value;
                    }), geo).slice(0, 10),
                    symbolSize: val => {
                        return val[2] / 10;
                    },
                    encode: {
                        value: 2
                    },
                    label: {
                        formatter: v => {
                            return `${v.data.name} - ${v.data.value[2]}`;
                        },
                        position: 'right',
                        show: true
                    },
                    hoverAnimation: true,
                    rippleEffect: {
                        // 远点发散效果
                        brushType: 'stroke'
                    },
                    itemStyle: {
                        color: 'purple',
                        shadowBlur: 10, // 增加阴影
                        shadowColor: '#333'
                    }
                }
            ]
        }
    }
};
</script>

<style scoped>

</style>
