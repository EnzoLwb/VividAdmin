@extends('layouts.main')
@section('title', 'DB Terms')
@section('content')
    <word-list :module='{!! json_encode($module) !!}'
               :language-select='{!! json_encode($language_select) !!}'
    ></word-list>
@stop
