@extends('layouts.main')
@section('title', $title)
@section('content')
    <seo-form :origin-obj='{!! json_encode($obj) !!}'
         :title='{!! json_encode($title) !!}'
         :edit-site='{!! json_encode($site ?? '') !!}'
    ></seo-form>
@stop
