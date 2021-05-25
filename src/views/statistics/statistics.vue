<template>
  <div>
    <statistics-shop-radar id="radar" :chart-data="radardatacollection"></statistics-shop-radar>
    <div v-for="(item, index) in interest" :key="index">{{ item.dong }}</div>
  </div>
</template>

<script>
import StatisticsShopRadar from "@/components/statistics/statisticsShopRadar.js";
import axios from 'axios';

export default {
  data() {
    return {
      radardatacollection: {},
    };
  },

  computed: {
    interest() {
      this.fillData();
			return this.$store.state.interest;
    },
  },

  mounted () {
    this.fillData()
  },

  methods: {
    fillData () {
      const addr = "http://localhost/shop/data";
      let labels = ["관광/여가/오락", "부동산", "생활서비스", "소매", "숙박", "음식", "학문/교육"];
      let datasets = [];
      const interest = this.$store.state.interest;

      for(let index in interest) {
        const data = String(interest[index].dong).split(" ");
        // console.log(data);

        axios
          .get(addr, {
            params: { gugun: data[0], dong: data[1] },
          })
          .then((response) => {
            const responseData = response.data;
            let tmp = [];
            // console.log(responseData);

            for(let i in labels) {
              let flag = false;
              
              for(let j in responseData) {
                if(labels[i] === responseData[j].type) {
                  tmp.push(responseData[j].count);
                  flag = true;
                }
              }
              if(!flag) {
                tmp.push(0);
              }
            }

            datasets.push({
              label: data[1],
              backgroundColor: 'rgba(' + this.getRandomInt() + ',' + this.getRandomInt() + ',' + this.getRandomInt() + ',0.5)',
              data: tmp,
            });

            this.radardatacollection = {
              labels: labels,
              datasets: datasets,
            };
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },

    getRandomInt () {
        return Math.floor(Math.random() * 255);
    },
  },

  components: {
    StatisticsShopRadar,
  },
}

</script>

<style>
  #radar {
    min-height: 800px;
    max-height: 800px;
    min-width: 800px;
    max-width: 800px;
  }
</style>