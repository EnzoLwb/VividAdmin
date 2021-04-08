<template>
	<div class="mobile-header" style="width: 100%;">
	<el-header style=" padding: 0 10px;height:auto">
		<div class="app-name" id="top_header">
			<el-menu :default-active="activeIndex" class="el-menu-demo"
							 mode="horizontal" @select="handleSelect">
				<el-menu-item :index="menu.uri" v-for="(menu,index) in menus" :key="index">{{menu.name}}</el-menu-item>
			</el-menu>
		</div>
		<div class="user-name">
			Site:
			<el-select v-model="site" placeholder="请选择" size="mini" style="width: 100px" @change="changeSite">
				<el-option label="Service" value="Service"></el-option>
				<el-option label="Media" value="Media"></el-option>
			</el-select>
			<el-dropdown>
		<span class="el-dropdown-link">
			<i class="el-icon-user" style="font-size: 18px;margin: 0 10px"></i>
			<b>{{user.real_name}}</b>
			<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<a href="/admin/changepassword">
							<i class="el-icon-unlock"></i>
							修改密码
						</a>
					</el-dropdown-item>
					<el-dropdown-item>
						<a href="#" @click.stop="clearCache('/admin/clear-cache')">
							<i class="el-icon-delete"></i>
							清除缓存
						</a>
					</el-dropdown-item>
					<el-dropdown-item>
						<a href="#" @click.stop="clearCache('/logout')">
							<i class="el-icon-refresh-left"></i>
							退出登录
						</a>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-header>
	</div>
</template>
<script>
		export default {
				data: function() {
						return {
							activeIndex:"",
							menus:[]
						}
				},
				created() {
						//获取菜单 进行展示
					var storage_key = 'header_menu'
					let menus = JSON.parse(window.sessionStorage.getItem(storage_key)) ;
					if (!menus){
						axios.post('/admin/'+storage_key)
								.then(response => {
									menus = response.data.data
									window.sessionStorage.setItem(storage_key,JSON.stringify( menus))
									this.menus =  menus;
									this.currentUrl()
								})
					}else{
						this.menus =  menus;
						this.currentUrl()
					}

				},
				methods:{
					clearCache(url){
						window.sessionStorage.clear()
						window.location.href = url
					},
					changeSite(){
						axios.post('/admin/home/site',{site:this.site})
								.then(res => {
									if (res.data.code != 0 || res.status != 200) {
										this.$notify({
											message: res.data.message,
											type: 'error'
										});
									}else{
										window.location.href = window.location.href
									}
								})

					},
					handleSelect(key, keyPath) {
						window.location.href = key //'/admin/page_list'
					},
					//拆分当前url 分析activeIndex
					currentUrl(){
						var url = window.location.pathname; //["","admin","page_list"]
						this.menus.forEach(item =>{
							if (item.uri.split('/')[2]===url.split('/')[2]){
								this.activeIndex = item.uri
							}
						})
					}
				},
			props:['user','site'],
		}
</script>
<style lang="scss">
#top_header {
	.el-menu-item{
		padding: 0 10px;
		/*font-size:12px;*/
	}
	.el-menu--horizontal > .el-menu-item.is-active{
		font-weight:600;
		/*font-size:14px;*/
	}
}

</style>