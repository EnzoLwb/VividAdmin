<?php

//后台管理
Route::get('/login', 'UserController@login')->name('login');
Route::post('/login', 'UserController@loginPost');
Route::any('/logout', 'UserController@logout');

/*PC端*/
Route::group(['middleware' => ['needlogin','menunorm']], function () {
    Route::get('/', 'Admin\IndexController@home');//首页

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
            Route::get('/seo_list/add', 'SEOListController@add');
            Route::get('/seo_list/edit', 'SEOListController@edit');
            Route::post('/seo_list/save', 'SEOListController@save');
            Route::any('/seo_list/translate', 'SEOListController@translate');
            Route::get('/seo_list/{module?}', 'SEOListController@index');
            Route::post('/seo_list/{module?}', 'SEOListController@list');
            Route::delete('/seo_list', 'SEOListController@delete');
            //Content List
            Route::get('/content_list/add', 'ContentListController@add');
            Route::get('/content_list/edit', 'ContentListController@edit');
            Route::post('/content_list/save', 'ContentListController@save');
            Route::any('/content_list/translate', 'ContentListController@translate');
            Route::get('/content_list/{module?}', 'ContentListController@index');
            Route::post('/content_list/{module?}', 'ContentListController@list');
            Route::delete('/content_list', 'ContentListController@delete');
            //Constant List
            Route::get('/constant_list/add', 'ConstantListController@add');
            Route::get('/constant_list/edit', 'ConstantListController@edit');
            Route::post('/constant_list/save', 'ConstantListController@save');
            Route::any('/constant_list/translate', 'ConstantListController@translate');
            Route::get('/constant_list/{module?}', 'ConstantListController@index');
            Route::post('/constant_list/{module?}', 'ConstantListController@list');
            Route::delete('/constant_list', 'ConstantListController@delete');
            //Image List
            Route::get('/img_list/add', 'ImageListController@add');
            Route::get('/img_list/edit', 'ImageListController@edit');
            Route::post('/img_list/save', 'ImageListController@save');
            Route::any('/img_list/translate', 'ImageListController@translate');
            Route::get('/img_list/{module?}', 'ImageListController@index');
            Route::post('/img_list/{module?}', 'ImageListController@list');
            Route::delete('/img_list', 'ImageListController@delete');

            //日志管理
            Route::group([
                'prefix'=>'logs',
            ],function (){
                Route::get('/list', 'LogsController@logList');
                Route::post('/delete/{id}', 'LogsController@delete');
                Route::post('/get_model_name_by_id', 'LogsController@getModelNameById');
            });
            Route::post('/pages_by_site', 'IndexController@getPagesBySite');

            //菜单
            Route::post('/left_menu', 'MenuController@leftMenu');
            Route::post('/header_menu', 'MenuController@headerMenu');
            Route::post('/home/site', 'MenuController@changeSite');

            //通用查询
            Route::post('/translate/record', 'IndexController@translateRecord');
        });

        //用户修改密码
        Route::get('/changepassword', 'UserController@changepassword');
        Route::get('/clear-cache', 'UserController@clearCache');
        Route::post('/changepassword', 'UserController@changepasswordPost');

        Route::post('/updateRememberToken', 'UserController@updateRememberToken');
        Route::post('/user_group', 'UserController@userGroup');

        Route::group([
            'prefix'=>'user',
        ],function (){
            Route::get('/add', 'UserController@addUser');//添加用户
            Route::any('/list','UserController@userList');
            Route::get('/edit', 'UserController@editUser');
            Route::post('/update','UserController@updateUserPost');
            Route::post('/delete','UserController@deleteUser');
            Route::post('/roles','UserController@roles');
        });

        //添加角色
        Route::group([
            'prefix'=>'role',
        ],function (){
            Route::get('/add', 'AuthController@addRole');
            Route::get('/edit', 'AuthController@addRole');
            Route::get('/list', 'AuthController@roleList');
            Route::post('/delete', 'AuthController@deleteRolePost');
            Route::post('/save', 'AuthController@save_role');
            Route::post('/get_menu', 'AuthController@getMenuRole');//获取角色菜单
        });

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


