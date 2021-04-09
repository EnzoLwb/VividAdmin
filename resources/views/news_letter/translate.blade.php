@extends('layouts.main')
@section('title', 'Translate Newsletter')
@section('content')
    <email-translate :obj='{!! json_encode($obj) !!}'
         :language-select='{!! json_encode($language_select) !!}'
    ></email-translate>
@stop
