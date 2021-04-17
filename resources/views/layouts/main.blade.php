<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="utf-8" />
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link href="{{cdn('images/favicon.ico')}}" rel="shortcut icon">
	<title>@yield('title',config('app.name'))</title>
	<meta name="description" content="overview &amp; stats" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<link rel="stylesheet" href='/css/app.css' />
	@yield('header')
</head>
<body class="no-skin">
<div id="app" v-cloak>
	<div id="indexlayout">
		{{--Left First-Level Menu Begin--}}
		<menu-collapse site="{!! session('site') !!}"></menu-collapse>
		<el-container style="flex-direction:column">
			{{--Top Sec-Level Menu Begin--}}
			<header-menu :user="{{\Auth::user()}}" site="{!! session('site') !!}"></header-menu>
			{{--Top Sec-Level Menu End--}}
			{{--Main Content Begin--}}
			<el-main id="container" style="padding:0">
				<div id="body_content">@yield('content')</div>
			</el-main>
			{{--Main Content End--}}
		</el-container>
	</div>
</div><!-- app -->

<script src='/js/app.20210410.js'></script>
<script>
	var BASE_URL = '{{env('APP_URL')}}'
</script>
@yield('js')
</body>
</html>
<style>
	#app{
		-moz-user-select: text; /*火狐*/
		-webkit-user-select: text; /*webkit浏览器*/
		-ms-user-select: text; /*IE10*/
		-khtml-user-select: text; /*早期浏览器*/
		height: 100vh;
	}
	#indexlayout {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}
	body .el-table th.gutter{
		display: table-cell!important;
	}/*防止表格表头变形*/
	.el-dialog{
		margin-top:5vh !important;
	}
	/*遮盖层顶部*/
	.el-dialog__body{
		padding-top: 30px;
	}
	/*按钮 应该靠右*/
/*	.el-form-item__content button:not(.button-new-tag,.origin) {
		float: right;
	}*/
	.el-select-dropdown__wrap{
		margin-bottom:0px !important;
	}
	.el-button + .el-button {
		margin-left: 0 ;
	}
	.margin_top {
		margin-top: 15px;
	}
	.margin_tb {
		margin: 15px 0px;
	}
	.float_r {
		float: right;
	}
	#container{
		background-color:#f0f3f4;
	}
	#body_content{
		margin: 20px 30px;
		position: relative;
	}
	input[type="hidden"] {
		display: none !important;
	}
	input[type="file"] {
		display: none !important;
	}
</style>

