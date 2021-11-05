<template>
    <ve-line
        :data="data"
    >
    </ve-line>
</template>

<script>
export default {
    name: 'SalesView',
    data() {
        return {
            data: {
                columns: ['日期', '销售额'],
                rows: [
                    { '日期': '1月1日', '销售额': 123 },
                    { '日期': '1月2日', '销售额': 1223 },
                    { '日期': '1月3日', '销售额': 2123 },
                    { '日期': '1月4日', '销售额': 4123 },
                    { '日期': '1月5日', '销售额': 3123 },
                    { '日期': '1月6日', '销售额': 7123 }
                ]
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.echarts {
    width: 100%;
    height: 100%;
}
</style>
