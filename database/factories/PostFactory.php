<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Post;
use Faker\Generator as Faker;
$statusMap = [Post::STATUS_DRAFT, Post::STATUS_AUDIT, Post::STATUS_NORMAL];
$factory->define(Post::class, function (Faker $faker)use ($statusMap) {
    return [
        'title' => $faker->sentence,
        'content' =>$faker->paragraph,
        'status' => $faker->randomElement($statusMap),
        'user_id' =>  function () {
            return factory(\App\Models\TestUser::class)->create()->id;
        },
    ];
});
