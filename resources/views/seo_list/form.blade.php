@extends('layouts.main')
@section('title', $title)
@section('content')
    <seo-form :module-select='{!! json_encode($module_select) !!}'
         :origin-obj='{!! json_encode($obj) !!}'
         :title='{!! json_encode($title) !!}'
    ></seo-form>
@stop
