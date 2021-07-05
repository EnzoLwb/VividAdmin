import ElementUI from 'element-ui';
import Vue from 'vue';
import _global from "./components/Global";

require('./bootstrap_mobile');
window.Vue = Vue;

//引入公共文件 公共方法
Vue.prototype.unils = _global;
Vue.use(ElementUI);

Vue.filter('TimeSubstr', function (value) {
    if (!value) return ''
    if (value.length > 18) {
        return value.slice(0,-3)
    }
    return value
});
// 注册通用组件
const app = new Vue({
    el: '#app',
    components: {
        'coach-exercise-settled':()=>import('./components/mobile/coach/exerciseForm'),
        'coach-private-settled':()=>import('./components/mobile/coach/privateForm'),
    },
});
