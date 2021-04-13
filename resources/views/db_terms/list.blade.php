@extends('layouts.main')
@section('title', 'DB Terms')
@section('content')
    <word-list :module='{!! json_encode($module) !!}'
               :language-select='{!! json_encode($language_select) !!}'
               :group='{!! json_encode($group) !!}'
    ></word-list>
@stop
