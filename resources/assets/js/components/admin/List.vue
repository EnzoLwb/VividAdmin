<template>
  <div>
    <el-card shadow="hover" >
      <el-form :inline="true"  class="search-form-inline" size="mini">
        <el-form-item label="Site Auth:" >
          <el-select  placeholder="Select" v-model="search_form.site" clearable style="width: 150px;">
            <el-option label="service" value="service"></el-option>
            <el-option label="media" value="media"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Post:">
          <el-select v-model="search_form.group" size="mini" style="width: 150px;">
            <el-option label="Admin" :value="1" ></el-option>
            <el-option label="Marketing Manager" :value="2" ></el-option>
            <el-option label="Translator" :value="3" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="State:" >
          <el-radio-group  v-model="search_form.status">
            <el-radio-button  label=1 >Enable</el-radio-button>
            <el-radio-button  label=0 >Disable</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="NickName:">
          <el-input type="text" v-model="search_form.real_name"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="warning" @click="search">Search</el-button>
        </el-form-item>
        <el-form-item >
          <el-button type="info" @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="margin_top" >
      <div slot="header" >
        <el-button  icon="el-icon-user" type="primary" size="mini" @click="showForm('add')">Add User</el-button>
      </div>
      <el-table :data="tabledata.data" v-loading="loading" size="medium">
        <el-table-column resizable prop="id" label="ID" width="70" sortable> </el-table-column>
        <el-table-column resizable prop="username"  label="UserName" sortable> </el-table-column>
        <el-table-column resizable prop="real_name" label="NickName" sortable> </el-table-column>
        <el-table-column resizable label="Role">
          <template  slot-scope="scope">
            <p v-if="scope.row.site_auth.indexOf('service') !== -1">Service:{{scope.row.service_role}}</p>
            <p v-if="scope.row.site_auth.indexOf('media') !== -1">Media:{{scope.row.media_role}}</p>
          </template>
        </el-table-column>
        <el-table-column resizable prop="site" label="Site Auth" sortable> </el-table-column>
        <el-table-column resizable label="Post" >
          <template  slot-scope="scope">
            <span v-if="scope.row.group == 1">Admin</span>
            <span v-else-if="scope.row.group == 2">Marketing Manager</span>
            <span v-else-if="scope.row.group == 3">Translator</span>
          </template>
        </el-table-column>
        <el-table-column resizable prop="login_at" label="Login Time" sortable> </el-table-column>
        <el-table-column resizable label="State" >
          <template  slot-scope="scope">
            {{scope.row.status == 1 ? 'Enable':'Disable'}}
          </template>
        </el-table-column>
        <el-table-column resizable align="center" label="Operation">
          <template slot-scope="scope">
            <el-button
                    type="text"
                    @click="showForm('edit',scope.row)">Edit</el-button>
            <el-button
                    type="text"
                    @click="handleDelete(scope.$index,scope.row)">{{scope.row.status==1?'Disable':'Enable'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pull-right">
        <el-pagination
                style="margin:15px 0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="tabledata.current_page"
                :total="tabledata.total"
                :page-sizes="this.unils.page_size"
                :page-size="parseInt(tabledata.per_page)"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog :visible.sync="outerVisible"
               :close-on-click-modal="false" :title="dialog_title" v-if="outerVisible">
      <!--表格详情-->
      <el-row style="margin-top: 15px">
        <el-col :span="20">
          <admin-form :articles="articles" :is_add="is_add"  :media_roles="media_roles"
                      :roles="roles"  @closeDialog="closeDialog"></admin-form>
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
              site:'',
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
          window.location.href = '/admin/settings/user';
        }, 1500)
      },
      showForm(action,param={}){
        this.outerVisible = true
        if (action != 'add'){
          //编辑
          this.dialog_title = 'Edit User —— '+param.real_name
          this.articles = param
          this.is_add = false
        }else{
          this.articles = {}
          this.is_add = true
          this.dialog_title = 'Add User'
        }
      },
      reset()
      {
        this.search_form = {
          site:'',
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
      handleDelete(index,row) {
        var updateStatus = row.status == 1 ? 0 : 1;
        var tip = updateStatus == 1 ? 'Enable the user':'Disable the user';
        this.$confirm(tip+', Do you want to continue?', 'Confirm', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.loading = true
          axios.post('/admin/user/delete',{id:row.id,updateStatus:updateStatus})
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
                      this.tabledata.data[index].status = updateStatus
                    }
                    this.loading = false
                  })
        });
      },
    },
    props: ['roles','media_roles']
}
</script>

