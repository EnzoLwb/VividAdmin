<template>
	<div id="indexlayout-left" :class="isCollapse ? 'narrow':''">
		<div style="padding: 13px;background-color:#222834;font-size: 24px;">
			<i class="el-icon-s-fold icon-color"  v-if="isCollapse==false" @click="change_collapse"></i>
			<i class="el-icon-s-unfold icon-color" v-else  @click="change_collapse"></i>
		</div>
		<el-menu :default-active="menu_index"
						class="el-menu-vertical-demo"
						:unique-opened="true"
						:collapse="isCollapse"
						background-color="#222834"
						text-color="#fff"
						active-text-color="#ffd04b">
			<!--下拉菜单情况-->
			<el-submenu :index="menu.name" v-if="menu.submenus.length > 0" v-for="(menu,key) in menus" :key="key">
				<template slot="title">
					<i :class="menu.icon"></i>
					<span slot="title">{{menu.name}}</span>
				</template>
				<el-menu-item-group  v-if="submenus.submenus.length === 0" v-for="(submenus,sub_key) in menu.submenus" :key="sub_key">
					<a :href="submenus.uri">
						<el-menu-item class="select_index" :index="submenus.uri"><i :class="submenus.icon =='' ? 'el-icon-sort-up':submenus.icon"></i>{{submenus.name}}</el-menu-item>
					</a>
				</el-menu-item-group>
				<el-submenu :index="submenus.name"  v-else v-for="(submenus,sub_key) in menu.submenus" :key="sub_key">
					<template slot="title">
						<i :class="submenus.icon =='' ? 'el-icon-sort-up':submenus.icon">	</i>
						<span slot="title">{{submenus.name}}</span>
					</template>
					<!--三级菜单-->
					<el-menu-item class="select_index" @click="href(submenu.uri)" :index="submenu.uri" v-for="(submenu,sub_child_key) in submenus.submenus" :key="sub_child_key">
						{{submenu.name}}
					</el-menu-item>
				</el-submenu>
			</el-submenu>
			<!--无下拉菜单情况-->
			<el-menu-item :index="menu.uri" v-else @click="href(menu.uri)">
				<i :class="menu.icon"></i>
				<span slot="title">{{menu.name}}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
		import './css/admin.scss'
		export default
		{
				data: function() {
						return {
								isCollapse : JSON.parse( window.localStorage.getItem("isCollapse") ),
								loading:true,
								menus:[],
								menu_index:window.location.pathname
						}
				},
				created() {
						// 获取 菜单
						let menus = JSON.parse(window.sessionStorage.getItem("menus"))  ;
						if (!menus){
								axios.post('/admin/getMenu')
										.then(response => {
												menus = response.data.data
												window.sessionStorage.setItem("menus",JSON.stringify( menus))
												this.menus =  menus;
										})
										.catch( function(){
												console.log('error')
										});
						}
						this.menus =  menus;

				},
				methods:{
						href(uri) {
								window.location.href = uri
						},
						change_collapse() {
								this.isCollapse = !this.isCollapse
								window.localStorage.setItem('isCollapse',this.isCollapse)
						},
						handleClose(key, keyPath) {
								console.log(key, keyPath);
						}
				},
		}
</script>
<style>
	#indexlayout-left{
		display: flex;
		background-color:#222834;
		flex-direction: column;
		width: 200px;
		height: 100vh;
		transition-duration: .1s;
	}
	#indexlayout-left.narrow {
		width: 64px;
	}
	.icon-color{
		color: #dddddd;
	}
	.select_index:not(.is-active){
		color:hsla(0,0%,100%,.65) !important;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		min-width: 200px;
	}
	.el-menu-vertical-demo a{
		text-decoration: none;
	}
</style>