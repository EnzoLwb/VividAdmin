@extends('layouts.main')
@section('title', 'SEO List')
@section('content')
    <seo-list :module='{!! json_encode($module) !!}'
               :module-select='{!! json_encode($module_select) !!}'
    ></seo-list>
@stop
