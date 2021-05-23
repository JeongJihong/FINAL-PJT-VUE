<template>
  <div class="table col-lg-8 container-fluid" align="center">
    <table>
      <colgroup>
          <col style="width: 10%" />
          <col style="width: 90%" />
        </colgroup>
      <tr>
        <th>번호</th>
        <td>{{ article.articleno }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td>{{ article.subject }}</td>
      </tr>
      <tr>
        <th>작성일</th>
        <td>{{ article.regtime }}</td>
      </tr>
      <tr>
        <td colspan="2">{{ article.content }}</td>
      </tr>
      <tr>
        <td colspan="2" align="center" class="tfoot tspacial">
          <router-link :to="'/article/modify/' + article.articleno" class="btn btn-sm btn-warning mr-2"
            >수정</router-link
          >
          <button class="btn btn-sm btn-danger mr-2" @click.prevent="removeArticle" :name="article.articleno">
            삭제
          </button>
        </td>
      </tr>
    </table>
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
