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
            //首页直接刷卡
            Route::get('/home', 'IndexController@index');
            Route::post('/user_post', 'IndexController@userPost');

            //会员管理
            Route::group([
                'prefix'=>'membership',
            ],function (){
                Route::get('/', 'MemberController@index');
                Route::get('/add', 'MemberController@add');
                Route::post('/save', 'MemberController@save');
                Route::post('/by_card_no', 'MemberController@getMember');

            });

            //会员卡管理
            Route::group([
                'prefix'=>'card',
            ],function (){
                Route::any('/deposit', 'CardController@deposit');
                Route::any('/consume', 'CardController@consume');
            });

            //业务设置
            Route::group([
                'prefix'=>'setting',
            ],function (){
                Route::any('/service', 'SettingController@service');
                Route::any('/service/list', 'SettingController@list');

            });

            //日志管理
            Route::group([
                'prefix'=>'logs',
            ],function (){
                Route::get('/list', 'LogsController@logList');
                Route::post('/delete/{id}', 'LogsController@delete');
                Route::post('/get_model_name_by_id', 'LogsController@getModelNameById');
            });

        });
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

    });

});


