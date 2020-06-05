/* eslint-disable vue/no-parsing-error */
<template>
<div>
  <el-container>
    <!----------------------------------------- Header ---------------------------------------------->
    <el-header>
        <div >asdasd</div>
    </el-header>
      <!----------------------------------------- Main ---------------------------------------------->
  <el-main >
<el-row type="flex" class="row-bg" justify="center">
       <el-col :span="8">
           <div class="grid-content">
               <el-slider
                    v-model="form.resp_score"
                    :marks="marks"
                    :input-size="large"
                    height="20px"
                    >
               </el-slider>
           </div>
        </el-col>
 </el-row>
  </el-main>
      <!----------------------------------------- Footer ---------------------------------------------->
  <el-footer>

  </el-footer>
</el-container>
<el-row>
  <!-- 提交按钮 -->
<el-button  id="button1" type="primary" @click="addMessage" >提交</el-button>
<el-button  id="button1" type="primary" @click="countDown" >{{content}}</el-button>
</el-row>

<!-- end -->
</div>

</template>

<script>
export default {
  inject: ['reload'],
  name: 'Assessment',
  data () {
    return {
      canClick: true,
      content: '倒计时',
      totalTime: 5,
      marks: {
        0: {
          style: {
            color: '#000000'
          },
          label: this.$createElement('strong', 'Poor')
        },
        25: {
          style: {
            color: '#000000'
          },
          label: this.$createElement('strong', 'Bad')
        },
        50: {
          style: {
            color: '#000000'
          },
          label: this.$createElement('strong', 'Fair')
        },
        75: {
          style: {
            color: '#000000'
          },
          label: this.$createElement('strong', 'Good')
        },
        100: {
          style: {
            color: '#000000'
          },
          label: this.$createElement('strong', 'Excellent')
        }
      },
      num: 0,
      check: 'ture',
      loginForm: {
        username: '',
        password: ''
      },
      form: {
        video_numb: '',
        resp_score: '',
        type: '2'
      },

      playerOptions1: {
        autoplay: true,
        controls: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        muted: true,
        // notSupportedMessage: '请点击提交按钮开始测试',
        // poster: 'http://127.0.0.1:8080/ca1349540923dd5490644e20d109b3de9c824867.jpg',
        sources: [{
          type: 'video/mp4',
          // src: ''
          src: 'http://127.0.0.1:8080/90.mp4'
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false // 全屏按钮
        }
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
    countDown () {
      if (!this.canClick) return // 改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 10
          this.canClick = true // 这里重新开启
        }
      }, 1000)
    },
    addMessage () {
      var _this = this
      this.num++
      let form1 = _this.form
      console.log(form1.resp_score)
      let url = '/singlenextvideo'
      let data = {
        username: this.loginForm.username,
        video_numb: form1.video_numb,
        video_score: form1.resp_score,
        type: form1.type
      }
      console.log(data)
      this.$axios.post(url, data).then(function (response) {
        _this.form.url = response.data.url
        _this.form.video_numb = response.data.id
        _this.playerOptions1['sources'][0]['src'] = _this.form.url
      })
      this.reload()
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
.grid-content {
    border-radius: 4px;
    min-height: 18px;
  }
.el-slider__bar {
        height: 111px;
      }
.el-slider__button {
          width: 4px;
          height: 31px;
          border-radius: 0;
          background: #FFFFFF;
          border: solid 2px #0068A5;
        }
.el-slider{
      width: auto!important;
      margin-right: 20px!important;
}
.video-js .vjs-big-play-button{
     /*
      播放按钮换成圆形
     */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
  }
</style>
