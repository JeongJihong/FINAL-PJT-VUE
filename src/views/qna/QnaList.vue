<template>
  <div>
    <div class="col-lg-8 container-fluid table-condensed" align="center">
      <br>
      <h2>Q&A</h2>
      <table class="table table-borderless"  frame=void>
        <tr>
          <td>
            <select class="form-control" name="key" v-model="option">
              <option value="qnano" selected="selected">글번호</option>
              <option value="subject">제목</option>
              <option value="content">내용</option>
              <option value="answer">답변</option>
            </select>
          </td>
          <td enter-active-class="">
            <input
              type="text"
              class="form-control"
              placeholder="검색어를 입력해 주세요"
              v-model="searchText"
              @keyup.enter="searchQnaByOption"
            />
          </td>
          <td>
            <button class="btn btn-primary" @click.prevent="searchQnaByOption">검색</button>
            <button class="btn btn-primary" @click.prevent="getQnaList">전체 목록</button>
            <router-link to="/qna/create" class="btn btn-primary text-white float-right">글쓰기</router-link>
          </td>
        </tr>
      </table>

      <!-- 작성한 글이 없을경우 출력 -->
      <table v-if="qnaData.list === 'null'" class="table">
        <tbody>
          <tr class="table-info" align="center">
            <td>작성된 글이 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <table v-if="qnaData.list !== 'null'" class="table">
        <qna-paginated-list/>
      </table>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QnaPaginatedList from "@/components/qna/QnaPaginatedList.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  components: { QnaPaginatedList },

  data() {
    return {
      option: "qnano",
      searchText: "",
    };
  },

  methods: {
    ...mapActions({
      getQnaList: "getQnaList",
      searchQnaList: "searchQnaList",
      // getQnaPaginatedList: "getQnaPaginatedList",
    }),

    ...mapMutations({
      GET_QNA_LIST: "GET_QNA_LIST",
      // GET_QNA_PAGINATED_LIST: "GET_QNA_PAGINATED_LIST",
    }),

    searchQnaByOption() {
      // console.log(this.selectGugun + "|" + this.selectDong);
      this.searchQnaList({ key: this.option, word: this.searchText });
      // this.$router.go();
    },

    searchQna() {
      // console.log(this.selectGugun + "|" + this.selectDong);
      this.getQnaList();
      // this.$router.go(this.$router.currentRoute);
    },
  },

  computed: {
    qnaData() {
      return this.$store.state.qnas;
    },
  },

  created() {
    const addr = "http://localhost/qna/list";

    axios
      .get(addr)
      .then((response) => {
        // console.log(response.data);
        this.GET_QNA_LIST(response.data);
      })
      .catch((error) => {
        console.dir(error);
      });
  },
};
</script>

<style>
.btn{
  margin: 5px;
}
</style>
