<?php

namespace App\Http\Middleware;

use App\Models\AdminGroups;
use Closure;

class EditorOperation
{
    public function handle($request, Closure $next)
    {
        if (!AdminGroups::isEditor()){
            abort(403, 'Unauthorized action.');
        }
        return $next($request);
    }
}
