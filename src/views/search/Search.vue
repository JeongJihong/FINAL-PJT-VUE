<template>
  <section class="container">
    <!-- <map-view /> -->
    <!-- 상권 정보 요약 -->
    <div>{{ gugun }}</div>
    <div class="chart mx-auto">
      <search-shop :chart-data="datacollection"></search-shop>
    </div>
    <div class="m-5"></div>
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
import SearchShop from "@/components/search/SearchShop.js";
// import MapView from "@/components/commons/MapView.vue";
export default {
  data() {
    return {
      datacollection: {},
    };
  },

  computed: {
    gugun() {
      this.fillData();
      return this.$store.state.currentGugun;
    },
  },

  mounted () {
    this.fillData()
  },

  methods: {
    fillData () {
      let label = this.$store.state.currentGugun;
      let labels = ["관광/여가/오락", "부동산", "생활서비스", "소매", "숙박", "음식", "학문/교육"];
      let shop = this.$store.state.shop;
      let data = [];

      for(let i in labels) {
        let flag = false;

        for(let j in shop) {
          // console.log(shop[j].type);

          if(labels[i] === shop[j].type) {
            // console.log(shop[y]);
            data.push(shop[j].count);
            flag = true;
          }
        }
        if(!flag) {
          data.push(0);
        }
      }

      this.datacollection = {
        labels: labels,
        datasets: [
          {
            label: label,
            backgroundColor: 'rgba(28, 181, 224, 0.7)',
            data: data,
          },
        ]
      }
    },
  },

  components: {
    SearchApt,
    SearchHouse,
    SearchShop,
  //   MapView,
  },
};
</script>

<style>
  .chart {
    max-width:400px;
  }
</style>
