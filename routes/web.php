<?php

//后台管理
Route::get('/login', 'UserController@login')->name('login');
Route::post('/login', 'UserController@loginPost');
Route::any('/logout', 'UserController@logout');

/*测试接口*/

/*移动端*/
Route::group([
    'prefix'=>'mobile',//手机查看的
],function (){

});

/*PC端*/
Route::group(['middleware' => ['needlogin','menunorm']], function () {
    Route::get('/', 'Admin\IndexController@home');

    Route::group([
        'prefix'=>'admin',
    ],function (){
        //用户修改密码
        Route::get('/changepassword', 'UserController@changepassword');
        Route::get('/profile', 'UserController@profile');
        Route::get('/clear-cache', 'UserController@clearCache');
        Route::post('/changepassword', 'UserController@changepasswordPost');
        Route::post('/getMenu', 'UserController@getMenu');
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

        Route::group([
            'namespace'=>'Admin',
        ],function (){

            //资讯管理
            Route::group([
                'prefix'=>'news',
            ],function (){
//                Route::get('/', 'NewsController@index');
                Route::get('/oa/federation/{type}', 'NewsController@index');
                Route::get('/add/{type?}', 'NewsController@add');
                Route::post('/save', 'NewsController@save');
                Route::post('/delete', 'NewsController@delete');
                Route::get('/show/{article}', 'NewsController@show');
                Route::get('/edit/{article}', 'NewsController@edit');
            });

            //标签管理
            Route::group([
                'prefix'=>'tags',
            ],function (){
                Route::post('/', 'TagsController@getType');
                Route::get('/list', 'TagsController@index');
                Route::post('/update', 'TagsController@update');
                Route::post('/search', 'TagsController@search');
                Route::post('/delete/{id}', 'TagsController@delete');
            });

            //日志管理
            Route::group([
                'prefix'=>'logs',
            ],function (){
                Route::get('/list', 'LogsController@logList');
                Route::post('/delete/{id}', 'LogsController@delete');
                Route::post('/get_model_name_by_id', 'LogsController@getModelNameById');
            });

            //总系统设置
            Route::group([
                'prefix'=>'setting',
            ],function (){
                Route::any('/home', 'SettingController@home');
            });

        });

    });

});


