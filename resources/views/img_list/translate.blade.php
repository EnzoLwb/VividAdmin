@extends('layouts.main')
@section('title', 'Translate Image')
@section('content')
    <img-translate :obj='{!! json_encode($obj) !!}'
         :language-select='{!! json_encode($language_select) !!}'
    ></img-translate>
@stop
