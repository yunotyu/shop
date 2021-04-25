import { axiosrequest } from 'network/request';

//请求详情页数据
export function getDetailDatas(iid) {
    return axiosrequest({
        url: '/detail',
        method: 'get',
        params: {
            iid,
        }
    })
}

//将哟啊显示的数据抽象为一个类，更好管理
export class GoodBaseInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

//获取推荐页数据
export function getRecommand() {
    return axiosrequest({
        url: '/recommend',
        method: 'get'
    })
}

// 商店信息类
export class ShopInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}