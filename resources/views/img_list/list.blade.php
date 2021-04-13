@extends('layouts.main')
@section('title', 'Image List')
@section('content')
    <img-list :module='{!! json_encode($module) !!}'
               :type-select='{!! json_encode($type_select) !!}'
              :word-count='{!! json_encode($word_count) !!}'
              :group='{!! json_encode($group) !!}'
    ></img-list>
@stop
