// d. 导入我们封装的 axios
import ajax from '../utils/request'

// e. 管理系统登录接口封装
export function loginFn(params){
    return ajax({
        url: '/admin/login',
        method: 'PoSt',
        data: params
    })
}
// 获取管理员列表
export function adminList(params){
    return ajax({
        url: '/admin/list',
        method: 'get',
        data: params
    })
}
// 添加管理员的接口
export function addAdmin(params){
    return ajax({
        url: '/admin/add',
        method: 'post',
        data: params
    })
}

// 修改管理员的接口
export function updateAdmin(params){
    return ajax({
        url: '/admin/update',
        method: 'post',
        data: params
    })
}

// 删除管理员的接口
export function deleteAdmin(params){
    return ajax({
        url: '/admin/delete',
        method: 'post',
        data: params
    })
}