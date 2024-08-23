<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'pverify' => [
        'base_url' => env('PVERIFY_BASE_URL'),
        'client_api_id' => env('PVERIFY_CLIENT_API_ID'),
        'client_secret' => env('PVERIFY_CLIENT_SECRET'),
    ],

    'dosespot' => [
        'base_url' => env('DOSESPOT_BASE_URL'),
        'Username' => env('DOSESPOT_USERNAME'),
        'Password' => env('DOSESPOT_PASSWORD'),
    ],
];
