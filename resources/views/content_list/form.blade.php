@extends('layouts.main')
@section('title', $title)
@section('content')
    <content-form :origin-obj='{!! json_encode($obj) !!}'
         :title='{!! json_encode($title) !!}'
         :edit-site='{!! json_encode($site ?? '') !!}'
    ></content-form>
@stop
