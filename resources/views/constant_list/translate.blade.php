@extends('layouts.main')
@section('title', 'Translate')
@section('content')
    <constant-translate :obj='{!! json_encode($obj) !!}'
         :language-select='{!! json_encode($language_select) !!}'
    ></constant-translate>
@stop
