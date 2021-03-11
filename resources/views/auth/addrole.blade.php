@extends('layouts.main')
@if($show == 3)
	@section('title', '新增角色')
@elseif($show == 2)
	@section('title', '编辑角色')
@else
	@section('title', '查看角色')
@endif
@section('content')
	<role-form   :articles='{{$role}}' :policy_uri="{{json_encode($policy_uri)}}">
	</role-form>
@stop

