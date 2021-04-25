import axios from 'axios'

function axiosrequest(config) {
    const instance = axios.create({
            baseURL: 'http://152.136.185.210:7878/api/m5',
            timeout: 3000
        })
        //请求拦截
    instance.interceptors.request.use(config => {
            return config;
        }, err => {
            console.log(err);
        })
        //响应拦截
    instance.interceptors.response.use(res => {
            return res;
        }, err => {
            console.log(err);
        })
        //axios.create()返回值是一个promise
        //真正发送请求
    return instance(config);
}
export { axiosrequest };