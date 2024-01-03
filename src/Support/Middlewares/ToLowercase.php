<?php

declare(strict_types=1);

namespace Support\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ToLowercase
{
    /**
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next, string ...$fields): Response
    {
        $merge = [];

        foreach ($fields as $field) {
            if ($request->has($field) && $request->filled($field)) {
                /** @var string $value */
                $value = $request->get($field);

                $merge[$field] = strtolower($value);
            }
        }

        if (! empty($merge)) {
            $request->merge($merge);
        }

        return $next($request);
    }
}
