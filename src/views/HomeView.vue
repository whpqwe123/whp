<script>
// 在 vue 中 万物皆模块
import zfb from '../assets/zfb.png'
// 导入组件
import { Fold, Expand } from "@element-plus/icons-vue";
import { mapMutations } from "vuex";

import AsideCom from "@/components/AsideCom.vue";
import BreadCrumbCom from "@/components/BreadCrumbCom.vue";

export default {
  data() {
    return {
      url: zfb,
      collapse: false
    }
  },
  computed: {
    headerLeft(){
      return this.collapse ? 'Expand' : 'Fold'
    },
    asideWidth(){
      return this.collapse ? '54px' : '200px'
    }
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    // 退出登录的方法
    handleLogout(){
      // 清除掉 vuex 中保存的用户信息
      this.updateUserInfo({})

      // 清除掉 localStorage 中的数据
      localStorage.removeItem('token')
      // 跳转到登录页面
      this.$router.push('/login')
    }
  },
  components: {
    Fold,
    Expand,
    AsideCom,
    BreadCrumbCom
  }
}
</script>

<template>
  <el-container>
      <el-aside>
        <div class="logo-box">
          <el-image style="width: 32px; height: 32px" :src="url"  />
          <h2 class="manage-title" v-show="!collapse"> 嗨购后台管理系统 </h2>
        </div>
        <AsideCom :collapse="collapse" />
      </el-aside>
      
      <el-container>
        <el-header>
          <el-icon @click="collapse = !collapse" :size="30">
            <component :is="headerLeft"></component>
          </el-icon>

          <div class="avatar-box">
            
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                欢迎您： {{ $store.state.userInfo.adminname }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/set')">设置</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
              
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <BreadCrumbCom />
          <router-view></router-view>
        </el-main>
      </el-container>
    
    </el-container>
</template>
<style lang="scss" scoped>
  .el-container {
    background-color: #d0ebff;
    height: 100%;
    .el-aside {
      background-color: #545c64;
      /* 直接将计算属性的值拿过来 */
      width: v-bind(asideWidth);
      overflow: hidden;
      transition: all 0.3s;

      .logo-box {

        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        width: 200px;
        .el-image {
          margin-right: 10px;
        }
        .manage-title {
          font-size: 16px;
        }
      }
    }



    .el-header {
      background-color: #ffe3e3;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .avatar-box {
        cursor: pointer;
      }
    }
  }
</style>