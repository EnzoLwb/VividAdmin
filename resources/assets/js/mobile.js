
import Vue from 'vue';
import  KFormBuild  from 'k-form-design'
import 'k-form-design/lib/k-form-design.css'
require('./bootstrap_mobile');

window.Vue = Vue;
Vue.prototype.Location = window.location;

Vue.use(KFormBuild)

// 注册通用组件
const app = new Vue({
    el: '#app',
    components: {
        'mobile-contest':()=>import('./components/mobile/Contest'),
        'mobile-trashed':()=>import('./components/mobile/Trashed'),
    },
});
