<template>
  <div>
    <div class="col-lg-8 container-fluid table-condensed" align="center">
      <br>
      <h2>자유게시판</h2>
      <table class="table table-borderless" frame=void>
        <tr>
          <td> 
            <select class="form-control" name="key" v-model="option">
              <option value="articleno" selected="selected">글번호</option>
              <option value="subject">제목</option>
              <option value="content">내용</option>
              <!-- <option value="answer">답변</option> -->
            </select>
          </td>
          <td enter-active-class="">
            <input
              type="text"
              class="form-control"
              placeholder="검색어를 입력해 주세요"
              v-model="searchText"
            />
          </td>
          <td>
            <button class="btn btn-primary" @click.prevent="searchArticleByOption">검색</button>
            <button class="btn btn-primary" @click.prevent="getArticleList">전체 목록</button>
          </td>
        </tr>
      </table>

      <!-- 작성한 글이 없을경우 출력 -->
      <table v-if="articleData.list === 'null'" class="table">
        <tbody>
          <tr class="table-info" align="center">
            <td>작성된 글이 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <table v-if="articleData.list !== 'null'" class="table">
        <article-paginated-list :list-array="articleData.list" />
      </table>
      
      <router-link to="/article/create" class="btn btn-warning m-2 float-right">글쓰기</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArticlePaginatedList from "@/components/article/ArticlePaginatedList.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  components: { ArticlePaginatedList },

  data() {
    return {
      option: "articleno",
      searchText: "",
      pageArray: [],
    };
  },

  methods: {
    ...mapActions({
      getArticleList: "getArticleList",
      searchArticleList: "searchArticleList",
      // getArticlePaginatedList: "getArticlePaginatedList",
    }),

    ...mapMutations({
      GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
      // GET_ARTICLE_PAGINATED_LIST: "GET_ARTICLE_PAGINATED_LIST",
    }),

    searchArticleByOption() {
      // console.log(this.selectGugun + "|" + this.selectDong);
      this.searchArticleList({ key: this.option, word: this.searchText });
    },

    searchArticle() {
      // console.log(this.selectGugun + "|" + this.selectDong);
      this.getArticleList();
    },
  },

  computed: {
    articleData() {
      return this.$store.state.articles;
    },
  },

  created() {
    const addr = "http://localhost/article/list";

    axios
      .get(addr)
      .then((response) => {
        console.log(response.data);
        this.GET_ARTICLE_LIST(response.data);
      })
      .catch((error) => {
        console.dir(error);
      });
  },
};
</script>
