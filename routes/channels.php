<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
use Illuminate\Support\Facades\Log;
Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('verify_notify.{corpId}', function ($user, $corpId) {
//    return true;
    return \App\Models\AdminGroups::query()->where('company_id',$corpId)->where('admin_id',$user->id)->exists();
} , ['guards' => ['web']]);
Broadcast::channel('test_notify', function ($user) {
    return true;
} , ['guards' => ['web']]);