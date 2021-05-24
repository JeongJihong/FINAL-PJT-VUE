import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

//import happyHouse from "@/js/http-happy-house";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apts: [],
    aptsLength: 0,
    houses: [],
    housesLength: 0,
    sido: [],
    gugun: [],
    dong: [],

    qnas: [],
    qna: [],

    articles: [],
    article: [],

    members: [],
    member: [],
    loginState: false,
  },

  getters: {
    qnaData(state) {
      return state.qnas;
    },

    qna(state) {
      return state.qna;
    },

    articleData(state) {
      return state.articles;
    },

    article(state) {
      return state.article;
    },

    memberData(state) {
      return state.members;
    },

    member(state) {
      return state.member;
    },

    loginState(state) {
      return state.loginState;
    },
  },

  mutations: {
    GET_APT_LIST(state, apts) {
      // console.log(state, apts);
      state.apts = apts;
      state.aptsLength = apts.length;
    },

    GET_HOUSE_LIST(state, houses) {
      // console.log(state, apts);
      state.houses = houses;
      state.housesLength = houses.length;
    },

    GET_SIDO_LIST(state, sido) {
      state.sido = sido;
    },

    GET_GUGUN_LIST(state, gugun) {
      state.gugun = gugun;
    },

    GET_DONG_LIST(state, dong) {
      state.dong = dong;
    },

    GET_APT_LIST_BY_DONG(state, apts) {
      // console.log(apts);
      state.apts = apts;
    },

    GET_APT_LIST_BY_APT_NAME(state, apts) {
      // console.log(apts);
      state.apts = apts;
    },

    GET_QNA_LIST(state, qnas) {
      state.qnas = qnas;
    },

    GET_QNA(state, qna) {
      state.qna = qna;
    },

    SEARCH_QNA_LIST(state, qnas) {
      // console.log(qnas);
      state.qnas = qnas;
    },

    GET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },

    GET_ARTICLE(state, article) {
      state.article = article;
    },

    GET_MEMBER_LIST(state, members) {
      state.members = members;
    },

    GET_MEMBER(state, member) {
      state.member = member;
    },

    LOGIN_MEMBER(state) {
      state.loginState = true;
    },

    LOGOUT_MEMBER(state) {
      state.loginState = false;
    },
  },

  actions: {
    getAptList({ commit }, data) {
      const SERVICE_URL =
        "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade";
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

      const params = {
        LAWD_CD: data.dong,
        DEAL_YMD: data.date,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      // console.log(params);

      axios
        .get(SERVICE_URL, {
          params,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.response.body.items === "") {
            commit("GET_APT_LIST", []);
          } else {
            commit("GET_APT_LIST", response.data.response.body.items.item);
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getHouseList({ commit }, data) {
      const SERVICE_URL =
        "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHTrade";
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

      const params = {
        LAWD_CD: data.dong,
        DEAL_YMD: data.date,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      // console.log(params);

      axios
        .get(SERVICE_URL, {
          params,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.response.body.items === "") {
            commit("GET_HOUSE_LIST", []);
          } else {
            commit("GET_HOUSE_LIST", response.data.response.body.items.item);
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getSidoList({ commit }, data) {
      commit("GET_SIDO_LIST", data);
      // const addr = 'http://localhost/map/sido';

      // axios
      //   .get(addr)
      //   .then((response) => {
      //       // console.log(response.data);
      //       commit('GET_SIDO_LIST', response.data);
      //   })
      //   .catch((error) => {
      //       console.dir(error);
      //   });
    },

    getGugunList({ commit }, code) {
      const addr = "http://localhost/map/gugun/";

      axios
        .get(addr + code)
        .then((response) => {
          // console.log(response.data);
          commit("GET_GUGUN_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getDongList({ commit }, code) {
      const addr = "http://localhost/map/dong/";

      axios
        .get(addr + code)
        .then((response) => {
          // console.log(response.data);
          commit("GET_DONG_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getAptListByDong({ commit }, text) {
      const addr = "http://localhost/search/dong/";

      axios
        .get(addr + text)
        .then((response) => {
          // console.log(response.data);
          commit("GET_APT_LIST_BY_DONG", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getAptListByAptName({ commit }, text) {
      const addr = "http://localhost/search/aptname/";

      axios
        .get(addr + text)
        .then((response) => {
          // console.log(response.data);
          commit("GET_APT_LIST_BY_APT_NAME", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getQnaList({ commit }) {
      const addr = "http://localhost/qna/list";

      axios
        .get(addr)
        .then((response) => {
          console.log(response.data);
          commit("GET_QNA_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getQna({ commit }, payload) {
      axios
        .get(payload)
        .then((response) => {
          console.log(response.data);
          commit("GET_QNA", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    searchQnaList({ commit }, option) {
      console.log(option.key + "|" + option.word);
      const addr = "http://localhost/qna/search";

      axios
        .get(addr, {
          params: {
            key: option.key,
            word: option.word,
          },
        })
        .then((response) => {
          console.log(response.data);
          commit("SEARCH_QNA_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    registerQna(context, data) {
      console.log(data);
      const addr = "http://localhost/qna/register";

      axios
        .post(addr, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    modifyQna(context, data) {
      console.log(data);
      const addr = "http://localhost/qna/";

      axios
        .put(addr + data.qnano, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    deleteQna(context, no) {
      console.log(no);
      const addr = "http://localhost/qna/";

      axios
        .delete(addr + no)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getArticleList({ commit }) {
      const addr = "http://localhost/article/list";

      axios
        .get(addr)
        .then((response) => {
          console.log(response.data);
          commit("GET_ARTICLE_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    getArticle({ commit }, payload) {
      axios
        .get(payload)
        .then((response) => {
          console.log(response.data);
          commit("GET_ARTICLE", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    searchArticleList({ commit }, option) {
      console.log(option.key + "|" + option.word);
      const addr = "http://localhost/article/search";

      axios
        .get(addr, {
          params: {
            key: option.key,
            word: option.word,
          },
        })
        .then((response) => {
          console.log(response.data);
          commit("GET_ARTICLE_LIST", response.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    registerArticle(context, data) {
      console.log(data);
      const addr = "http://localhost/article/register";

      axios
        .post(addr, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    modifyArticle(context, data) {
      console.log(data);
      const addr = "http://localhost/article/";

      axios
        .put(addr + data.articleno, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    deleteArticle(context, no) {
      console.log(no);
      const addr = "http://localhost/article/";

      axios
        .delete(addr + no)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    // getMemberList({ commit }) {
    //   const addr = "http://localhost/mem/list";

    //   axios
    //     .get(addr)
    //     .then((response) => {
    //       console.log(response.data);
    //       commit("GET_MEMBER_LIST", response.data);
    //     })
    //     .catch((error) => {
    //       console.dir(error);
    //     });
    // },

    // getMember({ commit }, payload) {
    //   axios
    //     .get(payload)
    //     .then((response) => {
    //       console.log(response.data);
    //       commit("GET_MEMBER", response.data);
    //     })
    //     .catch((error) => {
    //       console.dir(error);
    //     });
    // },

    loginMember({ commit }, member) {
      const addr = "http://localhost/mem/login";
      axios
        .post(addr, member)
        .then((response) => {
          if (response.data.id !== "") {
            console.log(response.data);
            commit("LOGIN_MEMBER");
            // this.$router.replace("/");
          } else {
            this.msg = response.data.msg;
          }
        })
        .catch((error) => {
          this.msg = response.data.msg;
          console.dir(error);
        });
    },

    insertMember({ commit }, member) {
      console.log(member);
      const addr = "http://localhost/mem/insert";
      axios
        .post(addr, member)
        .then((response) => {
          commit("GET_MEMBER", member);
          console.log(response.data);
          // this.$router.replace("/");
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    logoutMember({ commit }) {
      commit("LOGOUT_MEMBER");
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
