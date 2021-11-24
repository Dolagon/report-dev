const format = value => {
    const reg = /\d{1,3}(?=(\d{3})+$)/g;
    // $& 获取匹配的数字
    return String(value).replace(reg, '$&,');
};

const wrapperArray = (obj, key) => {
    return obj && obj[key] ? obj[key] : [];
};

const wrapperObject = (obj, key) => {
    if (obj && key.includes('.')) {
        const keys = key.split('.');
        keys.forEach(_key => obj = obj[_key]);
        return obj;
    } else {
        return obj && obj[key] ? obj[key] : {};
    }
};

const wrapperNumber = (obj, key) => {
    return obj && obj[key] ? format(obj[key]) : 0;
};

const wrapperOriginNumber = (obj, key) => {
    return obj && obj[key] ? obj[key] : 0;
};

const wrapperMoney = (obj, key) => {
    return obj && obj[key] ? `￥ ${format(obj[key])}` : '￥ 0.00';
};

const wrapperPercentage = (obj, key) => {
    return obj && obj[key] ? `${obj[key]}%` : '0%';
};

// 接收父组件数据
export default {
    inject: ['getReportData', 'getWordCloud', 'getMapData'],
    filters: {
        format(value) {
            return format(value);
        }
    },
    computed: {
        reportData() {
            return this.getReportData();
        },
        wordCloud() {
            return this.getWordCloud();
        },
        mapData() {
            return this.getMapData();
        },
        // 累计销售额
        salesToday() {
            return wrapperMoney(this.reportData, 'salesToday');
        },
        salesGrowthLastDay() {
            return wrapperPercentage(this.reportData, 'salesGrowthLastDay');
        },
        salesGrowthLastMonth() {
            return wrapperPercentage(this.reportData, 'salesGrowthLastMonth');
        },
        salesLastDay() {
            return wrapperMoney(this.reportData, 'salesLastDay');
        },
        // 累计订单量
        orderToday() {
            return wrapperMoney(this.reportData, 'orderToday');
        },
        orderLastDay() {
            return wrapperMoney(this.reportData, 'orderLastDay');
        },
        orderTrend() {
            return wrapperArray(this.reportData, 'orderTrend');
        },
        // 今日交易用户
        orderUser() {
            return wrapperNumber(this.reportData, 'orderUser');
        },
        returnRate() {
            return wrapperPercentage(this.reportData, 'returnRate');
        },
        orderUserTrend() {
            return wrapperArray(this.reportData, 'orderUserTrend');
        },
        orderUserTrendAxis() {
            return wrapperArray(this.reportData, 'orderUserTrendAxis');
        },
        // 累计用户数
        userToday() {
            return wrapperNumber(this.reportData, 'userToday');
        },
        userTodayNumber() {
            return wrapperOriginNumber(this.reportData, 'userToday');
        },
        userGrowthLastDay() {
            return wrapperPercentage(this.reportData, 'userGrowthLastDay');
        },
        userGrowthLastMonth() {
            return wrapperNumber(this.reportData, 'userGrowthLastMonth');
        },
        userLastMonth() {
            return wrapperOriginNumber(this.reportData, 'userLastMonth');
        },
        // 销售额
        orderFullYear() {
            return wrapperArray(this.reportData, 'orderFullYear');
        },
        orderFullYearAxis() {
            return wrapperArray(this.reportData, 'orderFullYearAxis');
        },
        orderRank() {
            return wrapperArray(this.reportData, 'orderRank');
        },
        userFullYear() {
            return wrapperArray(this.reportData, 'userFullYear');
        },
        userFullYearAxis() {
            return wrapperArray(this.reportData, 'userFullYearAxis');
        },
        userRank() {
            return wrapperArray(this.reportData, 'userRank');
        },
        // 销售数据大盘
        category1() {
            return wrapperObject(this.reportData, 'category.data1');
        },
        category2() {
            return wrapperObject(this.reportData, 'category.data2');
        }
    }
};
