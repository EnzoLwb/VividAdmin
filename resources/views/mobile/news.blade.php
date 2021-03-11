<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <link href="{{cdn('images/favicon.ico')}}" rel="shortcut icon">
    <title>{{$act->title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="stylesheet" href='/css/quill.snow.css' />
    <style>
        .response{
            width: 100%
        }
        img{
            max-width:100% !important;height:auto !important;
            display: inline-block;
            position: relative;
            z-index: 0;
        }
        .padding-xs{
            padding: 5px;
        }
        .align-center{
            -webkit-box-align: center;
            align-items: center;
        }
        .flex{
            display: flex;
        }
        .text-left{
            text-align: left;
        }
        .text-xl{
            font-size: 18px;
        }
        .padding{
            padding: 15px;
        }
        .text-black{
            color: #333333;
        }
        .text-bold{
            font-weight: bold;
        }
        .cu-card{
            display: block;
            overflow: hidden;
        }
        .article-content {
            padding: 0 15px;
            overflow: hidden;
            font-size: 15px;
            margin-bottom: 30px;
            line-height: 28px;
            color: #303435;
        }
        .time{
            padding: 0 8px;
            font-size: 12px;
            color: #8799a3;
            text-align:right;
        }
        #article{
            display: inline-table;
            margin-top: 30px;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
        }
        .ql-editor .ql-video{
            margin: 0 auto;
        }
    </style>
</head>
<body style="margin: 0">
<div id="app">
   <div class="response">
       <img src="{{$act->cover}}" alt="">
   </div>
    {{--标题--}}
    <div class="padding-xs flex align-center">
        <div class="flex-sub text-left">
            <div class="solid-bottom text-xl padding"><span class="text-black text-bold">{{$act->title}}</span></div>
        </div>
    </div>
    {{--正文--}}
    <div class="cu-card">
        <div class="article-content">
            {{--发布时间--}}
            <div class="time">发布时间：{{$act->created_at}}</div>
            {{--文章--}}
            <div id="article" class="ql-editor" style="white-space:pre-wrap" >
                {!! $act->content !!}
            </div>
        </div>
    </div>
</div>


</body>
</html>

