<template>
  <div>
    <el-card shadow="hover" >
      <el-form :inline="true"  class="search-form-inline" size="mini">
        <el-form-item >
          <el-input type="text" placeholder="Title" v-model="search_form.title"></el-input>
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
        <el-form-item>
          <el-button type="info" @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="margin_top" >
      <div slot="header" >
        <el-button  type="primary" size="medium" @click="handleOperation('add')">Add a Video</el-button>
        <el-button type="text" class="word-count">WordCount: <b>{{this.wordCount}}</b></el-button>
      </div>
      <el-table :data="tabledata.data" v-loading="loading" size="medium" @sort-change="sortChange">
        <el-table-column resizable prop="meta_id" label="ID" width="70" >
          <template slot-scope="scope">
            {{scope.row.video_id}}
            <i class="el-icon-copy-document" v-show="group != 3"
               title="Copy This Information" @click="copyShow(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column resizable prop="title" label="Title" sortable="custom"> </el-table-column>
        <el-table-column resizable prop="descriptions" label="Descriptions" width="250"> </el-table-column>
        <el-table-column resizable label="Display" sortable="custom" prop="display" width="150">
          <template slot-scope="scope">
            <el-switch
                    v-model="scope.row.display === 1"
                    @change="changeDisplay(scope.$index,scope.row)"
                    active-text="Yes"
                    inactive-text="No">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column resizable prop="module" label="Module"> </el-table-column>
        <el-table-column resizable prop="name" label="Page Name" sortable="custom"> </el-table-column>
        <el-table-column resizable label="URL" prop="url" sortable="custom">
          <template slot-scope="scope">
            <a :href="scope.row.url | ContainsHttp">{{scope.row.url | ContainsHttp}}</a>
          </template>
        </el-table-column>
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
    <el-dialog :visible.sync="copyDialog" v-if="copyDialog" width="40%" :close-on-click-modal="false">
      <template slot="title"><span style="font-size: 16px" v-html="copyTitle"></span></template>
      <copy-object :origin-id="copyData.video_id" meta-key="title" :meta-val="copyData.title"
                   model="VideoList" @CopySubmit="CopySubmit"></copy-object>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  const current_url = '/admin/video_list'
  import CopyObject from '../common/CopyObject'
  export default {
    components:{CopyObject},
      data:function() {
          return {
              loading: false,
              copyData: {},
              copyDialog: false,
              copyTitle: "",
              search_form:{
                title:'',
                module_id:'',
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
        //一键复制
        copyShow(data){
          this.copyData = data
          this.copyDialog = true
          this.copyTitle = "Copy <i style='color: green'>" + data.title +"</i>"
        },
        CopySubmit(obj){
          this.copyDialog = false
          window.location.href = window.location.href
        },
        //update display
        changeDisplay(index,row){
          this.loading = true
          axios.post('/admin/common/common_publish',{object:'VideoList',id:row.id,display:row.display})
                  .then(res => {
                    if (res.data.code !== 0 || res.status !== 200) {
                      this.$notify({
                        title: 'Error',
                        message: res.data.message,
                        type: 'error'
                      });
                    } else {
                      this.$notify({
                        title: 'success',
                        message: res.data.message,
                        type: 'success'
                      });
                      row.display = res.data.data.result;
                    }
                    this.loading = false
                  })
        },
        sortChange(column) {
          console.log(column.prop,column.order)
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
          axios.post(current_url + (this.module ? '/' : '') + this.module,data)
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
          var url = current_url + '/' +operation
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
      props: ['module','moduleSelect','wordCount','group']
  }
</script>

