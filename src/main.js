import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import { Toast } from 'vant'
import { messages } from './components/common/i18n'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import './assets/css/theme-green/index.css' // 浅绿色主题
import './assets/css/icon.css'
import './components/common/directives'
import 'babel-polyfill'

// import { Get, Post } from './utils/request.js'
import { API } from './api/index.js'
import {Get, Post} from '@/utils/request'
Vue.prototype.$GET = Get
Vue.prototype.$POST = Post
Vue.prototype.$API = API

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI, {
    size: 'small'
})
Vue.use(Toast)

const i18n = new VueI18n({
    locale: 'zh',
    messages
})


Vue.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}   

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
        Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
            confirmButtonText: '确定'
        })
    } else {
        next()
    }
})

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')