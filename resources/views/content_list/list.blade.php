@extends('layouts.main')
@section('title', 'Page Content')
@section('content')
    <content-list :module='{!! json_encode($module) !!}'
               :module-select='{!! json_encode($module_select) !!}'
              :word-count='{!! json_encode($word_count) !!}'
                  :group='{!! json_encode($group) !!}'
    ></content-list>
@stop
