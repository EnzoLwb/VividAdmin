@extends('layouts.main')
@section('title', 'Translate')
@section('content')
    <word-translate :obj='{!! json_encode($obj) !!}'
         :language-select='{!! json_encode($language_select) !!}'
    ></word-translate>
@stop
