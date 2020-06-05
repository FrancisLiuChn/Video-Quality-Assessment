<template>
<div>
  <el-container>
    <!----------------------------------------- Header ---------------------------------------------->
  <el-header>
     <div >欢迎登陆：{{this.loginForm.username}}</div>
  </el-header>
      <!----------------------------------------- Main ---------------------------------------------->
  <el-main >
   <el-row  :gutter="20">
       <el-col  :span="14">
       <video-player
                      class="vjs-custom-skin"
                      width=20px,
                      ref="videoPlayer"
                      :options="playerOptions1">
       </video-player>
       </el-col>
    <!-- video2 -->
</el-row>
  </el-main>
      <!----------------------------------------- Footer ---------------------------------------------->
  <el-footer>
<el-slider
      v-model="from.resp_score"
      show-input>
    </el-slider>

  </el-footer>
</el-container>
<el-row>
  <!-- 提交按钮 -->
<el-button id="button1" type="primary"  @click="addMssage()" >提交</el-button>
</el-row>

<!-- end -->
</div>

</template>

<script>
export default {
  name: 'single',
  data () {
    return {
      inputValue: 0,
      inputValue1: 1,
      check: 'ture',
      loginForm: {
        username: '',
        password: ''
      },
      form: {
        video_numb: '',
        resp_score: '', // 0表示视频A，1表示视频B
        type: '2'
      },

      playerOptions1: {
        autoplay: true,
        controls: true,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        muted: true,
        notSupportedMessage: '请点击提交按钮开始测试',
        poster: '',
        sources: [{
          type: 'video/mp4',
          // src: ''
          src: ''
        }]
      }
    }
  },
  mounted () {
    var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=') // 再次切割// 判断查找相对应的值
      if (arr2[0] === 'userName') {
        this.loginForm.username = arr2[1] // 保存到保存数据的地方
      } else if (arr2[0] === 'userPwd') {
        this.loginForm.password = arr2[1]
      }
    }
  },
  methods: {
    addMssage () {
      var _this = this
      let form1 = _this.form
      console.log()
      // eslint-disable-next-line eqeqeq
      if (form1.resp_score == null) {
        self.open1()
      } else {
        let url = '/nextVideo'
        let data = {
          username: this.loginForm.username,
          video_numb: form1.video_numb,
          resp_score: form1.resp_score,
          type: form1.type
          // better:
        }
        console.log(data)
        this.$axios.post(url, data).then(function (response) {
          console.log(response)
          // 更新播放控件的src
          // eslint-disable-next-line no-undef
          _this.form.url1 = response.data[0]
          _this.form.url2 = response.data[1]
          _this.playerOptions1['sources'][0]['src'] = _this.form.url1
          _this.playerOptions2['sources'][0]['src'] = _this.form.url2
        })
      }
    },
    open1 () {
      this.$notify({
        // title: '尊敬的用户',
        message: '请对此次实验进行评价后再进行下一次实验',
        type: 'warning'
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

.code-box-demo .ant-slider {
  margin-bottom: 16px;
}
</style>
