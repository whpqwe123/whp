import { createApp } from 'vue'
import App from './App.vue'

// 5. 导入配置好的路由
import router from './router'

// import './assets/main.css'
// 导入格式化样式文件
import 'normalize.css/normalize.css'
// 导入样式
import 'element-plus/dist/index.css'

import store from "./store";

const app = createApp(App)

// 6. 将路由放在 app 上
app.use(router)

app.use(store)

app.mount('#app')
