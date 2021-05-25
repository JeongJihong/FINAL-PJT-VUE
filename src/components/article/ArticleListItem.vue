<template>
  <div class="table col-lg-8 container-fluid" align="center">
    <h2>자유게시판</h2>
    <br />

    <!-- <div class="mt-3">
    <b-card-group deck>
      <b-card bg-variant="default" header-tag="header" class="text-center">
        <template #header>
            <span class="mb-0" style="font-size:20px; float:left; margin-right: 10px">{{article.articleno}}.</span>
            <span class="mb-0" style="font-size:20px; float:left;">{{article.subject}}</span>
            <span class="mb-0" style="font-size:20px; float:right;">{{article.regtime}}</span>
            <br>
          </template>
        <b-card-text style="height: 400px; font-size:20px; float: left;">{{ article.content }}</b-card-text>
      </b-card>
    </b-card-group>
  </div> -->

    <table>
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 80%" />
      </colgroup>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">번호</th>
        <td style="text-align: left;">{{ article.articleno }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">등록일</th>
        <td style="text-align: left;">{{ article.regtime }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">작성자</th>
        <td style="text-align: left;">{{ article.userId }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">제목</th>
        <td style="text-align: left;">{{ article.subject }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">내용</th>
        <td style="text-align: left; height: 400px">{{ article.content }}</td>
      </tr>
    </table>
    <br />
    <button
      class="btn btn-sm btn-danger mr-2"
      @click.prevent="removeArticle"
      :name="article.articleno"
    >
      삭제
    </button>
    <router-link :to="'/article/modify/' + article.articleno" class="btn btn-sm btn-warning mr-2"
      >수정</router-link
    >
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ArticleListItem",
  data() {
    return {
      no: "",
    };
  },

  computed: {
    ...mapGetters(["article"]),
  },
  created() {
    this.no = this.$route.params.no;
    // 도서 정보 얻기.
    this.$store.dispatch("getArticle", `http://localhost/article/${this.no}`);
  },
  methods: {
    ...mapActions({
      deleteArticle: "deleteArticle",
    }),

    // removeArticle() {
    //   console.log(this.article);
    //   this.deleteArticle(this.article.articleno);
    //   this.$router.replace("/");
    // },

    removeArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        axios.delete(`http://localhost/article/${this.no}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/article");
        });
      }
    },
  },
};
</script>
<style >
th {
  background-color: #d8d0d0;
}
</style>