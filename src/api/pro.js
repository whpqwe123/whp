import ajax from '../utils/request'

// 获取商品列表
export function proList(params){
    return ajax({
        url: '/pro/list',
        method: 'get',
        data: params
    })
}
