<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="utf-8" />
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link href="{{cdn('images/favicon.ico')}}" rel="shortcut icon">
	<title>@yield('title',config('app.name'))</title>
	<meta name="description" content="overview &amp; stats" />
	<meta name="imagecache_path" content="{{env('IMAGE_CACHE_PATH')}}" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<link rel="stylesheet" href='/css/app.css' />
	@yield('header')
</head>
<body class="no-skin">
<div id="app" v-cloak>
	<div id="indexlayout">
		<menu-collapse></menu-collapse>
		<!-- 标题栏:结束 -->
		<el-container>
			<el-header style="background: #222834; padding-right:20px;padding-left: 0">
				<div class="app-name">
					<a href="/" style="color: #c0c4cc">
						<h5>
							<i class="el-icon-s-home" style="margin-right: 12px"></i>
							{{config('app.name')}}
						</h5>
					</a>
				</div>
				<div class="user-name">
					<el-dropdown>
							<span class="el-dropdown-link">
								欢迎,
								<?php $user = \Auth::user(); if (!empty($user))
								{
									echo $user->real_name;
								} ?>
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<a href="/admin/profile">
									<i class="el-icon-user"></i>
									个人资料
								</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/admin/changepassword">
									<i class="el-icon-unlock"></i>
									修改密码
								</a>
							</el-dropdown-item>
							<el-dropdown-item onclick="javascript:window.sessionStorage.clear();">
								<a href="/admin/clear-cache">
									<i class="el-icon-delete"></i>
									清除缓存
								</a>
							</el-dropdown-item>
							<el-dropdown-item onclick="javascript:window.sessionStorage.clear();">
								<a href="/logout">
									<i class="el-icon-refresh-left"></i>
									退出登录
								</a>
							</el-dropdown-item>

						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<message-notify></message-notify>

			</el-header>
			<el-main id="container" style="padding:0">
				<bread-crumb></bread-crumb>
				<div id="body_content">@yield('content')</div>
			</el-main>
		</el-container>
	</div>
</div><!-- app -->

<script src='/js/app.20210310.js'></script>
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
	.el-form-item__content button:not(.button-new-tag,.origin) {
		float: right;
	}
	.el-select-dropdown__wrap{
		margin-bottom:0px !important;
	}
	.el-button + .el-button {
		margin-left: 0 ;
	}
	.el-dropdown {
		color: #ffd04b;
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

	.app-name {
		padding: 10px;
	}
	.user-name {
		padding: 20px;
	}
	#container{
		background-color:#f0f3f4;
	}
	#body_content{
		margin: 54px 30px;
		position: relative;
	}
	.my_breadcrumb{
		display: flex;
		position:fixed;
		top:60px;
		width: 100%;
		height: 34px;
		z-index: 9;
		background-color: white;
		box-shadow: 0 1px 4px rgba(0,21,41,.08);
	}

	.el-breadcrumb{
		line-height: 34px;
	}
	input[type="hidden"] {
		display: none !important;
	}
	input[type="file"] {
		display: none !important;
	}
</style>

