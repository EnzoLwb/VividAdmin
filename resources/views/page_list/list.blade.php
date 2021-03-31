@extends('layouts.main')
@section('title', 'Page List')
@section('content')
    <page-list :module='{!! json_encode($module) !!}'
               :module-select='{!! json_encode($module_select) !!}'
    ></page-list>
@stop
