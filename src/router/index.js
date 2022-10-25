// 1. 导入 vue-router
// createRouter 创建路由的方法
// createWebHistory 路由模式(History)
// createWebHashHistory 路由模式(Hash)
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// 导入 HomeView 组件
import HomeView from '../views/HomeView.vue'
// 导入 登录页面
import LoginView from '@/views/LoginView.vue'

// 导入管理员组件
import ManagerIndexView from "@/views/manager/ManagerIndexView.vue";
import ManagerListView from "@/views/manager/ManagerListView.vue";

// 导入轮播图管理
import BannerIndexView from "@/views/banner/BannerIndexView.vue";
import BannerListView from "@/views/banner/BannerListView.vue";
import AddBannerView from "@/views/banner/AddBannerView.vue";


// 导入产品管理
import ProIndexView from "@/views/pro/ProIndexView.vue";
import ProListView from "@/views/pro/ProListView.vue";
import AddProView from "@/views/pro/AddProView.vue";


// 导入图表管理
import EChartsIndexView from "@/views/echarts/EChartsIndexView.vue";
import EChartsShowView from "@/views/echarts/EChartsShowView.vue";
import GaugeStageShowView from "@/views/echarts/GaugeStageShowView.vue";


// 导入excel管理
import ExcelIndexView from "@/views/excel/ExcelIndexView.vue";
import ExcelExportView from "@/views/excel/ExcelExportView.vue";
import ExcelImportView from "@/views/excel/ExcelImportView.vue";


// 富文本管理
import EditorIndexView from "@/views/editor/EditorIndexView.vue";
import EditorShowView from "@/views/editor/EditorShowView.vue";


// 地图管理
import MapIndexView from "@/views/map/MapIndexView.vue";
import MapShowView from "@/views/map/MapShowView.vue";



// 2. 创建路由规则
export const routes = [
  {
    // path 路由的路径
    path: '/',
    // 路由命名
    name: 'home',
    label: '首页',
    // 路由对应需要显示组件
    component: HomeView,
    // 路由嵌套，配置二级路由
    children: [
      {
        path: 'manager',
        name: 'manager',
        label: '账号管理',
        icon1: 'User1',
        component: ManagerIndexView,
        // 配置三级路由
        children: [
          {
            path: 'managerlist',
            label: '管理员列表',
            name: 'managerlist',
            component:ManagerListView
          }
        ]
      },{
        path: 'banner',
        label: '轮播图管理',
        name: 'banner',
        icon1: 'House1',
        component: BannerIndexView,
        children: [
          {
            path: 'bannerlist',
            name: 'bannerlist',
            label: '轮播图列表',
            component:BannerListView
          },
          {
            path: 'addbanner',
            label: '添加轮播图',
            name: 'addbanner',
            component:AddBannerView
          }
        ]
      },
      {
        path: 'pro',
        label: '产品管理',
        name: 'pro',
        icon1: 'Loading1',
        component: ProIndexView,
        children: [
          {
            path: 'prolist',
            name: 'prolist',
            label: '产品列表',
            component:ProListView
          },
          {
            path: 'addpro',
            label: '添加产品',
            name: 'addpro',
            component:AddProView
          }
        ]
      },{
        path: 'echarts',
        name: 'echarts',
        label: '图表管理',
        component: EChartsIndexView,
        children: [
          {
            path: 'echartsshow',
            name: 'echartsshow',
            label: '图表展示',
            component: EChartsShowView,
          },{
            path: 'gaugestageshow',
            name: 'gaugestageshow',
            label: '仪表盘展示',
            component: GaugeStageShowView
          }
        ]
      }, {
        path: 'excel',
        // 路由命名
        name: 'excel',
        label: 'excel管理',
        // 路由对应需要显示组件
        component: ExcelIndexView,
        children: [
          {
            path: 'excelimport',
            name: 'excelimport',
            label: 'excel导入',
            component: ExcelImportView
          },
          {
            path: 'excelexport',
            name: 'excelexport',
            label: 'excel导出',
            component: ExcelExportView
          }
        ]
      },{
        path: 'editor',
        name: 'editor',
        label: '富文本编辑器',
        component: EditorIndexView,
        children: [{
          path: 'editorshow',
          name: 'editorshow',
          label: '编辑器',
          component: EditorShowView,
        }]
      },{
        path: 'map',
        name: 'map',
        label: '地图管理',
        component: MapIndexView,
        children: [{
          path: 'mapshow',
          name: 'mapshow',
          label: '百度地图',
          component: MapShowView,
        }]
      }
    ]
  },
  {
    path: '/login',
    label: '登录',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
    component: LoginView
  },
  {
    path: '/set',
    label: '设置',
    name: 'set',
    // 该页面先不加载，当用到的时候在加载，可以提高页面加载速度
    // 路由懒加载
    component: () => import('../views/set/SetView.vue')
  }
]

// 3. 创建路由
const router = createRouter({
  // 配置路由模式
  // createWebHistory       前面是用 / 开头
  // createWebHashHistory   使用 # 开头
  // 任务： 查清楚 History 和 Hash
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 路由规则
  routes
})
// 4. 导出路由
export default router
