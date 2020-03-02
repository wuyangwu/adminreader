<template>
  <div class="biaoq">
    <div class="top">
      <el-input v-model="search" style="width: 160px;margin-left: 10px" placeholder="请输入书名"></el-input>
      <el-button icon="el-icon-search" style="margin-left: 4px" circle @click="searchs()" ></el-button>
      <el-button type="primary" icon="el-icon-plus"  size="small" @click="addbook()" style="margin-left: 10px" plain>添加书籍</el-button>
      <div style="justify-content: flex-end;flex: 1;display: flex;">
        <el-tooltip class="item" style="margin-right: 50px" effect="dark" content="刷新" placement="top-start">
          <el-button  icon="el-icon-refresh-left" @click="jiazaiPage()" circle></el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="show clearfix">
<!--      <el-button @click="resetDateFilter">清除日期过滤器</el-button>-->
<!--      <el-button @click="clearFilter">清除所有过滤器</el-button>-->
      <el-table ref="filterTable" :data="tableData" border style="width: 100%" >
        <el-table-column label="上传日期" prop="createTime" fixed sortable width="120" column-key="date">
        </el-table-column>
        <el-table-column label="书籍图片" prop="pricate"  width="150">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pricate"
              @click="tupian(scope.row.pricate)"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="书籍名称"  prop="name"  width="120">
        </el-table-column>
        <el-table-column prop="type" label="书籍类型" width="100" :filters="filterList" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag type="primary" disable-transitions>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="书籍作者" prop="author" width="120">
        </el-table-column>
        <el-table-column label="书籍介绍" prop="introduction" width="400">
        </el-table-column>
        <el-table-column label="书籍存储位置" prop="bookUrl" width="220">
        </el-table-column>
        <el-table-column label="书籍评分" prop="score" width="120">
        </el-table-column>
        <el-table-column label="书籍赞" prop="thumbsup" width="120">
        </el-table-column>
        <el-table-column label="书籍排名" prop="top" width="120">
        </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)">Delete</el-button>
              </template>
            </el-table-column>
      </el-table>
<!--      分页显示地方  -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="5"
          :hide-on-single-page="false"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
<!--    添加书籍页面-->
    <el-drawer :title="biaojitext" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书籍名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="书籍分类" prop="region">
          <el-select v-model="ruleForm.biaoqianId" placeholder="请选分类">
            <el-option v-for="item in biaoList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="biaoji === 0" label="创建时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="书籍作者" >
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="书籍图片">
          <el-upload :action="urlImage"  with-credentials name="file" :limit="Filenumber" :before-upload="beforeUploadImage" :file-list="fileListImage" list-type="picture-card" :auto-upload="true" :on-success="handleSuccess" >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传ipg,png格式书籍文件</div>
            <div slot="file" slot-scope="{file}" style="width: 100%;height: 100%;">
              <el-image
                style="width: 100%; height: 100%"
                :src="file.url"
                fit="fill"></el-image>
<!--              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="缩略图">-->
              <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
<!--        <el-form-item label="书籍图片" prop="delivery">-->
<!--          <el-switch v-model="ruleForm.delivery"></el-switch>-->
<!--        </el-form-item>-->
        <el-form-item label="上传书籍" >
          <el-upload class="upload-demo" :action="urlFile" name="file" :before-upload="beforeUploadFile" :limit="Filenumber" :on-success="handleChange" :auto-upload="true" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传epub格式书籍文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="书籍介绍" prop="desc">
          <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="biaoji === 0" type="primary" @click="submitForm()">立即创建</el-button>
          <el-button v-if="biaoji === 1" type="primary" @click="submitForm()">立即修改</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="srcList" />
<!--    // 表单上的图片显示放大-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" >
    </el-dialog>
  </div>
</template>

<script>
  import { getornonumber, postJson } from '../../../util/httpAxios'
  import qs from 'qs'
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  export default {
    components: {
      ElImageViewer
    },
    data() {
      return {
        total: 11, // 多少条数据
        tableData: [
        ],
        showViewer: false,
        srcList: [],
        search: null,
        drawer: false, // 控制表单显示的
        direction: 'rtl',
        ruleForm: {
          id: 0,
          name: null,
          author: null,
          pricate: null,
          bookUrl: null,
          biaoqianId: null,
          upauthorId: -1,
          introduction: null
        },
        filterList: [{ text: '心理科学', value: '心理科学' }, { text: '历史人物', value: '历史人物' }],
        submit: {
          id: 0,
          name: '',
          author: '',
          pricate: '',
          bookUrl: '',
          biaoqianId: '',
          upauthorId: '',
          introduction: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入书籍名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
          ],
          biaoqianId: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          author: [
            { required: true, message: '请输入书名作者', trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入书籍介绍', trigger: 'change' }
          ]
        },
        fileList: [],
        dialogImageUrl: '', // 表格上的图片显示
        dialogVisible: false, // 表单上的图片显示
        disabled: false,
        urlImage: '/api/file/updateimgae', //  图片上传url
        urlFile: '/api/file/updatefile', // 文件上传url
        fileListImage: [], // 显示图片url
        Filenumber: 1,
        biaoList: [], // 标签列表
        biaoji: 0, // 0代表添加 1代表修改
        biaojitext: '添加书籍'
      }
    },
    mounted() { // 页面初始化
      // this.jiazai()
      this.loaderFenlei()
      this.jiazaiPage()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(val)
        const data = { pageNum: val }
        const url = '/api/houtai/book/selects'
        postJson(url, qs.parse(data)).then(res => {
          this.total = res.total
          this.tableData = res.list
          console.log(res)
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].introductions = this.tableData[i].introduction
            this.tableData[i].introduction = this.tableData[i].introduction.slice(0, 50) + '...'
            this.tableData[i].createTime = new Date(this.tableData[i].createTime)
            this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
          }
        })
      },
      loaderFenlei() {
        getornonumber('/api/biaoqian/select').then(res => {
          let a = []
          a = res
          // eslint-disable-next-line eqeqeq
          if (a.length == 0) {
            this.$message({
              message: '请到标签页面添加标签',
              type: 'warning'
            })
          } else {
            this.biaoList = []
            this.filterList = []
            console.log(a)
            // value: '选项5',
            //   label: '北京烤鸭'
            for (var i = 0; i < a.length; i++) {
              this.biaoList.push({ label: a[i].name, value: a[i].id })
              this.filterList.push({ text: a[i].name, value: a[i].name })
            }
          }
        })
      },
      // resetDateFilter() {
      //   this.$refs.filterTable.clearFilter('date')
      // },
      clearFilter() {
        this.$refs.filterTable.clearFilter()
      },
      filterTag(value, row) {
        return row.type === value
      },
      filterHandler(value, row, column) {
        const property = column.property
        return row[property] === value
      },
      handleEdit(index, row) {
        this.biaojitext = '修改书籍'
        // 修改书籍
        this.biaoji = 1
        this.drawer = true
        // 装载数据到表单
        this.ruleForm.id = row.id
        this.ruleForm.name = row.name
        this.ruleForm.author = row.author
        this.ruleForm.pricate = row.pricate
        this.ruleForm.introduction = row.introductions
        this.ruleForm.biaoqianId = row.biaoqianId
        this.fileList = []
        this.fileList.push({ name: row.name + '.epub', url: row.bookUrl })
        this.fileListImage = []
        this.fileListImage.push({ url: row.pricate })
        // console.log(this.fileList)
        // console.log(this.fileListImage)
      },
      handleDelete(index, row) {
        // 删除表格书籍
        // eslint-disable-next-line no-unused-vars
        const url = `/api/houtai/book/delete/${row}`
        this.$confirm('此操作将永久删除书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getornonumber(url).then(res => {
            this.loads('删除中请稍等')
            this.jiazaiPage()
            this.$message({
              showClose: true,
              message: '删除成功！！',
              type: 'success'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      jiazaiPage() {
        // 初始化表格
        const data = { pageNum: 1 }
        const url = '/api/houtai/book/selects'
        postJson(url, qs.parse(data)).then(res => {
          this.total = res.total
          this.tableData = res.list
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].introductions = this.tableData[i].introduction
            this.tableData[i].introduction = this.tableData[i].introduction.slice(0, 50) + '...'
            this.tableData[i].createTime = new Date(this.tableData[i].createTime)
            this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
          }
        })
      },
      jiazai() {
        // 初始化表格
        getornonumber('/api/houtai/book/select').then(res => {
          this.tableData = res
          // eslint-disable-next-line no-undef
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].introductions = this.tableData[i].introduction
            this.tableData[i].introduction = this.tableData[i].introduction.slice(0, 50) + '...'
            this.tableData[i].createTime = new Date(this.tableData[i].createTime)
            this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
          }
        })
      },
      loads(res) {
        const loading = this.$loading({
          lock: true,
          text: res,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
      },
      tupian(image) {
        // 加载表格上面的图片
        this.showViewer = true
        this.srcList = []
        this.srcList.push(image)
      },
      closeViewer() {
        this.showViewer = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      searchs() {
        // 搜索
        // eslint-disable-next-line no-unused-vars,eqeqeq
        if (this.search != null && this.search != '') {
          const url = `/api/houtai/book/findname/${this.search}`
          getornonumber(url).then(res => {
            this.tableData = res
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].introductions = this.tableData[i].introduction
              this.tableData[i].introduction = this.tableData[i].introduction.slice(0, 50) + '...'
              this.tableData[i].createTime = new Date(this.tableData[i].createTime)
              this.tableData[i].createTime = this.tableData[i].createTime.toLocaleDateString().replace(/\//g, '-') + ' ' + this.tableData[i].createTime.toTimeString().substr(0, 8)
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '搜索内容不能为空'
          })
        }
      },
      submitForm(formName) {
        // 提交表单
        // eslint-disable-next-line no-unused-vars
        let a = 0
        let url = ''
        if (this.biaoji === 0) { // 0代表添加 1代表修改
          url = '/api/houtai/book/add'
        } else {
          url = '/api//houtai/book/updateOrId' // 修改
        }
        if (this.ruleForm.name == null || this.ruleForm.author == null || this.ruleForm.biaoqianId == null || this.ruleForm.introduction == null) {
          this.$message({
            type: 'warning',
            message: '表格所有数据不能为空'
          })
        } else {
          // eslint-disable-next-line eqeqeq
          if (this.fileListImage.length == 0 || this.fileList.length == 0) {
            // console.log(123)
            this.$message({
              type: 'warning',
              message: '图片或者文件没有上传'
            })
          } else {
            var info = JSON.parse(localStorage.getItem('info'))
            this.submit.id = this.ruleForm.id
            this.submit.name = this.ruleForm.name
            this.submit.author = this.ruleForm.author
            this.submit.pricate = this.fileListImage[0].url
            this.submit.bookUrl = this.fileList[0].url
            this.submit.biaoqianId = this.ruleForm.biaoqianId
            this.submit.upauthorId = info.id
            this.submit.introduction = this.ruleForm.introduction
            postJson(url, qs.parse(this.submit)).then(res => {
              // eslint-disable-next-line no-const-assign
              this.drawer = false
              this.jiazaiPage()
               a = 1
            })
            // eslint-disable-next-line eqeqeq
            if (a == 0 && this.biaoji == 0) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            } else {
              // eslint-disable-next-line eqeqeq
              if (a == 0 && this.biaoji == 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: '添加失败重新尝试'
                })
              }
            }
          }
        }
      },
      resetForm() {
        console.log('重置')
      },
      handleRemove(file) {
        this.fileListImage = []
      },
      handlePictureCardPreview(file) {
        // 展示图片点击放大的表单上的
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleDownload(file) {
        // 下载表单上的图片
        console.log(file)
      },
      handleSuccess(response, file, fileList) {
        // 图片上传后的回调函数
        // eslint-disable-next-line no-undef
        // this.fileListImage = []
        this.fileListImage.push({ url: response })
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
      },
      handleChange(file, fileList) {
        this.fileList = []
        this.fileList.push(file)
        this.$message({
          message: '文件上传成功',
          type: 'success'
        })
      },
      beforeUploadFile(file) {
        // eslint-disable-next-line no-unused-vars
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        // eslint-disable-next-line eqeqeq,no-unused-vars
        const extension = testmsg == 'epub'
        if (!extension) {
          this.$message({
            message: '上传文件只能是epub格式!',
            type: 'warning'
          })
        }
        return extension
      },
      beforeUploadImage(file) {
        // eslint-disable-next-line no-unused-vars
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        // eslint-disable-next-line no-unused-vars,eqeqeq
        const extension = testmsg == 'jpg'
        // eslint-disable-next-line no-unused-vars,eqeqeq
        const extension2 = testmsg == 'png'
        if (!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 jpg、png格式!',
            type: 'warning'
          })
        }
        return extension || extension2
      },
      addbook(biaoji) {
        this.biaoji = 0
        this.drawer = true
        this.biaojitext = '添加书籍'
        this.ruleForm.id = 0
        this.ruleForm.name = null
        this.ruleForm.author = null
        this.ruleForm.pricate = null
        this.ruleForm.introduction = null
        this.ruleForm.biaoqianId = null
        this.fileList = []
        this.fileListImage = []
        // getornonumber('/api/biaoqian/select').then(res => {
        //   let a = []
        //   a = res
        //   // eslint-disable-next-line eqeqeq
        //   if (a.length == 0) {
        //     this.$message({
        //       message: '请到标签页面添加标签',
        //       type: 'warning'
        //     })
        //   } else {
        //     this.biaoList = []
        //
        //     console.log(a)
        //     // value: '选项5',
        //     //   label: '北京烤鸭'
        //    for (var i = 0; i < a.length; i++) {
        //      this.biaoList.push({ label: a[i].name, value: a[i].id })
        //    }
        //   }
        // })
      }
    }
  }
</script>
<style>
  .el-table td, .el-table th{
    text-align:center;
  }
</style>
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
      display: flex;
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
      /*border: 1px solid red;*/
      margin-top: 5px;
    }
  }

</style>
