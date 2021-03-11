<?php

namespace App\Mail;

use App\Dao\ContestVerifyStatusDao;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContestMail extends Mailable
{
    use Queueable, SerializesModels;
    public $status;
    public $contest;
    public $act;
    public $verify;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($contest,$verify)
    {
        $this->verify = $verify;
        $this->contest = $contest;
        $dao = new ContestVerifyStatusDao();
        switch ($verify->type){
            case "lsyj":
                $act = '培训及文体活动鼓励金活动';
                break;
            case "ldjs":
                $act = '劳动竞赛鼓励金活动';
                break;
            default:
                $act = '其他活动';
        }
        $status = $dao->status[$verify->status];
        $this->act = $act;
        $this->status = $status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.contest');
    }
}
