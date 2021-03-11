@extends('layouts.main')
@section('title', '个人资料')
@section('content')
	<my-profile :articles="{{json_encode($articles)}}">
	</my-profile>
@stop
