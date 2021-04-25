import { axiosrequest } from 'network/request'

export function getHomeMultidata() {
    return axiosrequest({
        url: '/home/multidata',
        method: 'get'
    })
}

//获取产品列表,type点击的选项卡，如流行，精品
export function getProducts(type, page) {
    return axiosrequest({
        url: '/home/data',
        method: 'get',
        params: {
            type: type,
            page: page
        }
    })
}