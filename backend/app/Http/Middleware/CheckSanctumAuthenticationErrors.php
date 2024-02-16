<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckSanctumAuthenticationErrors
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::guard('sanctum')->guest()) {
            return response('Unauthorized.', 401);
        }

        return $next($request);
    }
}