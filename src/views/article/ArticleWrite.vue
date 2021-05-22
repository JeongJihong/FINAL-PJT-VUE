<template>
  <div class="container" align="center">
    <div class="col-lg-6" align="center">
      <h2 v-if="type == 'create'">글작성</h2>
      <h2 v-else>글수정</h2>
      <div class="form-group" align="left">
        <label for="subject">제목:</label>
        <input type="text" class="form-control" v-model="subject" />
      </div>
      <div class="form-group" align="left">
        <label for="content">내용:</label>
        <textarea class="form-control" rows="7" v-model="content"></textarea>
      </div>
      <button v-if="type == 'create'" vclass="btn btn-primary" @click.prevent="writeArticle">글작성</button>
      <button v-else vclass="btn btn-primary" @click.prevent="updateArticle">글수정</button>
      <router-link to="/article/list" class="btn btn-warning">취소</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "articlewrite",
  props: {
    type: { type: String },
  },
  data() {
    return {
      articleno: "",
      id: "",
      subject: "",
      content: "",
    };
  },

  methods: {
    ...mapActions({
      registerArticle: "registerArticle",
      getArticleList: "getArticleList",
      modifyArticle: "modifyArticle",
    }),

    writeArticle() {
      this.registerArticle({ subject: this.subject, content: this.content});
      this.$router.replace("/article");
    },

    updateArticle() {
      this.modifyArticle({
        articleno: this.articleno,
        subject: this.subject,
        content: this.content,
      });
      this.$router.replace("/article");
    },
  },
  created() {
    if (this.type === "modify") {
      axios.get(`http://localhost/article/${this.$route.params.no}`).then(({ data }) => {
        this.articleno = data.articleno;
        this.subject = data.subject;
        this.content = data.content;
      });
    }
  },
};
</script>

<style></style>
