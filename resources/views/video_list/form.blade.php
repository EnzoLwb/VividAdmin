@extends('layouts.main')
@section('title', $title)
@section('content')
    <video-form :origin-obj='{!! json_encode($obj) !!}'
         :title='{!! json_encode($title) !!}'
         :edit-site='{!! json_encode($site ?? '') !!}'
    ></video-form>
@stop
