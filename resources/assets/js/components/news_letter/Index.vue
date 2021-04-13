<template>
  <div>
    <el-card shadow="hover" >
      <el-form :inline="true"  class="search-form-inline" size="mini">
        <el-form-item >
          <el-input type="text" placeholder="Template Name" v-model="search_form.name"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input type="text" placeholder="Subject" v-model="search_form.subject"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="search">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="margin_top" >
      <div slot="header" >
        <el-button  type="primary" size="medium" @click="handleOperation('add')">Add a Template</el-button>
        <el-button type="text" class="word-count">WordCount: <b>{{this.wordCount}}</b></el-button>
      </div>
      <el-table :data="tabledata.data" v-loading="loading" size="medium" @sort-change="sortChange">
        <el-table-column resizable prop="emailId" label="ID" width="70" sortable="custom"> </el-table-column>
        <el-table-column resizable prop="funcCode" label="funcCode"> </el-table-column>
        <el-table-column resizable prop="emailName" label="Template Name" sortable="custom"> </el-table-column>
        <el-table-column resizable prop="emailSubject" label="Subject" sortable="custom"> </el-table-column>
        <el-table-column resizable prop="emailFrom" label="From Address"> </el-table-column>
        <el-table-column resizable align="center" label="Operation">
          <template slot-scope="scope">
            <el-button style="color: rgb(0, 0, 255)" type="text" v-show="group != 3" @click="handleOperation('edit',scope.row.id)">Edit | </el-button>
            <el-button type="text" v-show="group != 3" @click="handleDelete(scope.$index,scope.row)">Delete | </el-button>
            <el-button type="text" v-show="group != 2" @click="handleOperation('translate',scope.row.id)"> Translate</el-button>
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
  const current_url = '/admin/news_letter/'
  export default {
      data:function() {
          return {
              loading: false,
              search_form:{
                name:'',
                subject:'',
                sort_prop:'',
                sort_order:'',
                page:0,
                per_page:this.unils.per_page,
              },
              tabledata:{},
          }
      },
      mounted() {
        this.getData({})
      },
      methods: {
        sortChange(column) {
          this.search_form.sort_prop = column.prop
          this.search_form.sort_order = column.order === 'descending'? 'desc':'asc';
          this.getData(this.search_form)
        },
        handleSizeChange(val) {
          this.search_form.per_page = val
          this.handleCurrentChange();
        },
        handleCurrentChange() {
          this.search_form.page = this.tabledata.current_page
          this.getData(this.search_form);
        },
        getData(data)
        {
          this.loading = true
          axios.post(current_url,data)
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
        reset() {
          window.location.href = current_url
        },
        search() {
          this.getData(this.search_form);
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
            axios.delete(current_url + '?emailId=' + row.id)
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
      props: ['wordCount','group']
  }
</script>

