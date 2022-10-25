<script>
import { ArrowRight } from '@element-plus/icons-vue'
import { routes } from "@/router/index";
import { mapMutations } from "vuex";

export default {
    data() {
        /*
            0: {"home" => "首页"}
            1: {"manager" => "账号管理"}
            2: {"managerlist" => "管理员列表"}
            3: {"banner" => "轮播图管理"}
            4: {"bannerlist" => "轮播图列表"}
            5: {"addbanner" => "添加轮播图"}
            6: {"pro" => "产品管理"}
            7: {"prolist" => "产品列表"}
            8: {"addpro" => "添加产品"}
            9: {"login" => "登录"}
            10: {"set" => "设置"}
        */ 
        // 用来记录所有路由 name 对应的 label 对象
        this.routesMap = new Map()
        // 用来处理路由将路由处理成 map
        this.initRoutesMap(routes)

        console.log(this.routesMap);

        return {
            list: []
        }
    },
    methods: {
        ...mapMutations(['updateCurrentPath']),
        initRoutesMap(routes){
            routes.forEach(route => {
                // console.log(route);
                this.routesMap.set(route.name, route.label)
                // 如果有子路由
                if(route.children){
                    // 递归再次执行
                    this.initRoutesMap(route.children)
                }
            })
        }
    },  
    components: {
        ArrowRight
    },
    mounted() {
        // console.log('111111', this.$route);
    },
    watch: {
        $route: {
            // 设置非惰性
            immediate: true,
            handler(route){
                // 记录当前的页面路由路径
                this.updateCurrentPath(route.path)

                // console.log('22222', route);
                // 路由一旦更新我们就记录当前路由，根据路由显示不同的面包屑内容
                this.list = route.matched.map(item => {
                    return {
                        name: item.name,
                        label: this.routesMap.get(item.name)
                    }
                })
               
            }
        }
    }
}
</script>
<template>
    <el-breadcrumb :separator="'>'">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="item in list" :to="{name: item.name}" :key="item.name" >{{ item.label }}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
    </el-breadcrumb>
  </template>
<style lang="scss" scoped>
.el-breadcrumb {
    margin-bottom: 20px;
}
</style>
