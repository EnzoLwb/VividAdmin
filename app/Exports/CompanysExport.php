<?php

namespace App\Exports;


use App\Models\Company;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;

class CompanysExport implements FromArray
{
    // 要导出的数据
    public $data;
    public $header;
    // 总行数
    public $rowNum;

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
        $this->rowNum = count($this->data);
        // 此处数据需要数组转集合
        return $this->data;
    }
}
