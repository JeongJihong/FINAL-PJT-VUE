import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

import happyHouse from "@/js/http-happy-house";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apts: [],
    houses: [],
    sido: [],
    gugun: [],
    dong: [],

    qnas: [],
    qna: [],
  },

  getters: {
    searchData(state) {
      return state.apts;
    },

    qnaData(state) {
      return state.qnas;
    },

    qna(state) {
      return state.qna;
    },
  },

  mutations: {
    GET_APT_LIST(state, apts) {
      // console.log(state, apts);
      state.apts = apts;
    },

    GET_HOUSE_LIST(state, houses) {
      // console.log(state, apts);
      state.houses = houses;
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
  },

  actions: {
    getAptList({ commit }, data) {
      const SERVICE_URL = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade";
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
      const SERVICE_URL = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcRHTrade";
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
        .put(addr + data.qnAno, data)
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
  },
  modules: {},
  plugins: [createPersistedState()],
});
