<template>
  <div>
    <el-card shadow="hover" >
      <el-form :inline="true"  class="search-form-inline" size="mini">
        <el-form-item >
          <el-input type="text" placeholder="Word" v-model="search_form.word"></el-input>
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
        <el-button type="primary" size="medium" @click="handleOperation('add')">New Word</el-button>
        <el-button type="text" class="word-count">WordCount: <b>{{this.tabledata.total ? this.tabledata.total : 0}}</b></el-button>
      </div>
      <el-table :data="tabledata.data" border v-loading="loading" size="medium" @sort-change="sortChange">
        <el-table-column resizable prop="word" label="Word" sortable="custom"> </el-table-column>
        <!--translate start-->
        <el-table-column align="center">
          <template slot="header" slot-scope="scope"><!--选择语言后查询所有翻译记录-->
            <el-select  v-model="locale"  size="mini" @change="getAllTranslateRecord()">
              <el-option v-for="(item,index) in languageSelect" :key="index" :label="index" :value="item"></el-option>
            </el-select>
          </template>
          <template slot-scope="scope"><!--失去焦点直接update翻译结果-->
              <el-input v-model="scope.row.translate" size="small" @blur="translateWord(scope.row.word_id,scope.row.translate)"></el-input>
          </template>
        </el-table-column>
        <!--translate end-->
        <el-table-column resizable label="Module">
          <template slot-scope="scope">
            <p v-for="(item,index) in scope.row.page_detail" :key="index">{{item.module}}</p>
          </template>
        </el-table-column>
        <el-table-column resizable label="Page Name" >
          <template slot-scope="scope">
            <p v-for="(item,index) in scope.row.page_detail" :key="index">{{item.name}}</p>
          </template>
        </el-table-column>
        <el-table-column resizable label="URL" >
          <template slot-scope="scope">
            <p v-for="(item,index) in scope.row.page_detail" :key="index">
              <a :href="item.url | ContainsHttp">{{item.url | ContainsHttp}}</a>
            </p>
          </template>
        </el-table-column>
        <el-table-column resizable align="center" label="Operation">
          <template slot-scope="scope">
            <el-button style="color: rgb(0, 0, 255)" type="text" v-show="group != 3" @click="handleOperation('edit',scope.row.word_id)">Edit | </el-button>
            <el-button type="text" v-show="group != 3" @click="handleDelete(scope.$index,scope.row)">Delete</el-button>
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
  const current_url = '/admin/db_terms'
  export default {
      data:function() {
          return {
              loading: false,
              locale: "CN",//当前表格翻译语种 默认为中文
              search_form:{
                word:'',
                locale:"CN",
                word_ids:[],
                sort_prop:'',
                sort_order:'',
                page:0,
                per_page:this.unils.per_page,
              },
              tabledata:{},
          }
      },
      mounted() {
        this.getData(this.search_form)
      },
      methods: {
        translateWord(word_id,translate){
          axios.post('/admin/db_terms/translate',{word_id:word_id,locale:this.locale,translate:translate})
            .then(res => {
              if (res.data.code != 0 || res.status != 200) {
                this.$notify({
                  message: res.data.message,
                  type: 'error'
                });
              } else {
                this.$notify({
                  message: res.data.message,
                  type: 'success'
                });
              }
              this.loading = false
            })
        },
        //根据语言查询是否已有翻译记录
        getAllTranslateRecord(){
          this.loading = true
          let word_ids = []
          this.tabledata.data.forEach(item => {
            word_ids.push(item.word_id)
          })
          this.search_form.word_ids = word_ids
          this.search_form.locale = this.locale
          this.getData(this.search_form)
        },
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
        getData(data) {
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
          var url = current_url +'/' + operation
          window.location.href = id ? url+'?id='+id : url
        },
        handleDelete(index,row) {
          this.$confirm(' Do you want to delete it?', 'Confirm', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.loading = true
            axios.delete(current_url + '?id=' + row.word_id)
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
      props: ['module','languageSelect','group']
  }
</script>

