import Toast from '@/components/common/toast/Toast';
const obj = {
    //这里必须定义一个install函数，这样在main.js使用Vue.use()时,vue会自动执行这个函数
    //这个函数Vue调用时会传入Vue的实例参数,
    //注意：这里的Vue参数名要写成这样Vue
    install(Vue) {
        const toastContrustor = Vue.extend(Toast);
        const toast = new toastContrustor();
        toast.$mount(document.createElement('div'));
        document.body.appendChild(toast.$el);
        Vue.prototype.$toast = toast;
        console.log(Vue);
    }
};
export default obj;