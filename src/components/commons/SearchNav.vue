<template>
    <section class="mb-3">
		<div class="text-center">
			<div class="dropdown bg-dark p-1">
				<div class="btn-group">
					<div class="btn-group">
						<div class="text-white mr-2">도시 <select id="sido" class="btn btn-light p-0" v-model="selectSido">
							<option value="0" class="text-dark">선택</option>
							<option v-for="(sido, index) in sidos" :key="index" :value=sido.sido_code>{{ sido.sido_name }}</option>
						</select></div>
						<div class="text-white mr-2">구 <select id="gugun" class="btn btn-light p-0" v-model="selectGugun">
							<option value="0" class="text-dark">선택</option>
							<option v-for="(gugun, index) in guguns" :key="index" :value=gugun.gugun_code>{{ gugun.gugun_name }}</option>
						</select></div>
						<div class="text-white mr-2">동 <select id="dong" class="btn btn-light p-0" v-model="selectDong">
							<option value="0" class="text-dark">선택</option>
							<option v-for="(dong, index) in dongs" :key="index" :value=dong.dong>{{ dong.dong }}</option>
						</select></div>
					</div>
					<button class="btn btn-outline-light ml-2 mr-2 pt-0 pb-0" @click.prevent="searchByDong()">Search</button>
					<!-- <button id="insert_interest_btn" class="btn btn-outline-light ml-2 mr-5 pt-0 pb-0">관심지역등록</button>
				
					<div class="btn-group">
						<div class="text-white mr-2">관심지역 <select id="interest" name="interest" class="btn btn-light p-0">
							<option value="0" class="text-dark">선택</option>
						</select></div>
					</div>
					<button type="submit" class="btn btn-outline-light ml-2 mr-2 pt-0 pb-0">Search</button>
					<button type="button" id="delete_interest_btn" class="btn btn-outline-light ml-2 pt-0 pb-0">관심지역삭제</button> -->
				</div>
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
        };
    },

	methods: {
		...mapActions({
			getSidoList: "getSidoList",
			getGugunList: "getGugunList",
			getDongList: "getDongList",
			getAptListByDong: "getAptListByDong",
		}),

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
}

</script>

<style>

</style>