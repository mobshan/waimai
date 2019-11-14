<template>
  <div id="app">
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1331186_krncm9pw1d.css" />
    <router-view></router-view>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav/FooterNav'
export default {
  name: 'app',
  components: {
    FooterNav: FooterNav
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
