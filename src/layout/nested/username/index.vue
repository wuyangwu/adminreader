<template>
    <div class="user">
      <div class="top" style="position: relative">
        <el-input v-model="search" style="width: 160px;margin-left: 10px" placeholder="请输入姓名"></el-input>
        <el-tooltip class="item" style="margin-right: 50px" effect="dark" content="搜索" placement="top-start">
          <el-button icon="el-icon-search" style="margin-left: 4px" circle @click="searchs()" ></el-button>
        </el-tooltip>
        <div style="justify-content: flex-end;flex: 1;display: flex;">
          <el-tooltip class="item" style="margin-right: 50px" effect="dark" content="刷新" placement="top-start">
            <el-button  icon="el-icon-refresh-left" @click="jiazaiPage()" circle></el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="show clearfix">
        <el-table ref="singleTable" :data="tableData"  style="width: 100%">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column property="createTime" label="注册日期" width="190">
          </el-table-column>
          <el-table-column property="username" label="姓名" width="120">
          </el-table-column>
          <el-table-column  label="权限">
            <template slot-scope="scope">
              <div style="display: flex;flex-direction: column">
                <div v-for="item in scope.row.list" :key="item.name" style="margin-top: 10px">
                  <el-tag   type="success">{{item.namezh}}</el-tag>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改用户权限</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--      分页显示地方  -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="10"
            :hide-on-single-page="false"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>

      <el-dialog title="修改用户权限" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="权限名称" :label-width="formLabelWidth">
            <el-radio v-model="form.radio" label="1">超级管理员</el-radio>
            <el-radio v-model="form.radio" label="3">用户</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="ChangeUserDE()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { getornonumber, postJson } from '../../../util/httpAxios'
  import qs from 'qs'
  // import qs from 'qs'

  export default {
    name: 'index',
    data() {
      return {
        total: 0, // 多少条数据
        tableData: [],
        search: '',
        dialogFormVisible: false,
        form: {
          uid: 0,
          radio: '1'
        },
        submitForm: {
          uid: 0,
          rid: 0
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
      this.jiazaiPage()
    },
    methods: {
      ChangeUserDE() {
        this.dialogFormVisible = false
        this.submitForm.uid = this.form.uid
        // eslint-disable-next-line no-new-wrappers
        this.submitForm.rid = parseInt(this.form.radio)
        postJson('/api/houtai/userdetails/update', qs.parse(this.submitForm)).then(res => {
          this.jiazaiPage()
          this.$message({
            showClose: true,
            message: '修改成功！！',
            type: 'success'
          })
        })
      },
      searchs() {
        if (this.search === '') {
          this.$message({
            showClose: true,
            message: '搜索内容不能为空',
            type: 'warning'
          })
        } else {
          const url = `/api/houtai/userdetails/selects/${this.search}`
          getornonumber(url).then(res => {
            this.tableData = res
            console.log(this.tableData)
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].createTime = new Date(this.tableData[i].createTime)
              this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
            }
          })
        }
      },
      jiazaiPage() {
        // 初始化页面加载
        const url = '/api/houtai/userdetails/select/1'
        getornonumber(url).then(res => {
          this.total = res.total
          this.tableData = res.list
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].createTime = new Date(this.tableData[i].createTime)
            this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
          }
        })
      },
      handleCurrentChange(val) {
        /// 下一页
        const url = `/api/houtai/userdetails/select/${val}`
        getornonumber(url).then(res => {
          this.total = res.total
          this.tableData = res.list
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].createTime = new Date(this.tableData[i].createTime)
            this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      test(index, row) {
        console.log(row)
      },
      handleEdit(index, row) {
      this.dialogFormVisible = true
        this.form.uid = row.uid // 通过uid来修改rid
        this.form.radio = row.list[0].rid.toString()
      },
      handleDelete(index, row) {
        const url = `/api/houtai/userdetails/delete/${row.uid}`
        this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
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
            this.jiazaiPage()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "../../../assets/style/gol";
  .user{
    width: 100%;
    height: 100%;
    .top{
      width: 100%;
      height: 50px;
      background-color: #F4F1F4;
      @include UandDCenter;
    }
    .block{
      width:100%;
      display: flex;
      justify-content: flex-end;
      .blockShow{
        @include center;
      }
    }
    .show{
      width: 100%;
      position: relative;
    }
  }

</style>
