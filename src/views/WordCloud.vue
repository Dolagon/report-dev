<template>
    <div id="container">

    </div>
</template>

<script>
import 'echarts-wordcloud';

export default {
    name: 'WordCloud',
    mounted() {
        const data = [{
            name: 'dude',
            value: 100
        }, {
            name: '数据可视化',
            value: 500
        }, {
            name: 'dzd',
            value: 25
        }];
        const chart = this.$echarts.init(document.getElementById('container'));
        chart.setOption({
            series: [{
                type: 'wordCloud',
                shape: 'diamond',
                data,
                textStyle: {
                    normal: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        // Color can be a callback function or a color string
                        color: () => {
                            // 返回随机色
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                }
            }]
        });
    }
};
</script>

<style lang="scss" scoped>
#container {
    width: 100%;
    height: 100%;
}
</style>
