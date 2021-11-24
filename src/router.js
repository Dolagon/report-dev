import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import BMap from '@/views/BMap';
import LiquidFill from '@/views/LiquidFill'
import WordCloud from '@/views/WordCloud';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/bmap',
            name: 'BMap',
            component: BMap
        }, {
            path: '/liquidFill',
            name: 'liquidFill',
            component: LiquidFill
        }, {
            path: '/wordCloud',
            name: 'wordCloud',
            component: WordCloud
        }
    ]
});
