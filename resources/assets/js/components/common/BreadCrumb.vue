<template>
	<div class="my_breadcrumb" v-show="breads">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home" style="margin: 0px 18px 0 10px"></i>
				首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(name,index) in breads" :key="index">{{name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
		export default {
			name: "BreadCrumb",
			data () {
				return {
					menus:[],
					breads:[],
					menu_index:window.location.pathname
				}
			},
			created() {
				let menus = JSON.parse(window.sessionStorage.getItem("menus"));
				if (!menus){
					axios.post('/admin/getMenu')
						.then(response => {
							menus = response.data.data
							window.sessionStorage.setItem("menus",JSON.stringify( menus))
							this.menus =  menus;
							this.breads = this.getBread()
							return
						})
				}
				this.menus =  menus;
				this.breads = this.getBread()
			},
			methods: {
				getBread(){
					let bread = []
					if(!this.menus) return
					this.menus.forEach((item,index)=>{
						if (item.uri && item.uri == this.menu_index){
							bread.push(item.name)
						}else{
							item.submenus.forEach((item2,index2)=>{
								//第二层
								if (item2.uri && item2.uri == this.menu_index){
									bread.push(item2.name)
									bread.push(item.name)
								}else{
									//第三层
									item2.submenus.forEach((item3,index3)=>{
										if (item3.uri && item3.uri == this.menu_index){
											bread.push(item3.name)
											bread.push(item2.name)
											bread.push(item.name)
										}
									})
								}
							})
						}
					})
					return bread.reverse();
				},
			},
		}
</script>

<style scoped lang="scss">

</style>