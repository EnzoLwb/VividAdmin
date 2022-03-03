<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestUser extends Model
{
    protected $table = 'users';

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
