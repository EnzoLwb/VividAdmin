@extends('layouts.main')
@section('title', $title)
@section('content')
    <email-form :origin-obj='{!! json_encode($obj) !!}'
         :title='{!! json_encode($title) !!}'
         :edit-site='{!! json_encode($site ?? '') !!}'
    ></email-form>
@stop
