<template>
    <div v-loading="loading">
        <el-form :model="obj" ref="form"  size="small">
            <el-form-item label="Web Page Url"  v-loading="pagesLoading" prop="page_id"
                          :rules="[{required: true, message: 'Required', trigger: 'blur'}]">
                <el-select  v-model="obj.page_id"  style="min-width: 250px;">
                    <el-option
                            v-for="item in pages"
                            :key="item.page_id"
                            :label="item.name + '   ('+ item.url +')'"
                            :value="item.page_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-input type="hidden" v-model="obj.origin_id" ></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm()" size="small">Paste</el-button>
        </span>
    </div>
</template>

<script>
    export default {
        data:function() {
            return {
                loading: false,
                pagesLoading: false,
                obj:{
                    origin_id :'',
                    page_id :'',
                },
                title: '',
                pages: [],
            }
        },
        mounted() {
            //加载该site下 除了 该obj现有的page_id
            this.pagesLoading = true
            this.obj.origin_id = this.originId
            axios.post('/admin/pages_by_copy',{
                model:this.model,meta_name_key:this.metaKey,meta_name_val:this.metaVal})
                .then(res => {
                    if (res.data.code != 0 || res.status != 200) {
                        this.$notify({
                            title: 'Request Failed',
                            message: res.data.message,
                            type: 'error'
                        });
                    } else {
                        this.pages = res.data.data
                    }
                    this.pagesLoading = false
                })
        },
        methods:{
            submitForm(){
                console.log(this.obj)
                this.loading = true
                this.obj.model = this.model
                axios.post('/admin/pages_by_paste',this.obj)
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
                            this.$notify({
                                title: 'Request Failed',
                                message: res.data.message,
                                type: 'error'
                            });
                        } else {
                            this.$notify({
                                title: 'Success',
                                message: res.data.message,
                                type: 'success'
                            });
                            this.$emit('CopySubmit',res.data.data);
                        }
                        this.loading = false
                    })

            },
        },
        props:['originId','model','metaKey','metaVal']
    }
</script>

<style scoped>

</style>