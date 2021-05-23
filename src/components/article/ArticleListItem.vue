<template>
  <div class="table col-lg-8 container-fluid" align="center">
    <h2>자유게시판</h2>
    <br />

    <div class="mt-3">
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
  </div>

    <!-- <table>
      <colgroup>
        <col style="width: 10%" />
        <col style="width: 70%" />
        <col style="width: 20%" />
      </colgroup>
      <tr>
        <td>{{ article.articleno }}</td>
        <td style="float: left">{{ article.subject }}</td>
        <td style="float: right">{{ article.regtime }}</td>
      </tr>
      <tr>
        <td colspan="3">{{ article.content }}</td>
      </tr>
    </table> -->
    <br />
    <button style="float: right"
      class="btn btn-sm btn-danger mr-2"
      @click.prevent="removeArticle"
      :name="article.articleno"
    >
      삭제
    </button>
    <router-link style="float: right" :to="'/article/modify/' + article.articleno" class="btn btn-sm btn-warning mr-2"
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
