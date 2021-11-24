<template>
    <ve-wordcloud :data="chartData" height="100%" :settings="chartSettings"></ve-wordcloud>
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin';

export default {
    mixins: [commonDataMixin],
    name: 'index',
    data() {
        return {
            chartData: {},
            chartSettings: {
                color: [
                    'rgba(97,216,0,.7)',
                    'rgba(204,178,26,.7)',
                    'rgba(245,166,35,.7)',
                    'rgba(156,13,113,.7)'
                ]
            }
        };
    },
    watch: {
        'wordCloud'(value) {
            let rows = [];
            value.forEach(item => {
                rows.push({
                    name: item.word,
                    value: item.count
                });
            });
            this.chartData = {
                columns: ['name', 'value'],
                rows
            };
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
