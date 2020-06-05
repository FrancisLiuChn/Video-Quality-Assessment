/* eslint-disable vue/no-parsing-error */
<template>
<div>
  <el-container>
    <!----------------------------------------- Header ---------------------------------------------->
      <!----------------------------------------- Main ---------------------------------------------->
  <el-main >
   <el-row  :gutter="20">
        <el-col :span="4"> <div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
        <div @contextmenu.prevent="menuPlayer()">
        <video-player
                      class="vjs-custom-skin"
                      width=20px,
                      ref="videoPlayer"
                      @ended="onPlayerEnded($event)"
                      :options="playerOptions1">
       </video-player>
        </div>
       <div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple">
            欢迎登陆：{{this.loginForm.username}}
            </div>
            <div>当前实验进度：{{this.num}}/146</div>
            </el-col>
    <!-- video2 -->
</el-row>
  </el-main>
      <!----------------------------------------- Footer ---------------------------------------------->
  <!-- <el-footer>
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

  </el-footer> -->
</el-container>
<el-row>
  <!-- 提交按钮 -->
<!-- <el-button  id="button1" type="primary" @click="addMessage" >提交</el-button> -->
</el-row>

<!-- end -->
</div>

</template>

<script>
export default {
  inject: ['reload'],
  name: 'single2',
  data () {
    return {
      // marks: {
      //   0: {
      //     style: {
      //       color: '#000000'
      //     },
      //     label: this.$createElement('strong', 'Poor')
      //   },
      //   25: {
      //     style: {
      //       color: '#000000'
      //     },
      //     label: this.$createElement('strong', 'Bad')
      //   },
      //   50: {
      //     style: {
      //       color: '#000000'
      //     },
      //     label: this.$createElement('strong', 'Fair')
      //   },
      //   75: {
      //     style: {
      //       color: '#000000'
      //     },
      //     label: this.$createElement('strong', 'Good')
      //   },
      //   100: {
      //     style: {
      //       color: '#000000'
      //     },
      //     label: this.$createElement('strong', 'Excellent')
      //   }
      // },
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
    onPlayerEnded (player) {
      this.timer = setTimeout(() => { // 设置延迟执行
        this.$router.push({
          path: '/assessment'
        }
        )
        console.log('ok')
      }, 1000)
      console.log('player ended!', player)
    },
    addMessage () {
      var _this = this
      this.num++
      let form1 = _this.form
      console.log(form1.resp_score)
      // eslint-disable-next-line eqeqeq
      let url = '/singlenextvideo'
      let data = {
        username: this.loginForm.username,
        video_numb: form1.video_numb,
        video_score: form1.resp_score,
        type: form1.type
      }
      // if (this.num > 3) {
      //   self.open1()
      // }
      console.log(data)
      this.$axios.post(url, data).then(function (response) {
        console.log(response)
        console.log(response.data[0])
        // 更新播放控件的src
        // eslint-disable-next-line no-undef
        _this.form.url = response.data.url
        _this.form.video_numb = response.data.id
        _this.playerOptions1['sources'][0]['src'] = _this.form.url
        // _this.form.url2 = response.data[1]
        // _this.playerOptions1['sources'][0]['src'] = _this.form.url1
        // _this.playerOptions2['sources'][0]['src'] = _this.form.url2
      })
      this.reload()
    },
    open1 () {
      this.$notify({
        // title: '尊敬的用户',
        message: '恭喜您完成所有测试，辛苦了',
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
