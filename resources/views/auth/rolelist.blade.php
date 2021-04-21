@extends('layouts.main')
@section('title', 'Role List')
@section('content')
	<role-list  :tabledata='{!! json_encode($roles) !!}'>
	</role-list>
	<div class="pull-right">{!! $roles->appends(Request::except('page', '_pjax'))->links() !!}</div>
@stop

