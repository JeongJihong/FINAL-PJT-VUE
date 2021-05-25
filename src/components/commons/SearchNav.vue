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
					<button v-if="loginState" class="btn btn-outline-light rounded ml-2 mr-1 pt-1 pb-1" @click.prevent="addInterest">관심지역등록</button>
					<button class="btn btn-outline-light rounded ml-2 mr-5 pt-1 pb-1" @click.prevent="searchAptList()">Search</button>

					<div v-if="loginState">
						<div class="btn-group">
							<div class="text-white mr-2">관심지역 <select class="btn btn-light p-1" v-model="selectInterest">
								<option value="0" class="text-dark">선택</option>
								<option v-for="(data, index) in interest" :key="index" :value=data.dong>{{ String(data.dong).split(" ")[1] }}</option>
							</select></div>
						</div>
						<button class="btn btn-outline-light rounded ml-2 mr-1 pt-1 pb-1" @click.prevent="searchAptListByInterest">Search</button>
						<button class="btn btn-outline-light rounded ml-2 mr-1 pt-1 pb-1" @click.prevent="removeInterest">관심지역삭제</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'SearchNav',

	data() {
        return {
            selectSido: '0',
			selectGugun: '0',
			selectDong: '0',
			selectYear: '2021',
			selectInterest: '0',
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
			insertInterest: "insertInterest",
			deleteInterest: "deleteInterest",
		}),

		searchAptList() {
			let date = "";
			if(this.selectMonth < 10) {
				date = [this.selectYear, 0, this.selectMonth].join("")
			} else {
				date = [this.selectYear, this.selectMonth].join("")
			}

			this.getAptList({ "gugun": this.selectGugun, "dong": this.selectDong, "date": date });
			this.getHouseList({ "gugun": this.selectGugun, "dong": this.selectDong, "date": date });
			this.getShopAvgData({ "gugun": this.selectGugun });
			this.getShopData({ "gugun": this.selectGugun, "dong": this.selectDong });
			if(this.$route.path !== "/search") this.$router.replace("/search");
		},

		addInterest() {
			if(this.selectGugun === "0" || this.selectDong === "0") return;
			const addr = 'http://localhost/map/interest';
			let data = { id: this.loginId, dong: this.selectGugun + " " + this.selectDong };

			console.log(data);

			axios
			.post(addr, data)
			.then((response) => {
				// console.log(response.data);
				this.insertInterest(response.data);
			})
			.catch((error) => {
				console.dir(error);
			});
		},

		removeInterest() {
			if(this.selectInterest === "0") return;
			const addr = 'http://localhost/map/interest';
			let data = { id: this.loginId, dong: this.selectInterest };
			
			console.log(data);

			axios
			.delete(addr, {
				data: data
			})
			.then((response) => {
				// console.log(response.data);
				this.deleteInterest(response.data);
			})
			.catch((error) => {
				console.dir(error);
			});

			this.selectInterest = "0";
		},

		searchAptListByInterest() {
			let date = "";
			if(this.selectMonth < 10) {
				date = [this.selectYear, 0, this.selectMonth].join("")
			} else {
				date = [this.selectYear, this.selectMonth].join("")
			}

			const word = String(this.selectInterest).split(" ");
			const gugun = word[0];
			const dong = word[1];
			console.log(word);

			this.getAptList({ "gugun": gugun, "dong": dong, "date": date });
			this.getHouseList({ "gugun": gugun, "dong": dong, "date": date });
			this.getShopAvgData({ "gugun": gugun });
			this.getShopData({ "gugun": gugun, "dong": dong });

			if(this.$route.path !== "/search") this.$router.replace("/search");
		},
	},
    
	computed: {
		...mapGetters(["loginState", "loginId"]),

		sidos() {
			return this.$store.state.sido;
		},

		guguns() {
			return this.$store.state.gugun;
		},

		dongs() {
			return this.$store.state.dong;
		},

		interest() {
			return this.$store.state.interest;
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