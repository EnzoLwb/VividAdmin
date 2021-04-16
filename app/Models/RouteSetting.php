<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RouteSetting extends Model
{
    protected $guarded = [];
    public $timestamps = false;
    const SITE_SERVICE = 'service';
    const SITE_MEDIA = 'media';
    public static $site_manage = [
        self::SITE_SERVICE => 'Service',
        self::SITE_MEDIA => 'Media',
    ];
}
