<?php

//后台管理
Route::get('/login', 'UserController@login')->name('login');
Route::post('/login', 'UserController@loginPost');
Route::any('/logout', 'UserController@logout');

/*PC端*/
Route::group(['middleware' => ['needlogin','menunorm']], function () {
    Route::get('/', 'Admin\IndexController@home');

    Route::group([
        'prefix'=>'admin',
    ],function (){
        Route::group([
            'namespace'=>'Admin',
        ],function (){
            //Page List
            Route::get('/page_list/add', 'PageListController@add');
            Route::get('/page_list/edit', 'PageListController@edit');
            Route::post('/page_list/save', 'PageListController@save');
            Route::get('/page_list/{module?}', 'PageListController@index');
            Route::post('/page_list/{module?}', 'PageListController@list');
            Route::delete('/page_list', 'PageListController@delete');
            //SEO List
            Route::get('/seo_list/{module?}', 'SEOListController@index');

            //日志管理
            Route::group([
                'prefix'=>'logs',
            ],function (){
                Route::get('/list', 'LogsController@logList');
                Route::post('/delete/{id}', 'LogsController@delete');
                Route::post('/get_model_name_by_id', 'LogsController@getModelNameById');
            });
            //菜单
            Route::post('/left_menu', 'MenuController@leftMenu');
            Route::post('/header_menu', 'MenuController@headerMenu');
            Route::post('/home/site', 'MenuController@changeSite');
        });

        //用户修改密码
        Route::get('/changepassword', 'UserController@changepassword');
        Route::get('/profile', 'UserController@profile');
        Route::get('/clear-cache', 'UserController@clearCache');
        Route::post('/changepassword', 'UserController@changepasswordPost');

        Route::post('/updateRememberToken', 'UserController@updateRememberToken');
        Route::post('/user_group', 'UserController@userGroup');

        Route::get('/user/add', 'UserController@addUser');//添加用户
        Route::any('/user/list','UserController@userList');
        Route::get('/user/edit', 'UserController@editUser');
        Route::post('/user/update','UserController@updateUserPost');
        Route::post('/user/delete','UserController@deleteUser');
        Route::post('/user/roles','UserController@roles');//批量创建用户

        //添加角色
        Route::get('/role/add', 'AuthController@addRole');
        Route::get('/role/edit', 'AuthController@addRole');
        Route::get('/role/list', 'AuthController@roleList');
        Route::post('/role/delete', 'AuthController@deleteRolePost');
        Route::post('/role/save', 'AuthController@save_role');
        Route::post('/role/get_menu', 'AuthController@getMenuRole');//获取角色菜单
        Route::group([
            'namespace'=>'Api',
        ],function (){
            //通用
            Route::get('/common/downloadfile/{file}/{type}/{id?}', 'CommonController@downloadFile')->name('download');//下载文件
            Route::get('/common/file/{id}', 'CommonController@downloadById')->name('downloadById');//下载文件
            Route::post('/common/get_export_options', 'CommonController@getExportOptions');//获取导出项
            Route::post('/common/zzjs_export', 'CommonController@zzjsExport');//导出
            Route::post('/common/common_stick', 'CommonController@common_stick');//置顶
            Route::post('/common/common_publish', 'CommonController@common_publish');//发布
        });

    });

});


