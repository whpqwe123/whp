import ajax from '../utils/request'

// 获取轮播图列表
export function bannerList(params){
    return ajax({
        url: '/banner/list',
        method: 'get',
        data: params
    })
}


// 添加轮播图
export function addBanner(params){
    return ajax({
        url: '/banner/add',
        method: 'post',
        data: params
    })
}

