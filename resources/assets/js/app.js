import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import Vue from 'vue';
import _global from './components/Global.js';
/*组件*/
import BasicPaginator from './components/BasicPaginator'//分页
import HeaderMenu from './components/common/HeaderMenu'//面包屑
import MenuCollapse from './components/MenuCollapse'//左侧菜单
import SearchTags from './components/common/SearchTags'//搜索标签
import AdminUserRoleForm from './components/admin/RoleForm';
import AdminForm from './components/admin/Form';

//通用component在这里全局注册, 减少编写组件时的import
require('./bootstrap');
window.Vue = Vue;
Vue.prototype.unils = _global;//引入公共文件 公共方法

Vue.use(ElementUI, { locale });
// 注册通用组件
Vue.component('basic-paginator', BasicPaginator);
Vue.component('search-tags', SearchTags);
Vue.component('role-form',AdminUserRoleForm );
Vue.component('admin-form',AdminForm );
Vue.component('menu-collapse',MenuCollapse );
Vue.component('header-menu',HeaderMenu );

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
//是否包含https || http
Vue.filter('ContainsHttp', function (url) {
    if (!url) return ''
    if (url.indexOf('http') === -1 ) {
        return 'https://'+url
    }
    return url
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
        'logs-list':()=>import('./components/logs/LogsList'),//日志
        'login':()=>import('./components/Login'),//登录

        /*权限部分*/
        'admin-list':()=>import('./components/admin/List'),
        'password-form':()=>import('./components/admin/Password'),
        'role-list':()=>import('./components/admin/RoleList'),

        /*业务部分*/
        'page-list':()=>import('./components/page_list/Index'),
        'page-form':()=>import('./components/page_list/Form'),

        'seo-list':()=>import('./components/seo_list/Index'),
        'seo-form':()=>import('./components/seo_list/Form'),
        'seo-translate':()=>import('./components/seo_list/Translate'),

        'content-list':()=>import('./components/content_list/Index'),
        'content-form':()=>import('./components/content_list/Form'),
        'content-translate':()=>import('./components/content_list/Translate'),

        'constant-list':()=>import('./components/constant_list/Index'),
        'constant-form':()=>import('./components/constant_list/Form'),
        'constant-translate':()=>import('./components/constant_list/Translate'),

        'img-list':()=>import('./components/img_list/Index'),
        'img-form':()=>import('./components/img_list/Form'),
        'img-translate':()=>import('./components/img_list/Translate'),

        'video-list':()=>import('./components/video_list/Index'),
        'video-form':()=>import('./components/video_list/Form'),
        'video-translate':()=>import('./components/video_list/Translate'),
    }
});
