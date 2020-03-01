<template>
  <div class="biaoq">
    <div class="top">
      <el-input v-model="search" style="width: 160px;margin-left: 10px" placeholder="请输入书名"></el-input>
      <el-button icon="el-icon-search" style="margin-left: 4px" circle @click="searchs()" ></el-button>
      <el-button type="primary" icon="el-icon-plus"  size="small" @click="drawer = true" style="margin-left: 10px" plain>添加书籍</el-button>
      <div style="justify-content: flex-end;flex: 1;display: flex;">
        <el-tooltip class="item" style="margin-right: 50px" effect="dark" content="刷新" placement="top-start">
          <el-button  icon="el-icon-refresh-left" @click="jiazai()" circle></el-button>
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
        <el-table-column prop="type" label="书籍类型" width="100" :filters="[{ text: '心理科学', value: '心理科学' }, { text: '历史人物', value: '历史人物' }]" :filter-method="filterTag" filter-placement="bottom-end">
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
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
      </el-table>
    </div>
<!--    添加书籍页面-->
    <el-drawer title="添加书籍" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书籍名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="书籍分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" required>
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
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="书籍图片" prop="delivery">
          <el-upload :action="urlImage"  with-credentials name="file" :file-list="fileListImage" list-type="picture-card" :auto-upload="true" :on-success="handleSuccess" >
            <i slot="default" class="el-icon-plus"></i>
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
        <el-form-item label="上传书籍" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="书籍介绍" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  import { getornonumber } from '../../../util/httpAxios'
  // import qs from 'qs'
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  export default {
    components: {
      ElImageViewer
    },
    data() {
      return {
        tableData: [
        ],
        showViewer: false,
        srcList: [],
        search: null,
        drawer: false, // 控制表单显示的
        direction: 'rtl',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        dialogImageUrl: '', // 表格上的图片显示
        dialogVisible: false, // 表单上的图片显示
        disabled: false,
        urlImage: '/api/file/updateimgae', //  图片上传url
        fileListImage: [] // 显示图片url
      }
    },
    mounted() {
      this.jiazai()
    },
    methods: {
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
        // 编辑表格
        console.log(index, row)
      },
      handleDelete(index, row) {
        // 删除表格书籍
        console.log(index, row)
      },
      jiazai() {
        // 初始化表格
        getornonumber('/api/houtai/book/select').then(res => {
          this.tableData = res
          // eslint-disable-next-line no-undef
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].introduction = this.tableData[i].introduction.slice(0, 50) + '...'
          }
        })
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
              this.tableData[i].introduction = this.tableData[i].introduction.slice(0, 50) + '...'
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
        this.fileListImage = []
        this.fileListImage.push({ url: response })
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
    .show{
      width: 100%;
      /*border: 1px solid red;*/
      margin-top: 5px;
    }
  }

</style>
