@extends('layouts.main')
@if($show == 3)
	@section('title', '新增用户')
@elseif($show == 2)
	@section('title', '编辑用户')
@else
	@section('title', '查看用户')
@endif
@section('content')
	<admin-form   :articles='{{$article}}' :show="{{$show}}" :roles="{{json_encode($roles)}}" :media_roles="{{json_encode($media_roles)}}">
	</admin-form>
@stop
