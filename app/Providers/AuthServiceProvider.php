<?php

namespace App\Providers;

use App\Models\AdminGroups;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\Response;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [

    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //只能是 工会家领导 或者网格员
        Gate::define('leader-action', function ($user) {
            $group = AdminGroups::query()->where('admin_id',$user->id)->value('type');
            return ( $group === AdminGroups::POST_ADMIN ) ? Response::allow()
                : Response::deny('此操作仅限于管理员。');
        });
    }
}
