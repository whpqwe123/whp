<script>
import { proList } from "@/api/pro";
// 1. 导入所需第三方库
import ExportJsonExcel from "js-export-excel";


export default {
    data() {
        return {
            headerRowStyle: {
                color: 'rgba(0,0,0,0.85)',
                fontSize: '14px',
                textAlign: 'center',
                height: '60px',
                borderRight: '1px solid #f0f0f0'
            },
            tableData: []
        }
    },
    mounted() {
        proList().then(res => {
            console.log(res);
            this.tableData = res.data
        })
    },
    methods: {
        exportClick() {
            // 2. 导出按钮的点击事件

            // 文件配置信息
            var option = {};
            // 文件名
            option.fileName = "proList";

            // 要导出的内容
            option.datas = [
                {
                    sheetData: this.tableData, // 要导出去的数据
                    sheetName: "老吴的表1", // 表名称
                    sheetFilter: ["proname", "category", "originprice", "brand"],
                    sheetHeader: ["产品名称", "产品 分类", '产品价格', '产品品牌'],
                    columnWidths: [20, 20],
                }
            ];
            
            // 3. 实现导出
            var toExcel = new ExportJsonExcel(option); //new
            toExcel.saveExcel(); //保存

        }
    }
}
</script>

<template>
    <h1>
        <el-button type="success" @click="exportClick">导出</el-button>
    </h1>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="headerRowStyle"
        :cell-style="{ textAlign: 'center', height: '50px' }">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="brand" label="品牌"></el-table-column>


        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="success">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>