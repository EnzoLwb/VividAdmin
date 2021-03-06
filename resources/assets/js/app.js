import ElementUI from 'element-ui';
import Vue from 'vue';
import _global from './components/Global.js';
/*组件*/
import BasicPaginator from './components/BasicPaginator'//分页(废弃)
import BreadCrumb from './components/common/BreadCrumb'//面包屑
import MenuCollapse from './components/MenuCollapse'//左侧菜单
import SearchTags from './components/common/SearchTags'//搜索标签
import AdminUserRoleForm from './components/admin/RoleForm';
import AdminForm from './components/admin/Form';

//通用component在这里全局注册, 减少编写组件时的import
require('./bootstrap');
window.Vue = Vue;
Vue.prototype.unils = _global;//引入公共文件 公共方法

Vue.use(ElementUI);
// 注册通用组件
Vue.component('basic-paginator', BasicPaginator);
Vue.component('search-tags', SearchTags);
Vue.component('role-form',AdminUserRoleForm );
Vue.component('admin-form',AdminForm );
Vue.component('menu-collapse',MenuCollapse );
Vue.component('bread-crumb',BreadCrumb );

Vue.filter('TimeSubstr', function (value) {
    if (!value) return ''
    if (value.length > 18) {
        return value.slice(0,-3)
    }
    return value
});
Vue.filter('DateSubstr', function (value) {
    if (!value) return ''
    if (value.length > 18) {
        return value.slice(0,10)
    }
    return value
});

//截取字符串显示省略号
Vue.filter('Ellipsis', function (value,len) {
    if (!value) return ''
    if (value.length > len) {
        return value.slice(0, len) + '...'
    }
    return value
});
const app = new Vue({
    el: '#app',
    components: {
        'setting-list':()=>import('./components/setting/SystemSetting'),
        'tags-list':()=>import('./components/tags/TagsList'),//标签
        'logs-list':()=>import('./components/logs/LogsList'),//日志
        'login':()=>import('./components/Login'),//登录

        /*权限部分*/
        'admin-list':()=>import('./components/admin/List'),
        'password-form':()=>import('./components/admin/Password'),
        'my-profile':()=>import('./components/admin/Profile'),//个人介绍
        'role-list':()=>import('./components/admin/RoleList'),

        /*会员*/
        'member-list':()=>import('./components/membership/List'),
        'member-register':()=>import('./components/membership/Register'),
        'member-form':()=>import('./components/membership/Form'),

        'service-list':()=>import('./components/service/List'),
        /*会员卡*/
        'card-deposit':()=>import('./components/card/Deposit'),
        'card-consume':()=>import('./components/card/Consume'),
        'record-list':()=>import('./components/card/Record'),

        //首页
        'consume-index':()=>import('./components/service/Consume'),

        //公众号上的网页相关管理
        'coach-recruit':()=>import('./components/gzh/CoachRecruit'),
        'gzh-setting':()=>import('./components/gzh/Setting'),
        // 'redeem-code':()=>import('./components/gzh/RedeemCode'),
    }
});
