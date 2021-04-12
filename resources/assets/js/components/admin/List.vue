<template>
  <div>
    <el-card shadow="hover" >
      <el-form :inline="true"  class="search-form-inline" size="mini">
        <el-form-item label="权限组:" >
          <el-select  placeholder="请选择" v-model="search_form.role_id" clearable>
            <el-option
                    v-for="item in roles"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务:">
          <el-select v-model="search_form.group" size="mini">
            <el-option label="管理人员" :value="1" ></el-option>
            <el-option label="私教" :value="2" ></el-option>
            <el-option label="销售人员" :value="3" ></el-option>
            <el-option label="其他" :value="4" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" >
          <el-radio-group  v-model="search_form.status">
            <el-radio-button  label=1 >启用</el-radio-button>
            <el-radio-button  label=0 >禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input type="text" v-model="search_form.real_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="margin_top" >
      <div slot="header" >
        <el-button  icon="el-icon-user" type="primary" size="mini" @click="showForm('add')">新增用户</el-button>
      </div>
      <el-table :data="tabledata.data" v-loading="loading" size="medium">
        <el-table-column resizable prop="id" label="序号" width="70" > </el-table-column>
        <el-table-column resizable prop="username"  label="登录名" > </el-table-column>
        <el-table-column resizable prop="real_name" label="用户名" > </el-table-column>
        <el-table-column resizable prop="name" label="权限组" > </el-table-column>
        <el-table-column resizable label="职务" >
          <template  slot-scope="scope">
            <span v-if="scope.row.group == 1">管理人员</span>
            <span v-else-if="scope.row.group == 2">私教</span>
            <span v-else-if="scope.row.group == 3">销售人员</span>
            <span v-else-if="scope.row.group == 4">其他</span>
          </template>
        </el-table-column>
        <el-table-column resizable prop="login_at" label="登录时间" > </el-table-column>
        <el-table-column resizable label="状态" >
          <template  slot-scope="scope">
            {{scope.row.status == 1 ? '启用':'禁用'}}
          </template>
        </el-table-column>
        <el-table-column resizable align="center" label="操作">
          <template slot-scope="scope">
            <el-button

                    type="text"
                    icon="el-icon-edit"
                    @click="showForm('edit',scope.row)">编辑</el-button>
            <el-button

                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index,scope.row)">{{scope.row.status==1?'禁用':'取消禁用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
              class="fenye"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="tabledata.current_page"
              :total="tabledata.total"
              :page-sizes="this.unils.page_size"
              :page-size="parseInt(tabledata.per_page)"
              layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>

    </el-card>
    <el-dialog :visible.sync="outerVisible"
               :close-on-click-modal="false"
               width="50%" :title="dialog_title" v-if="outerVisible">
      <!--表格详情-->
      <el-row style="margin-top: 15px">
        <el-col :span="20">
          <admin-form :articles="articles" :is_add="is_add" :roles="roles"  @closeDialog="closeDialog"></admin-form>
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
            is_add: false,
            outerVisible: false,
            dialog_title: '',
            articles: {},
            search_form:{
              role_id:'',
              real_name:'',
              group:'',
              status:1,
            },
            tabledata:{},
        }
    },
    mounted() {
      this.getData({})
    },
    methods: {
      handleSizeChange(val)
      {
        this.per_page = val
        this.handleCurrentChange(this.tabledata.current_page);
      },
      handleCurrentChange(val)
      {
        var data = {};
        Object.assign(data,this.search_form)
        data.page = val
        data.per_page = this.per_page
        this.getData(data);
      },
      getData(data)
      {
        this.loading = true
        axios.post('/admin/user/list',data)
                .then(res => {
                  if (res.data.code != 0 || res.status != 200) {
                    this.$notify({
                      title: '请求失败',
                      message: res.data.message,
                      type: 'error'
                    });
                  } else {
                    this.tabledata = res.data.data
                  }
                  this.loading = false
                })
      },
      closeDialog(val){
        this.outerVisible = val
        setTimeout(function () {
          window.location.href = '/admin/user/list';
        }, 1500)
      },
      showForm(action,param={}){
        this.outerVisible = true
        if (action != 'add'){
          //编辑
          this.dialog_title = '编辑用户 —— '+param.real_name
          this.articles = param
          this.is_add = false
        }else{
          this.articles = {}
          this.is_add = true
          this.dialog_title = '新增用户'
        }
      },
      reset()
      {
        this.search_form = {
          role_id:'',
          real_name:'',
          status:1,
        }
        this.getData({})
      },
      search()
      {
        var data = {};
        Object.assign(data,this.search_form)
        this.getData(data);
      },
      handleEdit(uid) {
        window.location.href = '/admin/user/edit?id='+uid
      },
      handleDelete(index,row) {
        var updateStatus = row.status == 1 ? 0 : 1;
        var tip = updateStatus == 1 ? '此操作将取消禁用该用户':'此操作将禁用该用户';
        console.log(updateStatus)
        this.$confirm(tip+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          axios.post('/admin/user/delete',{id:row.id,updateStatus:updateStatus})
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
                        message: res.data.message,
                        type: 'success'
                      });
                      this.tabledata.data[index].status = updateStatus
                    }
                    this.loading = false
                  })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    props: ['roles']
}
</script>

