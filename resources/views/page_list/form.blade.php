@extends('layouts.main')
@section('title', $title)
@section('content')
    <page-form :module-select='{!! json_encode($module_select) !!}'
         :origin-obj='{!! json_encode($obj) !!}'
         :title='{!! json_encode($title) !!}'
    ></page-form>
@stop
