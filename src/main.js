import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import './plugins/vcharts.js';
import ECharts from 'echarts';
import VueEcharts from 'vue-echarts';

Vue.config.productionTip = false;
Vue.prototype.$echarts = ECharts;
// 注册VueEcharts组件
Vue.component('v-chart', VueEcharts);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
