@extends('layouts.main')
@section('title', '标签列表')
@section('content')
    <tags-list :tabledata='{!! json_encode($data) !!}' :search-query='{!! json_encode($queryConfig) !!}'>
    </tags-list>
@stop
