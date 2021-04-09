@extends('layouts.main')
@section('title', $title)
@section('content')
    <img-form :origin-obj='{!! json_encode($obj) !!}'
              :type-select='{!! json_encode($type_select) !!}'
         :title='{!! json_encode($title) !!}'
         :edit-site='{!! json_encode($site ?? '') !!}'
    ></img-form>
@stop
