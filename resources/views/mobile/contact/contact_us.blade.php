<!DOCTYPE html>
<html style="font-size: 110.4px;"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="shortcut icon" href="{{mobile_asset('images/lefit.ico')}}" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="format-detection" content="telephone=no,email=no">
    <style>
        #app{
            min-height: 100vh;
            box-sizing: border-box;
        }
    </style>
    <style type="text/css">.lem-editable-component {
            position: relative;
        }
        .lem-editable-component-outline {
            border: 1px dashed transparent;
        }
        .lem-editable-component-outline::after {
            content: attr(data-anchor);
            background: rgba(0, 0, 0, 0.36);
            display: inline-block;
            color: #ffffff;
            padding: 2px 5px;
            font-size: 16px;
            position: absolute;
            top: 0;
            right: 0;
        }
        .lem-editable-component-outline:hover {
            border: 1px dashed #dd9876;
        }
        .lem-editable-component .le-add-comp-btn {
            cursor: pointer;
            position: absolute;
            left: 50%;
            margin-left: -20px;
            width: 40px;
            height: 40px;
            border-radius: 40px;
            background-color: #fff;
            background-image: url(https://gw.alipayobjects.com/zos/rmsportal/hFqqxsTSSoDRDpVDnWqj.png);
            background-repeat: no-repeat;
            background-size: 16px 16px;
            background-position: 50% 50%;
            overflow: hidden;
            box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
            pointer-events: auto;
            bottom: 0;
            -webkit-transform: translateY(20px);
            transform: translateY(20px);
            display: none;
            z-index: 999;
        }
        .lem-editable-component:hover {
            cursor: pointer;
        }
        .lem-editable-component:hover .lem-add-comp-btn {
            display: block;
        }
        .lem-editable-component .lem-editable-component-modal {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 999;
            top: 0;
            left: 0;
        }
        .lem-component-region {
            position: relative;
            border: 1px dashed transparent;
        }
        .lem-component-region .lem-component-region-holder {
            position: relative;
            border: 1px dashed transparent;
            height: 64px;
            background: #74e0ea;
            font-weight: 14px;
        }
        .lem-component-region .lem-component-region-holder:hover {
            cursor: pointer;
            border-color: #dd9876;
        }
        .lem-component-region .lem-component-region-holder span {
            color: #fff;
            position: relative;
            top: 20px;
            font-weight: 600;
        }
        .lem-editable-region-component {
            position: relative;
            border: 1px dashed transparent;
        }
        .lem-editable-region-component-inner {
            position: relative;
        }
        .lem-editable-region-component-inner .lem-editable-component-modal {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 999;
            top: 0;
            left: 0;
        }
        .lem-editable-region-component-inner .lem-editable-component-modal .tips {
            background: rgba(0, 0, 0, 0.36);
            display: inline-block;
            color: #ffffff;
            padding: 2px 5px;
            font-size: 16px;
            position: absolute;
            top: 0;
            right: 0;
        }
        .lem-editable-region-component-inner .lem-editable-component-modal-hide {
            background-color: rgba(0, 0, 0, 0.65);
        }
        .lem-editable-region-component .lem-editable-add-component-btn {
            cursor: pointer;
            position: absolute;
            left: 50%;
            margin-left: -20px;
            width: 40px;
            height: 40px;
            border-radius: 40px;
            background-color: #fff;
            background-image: url(https://gw.alipayobjects.com/zos/rmsportal/hFqqxsTSSoDRDpVDnWqj.png);
            background-repeat: no-repeat;
            background-size: 16px 16px;
            background-position: 50% 50%;
            overflow: hidden;
            box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
            pointer-events: auto;
            bottom: 0;
            -webkit-transform: translateY(20px);
            transform: translateY(20px);
            display: none;
            z-index: 1001;
        }
        .lem-editable-region-component:hover {
            cursor: pointer;
            border-color: #dd9876;
        }
        .lem-editable-region-component:hover .lem-editable-add-component-btn {
            display: block;
        }
        .lem-modal-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            overflow: auto;
            outline: 0;
        }
        .lem-modal {
            padding: 0;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            line-height: 1.5;
            list-style: none;
            position: relative;
            top: 100px;
            margin: 0 20px;
            padding-bottom: 24px;
        }
        .lem-modal-content {
            position: relative;
            background-color: #fff;
            background-clip: padding-box;
            border: 0;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .lem-modal-dialog .lem-modal-header {
            padding: 16px 24px 4px;
            color: rgba(0, 0, 0, 0.65);
            border-radius: 4px 4px 0 0;
        }
        .lem-modal-dialog .lem-modal-header .lem-modal-title {
            margin: 0;
            display: block;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
            font-size: 18px;
            line-height: 22px;
            word-wrap: break-word;
        }
        .lem-modal-dialog .lem-modal-body {
            padding: 24px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }
        .lem-modal-dialog .lem-modal-footer {
            padding: 10px 16px 14px;
            text-align: center;
            border-radius: 0 0 4px 4px;
        }
        .lem-modal-dialog .lem-modal-footer button + button {
            margin-bottom: 0;
            margin-left: 16px;
        }
        .lem-modal-popup .lem-modal-body {
            position: relative;
        }
        .lem-modal-popup .lem-modal-body-inner {
            position: relative;
            max-height: 568px;
            overflow-y: scroll;
            overflow-x: hidden;
            border-radius: 4px;
        }
        .lem-modal-popup-zone-bg {
            z-index: 99;
        }
        .lem-modal-popup-zone-area {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
        }
        .lem-modal-popup-zone-area .lem-modal-popup-zone-unit {
            position: absolute;
            background-color: #fc9bfa;
            cursor: pointer;
        }
        .lem-modal-popup .lem-modal-footer {
            position: absolute;
            left: 50%;
            padding-top: 24px;
        }
        .lem-modal-popup .lem-modal-footer .lem-modal-close-wrapper {
            display: inline-block;
            position: relative;
            left: -50%;
        }
        .lem-modal-popup .lem-modal-footer .lem-modal-close {
            display: inline-block;
            font-size: 16px;
            color: #fafafa;
            border: 1px solid #fafafa;
            border-radius: 50%;
            padding: 12px 16px;
            cursor: pointer;
        }
        .lem-modal-mask {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.65);
        }
        .lem-modal-btn {
            position: relative;
            line-height: 1.5;
            display: inline-block;
            font-weight: 400;
            white-space: nowrap;
            text-align: center;
            background-image: none;
            border: 1px solid transparent;
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            touch-action: manipulation;
            height: 32px;
            padding: 0 30px;
            font-size: 14px;
            border-radius: 4px;
            color: rgba(0, 0, 0, 0.65);
            background-color: #fff;
            border-color: #d9d9d9;
        }
        .lem-modal-btn-primary {
            color: #fff;
            background-color: #1890ff;
            border-color: #1890ff;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        }
        .lazy-img[lazy=loading] {
            width: 40px !important;
            margin: auto;
            padding: 150px calc(50% - 20px);
        }
        .lazy-img[lazy-progressive=true] {
            width: 100%!important;
            margin: auto;
            padding: 0;
            background-color: #fff;
            height: 335px;
        }
        .lazy-img[lazy=loaded] {
            height: auto !important;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
        }
        .lazy-img[lazy=error] {
            width: 40px !important;
            margin: auto;
            padding: 20px 0;
        }
        .lazy-img-bg[lazy=loading] {
            width: 100%;
            height: 500px;
            background-size: 10%;
            background-repeat: no-repeat;
            background-position: 50%;
        }
        .lazy-img-bg[lazy=error] {
            background-size: 10%;
            background-repeat: no-repeat;
            background-position: 50%;
            background-color: #fff;
        }
        .lazy-img-bg[lazy-progressive=true] {
            background-size: cover;
        }
        .lazy-img-bg[lazy=loaded] {
            background-size: cover;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
        }
        @-webkit-keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    </style>
    <title>联系我们</title>
    <script type="text/javascript">
        var docEl = document.documentElement,
            //当设备的方向变化（设备横向持或纵向持）此事件被触发。绑定此事件时，
            //注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
            //总的来说就是监听当然窗口的变化，一旦有变化就需要重新设置根字体的值
            resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                //设置根字体大小
                setTimeout(function() {
                    docEl.style.fontSize = 100 * (docEl.clientWidth / 375) + 'px';
                },0)
            };

        //绑定浏览器缩放与加载时间
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
        recalc()
    </script>

    <style type="text/css"></style>
    <style type="text/css">
        .lem-image-zone {
            position: relative;
            z-index: 1;
        }
        .lem-image-zone .lem-image-zone-bg img {
            display: block;
        }
        .lem-image-zone-bg {
            z-index: 99;
        }
        .lem-image-zone-area {
            position: absolute;
            z-index: 100;
            top: 0;
            left: 0;
        }
        .lem-image-zone-area .lem-image-zone-unit {
            position: absolute;
            background-color: #1cb8e777;
        }
        .lem-image-zone-area .lem-image-zone-unit.close {
            background-color: transparent;
        }
    </style><style type="text/css">.lem-image {
            display: block;
            width: 100%;
        }
        .lem-image img {
            width: 100%;
            display: block;
        }
    </style><style type="text/css">.lem-video {
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
            width: 100%;
            position: relative;
        }
        .lem-video .image-bg {
            width: 100%;
            display: block;
        }
        .lem-video .video,
        .lem-video .video-placehoder {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
        }
        .lem-video .video::-webkit-media-controls-start-playback-button,
        .lem-video .video-placehoder::-webkit-media-controls-start-playback-button {
            display: none;
        }
        .lem-video .video {
            background: #000;
        }
        .lem-video .video.after {
            z-index: -2;
            opacity: 0;
        }
        .lem-video .video .before {
            z-index: 2;
            opacity: 1;
        }
        .lem-video .video-placehoder.after {
            z-index: -2;
            opacity: 0;
        }
        .lem-video .video-placehoder .before {
            z-index: 2;
            opacity: 1;
        }
    </style><style type="text/css">.lem-tab-nav {
            position: relative;
            z-index: 20;
        }
        .lem-tab-nav .lem-image-zone.float {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 2;
        }
    </style><style type="text/css">.lem-richtext {
            padding: 0.16rem;
        }
        .lem-richtext .richtext-content {
            font-size: 0.14rem;
        }
        .lem-richtext .richtext-content h1 {
            color: #000000;
            font-size: 0.32rem;
            margin-top: 0.24rem;
            margin-bottom: 0.12rem;
        }
        .lem-richtext .richtext-content h2 {
            color: #000000;
            font-size: 0.24rem;
            margin-top: 0.2rem;
            margin-bottom: 0.1rem;
        }
        .lem-richtext .richtext-content h3 {
            color: #000000;
            font-size: 0.16rem;
            margin-top: 0.16rem;
            margin-bottom: 0.08rem;
        }
        .lem-richtext .richtext-content p {
            margin-top: 0.06rem;
            margin-bottom: 0.06rem;
            color: rgba(0, 0, 0, 0.85);
            min-height: 0.1rem;
        }
        .lem-richtext .richtext-content ul,
        .lem-richtext .richtext-content ol {
            padding-left: 0.14rem;
            margin: 0;
        }
        .lem-richtext .richtext-content ul li,
        .lem-richtext .richtext-content ol li {
            margin-top: 0.04rem;
            margin-bottom: 0.04rem;
            color: rgba(0, 0, 0, 0.85);
        }
        .lem-richtext .richtext-content ul {
            list-style-type: disc;
        }
        .lem-richtext .richtext-content blockquote {
            border-left: 0.02rem solid #ddd;
            margin-left: 0;
            margin-right: 0;
            padding-left: 0.1rem;
            color: #aaa;
            font-style: italic;
        }
        .lem-richtext .richtext-content blockquote[dir='rtl'] {
            border-left: none;
            padding-left: 0;
            padding-right: 0.1rem;
            border-right: 0.02rem solid #ddd;
        }
        .lem-richtext .richtext-content a {
            color: #1890ff;
        }
    </style><style type="text/css">/**

        .swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;-o-transition-property:transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;-o-transition-property:transform;transition-property:transform;transition-property:transform,-webkit-transform}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;-o-transition-property:transform,height;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.swiper-container-3d{-webkit-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-wp8-horizontal,.swiper-container-wp8-horizontal>.swiper-wrapper{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-container-wp8-vertical,.swiper-container-wp8-vertical>.swiper-wrapper{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;background-size:27px 44px;background-position:center;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");left:10px;right:auto}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");right:10px;left:auto}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s opacity;-o-transition:.3s opacity;transition:.3s opacity;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{-webkit-transform:scale(.66);-ms-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{-webkit-transform:scale(.66);-ms-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;-webkit-box-shadow:none;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;-webkit-transition:.2s top,.2s -webkit-transform;transition:.2s top,.2s -webkit-transform;-o-transition:.2s transform,.2s top;transition:.2s transform,.2s top;transition:.2s transform,.2s top,.2s -webkit-transform}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s left,.2s -webkit-transform;transition:.2s left,.2s -webkit-transform;-o-transition:.2s transform,.2s left;transition:.2s transform,.2s left;transition:.2s transform,.2s left,.2s -webkit-transform}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s right,.2s -webkit-transform;transition:.2s right,.2s -webkit-transform;-o-transition:.2s transform,.2s right;transition:.2s transform,.2s right;transition:.2s transform,.2s right,.2s -webkit-transform}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-ms-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{-webkit-transform-origin:right top;-ms-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-progressbar.swiper-pagination-white{background:rgba(255,255,255,.25)}.swiper-pagination-progressbar.swiper-pagination-white .swiper-pagination-progressbar-fill{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-pagination-progressbar.swiper-pagination-black{background:rgba(0,0,0,.25)}.swiper-pagination-progressbar.swiper-pagination-black .swiper-pagination-progressbar-fill{background:#000}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:'';width:100%;height:100%;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");background-position:50%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-coverflow .swiper-wrapper{-ms-perspective:1200px}</style><style type="text/css">.lem-swiper-container {
            position: relative;
        }
        .lem-swiper-container .slide-item img {
            max-width: 100%;
        }
        .lem-swiper-container .swiper-button-next,
        .lem-swiper-container .swiper-button-prev {
            z-index: 1000;
        }
    </style><style type="text/css">.present-component-toast {
            min-width: 30%;
            max-width: 80%;
            min-height: 0.3rem;
            font-size: 0.14rem;
            color: #fff;
            background: rgba(0, 0, 0, 0.6);
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            text-align: center;
            line-height: 0.3rem;
            border-radius: 6px;
            padding: 5px;
            box-sizing: border-box;
        }
    </style><style type="text/css">.lem-image-zone[data-v-ceec2824] {
            position: relative;
            z-index: 1;
        }
        .lem-image-zone .lem-image-zone-bg img[data-v-ceec2824] {
            display: block;
        }
        .lem-image-zone-bg[data-v-ceec2824] {
            z-index: 99;
        }
        .lem-image-zone-area[data-v-ceec2824] {
            position: absolute;
            z-index: 100;
            top: 0;
            left: 0;
        }
        .lem-image-zone-area .lem-image-zone-unit[data-v-ceec2824] {
            position: absolute;
            background-color: #1cb8e777;
        }
        .lem-image-zone-area .lem-image-zone-unit.close[data-v-ceec2824] {
            background-color: transparent;
        }
    </style><style type="text/css">.nav-bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            min-height: 0.4rem;
            z-index: 21;
            background: rgba(0, 0, 0, 0.1);
        }
        .nav-bottom img {
            width: 100%;
        }
    </style><style type="text/css">.scroll-notice {
            overflow: hidden;
        }
    </style><style type="text/css">.scroll-notice-wrap {
            width: 2.6rem;
            height: 28px;
            position: fixed;
            z-index: 10;
            left: 10px;
            top: 8px;
            color: #ffffff;
            font-size: 0.11rem;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.2);
        }
        .scroll-notice-item-bullet {
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: flex-start;
            justify-content: flex-start;
            box-sizing: border-box;
            padding-left: 5px;
        }
        .scroll-notice-item-bullet p {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            text-align: left;
            white-space: nowrap;
        }
    </style><style type="text/css">.lex-mask {
            z-index: 1;
            pointer-events: auto;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.5s;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
    </style><style type="text/css">.lex-popup {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            background: transparent;
            display: -webkit-flex;
            display: flex;
        }
        .lex-popup.left {
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: flex-start;
            justify-content: flex-start;
        }
        .lex-popup.right {
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: flex-end;
            justify-content: flex-end;
        }
        .lex-popup.top {
            -webkit-align-items: flex-start;
            align-items: flex-start;
            -webkit-justify-content: center;
            justify-content: center;
        }
        .lex-popup.bottom {
            -webkit-align-items: flex-end;
            align-items: flex-end;
            -webkit-justify-content: center;
            justify-content: center;
        }
        .lex-popup.center {
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
        }
        .lex-popup.scale {
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
        }
        .lex-popup-content {
            z-index: 2;
            pointer-events: auto;
            position: relative;
        }

    </style><style type="text/css">@font-face {
            font-family: "iconfont-popup-close";
            src: url('//at.alicdn.com/t/font_827979_xtmuefzowd9.eot?t=1540954587442');
            /* IE9*/
            src: url('//at.alicdn.com/t/font_827979_xtmuefzowd9.eot?t=1540954587442#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAQIAAsAAAAABmAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY81EhQY21hcAAAAYAAAABLAAABcOeGtsRnbHlmAAABzAAAAFcAAABsixQX/mhlYWQAAAIkAAAALwAAADYTHbmzaGhlYQAAAlQAAAAcAAAAJAfeA4NobXR4AAACcAAAAAgAAAAICAAAAGxvY2EAAAJ4AAAABgAAAAYANgAAbWF4cAAAAoAAAAAeAAAAIAENAChuYW1lAAACoAAAAUUAAAJtPlT+fXBvc3QAAAPoAAAAHgAAAC/JfXB6eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByexT2LY27438AQw9zA0AAUZgTJAQDr1QyfeJxjYGBgZWBgYAZiHSBmYWBgDGFgZAABP6AoI1icmYELLM7CoARWwwISfxb3/z+MBPJZwCQDIxvDKOABkzJQHjisIJiBEQAO1QrhAHicY2BkYPh/i3kZsxqDNAMDJ6OZiZoSOyejmhKbiDgnI5uImJE5J6OYkZmJOpMZYwq3uBzPvzn/5vDIiXMzpvybA+IzpjCmgPkNEPrfHOzqGBgANx4WpgB4nGNgZGBgAGJXN6fUeH6brwzcLAwgcP2/1W0E/f8WCwOzGpDLwcAEEgUAJy8KyQB4nGNgZGBgbvjfwBDDwgACQJKRARUwAQBHCAJrBAAAAAQAAAAAAAAAADYAAHicY2BkYGBgYpBhANEgFgMDFxAyMPwH8xkAC1MBNgAAeJxlj01OwzAQhV/6B6QSqqhgh+QFYgEo/RGrblhUavdddN+mTpsqiSPHrdQDcB6OwAk4AtyAO/BIJ5s2lsffvHljTwDc4Acejt8t95E9XDI7cg0XuBeuU38QbpBfhJto41W4Rf1N2MczpsJtdGF5g9e4YvaEd2EPHXwI13CNT+E69S/hBvlbuIk7/Aq30PHqwj7mXle4jUcv9sdWL5xeqeVBxaHJIpM5v4KZXu+Sha3S6pxrW8QmU4OgX0lTnWlb3VPs10PnIhVZk6oJqzpJjMqt2erQBRvn8lGvF4kehCblWGP+tsYCjnEFhSUOjDFCGGSIyujoO1Vm9K+xQ8Jee1Y9zed0WxTU/3OFAQL0z1xTurLSeTpPgT1fG1J1dCtuy56UNJFezUkSskJe1rZUQuoBNmVXjhF6XNGJPyhnSP8ACVpuyAAAAHicY2BigAAuBuyAiZGJkZmBNTknvziVgQEADPwCMQAA') format('woff'), url('//at.alicdn.com/t/font_827979_xtmuefzowd9.ttf?t=1540954587442') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_827979_xtmuefzowd9.svg?t=1540954587442#iconfont') format('svg');
            /* iOS 4.1- */
        }

        .popup-title .popup-title-content {
            position: relative;
        }
        .popup-title .title-icon {
            position: absolute;
            height: 100%;
            top: 0;
            left: 0.2rem;
            line-height: 0.4rem;
        }
        .popup-title .title-icon .iconfont-popup-close {
            font-size: 0.2rem;
        }
        .popup-title .text {
            font-size: 0.26rem;
            color: #000;
        }
    </style><style type="text/css">.open-city-selector .city-select-option {
            position: absolute;
            top: 0.13rem;
            left: 0.11rem;
            z-index: 2;
            padding: 0 0.1rem;
            height: 0.18rem;
            border: 1px solid #fff;
            border-radius: 15px;
            color: #fff;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-align-items: center;
            align-items: center;
        }
        .open-city-selector .city-select-option span {
            display: block;
            width: 0;
            height: 0;
            border: 0.04rem solid transparent;
            border-top-color: #fff;
            position: relative;
            top: 0.02rem;
            margin-left: 0.04rem;
        }
        .open-city-selector .lex-popup-content {
            width: 100%;
            height: 100%;
            background: #fff;
        }
        .open-city-selector .lex-popup-content .city-list {
            width: 3.35rem;
            margin: 0.1rem auto 0 auto;
        }
        .open-city-selector .lex-popup-content .city-list li {
            font-size: 0.14rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.04);
            padding: 0.15rem 0;
        }
        .open-city-selector .lex-popup-content .city-list li.selected {
            color: #fa4a11;
        }
    </style><style type="text/css">body {
            margin: 0;
            padding: 0;
            font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', 'Microsoft yahei', arial, sans-serif;
            font-size: 12px;
        }
        html {
            padding: 0;
            margin: 0;
        }
        ul {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            margin: 0;
        }
        input,
        button,
        a,
        textarea {
            -webkit-tap-highlight-color: transparent;
        }
        div,
        section {
            -webkit-overflow-scrolling: touch;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        a {
            text-decoration: none;
            display: inline-block;
        }
        a,
        b,
        i {
            display: inline-block;
        }
        .lem-component-region {
            border: none;
        }
    </style><style type="text/css">.skill-control {
            position: relative;
            width: 100%;
            margin: 0 auto;
        }
        .skill-control .bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1;
        }
        .skill-control .bg > img {
            width: 3.55rem;
            display: block;
            margin: 0 auto;
        }
        .skill-control .skill-tip-div {
            width: 100%;
            color: #fff;
            height: 0.3rem;
            text-align: center;
            position: relative;
            z-index: 2;
            font-family: 'yuanti';
            font-size: 0.11rem;
        }
        .skill-control .tab {
            min-height: 0.45rem;
            position: relative;
            z-index: 2;
        }
        .skill-control .tab .bg-image {
            width: 100%;
            position: relative;
            z-index: 1;
            display: block;
        }
        .skill-control .tab .item-list {
            position: absolute;
            z-index: 3;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-around;
            justify-content: space-around;
            -webkit-align-items: center;
            align-items: center;
        }
        .skill-control .tab .item {
            text-align: center;
            padding: 0.1rem 0;
            height: 100%;
            box-sizing: border-box;
            font-family: 'yuanti';
            -webkit-flex-grow: 1;
            flex-grow: 1;
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
        }
        .skill-control .tab .item h5 {
            font-size: 0.14rem;
            font-weight: bold;
            line-height: 1;
        }
        .skill-control .tab .item span {
            font-size: 0.09rem;
        }
        .skill-control .tab .item.active {
            position: relative;
        }
        .skill-goods-wrap {
            width: 100%;
            position: relative;
            margin: 0 auto;
            z-index: 2;
        }
        .skill-goods-wrap .skill-card-item {
            width: 100%;
            position: relative;
            z-index: 1;
        }
        .skill-goods-wrap .skill-card-item img {
            width: 100%;
            display: block;
        }
        .skill-goods-wrap .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 2;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-align-items: center;
            align-items: center;
        }
        .skill-goods-wrap .mask > img {
            width: 1.27rem;
            display: block;
        }
    </style>


<body cz-shortcut-listen="true">
<div id="app" ledata="[object Object]" lesiteinfo="[object Object]" lecomponent="[object Object]" lepagemeta="[object Object]" lekey="[object Object]">
    <!---->
    <div class="lem-component-region" regionid="core-component" interceptor="function () { [native code] }">
        <div id="base_image_zone_awm4nqt7" data-anchor="base_image_zone_awm4nqt7" class="lem-image-zone" lecomponent="[object Object]" regionid="core-component">
            <div class="lem-image-zone-bg">
                <img src="{{mobile_asset('images/contact-us.jpg')}}" alt="" style="width: 100%;" />
            </div>
            <div class="lem-image-zone-area">
                <div data-growing-idx="1" class="lem-image-zone-unit close"
                     style="top: 463.68px; left: 79.68px; width: 265.92px; height: 56.32px;"></div>
                <div data-growing-idx="2" class="lem-image-zone-unit close"
                     onclick="window.location.href = '{!! route('coach_recruit') !!}'"
                     style="top: 371.36px; left: 79.68px; width: 262.88px; height: 56.32px;"></div>
                <div data-growing-idx="3" class="lem-image-zone-unit close" style="top: 550.72px; left: 78.08px; width: 265.92px; height: 54.72px;"></div>
            </div>
        </div>
    </div>
    <!---->
    <!---->
</div>
<div class="lex-popup login-popup center" style="z-index: 1000; display: none;">
    <div class="lex-mask" style="position: absolute; display: none;"></div>
    <div class="lex-popup-content" style="display: none;">
        <div class="login-popup-container">
            <!---->
            <h3>手机验证码登录</h3>
            <div class="from-item">
                <p>手机号码</p>
                <div class="input-box">
                    <input maxlength="11" type="tel" placeholder="请输入你的手机号" />
                </div>
            </div>
            <div class="from-item">
                <p>验证码</p>
                <div class="input-box">
                    <input maxlength="4" type="tel" placeholder="输入验证码" />
                    <button class="btn"> 获取验证码 </button>
                </div>
            </div>
            <button class="login-btn disabled">登录</button>
        </div>
    </div>
</div>
</body>
</html>