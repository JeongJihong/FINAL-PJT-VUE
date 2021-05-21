<template>
  <div id="app">
    <header-nav/>
    <search-nav/>
    <router-view/>
    <footer-nav/>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav';
import FooterNav from '@/components/FooterNav';
import SearchNav from '@/components/SearchNav';

export default {
  name: 'App',

  components: {
    HeaderNav,
    FooterNav,
    SearchNav,

  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
