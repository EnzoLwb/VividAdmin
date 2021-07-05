<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="utf-8" />
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link href="{{mobile_asset('images/lefit.ico')}}" rel="shortcut icon">
	<title>@yield('title',config('app.name'))</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<link rel="stylesheet" href='/css/mobile.css?date=20210702' />
</head>

<body class="no-skin">
<div id="app" v-cloak>
	<div class="container">
		@yield('content')
	</div>
</div>

<script src='/js/mobile.js?date=20210702'></script>
<script>
	var BASE_URL = '{{env('APP_URL')}}'
</script>

</body>
</html>

