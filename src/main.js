import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//注意：这里是导入toast所在的文件夹，Vue会自动导入该组件所在index.js文件
import toast from '@/components/common/toast';
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';


Vue.config.productionTip = false


//Vue里面原先是没有$bus,需要我们自己设置
Vue.prototype.$bus = new Vue();

Vue.use(toast); //注册弹窗插件

//解决移动端点击300ms延迟问题
FastClick.attach(document.body);

//使用图片懒加载
Vue.use(VueLazyLoad, {
    loading: require('@/assets/img/common/placeholder.png')
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

//vue里的监听实例属性的值变化的方法
//变量Vue实例的所有属性值，得到属性名称
Object.keys(Vue).forEach(key => {
    //获取属性值
    let value = Vue(key);

    //对Vue实例的属性修改绑定，并且使用get,set函数监听属性值改变，然后在里面处理一下事
    //参数1：要进行属性修改的实例
    //参数2：属性名称
    //参数3：一些选项
    Object.defineProperty(Vue, key, {
        // 在获取这个属性的值时触发这个函数
        get() {
            //有组件获取值时，调用这个函数，此时Vue会记录下来，为了后面值进行修改时，通知这些组件,
            //获取这个属性值的组件都会订阅值修改的通知
            return value;
        },
        //在设置这个属性的值时，触发这个函数
        set(newVal) {
            value = newVal;
            //当值修改，发布消息给订阅这个消息的组件
            //比如通知在Vue组件里使用了这个属性的组件，在界面上进行修改值显示，这里采用了发布订阅模式
            //因为页面显示这个属性的值，都需要调用上面的get函数，所以哪个组件调用过get函数都会在上面调用get函数时记录下来
        }
    })
})