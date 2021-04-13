<?php

namespace App\Http\Middleware;

use App\Models\AdminGroups;
use Closure;

class TranslatorOperation
{
    public function handle($request, Closure $next)
    {
        if (!AdminGroups::isTranslator()){
            abort(403, 'Unauthorized action.');
        }
        return $next($request);
    }
}
