<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class MembersExport implements FromArray
{
    // 要导出的数据
    public $data;
    public $header;

    public function __construct(array $data,$heading)
    {
        $this->data = $data;
        $this->header = $heading;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function array() : array
    {
        array_unshift($this->data, $this->header);
        // 此处数据需要数组转集合
        return $this->data;
    }
}
