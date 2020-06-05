<template>
<div>
  <el-container>
    <!----------------------------------------- Header ---------------------------------------------->
  <el-header>
     <div >{{this.loginForm.username}}你好</div>
  </el-header>
      <!----------------------------------------- Main ---------------------------------------------->
  <el-main >
    <el-button type="primary" v-on:click="toDouble" >双激励</el-button>
    <el-button type="primary" v-on:click="toSingle" >单激励</el-button>
  </el-main>
      <!----------------------------------------- Footer ---------------------------------------------->
  <el-footer>
  </el-footer>
</el-container>
</div>

</template>

<script>
export default {
  name: 'Choose',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
    var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=') // 再次切割// 判断查找相对应的值
      if (arr2[0] === 'userName') {
        this.loginForm.username = arr2[1] // 保存到保存数据的地方
        // console.log(this.loginForm.username)
      } else if (arr2[0] === 'userPwd') {
        this.loginForm.password = arr2[1]
      }
    }
  },
  methods:
  {
    toDouble () {
      this.$router.push({
        path: '/double'
      })
    },
    toSingle () {
      this.$router.push({
        path: '/single'
      })
    }
  }
}
</script>

<style scoped>
.video{
  text-align:center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: auto；
};
.video{
  text-align:center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
/* .inch{
  width: auto;
}*/
.font{
  font-family: 'Lucida Sans';
  font-size: larger;
  }
.content {
    vertical-align: middle;
    display: table-cell;
}
</style>
