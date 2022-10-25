<script>
import { adminList, addAdmin, updateAdmin, deleteAdmin } from "@/api/user.js";
import { routes } from "@/router/index.js";
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
            // 当前页
            currentPage: 1, // 页码
            drawer: false, // 是否显示抽屉效果 
            menus: routes[0].children,  // 找到路由配置信息
            // 管理员数据
            formData: {
                adminname: '',
                password: '',
                role: '',
                checkedKeys: ''
            },
            interfaceType: 1, // 1. 添加管理员， 2. 编辑管理员  
            defaultCheckedKeys: [], // 默认选中的项
        }
    },
    mounted(){
        // console.log(routes);
        adminList().then(res => {
            // console.log(res);
            this.tableData = res.data
        })
    },
    computed: {
        computedTableData(){
            return this.tableData.slice((this.currentPage - 1) * 10, (this.currentPage - 1) * 10 + 10)
        }
    },
    methods: {
        addClick(){
            // 显示添加页面用的
            this.drawer = true
            this.interfaceType = 1
        },
        // 获取树形结构的选中值
        formatCheckedKeys(){
            // 可以获取到选中的值
            // console.log(this.$refs.treeRef.getCheckedNodes(true));
            // 根据选中的值得到父级路由
            const list = this.$refs.treeRef.getCheckedNodes(true)
            // 最终结果
            const result = []
            // 用来放父级路由的 label 用的
            const tempList = []
            /*
                find: 查找符合推荐的数据，将其返回
                some：检查数组中是否存在返回条件的元素，只要存在就返回 true 否则返回 false
                includes: 检查数组中是否包含
            */ 
            list.forEach(item => {
                // 根据选项得到父级路由
                const parent = this.menus.find(mitem => {
                    // console.log(mitem,item);
                    // 如果 this.menus.children 中有子项和 选中的 item.label 相等就会返回 true 否则返回 false
                    // console.log(mitem.children.some(child => child.label == item.label));
                    return mitem.children.some(child => child.label == item.label)
                })
                // 父级路由
                // console.log(parent);

                // parent.label   轮播图管理

                // tempList  轮播图管理
                if(tempList.includes(parent.label)){
                    // 
                    // console.log(item);
                    result.find(item => item.label == parent.label).children.push(item)
                }else {
                    // 将轮播图管理 放在 tempList
                    tempList.push(parent.label)
                    // console.log(item);
                    // 在最终的结果数组里，添加父级路由的 label 和 path,在将我们选中的这个路由加载其 子路由中
                    result.push({
                        label: parent.label,
                        path: parent.path,
                        children: [item]
                    })
                }
                // 得到父级路由和子路由
                // console.log(result);
                // 将路由权限加到 formData 中
                this.formData.checkedKeys = result
            })

        },
        add(){
            // 添加管理员用的
            // console.log(this.$refs.treeRef.getCheckedKeys(true));
            // console.log(this.$refs.treeRef.getCheckedNodes(true));
            // console.log(this.formData);

            // 获取所有权限路由
            this.formatCheckedKeys()

            this.formData.role = this.formData.role == '管理员' ? '1' : '2'

            // 调用添加管理员的接口
            addAdmin(this.formData).then(res => {
                // console.log(res);
                ElMessage({
                        message: res.message,
                        type: 'success',
                    })
                    
                // 关闭抽屉效果
                this.drawer = false
                // 请求数据
                adminList().then(res => {
                    this.tableData = res.data
                })
            })

        },
        // 编辑按钮的点击事件
        editClick(row){

            

            // console.log('1111111',this.defaultCheckedKeys);

            // 打开抽屉效果
            this.drawer = true
            this.interfaceType = 2
            // 获取到我们点击的是哪个用户

            // console.log(row);
            this.formData.adminname = row.adminname
            this.formData.password = ''
            this.formData.role = row.role == '1' ? '管理员' : '超级管理员'
            // this.formData.checkedKeys = row.checkedKeys
            const checkedKeys = []
            row.checkedKeys.forEach(parent => {
                parent.children.forEach(child => {
                    checkedKeys.push(child.path)
                })
            })
            
            this.defaultCheckedKeys = checkedKeys
        },
        update(){
            // 提交修改的点击事件
            this.formatCheckedKeys()

            

            if(this.formData.adminname == '' || this.formData.password == ''){
                ElMessage.error('管理员名称和密码不能为空')
                return
            }

            // console.log('1111111',this.formData);
            this.formData.role = this.formData.role == '管理员' ? '1' : '2'
            
            // console.log(this.formData);
            updateAdmin(this.formData).then(res => {
                this.drawer = false
                // 请求数据
                adminList().then(res => {
                    this.tableData = res.data
                })
            })
        },
        close(){
            // 抽屉关闭时的回调
            this.formData.adminname = ''
            this.formData.password = ''
            this.formData.role = 1
            this.formData.checkedKeys = []
            this.defaultCheckedKeys = []

            if(this.$refs.treeRef){
                // 如果树形结构存在，我们就先清除选中的状态
                this.$refs.treeRef.setCheckedKeys([])
            }
        },
        deleteClick(row){
            console.log(row.adminid);
            deleteAdmin({adminid: row.adminid}).then(res => {
                // 请求数据
                adminList().then(res => {
                    this.tableData = res.data
                })
            })
        }
    }
}
</script>
<template>
    <div>
        <div class="header">
            <el-button type="success" @click="addClick"> 添加管理员 </el-button>
        </div>
        <el-table
            :data="computedTableData"
            style="width: 100%"
            :header-cell-style="headerRowStyle"
            :cell-style="{ textAlign: 'center', height: '50px' }"
        >
            <el-table-column type="index" label="序号" :index="(currentPage - 1) * 10 + 1" width="80" />
            <el-table-column prop="adminname" label="管理员名称"/>
            <el-table-column prop="role" label="管理员权限">
                <!-- scope 是当前对象的所有属性 {{ scope.row.role }} -->
                <template #default="scope">
                    <!-- <el-tag v-if="scope.row.role == 1">管理员</el-tag>
                    <el-tag v-else type="success">超级管理员</el-tag> -->
                    <el-tag :type="scope.row.role == 1 ? '' : 'success'" >{{ scope.row.role == 1 ? '管理员' : '超级管理员' }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="editClick(scope.row)">编辑</el-button>
                    <el-button size="small" type="success" @click="deleteClick(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页显示 -->
        <el-pagination 
        background 
        layout="prev, pager, next" 
        :total="tableData.length" 
        v-model:current-page="currentPage"
        />


        <!-- 抽屉效果 -->
        <el-drawer v-model="drawer" :direction="direction" @close="close">
            <template #title>
                <h4> {{ interfaceType == 1 ? '添加管理员' : '编辑管理员' }} </h4>
            </template>
            <template #default>
                <el-form>
                    <el-form-item label="管理员账号">
                        <el-input v-model="formData.adminname" placeholder="请输入管理员账号" />
                    </el-form-item>
                    <el-form-item label="管 理 密 码">
                        <el-input v-model="formData.password" show-password type="password" placeholder="请输入管理员密码" />
                    </el-form-item>

                    <el-form-item label="角色">
                        <el-select v-model="formData.role" placeholder="请选择角色">
                            <el-option label="管理员" value="管理员"></el-option>
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="权限">
                        <el-tree
                            show-checkbox
                            :data="menus"
                            node-key="path"
                            default-expand-all
                            ref="treeRef"
                            :default-checked-keys="defaultCheckedKeys"
                        />
                    </el-form-item>
                </el-form>
          
            </template>
            <template #footer>
            <div style="flex: auto">
                <el-button type="primary" v-if="interfaceType == 1" @click="add" >添加</el-button>
                <el-button type="primary" v-else @click="update" >修改</el-button>
            </div>
            </template>
        </el-drawer>

    </div>
</template>
<style lang="scss" scoped>
    .el-pagination {
        float: right;
    }
    .header {
        margin-bottom: 15px;
    }
</style>