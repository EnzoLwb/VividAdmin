<?php

namespace App\Imports;

use App\Jobs\BatchMember;
use App\Models\BatchUserQueue;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToCollection;

class BatchUserImport implements ToCollection
{
    use  DispatchesJobs;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function collection(Collection $rows)
    {
        foreach ($rows as $k => $row)
        {
            if ($k==0) continue; //去除表头
            $id = BatchUserQueue::query()->insertGetId([
                'name' => $row[0],
                'userid' => $row[0],
                'mobile' => $row[2],
                'email' => $row[3],
                'position' => $row[5],
                'department' => $row[4],
                'gender' => $row[6] == '女'? 0:1,
            ]);
            BatchMember::dispatch($id);
        }
    }

}
