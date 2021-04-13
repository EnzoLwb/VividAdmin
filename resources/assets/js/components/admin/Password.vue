<template>
	<div style="margin-top: 60px">
		<el-row>
			<el-col :span="10">
				<el-form ref="form" :model="form" label-width="100px" enctype="multipart/form-data">
					<el-form-item label="Old password">
						<el-input  type="password" v-model="form.prepassword" ></el-input>
					</el-form-item>
					<el-form-item label="New password">
						<el-input v-model="form.password" ></el-input>
					</el-form-item>
					<el-form-item >
						<el-input type="hidden" name="_token" v-model="token"></el-input>
					</el-form-item>
					<div v-if="show!=1">
						<el-form-item>
							<el-button type="primary" @click="submitForm()">Submit</el-button>
						</el-form-item>
					</div>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
		export default {
				data: function() {
						return {
								token: document.head.querySelector('meta[name="csrf-token"]').content,
								form: {
										password: '',
										prepassword: '',
								},
						}
				},
				methods: {
						submitForm() {
								axios.post('/admin/changepassword',this.form)
										.then(res => {
												if (res.data.code !== 0 || res.status !== 200) {
														this.$notify({
																title: 'Failed',
																message: res.data.message,
																type: 'error'
														});
												} else {
														this.$notify({
																title: 'Success',
																message: res.data.message,
																type: 'success'
														});
														setTimeout(function () {
																window.location.href = '/';
														}, 1000)

												}
										})
						},

				},

		}
</script>
