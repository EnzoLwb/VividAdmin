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
    Route::group([
        'prefix'=>'seo',
    ],function (){
        Route::get('/', 'SeoController@detail');
    });
    Route::any('/test', 'CommonController@test');
    Route::post('/getDetailList', 'CommonController@getDetailList');
    Route::post('/saveImg', 'CommonController@saveImg');
    Route::post('/saveVideo', 'CommonController@saveVideo');
    Route::post('/saveExcel', 'CommonController@importExcel');
    Route::post('/noReturn', 'CommonController@noReturn');
});
