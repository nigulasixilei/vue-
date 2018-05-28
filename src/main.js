// 导入vue
import Vue from 'vue'
// 导入根目录
import App from './App.vue'
// 导入路由中间件
import VueRouter from 'vue-router'
// 导入过滤插件
import moment from 'moment'
// 导入轮播中间件
import ElementUI from 'element-ui';
// 导入图片懒加载中间件
import VueLazyload from 'vue-lazyload'
// 导入路径中间件
const path = require('path')
// 导入发送请求的插件
import axios from 'axios'
// 导入vuex(数据传输和数据共享时的暂存库)中间件
import Vuex from 'vuex'

// 把请求插件赋值给vue的原型中(以达到全局使用的目的,也可以和jQuery同样的方法全局化)
Vue.prototype.$axios = axios
// 把请求的基路径全局化
axios.defaults.baseURL = 'http://47.106.148.205:8899/'


// 使用中间件(注册)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueLazyload, {
    loading: path.join(__dirname, "src/statics/site/images/01.gif")
})

//导入全局需要用到的样式
// 轮播中间件样式
import 'element-ui/lib/theme-chalk/index.css'
// 页面中间件样式
import "./statics/site/css/style.css"

//定义全局过滤器
Vue.filter('dateFmt', (input, formatStr = "YYYY-MM-DD HH:mm") => {
    /**
     * 第一个参数:要过滤的原始的时间字符串
     * 第二个参数：要格式化成的字符串
     */
    return moment(input).format(formatStr)
})

//导入定义好的组件
import goodslist from './components/goods/goodslist'
import goodsinfo from './components/goods/goodsinfo'
import shopping from './components/shop/shop'

// 声明路由并设置路由规则
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/site/goodslist'
        },
        {
            path: '/site/goodslist',
            component: goodslist
        },
        {
            path: '/site/shopcart',
            component: shopping
        },
        {
            path: '/site/goodsinfo/:id',
            component: goodsinfo
        }

    ]
})

// 导入处理本地存储的模块
import {
    addnumloca,
    getnumloca
} from './locastagro/locastagro'
// 声明一个Vuex库
const store = new Vuex.Store({
    // 数据
    state: {
        num: 0
    },
    // 获取数据
    getters: {
        getnum(state) {
            if (state.num > 0) {
                return state.num
            } else {
                return getnumloca()
            }
        }
    },
    // 同步添加数据
    mutations: {
        addnum(state, goods) {
            state.num = addnumloca(goods)
        }
    }
})

// 创建根实例,插入路由
new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    },
    router,
    store
})