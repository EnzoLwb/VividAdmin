<template>
  <div v-loading="loading">
    <el-card shadow="hover" >
        <div slot="header">
            <el-button icon="el-icon-document-add" size="mini" type="primary" @click="showForm('add')">Add a role</el-button>
        </div>
        <el-table :data="tabledata.data" size="medium">
            <el-table-column resizable prop="id" label="ID" width="70" > </el-table-column>
            <el-table-column resizable prop="name" label="Title" > </el-table-column>
            <el-table-column resizable prop="resources" label="Site" sortable> </el-table-column>
            <el-table-column resizable prop="created_at" label="Created_time" sortable></el-table-column>
            <el-table-column resizable align="center" label="Operation">
                <template slot-scope="scope">
                    <el-button
                            type="text" icon="el-icon-edit" @click="showForm('edit',scope.row)">Edit</el-button>
                    <el-button
                            type="text" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog :visible.sync="outerVisible"
               :close-on-click-modal="false"
               width="60%" :title="dialog_title" v-if="outerVisible">
      <!--表格详情-->
      <el-row>
        <el-col :span="20">
          <role-form :articles="articles"  :policy_uri="policy_uri" @closeDialog="closeDialog"></role-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
    data:function() {
        return {
            loading: false,
            outerVisible: false,
            dialog_title: '',
            articles: {},
            policy_uri: [],

        }
    },
    mounted:function(){

    },
    methods: {
      closeDialog(val){
        this.outerVisible = val
        setTimeout(function () {
          window.location.href = '/admin/settings/role';
        }, 1500)
      },
      showForm(action,param={}){
        this.articles = {}
        this.policy_uri = ['']
        if (action != 'add'){
          //编辑
          this.dialog_title = 'Edit'
          this.articles = param
          this.policy_uri = JSON.parse(param.policy_uri)
        }else{
          this.dialog_title = 'Add'
        }
        this.outerVisible = true
      },
      handleDelete(index,row) {
        this.$confirm('Delete it?', 'Notice', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.loading = true
          axios.post('/admin/role/delete',{id:row.id})
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
                        message: 'Deleted',
                        type: 'success'
                      });
                      this.tabledata.data.splice(index,1);
                    }
                    this.loading = false
                  })
        })
      },
    },
    props: ['tabledata'] //其中需要包含分页的字段，列表字段在data属性中
}
</script>

