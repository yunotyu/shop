import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartList: [], //购物车商品
    },
    actions: {
        //在action里写，就是为了能返回promise，调用函数能进行后续处理
        //添加到购物车
        addProToCart({ commit, state }, payload) {
            return new Promise((reslove, reject) => {
                payload.checked = true; //设置添加商品，购物车默认选中
                //寻找是否已经存在这个商品
                let good = state.cartList.find((ele) => {
                    return ele.iid == payload.iid;
                });

                //存在，加上以前的数量
                if (good) {
                    commit('addCount', { good, payload })
                    reslove('添加数量' + payload.count + '成功')
                } else {
                    commit('addNewGood', payload);
                    reslove('添加新商品成功')
                }
            })
        },
    },
    mutations: {
        //添加商品数量
        addCount(state, obj) {
            obj.good.count = Number.parseInt(obj.good.count) + Number.parseInt(obj.payload.count);
        },

        //添加新商品
        addNewGood(state, payload) {
            //不存在，直接添加新元素
            state.cartList.push(payload);
        },

        //修改是否选中某个商品
        modifyChecked(state, payload) {
            let good = state.cartList.find((ele) => {
                return ele.iid == payload.iid;
            });
            if (good) {
                good.checked = !good.checked;
            }
        }
    },
    modules: {},
    getters: {
        cartLength(state) {
            return state.cartList.length;
        },
        cartLi(state) {
            return state.cartList;
        }
    }
})