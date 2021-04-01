<template>
  <div>
    <el-card shadow="hover" >
      <el-form :inline="true"  class="search-form-inline" size="mini">
        <el-form-item >
          <el-input type="text" placeholder="Page Name" v-model="search_form.page_name"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input type="text" placeholder="Page Url" v-model="search_form.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select  v-model="search_form.module_id" clearable style="width: 150px;">
            <el-option
                    v-for="item in moduleSelect"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="search">Search</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="margin_top" >
      <div slot="header" >
        <el-button   type="primary" size="medium" @click="handleOperation('add')">Add Page</el-button>
      </div>
      <el-table :data="tabledata.data" v-loading="loading" size="medium">
        <el-table-column resizable prop="name" label="Page Name" > </el-table-column>
        <el-table-column resizable label="URL" >
          <template slot-scope="scope">
            <a :href="scope.row.url | ContainsHttp">{{scope.row.url | ContainsHttp}}</a>
          </template>
        </el-table-column>
        <el-table-column resizable label="Page ScreenShot" width="300">
          <template slot-scope="scope">
            <el-image class="table-image"
                    v-for="(item,index) in scope.row.screenshots.split(',')"
                    :key="index" :src="item"
                    :preview-src-list="scope.row.screenshots.split(',')">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column resizable prop="module" label="Module" > </el-table-column>
        <el-table-column resizable prop="note" label="Note" > </el-table-column>
        <el-table-column resizable align="center" label="Operation">
          <template slot-scope="scope">
            <el-button style="color: rgb(0, 0, 255)" type="text" @click="handleOperation('edit',scope.row.id)">Edit</el-button>
            |
            <el-button type="text" @click="handleDelete(scope.$index,scope.row)">Delete</el-button>
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
  </div>
</template>

<script type="text/javascript">
  const current_url = '/admin/page_list/'
  export default {
      data:function() {
          return {
              loading: false,
              search_form:{
                page_name:'',
                url:'',
                module_id:'',
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
          axios.post(current_url + this.module,data)
            .then(res => {
              if (res.data.code != 0 || res.status != 200) {
                this.$notify({
                  title: 'Request Failed',
                  message: res.data.message,
                  type: 'error'
                });
              } else {
                this.tabledata = res.data.data
              }
              this.loading = false
            })
        },
        search()
        {
          var data = {};
          Object.assign(data,this.search_form)
          this.getData(data);
        },
        handleOperation(operation,id=null) {
          var url = current_url + operation
          window.location.href = id ? url+'?id='+id : url
        },
        handleDelete(index,row) {
          this.$confirm(' Do you want to delete it?', 'Confirm', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.loading = true
            axios.delete(current_url + '?id=' + row.id)
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
                }
                this.tabledata.data.splice(index,1)
                this.loading = false
              })
          });
        },
      },
      props: ['module','moduleSelect']
  }
</script>

