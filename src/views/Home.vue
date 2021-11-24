<template>
    <div class="home">
        <top-view/>
        <sales-view/>
        <bottom-view/>
        <map-view/>
    </div>
</template>

<script>
import TopView from '@/components/TopView/TopView';
import SalesView from '@/components/SalesView/SalesView';
import BottomView from '@/components/BottomView/BottomView';
import MapView from '@/components/MapView/MapView';
import { mapScatter, screenData, wordcloud } from '@/api';

export default {
    name: 'home',
    data() {
        return {
            reportData: null,
            wordCloud: null,
            mapData: null
        };
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        TopView, SalesView, BottomView, MapView
    },
    provide() {
        // 将数据传入所有子组件
        return {
            getReportData: this.getReportData,
            getWordCloud: this.getWordCloud,
            getMapData: this.getMapData
        };
    },
    async mounted() {
        this.reportData = await screenData();
        this.wordCloud = await wordcloud();
        this.mapData = await mapScatter();
    },
    methods: {
        getReportData() {
            return this.reportData;
        },
        getWordCloud() {
            return this.wordCloud;
        },
        getMapData() {
            return this.mapData;
        }
    }
};
</script>

<style>
.home {
    width: 100%;
    padding: 20px;
    background-color: #eee;
    box-sizing: border-box;
}
</style>
