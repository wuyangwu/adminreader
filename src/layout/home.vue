<template>
  <div class="home">
    <el-container>
      <el-aside :width="change" style="border-right: 1.5px solid #ccc">
        <div class="im" style="width: 100%;height: 15%;">
          <el-avatar :size="sizes" :src="pricate"></el-avatar>
<!--          <el-image style="width: 100%;height: 100%" :src="pricate"></el-image>-->
<!--            <img  style="width: 100%;height: 100%" :src="pricate">-->
        </div>
<!--   左侧导航栏 -->
        <el-menu :default-active="this.$route.path" CLASS="el-menu-vertical-demo" router  :collapse="isCollapse">
          <NavMenu :nav-menus="navList" :fontsizelist="fontsizelist" :is-collapse="isCollapse"></NavMenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="7%" style="padding: 0">
          <div class="homeheader" style="box-shadow:rgba(0, 0, 0, 0.32) 0px 3px 8px; ">
            <div class="headerleft">
              <div class="head-leftprev"> <el-button class="head-button"  :icon="nvicon" @click="click()"></el-button></div>
              <div class="head-leftprev">
                <lottie :options="defaultOptions"  :width="70" :height="180" v-on:animCreated="handleAnimation" />
<!--                <el-button class="head-button" icon="el-icon-message-solid">3</el-button>-->
              </div>
              <!--              <div class="head-leftprev"><el-button >4</el-button></div>-->
            </div>
            <div class="head-center" style="font-size: 25px">
              <span>今天你阅读了吗？</span>
<!--              <router-link to="/test">jump</router-link>-->
            </div>
            <div class="head-right" style="">
              <div style="margin-right: 100px">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="zhuxiao()">注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="main-top">
            <el-breadcrumb separator="/">
<!--              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
              <el-breadcrumb-item v-for="bread in breadList" :key="bread" >
                {{ bread }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="main-centor">
            <!-- 主页面路由的地方-->
            <router-view />
          </div>
        </el-main>
        <el-footer>
          ©️2020 今天您阅读了吗？
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>注销成功返回登录页面</span>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="jump()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import NavMenu from './NavMenu'
  import Lottie from 'vue-lottie'
  import animationData from '../assets/pinjump'
  import { getornonumber } from '../util/httpAxios'
  export default {
    name: 'home',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      NavMenu,
      lottie: Lottie
    },
    mounted () {
      this.changeName()
    },
    data: function () {
      return {
        sizes: 100,
        a: true,
        defaultOptions: { animationData: animationData, loop: true, autoplay: true },
        defaultAnim: '',
        animationSpeed: 1,
        isCollapse: false,
        change: '210px',
        nvicon: 'el-icon-s-fold',
        name: '',
        pricate: 'http://127.0.0.1:8088/img/bookimage/92d27f33-b6d3-4345-a779-658b47f786de.jpg',
        dialogVisible: false, // 注销
        navList: [
          {
            path: '/a/home/zhuye',
            name: '主页'
          },
          {
            path: '/a/home/biaoqian',
            name: '分类管理',
            children: [
              {
                path: '/a/home/biaoqianshow',
                name: '分类显示'
              }
            ]
          },
          {
            path: '/a/home/book',
            name: '书籍管理',
            children: [
              {
                path: '/a/home/bookshow',
                name: '管理'
              }
            ]
          },
          {
            path: '/a/username',
            name: '用户管理',
            children: [
              {
                path: '/a/home/usershow',
                name: '管理'
              }
            ]
          }

        ],
        fontsizelist: [
          { fontsize: 12 },
          { fontsize: 14 },
          { fontsize: 16 },
          { fontsize: 18 },
          { fontsize: 20 },
          { fontsize: 22 },
          { fontsize: 24 }
        ],
        breadList: []
      }
    },
    watch: {
      $route: 'getPath' // 监听事件后调用
    },
    methods: {
      jump() {
        this.dialogVisible = false
        localStorage.clear()
        this.$router.push('/login')
      },
      zhuxiao() {
        this.dialogVisible = true
        getornonumber('/api/logout').then(res => {
          //
        })
      },
      changeName() {
        var info = JSON.parse(localStorage.getItem('info'))
        this.name = info.username
        this.pricate = info.pricate
      },
      handleAnimation(anim) {
        this.defaultAnim = anim
      },
      getPath (to, from) {
        this.breadList = []
        for (const bread of this.$route.matched) {
          if (bread.name !== '主页') {
            this.breadList.push(bread.name)
          }
        }
      },
      click () {
        if (!this.isCollapse) {
          this.change = '100px'
          this.sizes = 50
          this.nvicon = 'el-icon-s-unfold'
        } else {
          this.change = '250px'
          this.sizes = 80
          this.nvicon = 'el-icon-s-fold'
        }
        this.isCollapse = !this.isCollapse
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/gol";
  .home {
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: 100%;
      display: flex;
      .el-aside {
        .im{
          @include center;
        }
        /*background-color: #D3DCE6;*/
      }
      .el-container {
        .el-header {
          .homeheader {
            display: flex;
            height: 100%;

            .headerleft {
              position: relative;
              flex: 0 0 px2em(230);
              height: 100%;
              display: flex;
              .head-leftprev {
                flex: 1;
                @include center;
                .head-button {
                  margin-left: 3px;
                  background-color:transparent;
                  /*border: 0;*/
                }
              }
            }
            .head-center{
              flex: 1;
              @include center;
            }
            .head-right {
              flex: 0 0 px2em(1000);
              @include  UandDCenter;
              justify-content: flex-end;
              .el-dropdown-link {
                cursor: pointer;
                color: #409EFF;
              }
              .el-icon-arrow-down {
                font-size: 12px;
              }
            }
          }
        }
        .el-main{
          .main-top {
            width: 100%;
            height: 3%;
            font-size: px2em(30);
            /*border: 1px solid red;*/
            margin-top: -10px;
          }
          .main-centor {
            width: 100%;
            height: 97%;
            background: white;
          }
        }
        .el-footer {
          @include center;
        }
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 98%;
    min-height: 84%;
  }
</style>
