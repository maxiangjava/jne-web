import axios from 'axios'
import router from "../router/index"

//请求拦截
axios.interceptors.request.use( config => {

    //使用场景1：比如config中的一些信息不符合服务器的要求
    //使用场景2：比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //使用场景3：某些网络请求（比如登录token），必须携带一些特殊的信息

    if(!sessionStorage.getItem('userName') && config.url.indexOf('login') < 0){
        console.log('拦截')
        router.push('/')
    }
    return config;
},err => {
    console.log(err);
})


const api = {
    async get (url, data) {
        console.log(url +'的get------------请求数据是：' + JSON.stringify(data))
        let res = await axios.get(url, {params: data})
        console.log(url + '的get---------返回值：' + JSON.stringify(res))
        res = res.data
        return new Promise((resolve) => {
            if (res.code == 200) {
                resolve(res.data)
            } else {
                resolve(res)
            }
        })
    },
    async post (url, data) {
        console.log(url +'的post------------请求数据是：' + JSON.stringify(data))
        let res = await axios.post(url, data)
        console.log(url + '的post---------返回值：' + JSON.stringify(res))
        res = res.data
        return new Promise((resolve, reject) => {
            if (res.code == 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        })
    },
}
export default api