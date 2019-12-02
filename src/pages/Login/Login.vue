<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Mint外卖</h2>
        <div class="login_header_title">
          <a :class="{ on: loginWay }" @click="loginWay = true">短信登录</a>
          <a :class="{ on: !loginWay }" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit="submit">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{ computeTime > 0 ? `${computeTime}s(已发送)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="text"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册Mint外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="username"
                />
              </section>
              <section class="login_verification">
                <input
                  :type="isShowpwd ? 'text' : 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="password"
                />
                <div
                  class="switch_button off"
                  @click="isShowpwd = !isShowpwd"
                  :class="isShowpwd ? 'on' : 'off'"
                >
                  <div
                    class="switch_circle"
                    :class="{ right: isShowpwd }"
                  ></div>
                  <span class="switch_text">{{
                    isShowpwd ? 'abc' : '...'
                  }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="./images/captcha.svg"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-arrow-left"></i>
      </a>
    </div>
    <AlertTip
      v-show="alertShow"
      :alertText="alertText"
      @doClose="handleClose"
    ></AlertTip>
  </section>
</template>
<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendCode} from '../../api/index.js'
export default {
  components: {
    AlertTip
  },
  name: 'login',
  data() {
    return {
      phone: '', //一会用户输入的手机
      code: '', //短信验证码,
      username: '', //用户名
      password: '', //密码
      captcha: '', // 图片验证码
      loginWay: true, // 假设true 为短信登录， false为密码登录
      computeTime: 0,
      isShowpwd: false,
      alertShow: false,
      alertText: 'haha'
    }
  },
  // 使用计算属性，新建一个返回当前电话号是否匹配的属性
  computed: {
    rightPhone() {
      // 这个计算属性返回一个布尔值
      return /^1[3456789]\d{9}$/.test(this.phone)
    }
  },
  methods: {
    async getCode() {
      // 判断当前有没有正在计时
      if (this.computeTime === 0) {
        this.computeTime = 30
        this.timerID = setInterval(() => {
          this.computeTime--
          // 如果等于0了就停止计时器
          if (this.computeTime === 0) {
            clearInterval(this.timerID)
          }
        }, 1000)

        // 向手机发送验证码
        const result = await reqSendCode(this.phone)
        console.log(result)
        if (result.code === 1) {
          this.openAlertTip(result.msg)
          // 重置计时时间，清除计时器
          this.computeTime = 0
          clearInterval(this.timerID)
        }
      }
    },
    submit() {
      // if (!this.rightPhone) {
      //   this.openAlertTip('你没有输手机号')
      // }
      // 前端验证 要先考虑当前在 手机短信登录or 用户名密码登录
      if (this.loginWay) {
        // 手机短信登录
        const {rightPhone, phone, code} = this
        if (!rightPhone) {
          this.openAlertTip('请输入正确的手机号')
          return
        }
        if (!/\d{6}/.test(code)) {
          this.openAlertTip('请输入正确的短信验证码')
          return
        }

        // TODO 发送手机短信登录请求
      }else {
        // 用户名密码登录
        const {username, password, captcha} = this
        if (!username) {
          this.openAlertTip('请输入用户名')
          return
        }
        if (!password) {
          this.openAlertTip('请输入密码')
          return
        }
        if (!captcha) {
          this.openAlertTip('请输入验证码')
          return
        }

        // TODO 发送用户名密码登录登录请求
      }
    },
    openAlertTip(alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    handleClose() {
      this.alertShow = false
      this.alertText = ''
    }
  }
}
</script>
<style lang="scss">
@import '../../common/sass/mixins.scss';
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }
      .login_header_title {
        padding-top: 40px;
        text-align: center;
        > a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;
          &:first-child {
            margin-right: 40px;
          }
          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }
    .login_content {
      > form {
        > div {
          display: none;
          &.on {
            display: block;
          }
          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
            &:focus {
              border: 1px solid #02a774;
            }
          }
          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              &.right_phone {
                color: black;
              }
            }
          }
          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              &.off {
                background: #fff;
                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }
              &.on {
                background: #02a774;
              }
              > .switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }
          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;
            > a {
              color: #02a774;
            }
          }
        }
        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }
      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }
    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      > .iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
