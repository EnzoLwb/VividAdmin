<?php

namespace App\Events;

use App\Models\Admin;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class TestNotify implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $admin;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Admin $admin)
    {
        $this->admin = $admin->toArray();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('test_notify');
    }

    /**
     * 指定广播数据。
     *
     * @return array
     */
    public function broadcastWith()
    {
        return $this->admin;
    }
}
