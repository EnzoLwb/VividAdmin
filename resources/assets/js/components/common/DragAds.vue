<template>
	<div v-loading="loading" id="ads">
		<div class="button-box">
			<el-carousel trigger="click"  direction="vertical"  :interval="4000">
				<el-carousel-item  v-for="(item,key) in ads" :key="key" >
					<el-image
							:src="item.cover" @click="href(item)"
							fit="fill"></el-image>
					<h3 :title="item.desc">{{item.desc}}</h3>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
		export default {
			name: "DragAds",
			data () {
					return {
						ads: [],
						isOpen: false,
						isMove: false,
						loading: false,
					}
			},
			mounted() {
				this.loading = true
				axios.post('/api/common/ads')
						.then(response => {
							this.loading = false
							this.ads = response.data.data
						})
						.catch( function(){
							console.log('error')
						});
			},
			methods: {
				href(item){
					if (item.href=='') return
					var newStr=item.href.indexOf("http");
					if(newStr==-1){
						item.href = "http://" + item.href
					}
					window.open(item.href,'_blank')
				},
			},
		}
</script>

<style scoped lang="scss">
	#ads{
		margin-bottom:10px;
		::v-deep .el-carousel__container {
			height: 265px;
		}
	}
	.button-box {
		width: 100%;
		cursor: pointer;
		opacity: 0.9;
	}
	.el-carousel__item{
		border-radius: 6px;
	}
	.el-carousel__item h3 {
		color: white;
		width:100%;
		font-size: 14px;
		position: absolute;
		bottom: 0;
		margin:0;
		padding: 10px 10px;
		background-image:linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1));
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
	}

</style>