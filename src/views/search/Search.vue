<template>
    <section class="container-fluid">
        <!-- 환경점검 데이터 -->
        <div class="mb-2" v-if="searchData.envcheck !== null">
            <b-row><b-button v-b-toggle.collapse-1 variant="primary" class="m-2">환경 점검 내역</b-button></b-row>
            <b-collapse id="collapse-1" class="mt-2">
                <b-row>
                    <div v-if="searchData.envcheck.length == 0" class="card col-sm-3 p-0 m-2 bg-light">
                        <div class="card-header">환경 점검 : 결과 없음</div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <h6>해당하는 검색 결과가 없습니다</h6>
                            </blockquote>
                        </div>
                    </div>
                    
                    <template v-for="(env, index) in searchData.envcheck">
                        <div v-if="env.hasProblem === 'N'" class="card col-sm-3 p-0 m-2 bg-light" :key="index">
                            <div class="card-header">환경 점검 : {{ env.coType }}</div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <h5>{{ env.coName }}</h5>
                                    <h6>주소 : {{ env.coAddr }}</h6>
                                    <h6>내용 : {{ env.checkDetail }}</h6>
                                    <h6>날짜 : {{ env.checkDate }}</h6>
                                    <h6>결과 : 문제 없음</h6>
                                </blockquote>
                            </div>
                        </div>

                        <div v-if="env.hasProblem === 'Y'" class="card col-sm-3 p-0 m-2 bg-danger" :key="index">
                            <div class="card-header text-white">환경 점검 : {{ env.coType }}</div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <h5 class="text-white">{{ env.coName }}</h5>
                                    <h6 class="text-white">주소 : {{ env.coAddr }}</h6>
                                    <h6 class="text-white">내용 : {{ env.checkDetail }}</h6>
                                    <h6 class="text-white">날짜 : {{ env.checkDate }}</h6>
                                    <h6 class="text-white">결과 : 문제 없음</h6>
                                </blockquote>
                            </div>
                        </div>
                    </template>
                </b-row>
            </b-collapse>
        </div>
			
        <!-- 병원 데이터 -->
        <div class="mb-2" v-if="searchData.hospitaldata !== null">
            <b-row><b-button v-b-toggle.collapse-2 variant="primary" class="m-2">국민 안심병원 정보</b-button></b-row>
            <b-collapse id="collapse-2" class="mt-2">
                <b-row>
                    <div v-if="searchData.hospitaldata.length == 0" class="card col-sm-3 p-0 m-2 bg-success">
                        <div class="card-header text-white">국민 안심병원 : 결과 없음</div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <h6 class="text-white">해당하는 검색 결과가 없습니다</h6>
                            </blockquote>
                        </div>
                    </div>

                    <template v-for="(hospital, index) in searchData.hospitaldata">
                        <div class="card col-sm-3 p-0 m-2 bg-success" :key="index">
                            <div class="card-header text-white">{{ hospital.hname }}</div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <h6 class="text-white">주소 : {{ hospital.haddr }}</h6>
                                    <h6 class="text-white">tel : {{ hospital.htel }}</h6>
                                    <h6 v-if="hospital.htype === 'A'" class="text-white">진료 : 외래진료</h6>
                                    <h6 v-if="hospital.htype === 'B'" class="text-white">진료 : 입원</h6>
                                </blockquote>
                            </div>
                        </div>
                    </template>
                </b-row>
            </b-collapse>
        </div>
		
		<div class="mb-2">
            <b-row>
                <div v-if="searchData.housedeal.length == 0" class="card col-sm-2 p-0 m-2">
                    <div class="card-header">결과 없음</div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <h6>해당하는 검색 결과가 없습니다</h6>
                        </blockquote>
                    </div>
                </div>

                <template v-for="(deal, index) in searchData.housedeal">
                    <div class="card col-sm-2 p-0 m-2" :key="index">
                        <div class="card-header">{{ deal.aptName }}</div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <h6>동 : {{deal.dong }}</h6>
                                <h6>가격 : {{ deal.dealAmount }}</h6>
                                <h6>날짜 : {{ deal.dealYear }}년 {{ deal.dealMonth }}월 {{ deal.dealDay }}일</h6>
                            </blockquote>
                        </div>
                    </div>
                </template>
            </b-row>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['searchData'])
    },
}
</script>

<style>

</style>