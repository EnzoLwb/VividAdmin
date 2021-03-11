<template>
  <div v-loading="loading">
    <el-table :data="tabledata.data" border style="width: 100%;margin-top:30px" >
          <el-table-column resizable prop="title" label="标题" > </el-table-column>
          <el-table-column prop="cover" label="封面(可点击放大)"  align="center" width="200">
            <template slot-scope="scope">
              <el-image
                      style="width: 120px;"
                      :src="scope.row.cover"
                      :preview-src-list="[scope.row.cover]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="是否发布" v-if="leader">
            <template slot-scope="scope">
            <div style="text-align:center">
                <el-button size="mini" :type="scope.row.status=='1'? 'primary' : 'warning' "
                           @click="handlePublish(scope.row)" >{{ scope.row.status=='1'? '取消发布': '发布上线' }}</el-button>
            </div>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="顺序位" width="220" v-if="leader">
            <template slot-scope="scope" >
            <div style="text-align:center">
                <p>当前顺序位:{{scope.row.weight}}</p>
                <el-button size="mini" type="success" style="margin-left: 20px"
                           @click="handleTop(scope.row,1)" >置顶</el-button>
                <el-button v-if="scope.row.weight > 1000 " size="mini" type="warning" style="margin-left: 20px"
                           @click="handleTop(scope.row,2)" >取消置顶</el-button>
            </div>
            </template>
          </el-table-column>
        <el-table-column resizable label="标签">
            <template slot-scope="scope">
                <el-tag v-for="(tag,index) in scope.row.tag.split('|')" :key="index" type="warning" v-if="tag"
                >{{ tag }}</el-tag>
            </template>
        </el-table-column>
          <el-table-column resizable label="发布时间" prop="created_at"></el-table-column>
          <el-table-column resizable align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                      v-model="search"
                      placeholder="输入标题搜索"
                      @keyup.enter.native="searchVolunteer"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      type="text" v-if="scope.row.status"
                      icon="el-icon-s-grid"
                      @click="qrCode(scope.row)" >二维码</el-button>
              <el-button
                      size="mini"
                      type="text" v-if="leader"
                      icon="el-icon-edit"
                      @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                      size="small"
                      type="text" v-if="leader"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    <basic-paginator :tabledata="tabledata"></basic-paginator>
      <!--二维码-->
      <el-dialog title="资讯二维码" :visible.sync="dialogVisible" width="20%" :close-on-click-modal="false">
          <el-image :src="qrcode_src"></el-image>
          <span slot="footer" class="dialog-footer"><el-button type="primary" @click="dialogVisible = false">确 定</el-button></span>
      </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
    data:function() {
            return {
                loading: false,
                dialogVisible: false,
                qrcode_src: "",
            }
        },
    mounted:function(){

    },
    methods: {
      searchVolunteer() {
          if (this.search=='') window.location.href = '/admin/news/'
          window.location.href = '/admin/news?search='+this.search;
      },
        qrCode(row){
            this.loading = true
            axios.post('/admin/federation/declaration_honor/encrypt_qr/'+row.id)
                .then(res => {
                    if (res.data.code != 0 || res.status != 200) {
                        this.$notify({
                            title: '失败',
                            message: res.data.message,
                            type: 'error'
                        });
                    } else {
                        this.qrcode_src = res.data.data.src
                        console.log(res.data.data.src)
                        this.dialogVisible = true;
                    }
                    this.loading = false
                })
        },
      handleDelete(index,row) {
        this.$confirm('此操作将删除该资讯, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.loading = true
            axios.post('/admin/news/delete',{id:row.id})
                  .then(res => {
                    if (res.data.code !== 0 || res.status !== 200) {
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
      handleTop(row,type) {
      //1 为 置顶 2为取消置顶
        axios.post('/admin/common/common_stick',{object:'VolunteerNews',id:row.id,type:type})
                .then(res => {
                  if (res.data.code !== 0 || res.status !== 200) {
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
                    row.weight = res.data.data.weight;
                  }
                })
                .catch(err => {
                  console.log(err);
                });
      },
      handlePublish(row) {//发布 or 下线
        axios.post('/admin/common/common_publish',{object:'VolunteerNews',id:row.id,status:row.status})
                .then(res => {
                  if (res.data.code !== 0 || res.status !== 200) {
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
                    row.status = !row.status;
                  }
                })
                .catch(err => {
                  console.log(err);
                });

      },
      handleEdit(row) {
          window.location.href = "/admin/news/edit/"+row.id
      },
      handleShow(row) {
          window.location.href = "/admin/news/show/"+row.id
      }
  },
    props: ['search','tabledata','leader'] //其中需要包含分页的字段，列表字段在data属性中
}
</script>
