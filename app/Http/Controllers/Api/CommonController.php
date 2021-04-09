<?php

namespace App\Http\Controllers\Api;

use App\Exports\CompanysExport;
use App\Http\Controllers\Controller;
use App\Models\AdminGroups;
use App\Models\SystemSetting;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\Reader\Xls\MD5;


class CommonController extends Controller
{
    //上传图片
    public function saveImg(Request $request)
    {
        $tmp = $request->file('file');

        // 查询数据库是否有记录
        $file_md5 = md5_file($tmp);
        $history = UploadedFile::query()->where('file_md5',$file_md5)->first();
        if ($history){
            $data = [
                'path' =>  $history->file_path, //文件路径
                'url' =>  $history->file_path //文件路径
            ];
            return $this->json(0,$data);
        }
        $image_size = $tmp->getSize();//是否选择压缩图片
        if ($tmp->isValid()) { //判断文件上传是否有效
            $FileType = $tmp->getClientOriginalExtension(); //获取文件后缀
            $FilePath = $tmp->getRealPath(); //获取文件临时存放位置
            $FileName = date('Y-m-d') .'/'. uniqid() . '.' . $FileType; //定义文件名
            Storage::disk('image')->put($FileName, file_get_contents($FilePath)); //存储文件
            $data = $image_size /1000 >1000 ? //大于1M要压缩的
                [
                    'path' => env('APP_URL').'imagecache/large/'. $FileName,
                    'url' => env('APP_URL').'imagecache/large/'. $FileName,
                ]
                :
                [
                    'path' =>  env('APP_URL').'storage/image/'. $FileName,
                    'url' =>  env('APP_URL').'storage/image/'. $FileName,
                ];

            //存储到数据库
            $uploadedFile = new UploadedFile();
            $uploadedFile->file_size = @filesize($FilePath);
            $uploadedFile->file_mime = $tmp->getMimeType();
            $uploadedFile->file_name = uniqid() . '.' . $tmp->getClientOriginalExtension();//新名字
            $uploadedFile->file_path = $data['path'];//路径
            $uploadedFile->file_oldname = $tmp->getClientOriginalName();
            $uploadedFile->file_md5 = $file_md5;
            $uploadedFile->file_status = 1;
            if (Auth::id()) {
                $uploadedFile->uid = Auth::id();
            }
            if ($request->type) {
                $uploadedFile->type = $request->type;
            }
            $uploadedFile->save();
        }else{
            return $this->json(1,[],'上传图片无效~');
        }
        return $this->json(0,$data,'');
    }

    //上传视频
    public function saveVideo(Request $request)
    {
        $tmp = $request->file('file');
        // 查询数据库是否有记录
        $file_md5 = md5_file($tmp);
        $history = UploadedFile::query()->where('file_md5',$file_md5)->first();
        if ($history){
            $data = [
                'path' =>  $history->file_path //文件路径
            ];
            return $this->json(0,$data);
        }
        $image_size = $tmp->getSize();//是否选择压缩图片
        if($image_size/1024/1024>20) return $this->json(1,[],'视频不允许超过20M~');
        if ($tmp->isValid()) { //判断文件上传是否有效
            $FileType = $tmp->getClientOriginalExtension(); //获取文件后缀
            $FilePath = $tmp->getRealPath(); //获取文件临时存放位置
            $FileName = date('Y-m-d') .'/'. uniqid() . '.' . $FileType; //定义文件名
            Storage::disk('video')->put($FileName, file_get_contents($FilePath)); //存储文件
            $data = [
                'path' =>  env('APP_URL').'storage/video/'. $FileName
            ];
            //存储到数据库
            $uploadedFile = new UploadedFile();
            $uploadedFile->file_size = @filesize($FilePath);
            $uploadedFile->file_mime = $tmp->getMimeType();
            $uploadedFile->file_name = uniqid() . '.' . $tmp->getClientOriginalExtension();//新名字
            $uploadedFile->file_path = $data['path'];//路径
            $uploadedFile->file_oldname = $tmp->getClientOriginalName();
            $uploadedFile->file_md5 = $file_md5;
            $uploadedFile->file_status = 1;
            if (Auth::id()) {
                $uploadedFile->uid = Auth::id();
            }
            if ($request->type) {
                $uploadedFile->type = $request->type;
            }
            $uploadedFile->save();
        }else{
            return $this->json(1,[],'上传视频无效~');
        }
        return $this->json(0,$data,'');
    }

    //保存excel
    public function importExcel(Request $request)
    {
        $tmp = $request->file('file');
        $type = $request->input('type');
        $item_id = $request->input('item_id');
        $user_id = $request->input('user');
        if ($tmp->isValid()) { //判断文件上传是否有效
            $filePathName = $tmp->getPathname();
            $file_md5 = md5_file($filePathName);
            $history = UploadedFile::query()->where('file_md5',$file_md5)->first();
            if ($history){
                $data = [
                    'status' => 0,
                    'upload_id' => $history->file_id,
                    'fileId' => $history->file_id,
                    'path' =>  $history->file_path, //文件路径
                    'url' =>  $history->file_path, //文件路径
                ];
                if ($request->type){
                    $history->type = $request->type;
                    $history->save();
                }
                return $this->json(0,$data);
            }
            $FileType = $tmp->getClientOriginalExtension(); //获取文件后缀
            $FileOldName = $tmp->getClientOriginalName();
            $FileMime = $tmp->getMimeType();
            $FilePath = $tmp->getRealPath(); //获取文件临时存放位置
            $file_name = uniqid() . '.' . $FileType;
            $FileName = date('Y-m-d') .'/'.$file_name ; //定义文件名

            // 保存数据
            $uploadedFile = new UploadedFile();
            $uploadedFile->file_size = @filesize($FilePath);
            $uploadedFile->file_mime = $FileMime;
            $uploadedFile->file_name = $file_name;//新名字
            $uploadedFile->file_path = '/storage/excel/'.$FileName;//路径
            $uploadedFile->file_oldname = $FileOldName;
            $uploadedFile->file_md5 = $file_md5;
            $uploadedFile->file_status = 1;
            if ($user_id) {
                $uploadedFile->uid = $user_id;
            }
            if ($type) {
                $uploadedFile->type = $type;
            }
            if ($item_id) {
                $uploadedFile->item_id = $item_id;
            }
            $uploadedFile->save();
            Storage::disk('excel')->put($FileName, file_get_contents($FilePath)); //存储文件 filesystem.config
            $data = [
                'status' => 0,
                'upload_id' => $uploadedFile->file_id,
                'fileId' => $uploadedFile->file_id,
                'path' => '/storage/excel/'. $FileName, //文件路径
                'url' => '/storage/excel/'. $FileName, //文件路径
            ];

        }else{
            return $this->json(1,[],'上传文件无效~');
        }
        return $this->json(0,$data);
    }

    //下载文件或者通过id查询
    public function downloadFile ($file_name,$type,$id = null) {
        if ($id){
            $file_path = UploadedFile::query()->findOrFail($id);
            $preg = "/^http(s)?:\\/\\/.+/";
            $path = preg_match($preg,$file_path->file_path) ? $file_path->file_path:env('APP_URL') .$file_path->file_path;
            return $this->json(0,['path'=>$path],'');
        }
        $file = config('filesystems.disks.'.$type.'.root').'/'.$file_name;
        if(!file_exists($file)){
            return '文件不存在或已被删除！';
        };
        return response()->download($file,$file_name);
    }

    //导出
    public function zzjsExport()
    {
        $data = \request('data');
        if (count($data)==0) return $this->json(1,[],'请选择导出行');
        $model = 'App\Models\\'.\request('type');
        $options = \request('options');
        $header = $fields = [];
        $disk = 'export';//保存的磁盘地址
        sort( $options );
        @ob_start();
        foreach ($options as $v){
            $model = new $model();
            $value = $model->exportOptions[$v];
            $header[] = $value['text'];
            $fields[] = $value['field'];
        }
        $new_data = [];
        foreach ($data as $k=>$v){
            foreach ($fields as $field){
                $new_data[$k][] = $v[$field];
            }
        }
        @ob_end_clean();
        $file_name = date('mdHi').rand(10000,99999).'.xls';
        Excel::store(new CompanysExport($new_data,$header),$file_name,$disk);
        $res['data'] = route('download', ['file' => $file_name,'type' => $disk]);
        return $this->json(0,$res,1);
    }

    //调整置顶位数
    public function common_stick(Request $request)
    {
        $obj = "App\Models\\".$request->object;
        $obj = new $obj;
        $id = $request->id;
        $obj->find($id)->update([
            'reorder'=>$request->weight
        ]);
        return $this->json(0,['reorder'=>$request->weight],'');
    }

    //上线or下线
    public function common_publish(Request $request)
    {
        $obj = "App\Models\\".$request->object;
        $obj = new $obj;
        $id = $request->id;
        $obj->find($id)->update([
            'display'=>!(Boolean)$request->display
        ]);
        return $this->json(0,[],$request->display == 1?'Offline Success':'Online Success');
    }

    //删除文件夹以及文件
    public static function deldir($dir)
    {
        //先删除目录下的文件：
        $dh=@opendir($dir);
        if (!$dh) return false;
        while ($file=readdir($dh)) {
            if($file!="." && $file!="..") {
                $fullpath=$dir."/".$file;
                if(!is_dir($fullpath)) {
                    @unlink($fullpath);
                } else {
                    self::deldir($fullpath);
                }
            }
        }

        @closedir($dh);
        //删除当前文件夹：
        if(rmdir($dir)) {
            return true;
        } else {
            return false;
        }
    }

    //上传文件但不返回文件地址 而是md5值
    public function noReturn(Request $request)
    {
        $tmp = $request->file('file');
        $type = $request->input('type');//attend_gh 建会材料
        $item_id = $request->input('item_id');
        if ($tmp->isValid()) { //判断文件上传是否有效
            $filePathName = $tmp->getPathname();
            $file_md5 = md5_file($filePathName);
            $history = UploadedFile::query()->where('file_md5',$file_md5)->first();
            if ($history){
                $data = [
                    'status' => 0,
                    'val' => $history->file_md5,
                ];
                return $this->json(0,$data);
            }
            $FileType = $tmp->getClientOriginalExtension(); //获取文件后缀
            $FileOldName = $tmp->getClientOriginalName();
            $FileMime = $tmp->getMimeType();
            $FilePath = $tmp->getRealPath(); //获取文件临时存放位置
            $file_name = uniqid() . '.' . $FileType;
            $FileName = date('Y-m-d') .'/'.$file_name ; //定义文件名

            // 保存数据
            $uploadedFile = new UploadedFile();
            $uploadedFile->file_size = @filesize($FilePath);
            $uploadedFile->file_mime = $FileMime;
            $uploadedFile->file_name = $file_name;//新名字
            $uploadedFile->file_path = '/storage/excel/'.$FileName;//路径
            $uploadedFile->file_oldname = $FileOldName;
            $uploadedFile->file_md5 = $file_md5;
            $uploadedFile->file_status = 1;
            if (Auth::id()) {
                $uploadedFile->uid = Auth::id();
            }
            if ($type) {
                $uploadedFile->type = $type;
            }
            if ($item_id) {
                $uploadedFile->item_id = $item_id;
            }
            $uploadedFile->save();
            Storage::disk('excel')->put($FileName, file_get_contents($FilePath)); //存储文件 filesystem.config
            $data = [
                'status' => 0,
                'val' => $uploadedFile->file_md5,
            ];
        }else{
            return $this->json(1,[],'上传文件无效~');
        }
        return $this->json(0,$data);
    }

}
