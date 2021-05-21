<template>
    <header>
        <!-- 로그인 메뉴 -->
        <div class="container-fluid navbar-dark bg-dark">
            <nav class="navbar navbar-expand-sm justify-content-end">

                <!-- <div id="nav-default">
                    <div class="navbar-collapse">
                        <ul class="navbar-nav">
                            <li class="nav-item"><router-link to="/mem/mvlogin" class="btn btn-sm btn-outline-light mr-2">Log in</router-link></li>
                            <li class="nav-item"><router-link to="/mem/mvinsertmember" class="btn btn-sm btn-outline-light mr-2">Sign up</router-link></li>
                            <li class="nav-item"><router-link to="/mem/mvfindpassword" class="btn btn-sm btn-outline-light mr-2">비밀번호 찾기</router-link></li>
                        </ul>
                    </div>
                </div> -->
                

                <div id="nav-login">
                    <div class="navbar-collapse">
                        <ul class="navbar-nav">
                            <li class="nav-item"><router-link class="logout-btn btn btn-sm btn-outline-light mr-2" to="/mem/logout">Logout</router-link></li>
                            <li class="nav-item"><router-link class="btn btn-sm btn-outline-light mr-2" to="/mem/mvuserinfo">회원정보</router-link></li>
                            <li class="nav-item"><router-link class="btn btn-sm btn-outline-danger mr-2" to="/mem/delete">회원탈퇴</router-link></li>
                        </ul>
                    </div>
                </div>
                
            </nav>
        </div>

        <!-- nav 메뉴 -->
        <div class="container-fluid" style="height:100 px;">
            <nav class="navbar navbar-expand-sm">
                <router-link to="/" class="nav-link text-dark"><i class="bi bi-house-fill" style="font-size:40px"></i></router-link>
            
                <div class="header_nav_menu navbar-collapse justify-content-end">
                    <ul class="navbar-nav">
                        <!-- <li class="nav-item"><router-link to="/article/list" class="btn mr-2">공지 사항</router-link></li> -->
                        <li class="nav-item"><button class="btn mr-2" @click.prevent="searchQna">QnA</button></li>
                        <li class="nav-item"><button type="button" class="btn mr-2">오늘의 뉴스</button></li>
                        <li class="nav-item"><button type="button" class="btn mr-2">주변 탐방</button></li>

                    </ul>
                    <div style="display:none;">
                        <ul>
                            <li class="nav-item"><button type="button" class="btn mr-2 favorarea" style="display:none;">관심 지역 설정</button></li>
                            <li class="nav-item"><button type="button" class="btn mr-2 favorarea" >관심 지역 둘러보기</button></li>
                        </ul>
                    </div>						
                            

                    <div class="nav-item">
                        <div class="form-inline">
                            <input type='text' v-model="searchText" class="form-control mr-sm-2" placeholder="아파트 이름">
                            <router-link to="search" class="btn btn-outline-secondary my-2 my-sm-0">Search</router-link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <!-- header 타이틀 -->
        <div class="jumbotron jumbotron-fluid to-post-list mb-0" v-bind:style="{ 'background-image':'url(@/assets/img/jumboimg.jpg)'}">
            <div class="container-fluid text-center">
                <h2><router-link to="/" style="color:white; text-decoration:none"><b>HAPPY HOUSE</b></router-link></h2>
                <hr class="my-4">
                <h6 class="text-white">행복한 우리 집</h6>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'HeaderNav',

    data() {
        return {
            searchText: '',
        };
    },

    methods: {
        ...mapActions({
            getAptListByAptName: "getAptListByAptName",
            getQnaList: "getQnaList",
        }),

        searchQna() {
            if(this.$route.path !== "/qna/list") this.$router.replace("/qna/list");
        }
	},
}
</script>

<style>

</style>