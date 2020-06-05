<template>
<div>
  <el-container>
    <!----------------------------------------- Header ---------------------------------------------->
  <el-header>
     <div >欢迎登陆：{{this.loginForm.username}}</div>
  </el-header>
      <!----------------------------------------- Main ---------------------------------------------->
  <el-main>
   <el-row :gutter="20">
  <el-col class="video" :span="12">
      <video-player
                      class="vjs-custom-skin"
                      width=20px,
                      ref="videoPlayer"
                      :options="playerOptions1">
    </video-player>
    </el-col>
    <!-- video2 -->
  <el-col  class="div" :span="12">
      <video-player
                     class="vjs-custom-skin"
                     ref="videoPlayer"
                     :options="playerOptions2">
      </video-player>
      </el-col>
</el-row>
  </el-main>
      <!----------------------------------------- Footer ---------------------------------------------->
  <el-footer>
    <el-form :model="form" ref="form" size="mini" :inline="true">
    <el-row :gutter="20">
      <div>请选择你认为视频观看效果更好的一个视频</div>
      <br/>
      <el-radio v-model="form.resp_code" label="0" border >视频A</el-radio>

      <el-radio v-model="form.resp_code" label="1" border>视频B</el-radio>
</el-row>

</el-form>
  </el-footer>
</el-container>
  <!-- <el-row> -->
  <!-- <el-col  style="text-align:center;"   :span="24"> -->
      <!-- <h3 class="font-family: 'Lucida Sans';font-size: larger;">Video Quality Assessment</h3> -->
    <!-- <p>Current Type: <span class="badge badge-success">Double Stimulus</span></p> -->
      <!-- <p style="color=#409EFF"> Current Type: <span >Double Stimulus</span></p> -->
      <!-- <p>Question: Which one is better, A or B？</p> -->
      <!-- </el-col> -->
<!-- </el-row> -->

<el-row>
  <!-- 提交按钮 -->
<br/>
<br/>
<el-button id="button1" type="primary"  @click="addMssage('form')" >提交</el-button>
</el-row>

<!-- end -->
</div>

</template>

<script>
export default {
  name: 'double',
  data () {
    return {
      check: 'ture',
      loginForm: {
        username: '',
        password: ''
      },
      form: {
        video_numb1: '',
        video_numb2: '',
        resp_code: '', // 0表示视频A，1表示视频B
        type: '1'
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
      },
      playerOptions2: {
        autoplay: true,
        controls: true,
        preload: 'auto',
        language: 'zh-CN',
        notSupportedMessage: '请点击提交按钮开始测试',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        muted: true,
        poster: '',
        sources: [{
          type: 'video/mp4',
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
    // this.$axios.post('/nextVideo')
  },
  methods: {
    addMssage (form) {
      var _this = this
      const self = this
      this.$refs[form].validate((valid) => {
        if (valid) {
          let form1 = this.$refs[form].model
          console.log(form1.resp_code)
          console.log(11111111111111111111111111111111111111)
          // eslint-disable-next-line eqeqeq
          if (form1.resp_code == 10) {
            self.open1()
          } else {
            let url = '/nextVideo'
            let data = {
              username: this.loginForm.username,
              video_numb1: form1.video_numb1,
              video_numb2: form1.video_numb2,
              resp_code: form1.resp_code,
              type: form1.type
            // better:
            }
            console.log(data)
            this.$axios.post(url, data).then(function (response) {
              console.log(response.data)
              console.log(response.data.url1)
              console.log(response.data.id_1)
              // 更新播放控件的src
              _this.form.url1 = response.data.url1
              _this.form.url2 = response.data.url2
              _this.form.video_numb1 = response.data.id_1
              _this.form.video_numb2 = response.data.id_2
              _this.playerOptions1['sources'][0]['src'] = _this.form.url1
              _this.playerOptions2['sources'][0]['src'] = _this.form.url2
            })
          }
          // eslint-disable-next-line no-unused-vars
          // eslint-disable-next-line no-undef
        }
      })
    },
    open1 () {
      this.$notify({
        // title: '尊敬的用户',
        message: '请选择您的结果后，再观看下一对实验',
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
</style>
