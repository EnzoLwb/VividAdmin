<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'namespace'=>'Api',
],function (){
    Route::any('/test', 'CommonController@test');
    Route::post('/getDetailList', 'CommonController@getDetailList');
    Route::post('/saveImg', 'CommonController@saveImg');
    Route::post('/saveVideo', 'CommonController@saveVideo');
    Route::post('/saveExcel', 'CommonController@importExcel');
    Route::post('/noReturn', 'CommonController@noReturn');

    //后台通用api
    Route::group([
        'prefix'=>'common',
    ],function (){

    });

    //账号相关
    Route::group([
        'prefix'=>'account',
    ],function (){
        Route::post('/login', 'OfficialAccountController@login');

    });

    //移动端接口
    Route::post('/redeem-code/exchange', 'CoachController@exchange');//兑换码
    Route::group([
        'prefix'=>'coach',
    ],function (){
        Route::post('/settled', 'CoachController@settled');

    });
});
