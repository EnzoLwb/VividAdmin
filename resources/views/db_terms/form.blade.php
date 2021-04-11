@extends('layouts.main')
@section('title', $title)
@section('content')
    <word-form :edit-site='{!! json_encode($site ?? '') !!}'
         :origin-obj='{!! json_encode($obj) !!}'
         :title='{!! json_encode($title) !!}'
    ></word-form>
@stop
