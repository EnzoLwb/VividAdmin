<template>
  <div v-loading="loading">
    <div style="margin:30px 0;">
      <el-button  icon="el-icon-document-add" type="primary" @click="showForm('add')">新增角色</el-button>
    </div>
    <el-table :data="tabledata.data" border style="width: 80%;margin-top:20px" >
<!--    <el-table-column resizable prop="id" label="ID" width="70" > </el-table-column>-->
    <el-table-column resizable prop="name" label="名称" > </el-table-column>
    <el-table-column resizable prop="created_at" label="创建时间" ></el-table-column>
    <el-table-column resizable align="center">
      <template slot-scope="scope">
        <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="showForm('edit',scope.row)">编辑</el-button>
        <el-button
                size="small"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>

    </el-table>
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
          window.location.href = '/admin/role/list';
        }, 1500)
      },
      showForm(action,param={}){
        this.articles = {}
        this.policy_uri = ['']
        if (action != 'add'){
          //编辑
          this.dialog_title = '编辑'
          this.articles = param
          this.policy_uri = JSON.parse(param.policy_uri)
        }else{
          this.dialog_title = '新增'
        }
        this.outerVisible = true
      },
      handleEdit(uid) {
        window.location.href = '/admin/role/edit?id='+uid
      },
      handleDelete(index,row) {
        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          axios.post('/admin/role/delete',{id:row.id})
                  .then(res => {
                    if (res.data.code != 0 || res.status != 200) {
                      this.$notify({
                        title: '失败',
                        message: res.data.message,
                        type: 'error'
                      });
                    } else {
                      this.$notify({
                        title: '成功',
                        message: '已删除',
                        type: 'success'
                      });
                      this.tabledata.data.splice(index,1);
                    }
                    this.loading = false
                  })
                  .catch(err => {
                    console.log(err);
                  });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    props: ['tabledata'] //其中需要包含分页的字段，列表字段在data属性中
}
</script>

