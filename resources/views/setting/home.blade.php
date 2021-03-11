@extends('layouts.main')
@section('title', '首页设置')
@section('content')
    <setting-list :setting='{!! json_encode($data) !!}'
                  :user='{!! json_encode(\Illuminate\Support\Facades\Auth::user()) !!}'
    >
    </setting-list>
@stop
