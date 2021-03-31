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

        //翻译员权限
        Gate::define('translate', function ($user) {
            $group = AdminGroups::query()->where('admin_id',$user->id)->value('type');
            return ( $group === AdminGroups::GRID_MEMBER  || $group === AdminGroups::GH_LEADER ) ? Response::allow()
                : Response::deny('Insufficient operation authority, only translators');
        });
        //运营权限

    }
}
