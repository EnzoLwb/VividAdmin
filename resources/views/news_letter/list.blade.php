@extends('layouts.main')
@section('title', 'Newsletter List')
@section('content')
    <email-list :word-count='{!! json_encode($word_count) !!}'
    ></email-list>
@stop
