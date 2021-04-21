@extends('layouts.main')
@section('title', '编辑会员')
@section('content')
    <member-form :member='{!! json_encode($obj) !!}'>
    </member-form>
@stop
