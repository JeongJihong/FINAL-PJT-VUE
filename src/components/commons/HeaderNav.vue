<template>
  <header>
    <div>
      <router-link to="/"><img style="height:100px; width: 250px;" src="@/assets/img/hh.png" /></router-link>
      <b-nav class="nav-nav">
        <b-nav-item active @click.prevent="searchArticle">자유게시판</b-nav-item>
        <b-nav-item active @click.prevent="searchQna">Q&A</b-nav-item>
        <b-nav-item active>오늘의 뉴스</b-nav-item>
        <b-nav-item active>주변 탐방</b-nav-item>
        <b-nav-item active></b-nav-item>
        

        <template v-if="!loginState">
          <b-nav-item active><router-link to="/mem/mvlogin">로그인</router-link></b-nav-item>
          <b-nav-text>|</b-nav-text>
          <b-nav-item active><router-link to="/mem/mvinsertmember">회원가입</router-link></b-nav-item>
        </template>

        <template v-if="loginState">
          <b-nav-item disabled>{{ loginId }} 님 안녕하세요</b-nav-item>
          <b-nav-text>|</b-nav-text>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="MyPage"
            toggle-class="nav-link-custom"
          >
            <b-dropdown-item style="font-size: 20px"><a href="#logout" @click="logout">로그아웃</a></b-dropdown-item>
            <b-dropdown-item style="font-size: 20px"><router-link to="/mem/mvinsertmember">회원정보</router-link></b-dropdown-item>
            <b-dropdown-item style="font-size: 20px"><router-link to="/mem/delete">회원탈퇴</router-link></b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- <b-nav-item active><a href="#logout" @click="logout">로그아웃</a></b-nav-item>
          <b-nav-text>|</b-nav-text>
          <b-nav-item active><router-link to="/mem/mvuserinfo">회원정보</router-link></b-nav-item>
          <b-nav-text>|</b-nav-text>
          <b-nav-item active><router-link to="/mem/delete">회원탈퇴</router-link></b-nav-item> -->
        </template>
      </b-nav>
    </div>


    <!-- 로그인 메뉴 -->
    <!-- <div class="container-fluid navbar-dark bg-dark">
      <nav class="navbar navbar-expand-sm justify-content-end">
        <div v-if="!loginState">
          <div class="navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item"><router-link to="/mem/mvlogin" class="btn btn-sm btn-outline-light mr-2">Log in</router-link></li>
              <li class="nav-item"><router-link to="/mem/mvinsertmember" class="btn btn-sm btn-outline-light mr-2">Sign up</router-link></li>
              <li class="nav-item"><router-link to="/mem/mvfindpassword" class="btn btn-sm btn-outline-light mr-2">비밀번호 찾기</router-link></li>
            </ul>
          </div>
        </div>

        <div v-if="loginState">
          <div class="navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button class="logout-btn btn btn-sm btn-outline-light mr-2" @click="logout">Logout</button>
              </li>
              <li class="nav-item">
                <router-link class="btn btn-sm btn-outline-light mr-2" to="/mem/mvuserinfo">회원정보</router-link>
              </li>
              <li class="nav-item">
                <router-link class="btn btn-sm btn-outline-danger mr-2" to="/mem/delete">회원탈퇴</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div> -->

    <!-- nav 메뉴 -->
    <!-- <div class="container-fluid" style="height: 100 px">
      <nav class="navbar navbar-expand-sm">
        <router-link to="/" class="nav-link text-dark"
          ><i class="bi bi-house-fill" style="font-size: 40px"></i
        ></router-link>

        <div class="header_nav_menu navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <button class="btn mr-2" @click.prevent="searchArticle">자유게시판</button>
            </li>
            <li class="nav-item">
              <button class="btn mr-2" @click.prevent="searchQna">QnA</button>
            </li>
            <li class="nav-item"><button type="button" class="btn mr-2">오늘의 뉴스</button></li>
            <li class="nav-item"><button type="button" class="btn mr-2">주변 탐방</button></li>
          </ul>
          <div style="display: none">
            <ul>
              <li class="nav-item">
                <button type="button" class="btn mr-2 favorarea" style="display: none">
                  관심 지역 설정
                </button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn mr-2 favorarea">관심 지역 둘러보기</button>
              </li>
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
    </div> -->

    <!-- header 타이틀 -->
    <!-- <div class="jumbotron jumbotron-fluid to-post-list mb-0" v-bind:style="{ 'background-image':''}">
            <div class="container-fluid text-center">
                <h2><router-link to="/" style="color:white; text-decoration:none"><b>HAPPY HOUSE</b></router-link></h2>
                <hr class="my-4">
                <h6 class="text-white">행복한 우리 집</h6>
            </div>
        </div> -->
    <div class="container-fluid text-center">
      <router-link to="/"><img src="../../assets/img/happyhouse.png" /></router-link>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HeaderNav",

  data() {
    return {
      searchText: "",
    };
  },

  computed: {
    ...mapGetters(["loginState", "loginId"]),
  },

  methods: {
    ...mapActions({
      getAptListByAptName: "getAptListByAptName",
      getQnaList: "getQnaList",
      logoutMember: "logoutMember",
    }),

    logout() {
      this.logoutMember();
      if (this.$route.path !== "/") this.$router.replace("/");
    },

    searchQna() {
      if (this.$route.path !== "/qna/list") this.$router.replace("/qna/list");
    },

    searchArticle() {
      if (this.$route.path !== "/article/list") this.$router.replace("/article/list");
    },
  },
};
</script>

<style>
img {
  width: 400px;
  height: 400px;
}
.nav-nav {
  font-size: 20px;
  float: right;
}
</style>
