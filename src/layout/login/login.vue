<template>
  <div class="login">
    <div class="login-one">
      <div class="span">
        <div class="span1">
        </div>
      </div>
      <div class="login">
        <div class="login-text">
          <span>阅读后台登录系统</span>
        </div>
        <div class="login-user">
          <div class="login-username">
            <el-form :model="form">
                <el-form-item label="用户名"   :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off" clearable ></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="form.passwd" show-password clearable></el-input>
                </el-form-item>
              <el-form-item prop="code" label="验证码" :label-width="formLabelWidth">
                <el-input type="text" v-model="formLogin.code" placeholder="请输入验证码">
                  <template style="background-color: #fff;border: none" slot="append">
                    <div  style="width: 100%;height: 100%;" class="login-code" @click="refreshCode">
                      <Identify style="width: 100%;height: 100%" :identifyCode="identifyCode"></Identify>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="login-button">
          <el-button style="width: 330px;margin-left: 120px"  @click="login()">登录</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import { post } from '../../util/httpAxios'
  import { post } from '../../util/httpAxios'
  // eslint-disable-next-line no-unused-vars
  import Identify from '../util/identify'
  export default {
    name: 'login',
    data() {
      return {
        form: {
          name: '',
          passwd: ''
        },
        formLabelWidth: '120px',
        authorities: [],
        info: {
          id: '',
          username: ''
        },
        formLogin: {
          username: '',
          password: '',
          code: ''
        },
        identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
        identifyCode: '',
        // 校验
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
        }
      }
    },
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Identify
    },
    mounted () {
      // 初始化验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    methods: {
      // 引入验证接口
      // eslint-disable-next-line no-undef
      // ...mapActions('d2admin/account', ['login']),
      // ...mapActions('d2admin/account', ['login']),
      // 重置验证码
      refreshCode () {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      makeCode (o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
      },
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      /**
       * @description 提交表单
       */
      // 提交登录信息
      submit() {
        if (this.formLogin.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
          this.$message.error('请填写正确验证码')
          this.refreshCode()
          return
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 登录
            // 注意 这里的演示没有传验证码
            // 具体需要传递的数据请自行修改代码
            this.login({
              vm: this,
              username: this.formLogin.username,
              password: this.formLogin.password
            })
          } else {
            // 登录表单校验失败
            this.$message.error('表单校验失败')
          }
        })
      },
      login: function () {
        console.log(this.identifyCode.toLowerCase())
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
        .span1{
          width: 100%;
          height: 100%;
          background: rgba(244,244,244,.6);
        }
      }
      .login{
        position: relative;
        flex-direction: column;
        display: flex;
        .login-text{
          @include center;
          flex: 0 0 px2em(200);
          /*border: 1px solid red;*/
          span{
            font-size: 26px;
          }
        }
        .login-user{
          position: relative;
          margin-top: px2em(10);
          flex: 0 0 px2em(600);
          /*border: 1px solid red;*/
          @include center;
          .login-username{
            margin-top: 10px;
            width: 90%;
            height: 100%;
            /*border: 1px solid red;*/
            flex-direction: column;
           @include center;
          }
        }
        .login-button{
          @include center;
        }
        flex: 1;
      }

    }
  }
</style>
