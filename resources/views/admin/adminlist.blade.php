@extends('layouts.main')
@section('title', '人员管理')
@section('content')
	<admin-list :roles="{{json_encode($roles)}}">
	</admin-list>
@stop