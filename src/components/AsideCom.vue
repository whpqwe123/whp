<script>
import { User, House, Loading } from "@element-plus/icons-vue";
import { mapState } from "vuex";
export default {
    data() {
        return {
            classObj: {
              left: false,
              str: 'Loading'
            }
        }
    },
    computed: {
      ...mapState(['userInfo', 'currentPath'])
    },
    props: ['collapse'],
    components: {
        User,
        House,
        Loading
    },
    watch: {
      collapse(current, prev){
        this.classObj.left = current
      }
    }
}
</script>
<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="$store.state.currentPath"
        text-color="#fff"
        :collapse="collapse"
        :router="true"
      >

      
     
      <!-- <el-menu-item index="/" v-show="!collapse">首页</el-menu-item> -->
      <el-menu-item index="/" :class="classObj">首页</el-menu-item>
      

      <el-sub-menu v-for="item in userInfo.checkedkeys" :key="item.path" :index="item.path">
        <template #title>
            <el-icon><component :is="str"></component></el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item 
          v-for="child in item.children" 
          :key="child.path" 
          :index="`/${item.path}/${child.path}`"
          > {{ child.label }} </el-menu-item>
      </el-sub-menu>

<!-- 
      <el-sub-menu index="manager">
        <template #title>
            <el-icon><User /></el-icon>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/manager/managerlist">管理员列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="banner">
        <template #title>
            <el-icon><User /></el-icon>
            <span>轮播图管理</span>
          </template>
          <el-menu-item index="/banner/bannerlist">轮播图列表</el-menu-item>
          <el-menu-item index="/banner/addbanner">添加列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="pro">
        <template #title>
            <el-icon><User /></el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item index="/pro/prolist">产品列表</el-menu-item>
          <el-menu-item index="/pro/addpro">添加产品</el-menu-item>
      </el-sub-menu>
 -->

       
      </el-menu>
</template>

<style lang="scss" scoped>
    .el-menu {
        border: none;
    }
    .left {
      position: relative;
      left: -10px;
    }
</style>