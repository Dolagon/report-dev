<template>
    <div class="top-view">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card shadow="hover">
                    <total-sales></total-sales>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <total-orders></total-orders>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <today-users></today-users>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <total-users></total-users>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TotalSales from '@/components/TotalSales/index';
import TotalOrders from '@/components/TotalOrders/index';
import TodayUsers from '@/components/TodayUsers/index';
import TotalUsers from '@/components/TotalUsers/index';

export default {
    name: 'TopView',
    components: {
        TotalSales,
        TotalOrders,
        TodayUsers,
        TotalUsers
    }
};
</script>

<style lang="scss" scoped>

</style>
