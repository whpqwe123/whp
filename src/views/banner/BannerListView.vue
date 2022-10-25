<script>
import { bannerList } from "@/api/banner";
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1, // 当前页
            count: 5, // 每页显示数量
        }
    },
    mounted(){
        bannerList().then(res => {
            console.log(res);
            this.tableData = res.data
        })
    },
    computed: {
        computedTableData(){
            return this.tableData.slice((this.currentPage - 1) * 5, (this.currentPage - 1) * 5 + 5)
        }
    }
}
</script>
<template>
    <el-table :data="computedTableData" style="width: 100%">
        <el-table-column type="index" label="序号" :index="(currentPage - 1) * 5 + 1" width="80" />
        <el-table-column prop="alt" label="描述"  />
        <el-table-column prop="bannerid" label="轮播图id" />
        <el-table-column prop="link" label="更新时间" />
        <el-table-column label="图片">
            <template #default="scope">
                <el-image :src="scope.row.img"></el-image>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template #default="scope">
                <el-button > 删除 </el-button>
            </template>
        </el-table-column>

    </el-table>

    <el-pagination v-model:page-size="count" background layout="prev, pager, next" v-model:current-page="currentPage" :total="tableData.length" />

</template>
