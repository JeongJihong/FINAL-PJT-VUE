<template>
  <section class="container">
    <!-- <map-view /> -->
    <!-- 상권 정보 요약 -->
    <b-row class="mx-auto">
      <div class="data d-inline-block m-3">
        <search-shop :chart-data="datacollection"></search-shop>
      </div>
      <div v-if="shopAvg.length > 0" class="d-inline-block m-4">
        <h3 class="font-weight-bold text-center m-4">{{ gugun }} 평균</h3>
        <h5 v-for="(item, index) in shopAvg" class="m-3" :key="index">{{ item.type }} : {{ parseInt(item.count) }}</h5>
      </div>
      <div v-if="shop.length > 0" class="d-inline-block m-4">
        <h3 class="font-weight-bold text-center m-4">{{ dong }}</h3>
        <h5 v-for="(item, index) in shop" class="m-3" :key="index">{{ item.type }} : {{ parseInt(item.count) }}</h5>
      </div>
    </b-row>
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

    dong() {
      return this.$store.state.currentDong;
    },

    shop() {
      return this.$store.state.shop;
    },

    shopAvg() {
      return this.$store.state.shopAvg;
    },
  },

  mounted () {
    this.fillData()
  },

  methods: {
    fillData () {
      let label = [this.$store.state.currentGugun, this.$store.state.currentDong];
      let labels = ["관광/여가/오락", "부동산", "생활서비스", "소매", "숙박", "음식", "학문/교육"];
      let shopAvg = this.$store.state.shopAvg;
      let shop = this.$store.state.shop;
      let shopAvgData = [];
      let shopData = [];

      for(let i in labels) {
        let flag = false;

        for(let j in shopAvg) {
          // console.log(shop[j].type);

          if(labels[i] === shopAvg[j].type) {
            // console.log(shop[y]);
            shopAvgData.push(shopAvg[j].count);
            flag = true;
          }
        }
        if(!flag) {
          shopAvgData.push(0);
        }
      }

      for(let i in labels) {
        let flag = false;

        for(let j in shop) {
          // console.log(shop[j].type);

          if(labels[i] === shop[j].type) {
            // console.log(shop[y]);
            shopData.push(shop[j].count);
            flag = true;
          }
        }
        if(!flag) {
          shopData.push(0);
        }
      }

      let datasets = [{
            label: label[0],
            backgroundColor: 'rgba(28, 181, 224, 0.5)',
            data: shopAvgData,
          }];
      
      if(shop.length > 0) {
        datasets.push({
          label: label[1],
          backgroundColor: 'rgba(181, 28, 128, 0.7)',
          data: shopData,
        });
      }

      this.datacollection = {
        labels: labels,
        datasets: datasets,
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
    min-height: 400px;
    max-height: 400px;
    min-width: 400px;
    max-width: 400px;
  }
</style>
