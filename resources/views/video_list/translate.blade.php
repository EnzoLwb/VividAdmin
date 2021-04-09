@extends('layouts.main')
@section('title', 'Translate a Video')
@section('content')
    <video-translate :obj='{!! json_encode($obj) !!}'
         :language-select='{!! json_encode($language_select) !!}'
    ></video-translate>
@stop
