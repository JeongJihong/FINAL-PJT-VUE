<template>
  <div class="container">
    <h3 class="font-weight-bold text-center my-4">데이터 비교 분석</h3>
    <b-row>
      <statistics-shop-radar id="radar" class="mx-auto" :chart-data="radarDataCollection"></statistics-shop-radar>
      <div class="mx-auto">
        <b-carousel
          id="carousel"
          v-model="slide"
          :interval="5000"
          controls
          indicators
          background="#AAAAAA"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide img-blank img-alt="Blank image">
            <h4 class="font-weight-bold text-center my-4">항목 별 데이터 비교</h4>
            <img
              class="d-block img-fluid w-100"
              width="350"
              height="350"
              src="@/assets/img/magnifying-icon-file.png"
              alt="image slot"
            >
          </b-carousel-slide>
          <template v-for="(item, index) in barDataCollection">
            <b-carousel-slide img-blank img-alt="Blank image" :key=index>
              <h4 class="font-weight-bold text-center my-4">{{ item.labels[0] }}</h4>
              <statistics-shop-bar class="m-auto bar" :chart-data="item"></statistics-shop-bar>
            </b-carousel-slide>
          </template>
        </b-carousel>
      </div>
    </b-row>
    <div class="m-5"></div>
    <div class="d-none">{{ interest }}</div>
  </div>
</template>

<script>
import StatisticsShopRadar from "@/components/statistics/statisticsShopRadar.js";
import StatisticsShopBar from "@/components/statistics/statisticsShopBar.js";
import axios from 'axios';

export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      radarDataCollection: {},
      barDataCollection: [],
    };
  },

  computed: {
    interest() {
      this.fillData();
			return this.$store.state.interest;
    },
  },

  mounted () {
    this.fillData();
  },

  methods: {
    onSlideStart() {
      this.sliding = true
    },

    onSlideEnd() {
      this.sliding = false
    },

    fillData () {
      this.barDataCollection = [];
      const addr = "http://localhost/shop/data";
      let labels = ["관광/여가/오락", "부동산", "생활서비스", "소매", "숙박", "음식", "학문/교육"];
      let radarDatasets = [];
      const interest = this.$store.state.interest;

      // bar 데이터 초기화
      for(let i in labels) {
        this.barDataCollection[i] = { labels: [labels[i]], datasets: [] };
        for(let j in interest) {
          this.barDataCollection[i].datasets.push({
              label: interest[j],
              backgroundColor: '',
              data: [0],
            });
        }
      }

      for(let index in interest) {
        const data = String(interest[index].dong).split(" ");
        const color = 'rgba(' + this.getRandomInt() + ',' + this.getRandomInt() + ',' + this.getRandomInt() + ',0.5)';
        // console.log(data);

        for(let i in labels) {
          this.barDataCollection[i].datasets[index].label = data[1];
          this.barDataCollection[i].datasets[index].backgroundColor = color;
        }

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
                  this.barDataCollection[i].datasets[index].data = [responseData[j].count];
                  tmp.push(responseData[j].count);
                  flag = true;
                }
              }
              if(!flag) {
                this.barDataCollection[i].datasets[index].data = [0];
                tmp.push(0);
              }
            }

            radarDatasets.push({
              label: data[1],
              backgroundColor: color,
              data: tmp,
            });

            this.radarDataCollection = {
              labels: labels,
              datasets: radarDatasets,
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
    StatisticsShopBar,
  },
}

</script>

<style>
  #carousel {
    min-height: 500px;
    max-height: 500px;
    min-width: 500px;
    max-width: 500px;
  }

  #radar {
    min-height: 500px;
    max-height: 500px;
    min-width: 500px;
    max-width: 500px;
  }

  .bar {
    min-height: 350px;
    max-height: 350px;
    min-width: 350px;
    max-width: 350px;
    background-color: #FFFFFF;
  }

</style>