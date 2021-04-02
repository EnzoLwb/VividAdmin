@extends('layouts.main')
@section('title', 'Translate')
@section('content')
    <seo-translate :obj='{!! json_encode($obj) !!}'
         :language-select='{!! json_encode($language_select) !!}'
    ></seo-translate>
@stop
