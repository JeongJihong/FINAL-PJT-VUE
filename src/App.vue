<template>
  <div id="app">
    <header-nav/>
    <search-nav/>
    <router-view/>
    <footer-nav/>
  </div>
</template>

<script>
import HeaderNav from '@/components/commons/HeaderNav';
import FooterNav from '@/components/commons/FooterNav';
import SearchNav from '@/components/commons/SearchNav';

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
