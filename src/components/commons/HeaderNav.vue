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
              <li class="nav-item">
                <router-link class="logout-btn btn btn-sm btn-outline-light mr-2" to="/mem/logout"
                  >Logout</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="btn btn-sm btn-outline-light mr-2" to="/mem/mvuserinfo"
                  >회원정보</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="btn btn-sm btn-outline-danger mr-2" to="/mem/delete"
                  >회원탈퇴</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <!-- nav 메뉴 -->
    <div class="container-fluid" style="height: 100 px">
      <nav class="navbar navbar-expand-sm">
        <router-link to="/" class="nav-link text-dark"
          ><i class="bi bi-house-fill" style="font-size: 40px"></i
        ></router-link>

        <div class="header_nav_menu navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <!-- <li class="nav-item"><router-link to="/article/list" class="btn mr-2">공지 사항</router-link></li> -->
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

          <!-- <div class="nav-item">
                        <div class="form-inline">
                            <input type='text' v-model="searchText" class="form-control mr-sm-2" placeholder="아파트 이름">
                            <router-link to="search" class="btn btn-outline-secondary my-2 my-sm-0">Search</router-link>
                        </div>
                    </div> -->
        </div>
      </nav>
    </div>
    <!-- header 타이틀 -->
    <!-- <div class="jumbotron jumbotron-fluid to-post-list mb-0" v-bind:style="{ 'background-image':'url(data:image/png;base64,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)'}">
            <div class="container-fluid text-center">
                <h2><router-link to="/" style="color:white; text-decoration:none"><b>HAPPY HOUSE</b></router-link></h2>
                <hr class="my-4">
                <h6 class="text-white">행복한 우리 집</h6>
            </div>
        </div> -->
            <div class="container-fluid text-center">
                <router-link to="/"><img src="../../assets/img/happyhouse.png"></router-link>
            </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HeaderNav",

  data() {
    return {
      searchText: "",
    };
  },

  methods: {
    ...mapActions({
      getAptListByAptName: "getAptListByAptName",
      getQnaList: "getQnaList",
    }),

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
</style>
