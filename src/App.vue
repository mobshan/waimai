<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://at.alicdn.com/t/font_1331186_krncm9pw1d.css"
    />
    <router-view></router-view>
    <!-- 我们要动太的控制这个footer的显示与隐藏 -->
    <FooterNav v-show="$route.meta.showFooter"></FooterNav>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav/FooterNav'
export default {
  name: 'app',
  components: {
    FooterNav: FooterNav
  },
  async mounted() {
    // 此处相当于去调用接口，把返回数据放入仓库
    this.$store.dispatch('getAddress')
    // 先发一次请求，判断用户是否已经登录过
    this.$store.dispatch('getUserInfo')
    this.$store.dispatch('getShopInfo')
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
