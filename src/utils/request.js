// a. 导出 axios 
import axios from "axios";
// 开发环境(写代码的阶段)             生产环境(代码上线阶段)     测试环境(代码写好阶段)  
// development                      production
// npm run dev                      npm run build            npm run build
// 获取我们当前环境是不是开发环境
// process.env 是 node 中返回环境的对象
const isDev = process.env.NODE_ENV == 'development'
// 在开发阶段我的 ip : 192.168.111
// 开生产阶段 ip: 121.89.205.189

// console.log(isDev);

// b. 封装 baseURL
const request = axios.create({
    // baseURL 是用来配置基础路径用的，以后数据请求都不需要在写前面的这一段了
    baseURL: isDev ? 'http://121.89.205.189:3001/admin' : 'http://121.89.205.189:3001/admin',
    timeout: 6000 // 配置请求超时时间
})


// 添加请求拦截器
request.interceptors.request.use(function (config) {

    // 设置 token
    config.headers.token = localStorage.getItem('token') || ''

    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    
    // console.log('1111111', this);
    if(response.data.code == '10119'){
        // token 无效
        // 当token 失效或者过期了，我们需要清除本地所有关于用户信息，然后重新登录
        localStorage.removeItem('token')
        localStorage.removeItem('vuex')
        // 跳转到登录页面
        window.location.href = '/#/login'
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 因为服务器响应时有两个 data
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// c. 自定义各种数据请求的 axios
export default function ajax(config){
    // 1. 先获取到请求的一些必要参数
    const { method = 'GET', url = '', data = {}, headers = {} } = config

    // 2. 判断我们的请求类型
    switch (method.toUpperCase()) {
        case 'GET':
            return request.get(url, { params: data })
        case 'POST':
            // 2.1 表单数据
            if(headers['content-type'] == 'application/x-www-form-url-encoded'){
                // 转换参数类型， 格式化数据
                const obj = new URLSearchParams()
                for (const key in data) {
                    obj.append(key, data[key])
                }
                return request.post(url, obj, { headers })
            }
            // 2.2 文件数据
            if(headers['content-type'] == 'multipart/form-data'){
                // 处理文件
                const obj = new FormData()
                for (const key in data) {
                    obj.append(key, data[key])
                }
                return request.post(url, obj, { headers })
            }
            // 2.3 json  默认提交数据 json 对象
            return request.post(url, data)
        case 'PUT':
            // 修改数据 -- 数据的更新
            return request.put(url, data)
        case 'DELETE':
            // 删除数据
            return request.delete(url, { data })
        case 'PATCH':
            // 更新局部资源
            return request.patch(url, data)
        default:
            // 如果前面都不是
            return request.request(config)
    }

}
