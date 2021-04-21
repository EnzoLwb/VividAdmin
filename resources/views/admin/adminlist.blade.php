@extends('layouts.main')
@section('title', 'User List')
@section('content')
	<admin-list
			:roles="{{json_encode($roles)}}"
			:media_roles="{{json_encode($media_roles)}}"
	>
	</admin-list>
@stop