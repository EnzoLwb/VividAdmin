@extends('layouts.main')
@section('title', $title)

@section('content')
    <news-list  search="{{$search}}"  :tabledata='{!! json_encode($data) !!}' :leader='{!! json_encode($leader) !!}'>
    </news-list>
@stop
