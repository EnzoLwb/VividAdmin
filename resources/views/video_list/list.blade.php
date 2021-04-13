@extends('layouts.main')
@section('title', 'Video List')
@section('content')
    <video-list :module='{!! json_encode($module) !!}'
               :module-select='{!! json_encode($module_select) !!}'
              :word-count='{!! json_encode($word_count) !!}'
                :group='{!! json_encode($group) !!}'
    ></video-list>
@stop
