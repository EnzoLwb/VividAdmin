<template>
	<el-header style=" padding: 0 10px">
		<div class="app-name" id="top_header" style="width:70%">
			<el-menu :default-active="activeIndex" class="el-menu-demo"
							 mode="horizontal" @select="handleSelect">
				<el-menu-item index="1">Page List</el-menu-item>
				<el-menu-item index="2">SEO List</el-menu-item>
				<el-menu-item index="3">Page Content</el-menu-item>
				<el-menu-item index="3">Constant List</el-menu-item>
				<el-menu-item index="3">NewsLetter</el-menu-item>
				<el-menu-item index="3">Image List</el-menu-item>
				<el-menu-item index="3">Video List</el-menu-item>
				<el-menu-item index="3">DB Terms</el-menu-item>
				<el-menu-item index="3">User Roles</el-menu-item>
			</el-menu>
		</div>
		<div class="user-name" style="width:30%">
			Site:
			<el-select v-model="site" placeholder="请选择" size="mini" style="width: 100px">
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
					<el-dropdown-item @click="window.sessionStorage.clear()">
						<a href="/admin/clear-cache">
							<i class="el-icon-delete"></i>
							清除缓存
						</a>
					</el-dropdown-item>
					<el-dropdown-item @click="window.sessionStorage.clear()">
						<a href="/logout">
							<i class="el-icon-refresh-left"></i>
							退出登录
						</a>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-header>
</template>
<script>
		export default {
				data: function() {
						return {
							activeIndex: '1',
							site: 'Service',
						}
				},

				created() {

				},
				methods:{
					handleSelect(key, keyPath) {
						console.log(key, keyPath);
					}
				},
			props:['user'],
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