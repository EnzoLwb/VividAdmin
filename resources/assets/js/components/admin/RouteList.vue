<template>
    <div v-loading="loading">
        <el-dialog
                :title="parent_name"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible" v-if="dialogVisible"
                width="40%">
            <el-form :model="menu" ref="form" :rules="rules" size="small">
                <el-form-item label="Title" prop="name">
                    <el-input type="text" v-model="menu.name" placeholder="menu title"></el-input>
                </el-form-item>
                <el-form-item label="Url" prop="url">
                    <el-input type="text" v-model="menu.url" placeholder="menu url"></el-input>
                </el-form-item>
                <el-form-item label="Icon">
                    <el-input type="text" v-model="menu.icon" placeholder="el-icon-something"></el-input>
                </el-form-item>
                <el-input type="hidden" v-model="menu.id" ></el-input>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="() => append(menu)" :loading="button_loading">Submit</el-button>
        </span>
        </el-dialog>
        <el-card shadow="hover">
            <div slot="header" >
                Route Menu List
                <el-button class="pull-right" type="primary" size="small" @click="appendRootMenu()">Add a Root Menu</el-button>
            </div>
            <el-tree
                    class="filter-tree"
                    :data="tree"
                    :props="defaultProps"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    :default-expand-all="true"
                    node-key="url"
                    @node-click="NodeClick"
                    style="font-size:16px"
                    ref="tree">
								<span class="custom-tree-node" slot-scope="{ node, data }">
										<span>
                        <i :class="data.icon" style="margin-right: 10px"></i>{{ data.name }}
                        <a href="">( {{data.url}} )</a>
										</span>
                    <span>
                      <el-button
                              type="text" v-show="data.pid === 0"
                              icon="el-icon-plus" circle alt="Add Submenu"
                              @click="showAppend(data)">
                      </el-button>
                      <el-button
                              type="text"
                              icon="el-icon-edit" circle alt="Edit Menu"
                              @click="showEdit(data)">
                      </el-button>
                      <el-button
                              type="text"
                              icon="el-icon-delete" circle alt="Delete"
                              @click="remove(node, data)">
                      </el-button>
                    </span>
								</span>
            </el-tree>
        </el-card>
    </div>
</template>

<script>
    export default {
        methods:{
            appendRootMenu(){
                this.dialogVisible = true
                this.menu = this.origin_menu;
                this.is_edit = false;
                this.parent_name = 'Add Root Menu Path';
            },
            //点击左侧树
            NodeClick(data) {},
            showAppend(data) {
                console.log(data)
                this.dialogVisible = true
                this.menu = this.origin_menu;
                this.menu.pid = data.id
                this.parent_name = 'Add submenu to '+data.name;
            },
            showEdit(data) {
                console.log(data)
                this.dialogVisible = true
                this.menu = data;
                this.is_edit = true;
                this.parent_name = 'Edit '+data.name;
                console.log(this.menu)
            },
            append(data) {
                //请求接口
                axios.post('/admin/settings/routes',this.menu)
                    .then(res => {
                        if (res.data.code != 0 || res.status != 200) {
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
                            this.button_loading = true
                            if (this.is_edit){
                                //修改
                                data.name = this.menu.name
                            }else{
                                //新增
                                window.location.href = window.location.href
                            }
                            this.button_loading = false
                            this.menu = this.origin_menu
                            this.dialogVisible = false
                        }
                    })

            },
            remove(node, data) {
                this.$confirm('Delete this path?', 'Notice', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    axios.delete('/admin/settings/routes?id='+data.id)
                        .then(res => {
                            if (res.data.code != 0 || res.status != 200) {
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
                                const parent = node.parent;
                                const children = parent.data.submenus || parent.data;
                                const index = children.findIndex(d => d.id === data.id);
                                children.splice(index, 1);
                            }
                        })
                })
            },
        },
        mounted(){
            this.loading = true
            axios.post('/admin/role/get_menu')
                .then(res => {
                    if (res.data.code !== 0 || res.status !== 200) {
                        this.$notify({
                            title: 'Failed',
                            message: res.data.message,
                            type: 'error'
                        });
                    } else {
                        this.tree = res.data.data;
                        this.loading = false
                    }
                })
        },
        data() {
            return {
                dialogVisible:false,
                loading:false,
                visible: false,
                defaultProps: {
                    children: 'submenus',
                    label: 'name'
                },
                is_edit:false,
                button_loading:false,//上传数据时的button加载中
                parent_name:null,
                menu: {
                    pid:0,
                    name:"",
                    url:"",
                    icon:"",
                    id:0,
                },
                origin_menu: {
                    pid:0,
                    name:"",
                    url:"",
                    icon:"",
                    id:0,
                },
                rules: {
                    name: [{required: true, message: 'Required', trigger: 'blur'}],
                    url: [{required: true, message: 'Required', trigger: 'blur'}],
                },
                tree:[],
            };
        },
        props: []
    }
</script>
