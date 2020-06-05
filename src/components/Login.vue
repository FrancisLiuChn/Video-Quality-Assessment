<template>
<div>
  <p>{{this.image_value}}</p>
 <el-form :model="loginForm"   ref="loginForm" class="login-container" v-show="showLogin" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input  v-model="loginForm.username"
                 placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login(loginForm)">登录</el-button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </el-form-item>
  </el-form>
<!--  -->
<!--  -->
<!--  -->
  <el-form class="login-container" label-position="left" v-show="showRegister"
           label-width="0px">
    <h3 class="register_title">用户注册</h3>
    <el-form-item>
      <!-- <el-col :span='6'>用户名 -->
      <el-input type="text" v-model="registerForm.registerUsername"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="registerForm.registerPassword" show-password="ture"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
     <el-form-item>
      <el-input  type="text" v-model="registerForm.registerAge"
                auto-complete="off" placeholder="年龄"></el-input>
    </el-form-item>
     <el-form-item>
      <el-input type="text" v-model="registerForm.registerProfession"
                auto-complete="off" placeholder="职业"></el-input>
    </el-form-item>
    <el-form-item>
      <el-col :span='16'>是否有过图像处理经验</el-col>
      <el-col :span='8'>
        <el-select type="number" v-model="registerForm.imagevalue" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-col>
  </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">注册</el-button>
      <span v-on:click="ToLogin">马上登录</span>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      options: [{
        value: '0',
        label: '是'
      }, {
        value: '1',
        label: '否'
      }],
      checked: '',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        registerUsername: '',
        registerPassword: '',
        registerAge: '',
        registerProfession: '',
        imagevalue: ''
      },
      showLogin: true,
      showRegister: false
    }
  },
  // mounted () {
  //   this.getCookie()
  // },
  methods: {
    login (formName) {
      var self = this
      console.log(this.$store.state)
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            self.$store.commit('login', self.loginForm)
            self.setCookie(self.loginForm.username, self.loginForm.password, 7)
            console.log(successResponse.data)
            // console.log(document.cookie)
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? 'description' : path})
            // this.$router.replace({path: '/description'})
          } else if (successResponse.data.code === 400) {
            // 400 是没有此用户
            self.notice_noUser()
            console.log(successResponse.data)
          } else if (successResponse.data.code === 300) {
            // 密码错误
            self.notice_wrongPwd()
            console.log(successResponse.data)
          }
        })
        .catch(failResponse => {
          let str = '连接失败'
          console.warn(str)
        })
    },
    setCookie (cname, cpwd, exdays) {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'userName' + '=' + cname + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userPwd' + '=' + cpwd + ';path=/;expires=' + exdate.toGMTString()
      // console.log(window.document.cookie)
    },
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            this.ruleForm.username = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] === 'userPwd') {
            this.ruleForm.password = arr2[1]
          }
        }
      }
    },
    ToRegister () {
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin () {
      this.showRegister = false
      this.showLogin = true
    },
    register () {
      let username = this.registerForm.registerUsername
      let password = this.registerForm.registerPassword
      let age = this.registerForm.registerAge
      let profession = this.registerForm.registerProfession
      // eslint-disable-next-line camelcase
      let image_processing = this.registerForm.imagevalue
      let data = {
        username,
        password,
        age,
        profession,
        image_processing
      }
      console.log(data)
      this.$axios
        .post('/register', data)
        .then(successResponse => {
        })
        .catch(failResponse => {
        })
    },
    notice_wrongPwd () {
      this.$notify({
        title: '提示',
        message: '请输入正确的账号密码',
        type: 'warning'
      })
    },
    notice_noUser () {
      this.$notify({
        title: '提示',
        message: '该用户名尚未注册，请先进行注册',
        type: 'warning'
      })
    }
  }
}
</script>
<style scoped>
 .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
