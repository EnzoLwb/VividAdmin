
		export default {
				upload_excel_path : '/api/saveExcel',
				upload_img_path : '/api/saveImg',
				upload_video_path : '/api/saveVideo',
				upload_no_return_path : '/api/noReturn',
				page_size : [10, 20, 60,1000],//分页
				per_page : 10,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				setQueryConfig(queryConfig) {
					console.log('setQueryConfig')
						var _str = "";
						for(var o in queryConfig){
								if(queryConfig[o] != '' && queryConfig[o] != null){
										_str += o + "=" + queryConfig[o] + "&";
								}
						}
						return _str.substring(0, _str.length-1);
				},
				beforeUploadAttendFile(file) {
					const isLt2M = file.size / 1024 / 1024 < 20;
					if (!isLt2M) {
						this.$message.error('上传文件大小不能超过 20MB!');
					}
					return isLt2M;
				},
				beforeUploadImg(file) {
						let typeList = ['image/jpeg' , 'image/bmp' , 'image/gif' , 'image/png' , 'image/x-png' , 'image/pjpeg']
						let isJPG = false;
						typeList.forEach(item=>{
								if (item === file.type) {
										isJPG = true
								};
						})
						const isLt2M = file.size / 1024 / 1024 < 10;

						if (!isJPG) {
								this.$message.error('非规范内图片格式');
						}
						if (!isLt2M) {
								this.$message.error('上传头像图片大小不能超过 10MB!');
						}
						return isJPG && isLt2M;
				},
				beforeUploadVideo(file) {
					console.log('beforeUploadVideo')
					let typeList = ['video/mp4',]
					let isJPG = false;
					typeList.forEach(item=>{
						if (item === file.type) {
							isJPG = true
						};
					})
					const isLt2M = file.size / 1024 / 1024 < 500;

					if (!isJPG) {
						this.$message.error('非规范内视频格式');
					}
					if (!isLt2M) {
						this.$message.error('上传视频大小不能超过 500MB!');
					}
					return isJPG && isLt2M;
				},
				//判断浏览器内核
				browserAgent () {
					console.log('browserAgent')
					var u = navigator.userAgent, app = navigator.appVersion;
						return {//移动终端浏览器版本信息
							trident: u.indexOf('Trident') > -1, //IE内核
							edge: u.indexOf('Edg') > -1, //Edge内核
							presto: u.indexOf('Presto') > -1, //opera内核
							webKit: u.indexOf('AppleWebKit') > -1, //苹果内核
							chrome: u.indexOf("chrome") > -1, //谷歌内核
							gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
							mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
							ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
							android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
							iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
							iPad: u.indexOf('iPad') > -1, //是否iPad
							webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
							wx: u.indexOf("MicroMessenger") > 0 //是否是微信
						}
				},
		}
