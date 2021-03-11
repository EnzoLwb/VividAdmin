@extends('layouts.main')
@if($show == 3)
    @section('title', '新增'.$title)
@elseif($show == 2)
    @section('title', '编辑'.$title)
@else
    @section('title', '查看'.$title)
@endif
@section('content')
    <news-form  type="{{$type ?? ''}}" :articles='{{$article}}' :show="{{$show}}">
    </news-form>
@stop
