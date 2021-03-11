@extends('layouts.main')
@section('title', '日志列表')
@section('content')
    <logs-list :tabledata='{!! json_encode($data) !!}'
               :search-query='{!! json_encode($queryConfig) !!}'
               :model-options='{!! json_encode($modelOptions) !!}'
               :action-options='{!! json_encode($actionOptions) !!}'
    >
    </logs-list>
@stop
