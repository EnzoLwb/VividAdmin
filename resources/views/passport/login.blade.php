<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="utf-8" />
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link href="{{cdn('images/favicon.ico')}}" rel="shortcut icon">
	<title>{{config('app.name')}}</title>
	<meta name="description" content="login" />
	<meta name="imagecache_path" content="{{env('IMAGE_CACHE_PATH')}}" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<link rel="stylesheet" href='/css/app.css' />
	<style type="text/css">
		[v-cloak] {
			display: none !important;
		}
		input[type="file"] {
			display: none !important;
		}
	</style>
</head>

<body class="no-skin" >
<div id="app" v-cloak>
	<login title="{{config('app.name')}}"  :tips='{!! json_encode($tips) !!}'></login>
</div><!-- app -->

<script>
	var BASE_URL = '{{env('APP_URL')}}'
</script>
<script src='/js/app.20210410.js'></script>
</body>
</html>
