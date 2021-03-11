@extends('layouts.main')
@section('title', '编辑角色')
@section('content')

<div class="row">
	<div class="col-xs-12">
		<form class="form-horizontal" role="form">
			<div class="form-group">
				<label class="col-sm-3 control-label no-padding-right" for="form-field-1">角色名称 </label>
				<div class="col-sm-9">
					<input type="text" id="role_name" placeholder="" class="col-xs-10 col-sm-5" value="{{$role->name}}">
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-3 control-label no-padding-right" for="form-field-1">权限</label>

				<div class="col-sm-9 res_group" >

		            @foreach($roles as $key => $crole)
					<div class="control-group">
						<div class="checkbox">
							<label>
								<input name="form-field-checkbox" type="checkbox" class="ace" res_group_key="{{ $key }}">
								<span class="lbl bolder" style="font-size:120%;"> {{ $crole['text'] }}</span>
							</label>
						</div>
					</div>
					<div class="control-group" style="padding-bottom: 10px;">
						@foreach($crole["res_keys"] as $res)

						<div class="checkbox">
							<label>
								<input name="form-field-checkbox" type="checkbox" class="ace" @if($role->hasResource($res)) checked @endif res_key="{{$key}}" value="{{$res}}">
								<span class="lbl"> {{ $resources[$res]["text"] }}</span>
							</label>
						</div>

						@endforeach

					</div>
					@endforeach

				</div>

			</div>


			<div class="clearfix form-actions">
				<div class="col-md-offset-3 col-md-9">
					<button id="addcontent" class="btn btn-info" type="button">
						<i class="ace-icon fa fa-check bigger-110"></i>
						提交
					</button>
				</div>
			</div>

		</form>
	</div><!-- /.span -->
</div>
@stop

@section('js')
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script type="text/javascript">
	$("input[res_group_key]").click(function(){
		var groupKey = $(this).attr('res_group_key');
		var issel = $(this).is(':checked');
		$("input[res_key="+groupKey+"]").prop("checked",issel);
	});

	$("#addcontent").click(function(){

		//获取keys列表
		var chk_value =[];
		$('input[res_key]:checked').each(function(){
			chk_value.push($(this).val());
		});

		//获取角色名称
		var rolename = $("#role_name").val();
		if (!rolename) {
			alert("请填写角色名");
			return;
		}

		var postdata = {};
		postdata['role_name'] = rolename;
		postdata['resources'] = chk_value;
		postdata['id'] = {{$role->id}};
		postdata['_token'] = '{{csrf_token()}}';

	    //登录操作
        $.post('/admin/role/edit', postdata,
        function(data){
            if (data.code !=0) {
            	alert(data.message);
            }else{
            	alert("操作成功");
				location.reload(true);
            }

        });

	});

</script>

@stop
