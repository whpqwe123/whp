<script>
import * as XLSX from 'xlsx';
export default {
    data() {
        return {
            tableData: [],
            headerRowStyle: {
                color: 'rgba(0,0,0,0.85)',
                fontSize: '14px',
                textAlign: 'center',
                height: '60px',
                borderRight: '1px solid #f0f0f0'
            },
        }
    },
    methods: {
        importClick(){
            // console.log(this.$refs.inp);
            this.$refs.inp.click()
        },
        importChange(event){
            // 选择文件 之后执行的回调函数
            // console.log(event.target.files[0]);

            const _this = this

            // 1. 获取到我们选中的文件
            const file = event.target.files[0]
            // 创建文件的读取器
            const reader = new FileReader()
            // 将文件读取成数据流
            reader.readAsBinaryString(file)

            reader.onload = function(){
                // console.log(reader.result);

                // 将文件数据流读取成 js 对象
                const boox = XLSX.read(reader.result, {type: 'binary'});

                // 从对象中获取 工作表1 中的数据
                let res = boox.Sheets['工作表1']
                // 将表内容转换成 json 数据
                res = XLSX.utils.sheet_to_json(res)

                console.log(res);
                _this.tableData = res
            }

        }
    }
}
</script>
<template>
    <div>
        <el-button type="success" @click="importClick">选择文件</el-button>
        <input type="file" hidden ref="inp" @change="importChange" />

        <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="headerRowStyle"
            :cell-style="{ textAlign: 'center', height: '50px' }"
        >
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="category" label="分类"/>
            <el-table-column prop="brand" label="品牌"></el-table-column>


            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" >编辑</el-button>
                    <el-button size="small" type="success" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>