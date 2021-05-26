<template>
  <header>
    <div>
      <router-link to="/"><img style="height:75px; width: 200px;" src="@/assets/img/hh.png" /></router-link>
      <b-nav class="nav-nav">
        <b-nav-item active @click.prevent="searchArticle">자유게시판</b-nav-item>
        <b-nav-item active @click.prevent="searchQna">Q&A</b-nav-item>
        <b-nav-item><router-link v-if="loginState" to="/statistics" active>관심지역 비교분석</router-link></b-nav-item>
        <b-nav-item active></b-nav-item>
        

        <template v-if="!loginState">
          <b-nav-item active><router-link to="/mem/mvlogin">로그인</router-link></b-nav-item>
          <b-nav-text>|</b-nav-text>
          <b-nav-item active><router-link to="/mem/mvinsertmember">회원가입</router-link></b-nav-item>
        </template>

        <template v-if="loginState">
          <b-nav-item disabled><span class="text-primary">{{ loginId }}</span> 님 안녕하세요</b-nav-item>
          <b-nav-text>|</b-nav-text>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="MyPage"
            toggle-class="nav-link-custom"
          >
            <b-dropdown-item style="font-size: 20px"><a href="#logout" @click="logout">로그아웃</a></b-dropdown-item>
            <b-dropdown-item style="font-size: 20px"><router-link to="/mem/mvinsertmember">회원정보</router-link></b-dropdown-item>
            <!-- <b-dropdown-item style="font-size: 20px"><router-link to="/mem/delete">회원탈퇴</router-link></b-dropdown-item> -->
          </b-nav-item-dropdown>
        </template>
      </b-nav>
    </div>

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
  width: 250px;
  height: 250px;
}
.nav-nav {
  font-size: 20px;
  float: right;
}

.nav-nav a:link {
  color: #696969;
}

.nav-nav  a:visited {
  color: #696969;
} 

.nav-nav a:active {
  color: #696969;
}

.nav-nav a:hover {
  color: goldenrod;
}
</style>
