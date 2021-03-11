<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class SendMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $receiver;
    public $message;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($receiver,$message)
    {
        $this->message = $message;
        $this->receiver = $receiver;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->receiver as $u_id){
            $user = User::find($u_id);
            if ($user) Notification::send($user, new \App\Notifications\SendMessage($this->message));
        }
    }
}
