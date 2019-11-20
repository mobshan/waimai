<template>
  <div id="app">
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1331186_krncm9pw1d.css" />
    <router-view></router-view>
    <!-- 我们要动太的控制这个footer的显示与隐藏 -->
    <FooterNav v-show="$route.meta.showFooter"></FooterNav>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav/FooterNav'
import { reqAddress } from './api'
export default {
  name: 'app',
  components: {
    FooterNav: FooterNav
  },
  async mounted() {
    const result = await reqAddress('34.8068853983,113.7990029279')
    console.log(result)
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
