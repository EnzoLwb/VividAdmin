@extends('layouts.main')
@section('title', 'Translate')
@section('content')
    <content-translate :obj='{!! json_encode($obj) !!}'
         :language-select='{!! json_encode($language_select) !!}'
    ></content-translate>
@stop
