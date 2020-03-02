<template>
  <div class="login">
    <div class="login-one">
      <div class="span">
      </div>
      <div class="login">
        <div class="login-text">
          <span>阅读后台登录系统</span>
        </div>
        <div class="login-user">
          <div class="login-username">
            <el-form :model="form">
                <el-form-item label="用户名"  style="width:200px" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off" clearable ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.passwd" show-password clearable></el-input>
                </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="login-button">
          <el-button  @click="login()">登录</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import { post } from '../../util/httpAxios'
  import { post } from '../../util/httpAxios'
  export default {
    name: 'login',
    data() {
      return {
        form: {
          name: '',
          passwd: ''
        },
        formLabelWidth: '50px',
        authorities: [],
        info: {
          id: '',
          username: ''
        }
      }
    },
    methods: {
      login: function () {
        console.log(this.form)
        post('/api/login', this.form).then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.status == 200) {
            let a = 0
            this.authorities = res.msg.authorities
            for (var i = 0; i < this.authorities.length; i++) {
              // eslint-disable-next-line eqeqeq
              if (this.authorities[i].authority == 'ROLE_admin') {
                a = 1
              }
            }
            // eslint-disable-next-line eqeqeq
            if (a == 0) {
              this.$message({
                type: 'warning',
                message: '不是管理员账户不允许登录后台'
              })
            } else {
              this.info.username = res.msg.userDetailed.username
              this.info.id = res.msg.id
              console.log(this.info)
              localStorage.setItem('info', JSON.stringify(this.info))
              this.$router.push('/a')
              this.$message({
                type: 'success',
                message: '欢迎管理员登录'
              })
            }

            // 注销
          } else {
            this.$message({
              type: 'warning',
              message: '用户名密码错误请重新尝试'
            })
          }
        })
        // this.$store.dispatch('setToken', 3).then(() => {
        //   this.$router.push({ path: '/a' })
        // })
        // console.log(this.$store.getters.token)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/style/gol";
  .login{
    width: 100%;
    height: 100%;
    /*position: relative;*/
    /*background: linear-gradient(to right,#0CF,dodgerblue);*/
    .login-one{
      display: flex;
      width: 50%;
      height: 50%;
      position: absolute;
      left: 27%;
      top: 15%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      .span{
        flex: 0 0 px2em(800);
        background: url("../../assets/image/324269.jpg" );
        /*background-size:100% 99.9%;*/
        background-size: cover;
      }
      .login{
        position: relative;
        flex-direction: column;
        display: flex;
        .login-text{
          @include center;
          flex: 0 0 px2em(200);
          border: 1px solid red;
          span{
            font-size: 26px;
          }
        }
        .login-user{
          position: relative;
          margin-top: px2em(10);
          flex: 0 0 px2em(600);
          border: 1px solid red;
          @include center;
        }
        flex: 1;
      }

    }
  }
</style>
