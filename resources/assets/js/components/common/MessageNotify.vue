<template>
	<div class="user-name " v-show="basic_level" >
		<el-dropdown trigger="click" :hide-on-click="false">
						 <span class="el-dropdown-link">
   							<el-badge :is-dot="dot">
								<i class="el-icon-bell" style="font-size: 1.3em;color: $bg-color"></i>
							</el-badge>
						</span>
			<div>
				<el-dropdown-menu style="height:300px;overflow: auto;min-width:30em" slot="dropdown" v-loading="loading" class="message-notify">
					<div v-if="notifyList.length>0">
						<el-dropdown-item class="header_item">
							<span @click="readAtMessage()"><b>全部已读</b> <i  class="el-icon-finished"></i></span>
							<span @click="deleteAllMessage()" style="float: right;color: #FF9797"><b>全部删除</b> <i  class="el-icon-delete"></i></span>
						</el-dropdown-item>
						<el-dropdown-item v-for="(item,key) in notifyList" :key="key" :divided="key===0"><!--第一个有分界线-->
							<div  @mouseenter="onMouseOver(key)" @mouseleave="onMouseOut(key)">
								<div class="mark_icon" v-show="item.show">
									<i class="el-icon-view" title="查看" @click="hrefOn(item.type,item.time)"></i>
									<i class="el-icon-brush" title="删除" style="margin-left: 1em;" @click="deleteMessage(item.time,key)"></i>
								</div>
								<div :class="item.show ? 'content':''">
									<h5>
										<el-badge :is-dot="!item.read_at">{{item.title}}</el-badge>
										<p style="float: right">{{item.time | TimeSubstr}}</p>
									</h5>
									<p style="font-size:.9em" v-html="item.desc"></p>
								</div>
							</div>
						</el-dropdown-item>
					</div>
					<div v-else class="no-notify"><!--无消息的显示-->
						<p>暂无消息通知! <i class="el-icon-s-release"></i></p>
					</div>

				</el-dropdown-menu>
			</div>
		</el-dropdown>
	</div>
</template>

<script>
		export default {
				name: "MessageNotify",
				data () {
						return {
								notifyList: [],
								corpId: '',
								basic_level: true,//是否显示通知列表
								dot: false,//小红点
								loading: false,
						}
				},
				methods: {
						onMouseOver(key){
								this.notifyList[key].show = true
						},
						onMouseOut(key){
								this.notifyList[key].show = false
						},
						hrefOn(type,time){
								console.log('hrefOn')
								let url = '';
								switch (type) {
										case	'ldjs' :
												url = '/admin/contest/encouragement';
												break;
										case	'lsyj' :
												url = '/admin/contest/lsyj';
												break;
								}
								this.readAtMessage(time,url);

						},
						//删除单条消息
						deleteMessage(time,index){
								this.loading = true
								axios.post('/admin/notify_message/delete_message',{'time':time})
										.then(res => {
												if (res.data.code != 0 || res.status !== 200) {
														this.$notify({
																title: '请求失败',
																message: res.data.message,
																type: 'error'
														});
												} else {
														this.$notify({
																title: '成功',
																message: res.data.message,
																type: 'success'
														});
														this.notifyList.splice(index,1)
												}
												this.loading = false
										})
								this.checkUnReadMessage()
						},
						//已读全部/单条消息
						readAtMessage(simple_time = null,url = ''){
								if (!this.dot && !simple_time) {
										this.$notify({
												title: '失败',
												message: '全部已读~',
												type: 'warning'
										});
										return
								}
								//如果读过就不请求了
								this.loading = true
								console.log(simple_time,url)
								axios.post('/admin/notify_message/read_all',{'time':simple_time})
										.then(res => {
												if (res.data.code != 0 || res.status !== 200) {
														this.$notify({
																title: '请求失败',
																message: res.data.message,
																type: 'error'
														});
												} else {
														if (!simple_time){//不是 这是已读全部消息的情况下
																this.$notify({
																		title: '成功',
																		message: res.data.message,
																		type: 'success'
																});
																this.dot = false
																this.notifyList.forEach((item,index)=>{
																		item.read_at = res.data.data.time
																})
														}else{
																window.location.href = BASE_URL + url;
														}
												}
												this.loading = false
										})

						},
						//删除全部消息
						deleteAllMessage(){
								console.log('deleteAllMessage')
								this.loading = true
								axios.post('/admin/notify_message/delete_all_message')
										.then(res => {
												if (res.data.code != 0 || res.status !== 200) {
														this.$notify({
																title: '请求失败',
																message: res.data.message,
																type: 'error'
														});
												} else {
														this.$notify({
																title: '成功',
																message: res.data.message,
																type: 'success'
														});
														this.notifyList = [];
												}
												this.loading = false
										})
								this.dot = false
						},
						//检查是否有未读的消息
						checkUnReadMessage()
						{
								this.notifyList.forEach((item,index)=>{
										if (item.read_at===null){
												this.dot = true
												return;
										}
								})
						}
				},
				mounted() {
						//获取身份
						let that = this
								axios.post('/admin/user_group',{type:'notify_auth'})
										.then(response => {
												this.corpId = response.data.data.admin_group.company_id
												this.notifyList = response.data.data.message
												this.checkUnReadMessage()
												//创建 Echo 监听 暂时只考虑 基层工会的人才会收到通知
												/*if(this.corpId){
														console.log('listen')
														this.basic_level = true
														Echo.private(`verify_notify.${this.corpId}`)
																.listen('RssCreatedEvent', (e) => {
																		that.notifyList.unshift(e)
																		that.dot = true
																		that.$notify.info({
																				title: '审核结果',
																				dangerouslyUseHTMLString: true,
																				message: e.desc,
																				position: 'bottom-right',
																				duration: 0
																		});
																});
												}else{
													console.log('test_notify')
													Echo.private(`test_notify`)
															.listen('TestNotify', (e) => {
																that.dot = true
																that.$notify.info({
																	title: '测试推送',
																	dangerouslyUseHTMLString: true,
																	message: "",
																	position: 'bottom-right',
																	duration: 0
																});
															});
												}*/

										})
										.catch( function(){
												console.log('error')
										});

				},
		}
</script>

<style scoped lang="scss">

	.message-notify {
		.no-notify{
			padding: 5.5em 6em;font-size:1.5em
		}
		.el-dropdown-menu__item{
			padding:3px 20px;

				.mark_icon{
					position: absolute;
					font-size:1.8em;
					z-index: 999;
						i{
							margin:.8em 2.8em
						}
				}

				.content{
					opacity: .3;
				}
		}
		.el-dropdown-menu__item,.header_item:not(.is-disabled):hover {
			background-color:transparent !important;
		}
	}

</style>