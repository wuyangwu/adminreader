<template>
  <div class="home">
    <el-container>
      <el-aside :width="change" style="border-right: 1.5px solid #ccc">
        <div style="width: 100%;height: 15%;">
          <el-image style="width: 100%;height: 100%" src="../../assets/image/324269.jpg"></el-image>
<!--                    <img src="../assets/logo.png">-->
        </div>
<!--   左侧导航栏 -->
        <el-menu :default-active="this.$route.path" CLASS="el-menu-vertical-demo" router  :collapse="isCollapse">
          <NavMenu :nav-menus="navList" :fontsizelist="fontsizelist" :is-collapse="isCollapse"></NavMenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="7%">
          <div class="homeheader" style="box-shadow:rgba(0, 0, 0, 0.32) 0px 3px 8px; ">
            <div class="headerleft">
              <div class="head-leftprev"> <el-button class="head-button"  :icon="nvicon" @click="click()"></el-button></div>
              <div class="head-leftprev"><el-button class="head-button" icon="el-icon-message-solid">3</el-button></div>
              <!--              <div class="head-leftprev"><el-button >4</el-button></div>-->
            </div>
            <div class="head-center" style="font-size: 25px">
              <span>今天你阅读了吗？</span>
<!--              <router-link to="/test">jump</router-link>-->
            </div>
            <div class="head-right" style="">右边</div>
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
          底部公司名字
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavMenu from './NavMenu'
  export default {
    name: 'home',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      NavMenu
    },
    data: function () {
      return {
        a: true,
        isCollapse: false,
        change: '210px',
        nvicon: 'el-icon-s-fold',
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
            name: '用户管理'
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
          this.nvicon = 'el-icon-s-unfold'
        } else {
          this.change = '250px'
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
  @import "../assets/style/globak.scss";
  .home {
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: 100%;
      display: flex;
      .el-aside {
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
              @include  center;
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
