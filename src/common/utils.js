//防抖函数，不用频繁发送请求
//使用方法，使用一个变量来接收这个函数的返回值，然后在频繁操作的地方，调用这个变量函数
function debounce(func, delay) {
    let timer = null;
    return function(...args) {
        if (timer) {
            //如果上次的定时器还存在，清除
            clearTimeout(timer);
        }
        //如果为空创建定时器
        timer = setTimeout(() => {
            //改变函数的 this 指向。
            func.apply(this, args);
        }, delay);
    }
}

//将时间戳修复为年月日这样的格式：yyyy-MM-dd ：hh-mm-ss
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

export { debounce }