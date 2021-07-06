@extends('layouts.main')
@section('title', '相关设置')
@section('content')
    <gzh-setting :setting='{!! json_encode($data) !!}'>
    </gzh-setting>
@stop
