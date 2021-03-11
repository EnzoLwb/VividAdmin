<template>
  <div class="pull-right">
    <el-pagination
            style="margin:15px 0;float:right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="tabledata.current_page"
            :page-sizes="[5, 10, 20]"
            :page-size="parseInt(tabledata.per_page)"
            background
            layout="total,sizes,prev, pager, next"
            :total="tabledata.total">
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
  export default {
      data() {
        return {

        }
      },
      methods: {
          handleSizeChange(val)
          {
            this.tabledata.per_page = val
            this.href()
          },
          handleCurrentChange(val)
          {
            this.href()
          },
          href(){//跳转 先解析现在的url中的参数 然后 拼接到url中(加上page page_size)
            window.location.href = this.jumptoSearchUrl(this.getQueryByUrl(),this.tabledata.path)
          },
        //将url中的参数 进行拆解变成对象数组
          getQueryByUrl(){
            var url = window.location.href ;             //获取当前url
            var cs={};
            if (url.indexOf('?')>-1){
              var param = url.split('?')[1];                //获取?之后的参数字符串
              var cs_arr = param.split('&');                    //参数字符串分割为数组 ["causer_id=%E6%9D%8E%E6%96%87", "page=1", "page_size=5"]
              for(var i=0;i<cs_arr.length;i++){         //遍历数组，拿到json对象
                cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
              }
            }
            cs.page = this.tabledata.current_page
            cs.page_size = parseInt(this.tabledata.per_page)
            return cs;
          },
        //将参数组装到新的url中 包括新的页码
          jumptoSearchUrl(data, url){
            var param = '';
            for(var key in data){
              if(data[key]){
                param += '&'+key+'='+data[key];
              }
            }
            if (param != '') url +='?';
            return url + param.substr(1);
          },
      },
      props: ['tabledata'] //其中需要包含分页的字段，列表字段在data属性中
  }
</script>
