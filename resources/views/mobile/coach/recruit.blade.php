<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <meta name="viewport" content="width=device-width,viewport-fit=cover" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="format-detection" content="telephone=no,email=no" />
    <title>VS健身-教练入驻</title>
{{--    <script type="text/javascript" async="" src="./settled_files/vds.js"></script>--}}
    <link rel="shortcut icon" href="{{mobile_asset('images/lefit.ico')}}" />
    <link href="{{mobile_asset('css/settled.css')}}" rel="stylesheet" />
    <style>
        a{text-decoration: none}
    </style>
</head>
<body cz-shortcut-listen="true">
<div class="container" style="">
    <div class="img-group">
        <img src="{{mobile_asset('images/1.jpg')}}" width="100%" />
        <img src="{{mobile_asset('images/2.png')}}" width="100%" />
        <img src="{{mobile_asset('images/3.png')}}" width="100%" />
    </div>
    <div class="btn-box">
        <a href="{{route('exercise_settled')}}"><button class="le-button btn le-button-primary le-button-size-normal le-button-shape-primary">
            <!----> <label class="le-button-text">团操教练</label></button></a>
        <a href="{{route('private_settled')}}"><button class="le-button btn le-button-primary le-button-size-normal le-button-shape-primary">
            <!----> <label class="le-button-text">私人教练</label></button></a>
    </div>
</div>
{{--<script type="text/javascript" src="./settled_files/vendors.js"></script>--}}

</body>
</html>