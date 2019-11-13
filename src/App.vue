<template>
  <div id="app">
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
</style>
