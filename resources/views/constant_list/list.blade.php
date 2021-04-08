@extends('layouts.main')
@section('title', 'Constant List')
@section('content')
    <constant-list :module='{!! json_encode($module) !!}'
               :type-select='{!! json_encode($type_select) !!}'
              :word-count='{!! json_encode($word_count) !!}'
    ></constant-list>
@stop
