<template>
  <div class="biaoq">
    <div class="top">
      <div class="add">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="dialogFormVisible = true" >添加标签</el-button>
      </div>
    </div>
    <div class="show">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="日期"
          width="230">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标签名称"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>标签名称: {{ scope.row.name }}</p>
              <p>标签编号: {{ scope.row.number }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

<!--   这个是添加位置     "node-sass": "^4.13.1",
    "sass-loader": "^8.0.2",-->
    <el-dialog title="添加分类标签" :visible.sync="dialogFormVisible">
      <el-form :model="form">
          <el-form-item label="标签编号"  :label-width="formLabelWidth">
            <el-input v-model="form.number" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="标签名称"  :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
<!--   修改标签 -->
    <el-dialog title="修改分类标签" :visible.sync="ChangedialogFormVisible">
      <el-form :model="changeform">
        <el-form-item label="标签编号"  :label-width="formLabelWidth">
          <el-input v-model="changeform.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签名称"  :label-width="formLabelWidth">
          <el-input v-model="changeform.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ChangedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="change()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import qs from 'qs'
  import { getornonumber, postJson } from '../../../util/httpAxios'
  export default {
    data() {
      return {
        tableData: [
        ],
        dialogFormVisible: false,
        ChangedialogFormVisible: false,
        form: {
          number: '',
          name: '',
          createPer: ''
        },
        changeform: {
          id: '',
          number: '',
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      // console.log('123')
      this.jiazai()
    },
    methods: {
      add() {
        var info = JSON.parse(localStorage.getItem('info'))
        this.form.createPer = info.id
        postJson('/api/biaoqian/add', qs.parse(this.form)).then(res => {
          this.$message({
            showClose: true,
            message: '添加成功！！',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.jiazai()
        })
      },
      change: function () {
        postJson('/api/biaoqian/UpdateOrid', qs.parse(this.changeform)).then(res => {
          this.$message({
            showClose: true,
            message: '修改成功！！',
            type: 'success'
          })
          this.ChangedialogFormVisible = false
          this.jiazai()
        })
      },
      handleEdit(index, row) {
        // 编辑
        this.ChangedialogFormVisible = true
        // console.log(row)
        this.changeform.name = row.name
        this.changeform.number = row.number
        this.changeform.id = row.id
        // console.log(this.changeform)
      },
      handleDelete(index, row) {
        // eslint-disable-next-line no-unused-vars
        const url = `/api/biaoqian/delete/${row}`
        this.$confirm('此操作将永久删除分类标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getornonumber(url).then(res => {
            this.$message({
              showClose: true,
              message: '删除成功！！',
              type: 'success'
            })
            this.jiazai()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      jiazai: function () {
        getornonumber('/api/biaoqian/select').then(res => {
          this.tableData = res
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].createTime = new Date(this.tableData[i].createTime)
            this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/style/gol";
  .biaoq{
    width: 100%;
    height: 100%;
    position: relative;
    .top{
      width: 100%;
      height: 50px;
      background-color: #F4F1F4;
      @include UandDCenter;
      .add{
        flex: 1;
        text-align: right;
        margin-right: 10px;
        /*.el-button--primary{*/
        /*  color: #fff;*/
        /*  background-color: #FF69B4;*/
        /*  border-color: #FF69B4;*/
        /*}*/
        /*.el-button--primary:hover{*/
        /*  background-color: #FF69B4;*/
        /*  border-color: #FF69B4;*/
        /*}*/
        /*.el-button--primary:focus{*/
        /*  background-color: #FF69B4;*/
        /*  border-color: #FF69B4;*/
        /*}*/
      }
    }
    .show{
    }
  }

</style>
