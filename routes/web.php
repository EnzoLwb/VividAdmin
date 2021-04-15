<?php

//后台管理
Route::get('/login', 'UserController@login')->name('login');
Route::post('/login', 'UserController@loginPost');
Route::any('/logout', 'UserController@logout');

//ckfinder
Route::any('/ckfinder/connector', '\CKSource\CKFinderBridge\Controller\CKFinderController@requestAction')
    ->name('ckfinder_connector');

Route::any('/ckfinder/browser', '\CKSource\CKFinderBridge\Controller\CKFinderController@browserAction')
    ->name('ckfinder_browser');

/*PC端*/
Route::group(['middleware' => ['needlogin','menunorm']], function () {
    Route::get('/', 'Admin\IndexController@home');//首页

    Route::group([
        'prefix'=>'admin',
    ],function (){
        Route::group([
            'namespace'=>'Admin',
        ],function (){
            Route::group(['middleware' => ['editor']], function () {
                //Page List
                Route::get('/page_list/add', 'PageListController@add');
                Route::get('/page_list/edit', 'PageListController@edit');
                Route::post('/page_list/save', 'PageListController@save');
                Route::delete('/page_list', 'PageListController@delete');
                //SEO List
                Route::get('/seo_list/add', 'SEOListController@add');
                Route::get('/seo_list/edit', 'SEOListController@edit');
                Route::post('/seo_list/save', 'SEOListController@save');
                Route::delete('/seo_list', 'SEOListController@delete');
                //Content List
                Route::get('/content_list/add', 'ContentListController@add');
                Route::get('/content_list/edit', 'ContentListController@edit');
                Route::post('/content_list/save', 'ContentListController@save');
                Route::delete('/content_list', 'ContentListController@delete');
                //Constant List
                Route::get('/constant_list/add', 'ConstantListController@add');
                Route::get('/constant_list/edit', 'ConstantListController@edit');
                Route::post('/constant_list/save', 'ConstantListController@save');
                Route::delete('/constant_list', 'ConstantListController@delete');
                //Image List
                Route::get('/img_list/add', 'ImageListController@add');
                Route::get('/img_list/edit', 'ImageListController@edit');
                Route::post('/img_list/save', 'ImageListController@save');
                Route::delete('/img_list', 'ImageListController@delete');
                //Video List
                Route::get('/video_list/add', 'VideoListController@add');
                Route::get('/video_list/edit', 'VideoListController@edit');
                Route::post('/video_list/save', 'VideoListController@save');
                Route::delete('/video_list', 'VideoListController@delete');
                //DB Terms
                Route::get('/db_terms/add', 'DbTermsController@add');
                Route::get('/db_terms/edit', 'DbTermsController@edit');
                Route::post('/db_terms/save', 'DbTermsController@save');
                Route::delete('/db_terms', 'DbTermsController@delete');
                //News letter
                Route::get('/news_letter/add', 'NewsLetterController@add');
                Route::get('/news_letter/edit', 'NewsLetterController@edit');
                Route::post('/news_letter/save', 'NewsLetterController@save');
                Route::delete('/news_letter', 'NewsLetterController@delete');
            });

            Route::get('/page_list/{module?}', 'PageListController@index');
            Route::post('/page_list/{module?}', 'PageListController@list');

            Route::any('/seo_list/translate', 'SEOListController@translate')->middleware('translator');
            Route::get('/seo_list/{module?}', 'SEOListController@index');
            Route::post('/seo_list/{module?}', 'SEOListController@list');

            Route::any('/content_list/translate', 'ContentListController@translate')->middleware('translator');
            Route::get('/content_list/{module?}', 'ContentListController@index');
            Route::post('/content_list/{module?}', 'ContentListController@list');

            Route::any('/constant_list/translate', 'ConstantListController@translate')->middleware('translator');
            Route::get('/constant_list/{module?}', 'ConstantListController@index');
            Route::post('/constant_list/{module?}', 'ConstantListController@list');

            Route::any('/img_list/translate', 'ImageListController@translate')->middleware('translator');
            Route::get('/img_list/{module?}', 'ImageListController@index');
            Route::post('/img_list/{module?}', 'ImageListController@list');

            Route::any('/video_list/translate', 'VideoListController@translate')->middleware('translator');
            Route::get('/video_list/{module?}', 'VideoListController@index');
            Route::post('/video_list/{module?}', 'VideoListController@list');

            Route::any('/db_terms/translate', 'DbTermsController@translate')->middleware('translator');
            Route::get('/db_terms/{module?}', 'DbTermsController@index');
            Route::post('/db_terms/{module?}', 'DbTermsController@list');

            Route::any('/news_letter/translate', 'NewsLetterController@translate')->middleware('translator');
            Route::get('/news_letter', 'NewsLetterController@index');
            Route::post('/news_letter', 'NewsLetterController@list');

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

            //通用查询
            Route::post('/translate/record', 'IndexController@translateRecord');//查询该语种的翻译结果
            Route::post('/pages_by_site', 'IndexController@getPagesBySite');//根据site查询pages
            Route::post('/repeat_word', 'IndexController@repeatWord');//关键词是否重复
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

        Route::group([
            'prefix'=>'settings',
        ],function (){
            Route::get('/', 'Admin\SettingController@index');
            Route::any('/routes', 'Admin\SettingController@routes');
            Route::get('/user', 'UserController@userList');
            Route::get('/role', 'AuthController@roleList');
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


