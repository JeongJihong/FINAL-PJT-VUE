<template>
  <section class="container">
    <!-- <map-view /> -->
    <!-- 아파트 검색 정보-->
    <search-apt></search-apt>
    
    <div class="m-5"></div>
    
    <!-- 연립 다세대 검색 정보 -->
    <search-house></search-house>
  </section>
</template>

<script>
import SearchApt from "@/components/search/SearchApt.vue";
import SearchHouse from "@/components/search/SearchHouse.vue";
// import MapView from "@/components/commons/MapView.vue";
export default {
  components: {
    SearchApt,
    SearchHouse,
  //   MapView,
  },
};
</script>

<style></style>
