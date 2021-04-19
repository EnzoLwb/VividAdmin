@extends('layouts.main')
@section('title', '会员卡消费')
@section('content')
    <card-consume :courses='{!! json_encode($courses) !!}'>
    </card-consume>
@stop
