<template>
    <section class="mb-3">
		<div class="text-center">
			<div class="dropdown bg-dark p-1">
				<div class="btn-group">
					<div class="text-white mr-2">도시 <select class="btn btn-light p-1" v-model="selectSido">
						<option value="0" class="text-dark">선택</option>
						<option v-for="(sido, index) in sidos" :key="index" :value=sido.sido_code>{{ sido.sido_name }}</option>
					</select></div>
					<div class="text-white mr-2">구 <select class="btn btn-light p-1" v-model="selectGugun">
						<option value="0" class="text-dark">선택</option>
						<option v-for="(gugun, index) in guguns" :key="index" :value=gugun.gugun_code>{{ gugun.gugun_name }}</option>
					</select></div>
					<div class="text-white mr-2">동 <select class="btn btn-light p-1" v-model="selectDong">
						<option value="0" class="text-dark">선택</option>
						<option v-for="(dong, index) in dongs" :key="index" :value=dong.dong>{{ dong.dong }}</option>
					</select></div>
					<div class="text-white mr-2">년 <select class="btn btn-light p-1" v-model="selectYear">
						<option value="0" class="text-dark">선택</option>
						<option v-for="index in 22" :key="index + 1999" :value="index + 1999">{{ index + 1999 + " 년" }}</option>
					</select></div>
					<div class="text-white mr-2">월 <select class="btn btn-light p-1" v-model="selectMonth">
						<option v-for="index in 12" :key="index" :value="index">{{ index + " 월" }}</option>
					</select></div>
					
					<!-- <button id="insert_interest_btn" class="btn btn-outline-light ml-2 mr-5 pt-0 pb-0">관심지역등록</button>
				
					<div class="btn-group">
						<div class="text-white mr-2">관심지역 <select id="interest" name="interest" class="btn btn-light p-0">
							<option value="0" class="text-dark">선택</option>
						</select></div>
					</div>
					<button type="submit" class="btn btn-outline-light ml-2 mr-2 pt-0 pb-0">Search</button>
					<button type="button" id="delete_interest_btn" class="btn btn-outline-light ml-2 pt-0 pb-0">관심지역삭제</button> -->
				</div>
				<button class="btn btn-outline-light ml-2 mr-2 pt-1 pb-1" @click.prevent="searchAptList()">Search</button>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex'
export default {
    name: 'SearchNav',

	data() {
        return {
            selectSido: '0',
			selectGugun: '0',
			selectDong: '0',
			selectYear: '2021',
			selectMonth: '1',
        };
    },

	methods: {
		...mapActions({
			getSidoList: "getSidoList",
			getGugunList: "getGugunList",
			getDongList: "getDongList",
			getAptList: "getAptList",
			getHouseList: "getHouseList",
			getAptListByDong: "getAptListByDong",
			getShopData: "getShopData",
			getShopAvgData: "getShopAvgData",
		}),

		searchAptList() {
			let date = "";
			if(this.selectMonth < 10) {
				date = [this.selectYear, 0, this.selectMonth].join("")
			} else {
				date = [this.selectYear, this.selectMonth].join("")
			}

			this.getAptList({ "dong": this.selectGugun, "date": date });
			this.getHouseList({ "dong": this.selectGugun, "date": date });
			this.getShopAvgData({ "gugun": this.selectGugun });
			this.getShopData({ "gugun": this.selectGugun, "dong": this.selectDong });
			if(this.$route.path !== "/search") this.$router.replace("/search");
		},

		searchByDong() {
			// console.log(this.selectGugun + "|" + this.selectDong);
			this.getAptListByDong(this.selectDong);
			if(this.$route.path !== "/search") this.$router.replace("/search");
		},
	},
    
	computed: {
		sidos() {
			return this.$store.state.sido;
		},

		guguns() {
			return this.$store.state.gugun;
		},

		dongs() {
			return this.$store.state.dong;
		},
	},

	watch: {
		selectSido: function(val) {
			// console.log(val);
			this.getGugunList(val);

			this.selectGugun = "0";
			this.selectDong = "0";
		},

		selectGugun: function(val) {
			// console.log(val);
			this.getDongList(val);

			this.selectDong = "0";
		}
	},

    created() {
        const addr = 'http://localhost/map/sido';

        axios
        .get(addr)
        .then((response) => {
            // console.log(response.data);
            this.getSidoList(response.data);
        })
        .catch((error) => {
            console.dir(error);
        });
    },

	
  // created: {
  //   getAptList({ commit }, data) {
  //     const SERVICE_URL =
  //       "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade";
  //     const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

  //     const params = {
  //       LAWD_CD: data.dong,
  //       DEAL_YMD: data.date,
  //       serviceKey: decodeURIComponent(SERVICE_KEY),
  //     };
  //     // console.log(params);

  //     axios
  //       .get(SERVICE_URL, {
  //         params,
  //       })
  //       .then((response) => {
  //         // console.log(response.data);
  //         if (response.data.response.body.items === "") {
  //           commit("GET_APT_LIST", []);
  //         } else {
  //           commit("GET_APT_LIST", response.data.response.body.items.item);
  //         }
  //       })
  //       .catch((error) => {
  //         console.dir(error);
  //       });
  //   },

  //   getHouseList({ commit }, data) {
  //     const SERVICE_URL =
  //       "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHTrade";
  //     const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

  //     const params = {
  //       LAWD_CD: data.dong,
  //       DEAL_YMD: data.date,
  //       serviceKey: decodeURIComponent(SERVICE_KEY),
  //     };
  //     // console.log(params);

  //     axios
  //       .get(SERVICE_URL, {
  //         params,
  //       })
  //       .then((response) => {
  //         // console.log(response.data);
  //         if (response.data.response.body.items === "") {
  //           commit("GET_HOUSE_LIST", []);
  //         } else {
  //           commit("GET_HOUSE_LIST", response.data.response.body.items.item);
  //         }
  //       })
  //       .catch((error) => {
  //         console.dir(error);
  //       });
  //   },
  // },
}

</script>

<style>

</style>