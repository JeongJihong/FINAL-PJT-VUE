<template>
  <div class="container" align="center">
    <div class="col-lg-8" align="center">
      <h2 v-if="type == 'create'">글작성</h2>
      <h2 v-else>글수정</h2>
      <div class="form-group" align="left">
        <label for="id">작성자</label>
        <input readonly type="text" class="form-control" v-model="id" />
      </div>
      <div class="form-group" align="left">
        <label for="subject">제목</label>
        <input type="text" class="form-control" v-model="subject" />
      </div>
      <div class="form-group" align="left">
        <label for="content">내용</label>
        <textarea class="form-control" rows="7" v-model="content"></textarea>
      </div>
      <router-link to="/article/list" style="float: right" class="btn btn-warning">취소</router-link>
      <button v-if="type == 'create'" style="float: right" class="btn btn-primary" @click.prevent="writeArticle">글작성</button>
      <button v-else class="btn btn-primary" style="float: right" @click.prevent="updateArticle">수정</button>
      </div>
      <br>
      <br>
      <br>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "articlewrite",
  props: {
    type: { type: String },
  },
  data() {
    return {
      articleno: "",
      id: this.$store.state.loginId,
      subject: "",
      content: "",
    };
  },

  computed: {
    ...mapGetters(["loginState", "loginId"]),
  },

  methods: {
    ...mapActions({
      registerArticle: "registerArticle",
      getArticleList: "getArticleList",
      modifyArticle: "modifyArticle",
    }),

    writeArticle() {
      this.registerArticle({ id: this.id, subject: this.subject, content: this.content});
      this.$router.replace("/article");
    },

    updateArticle() {
      this.modifyArticle({
        id: this.id,
        articleno: this.articleno,
        subject: this.subject,
        content: this.content,
      });
      this.$router.replace("/article");
    },
  },
  created() {
    if(!this.loginState) {
      alert("로그인 후 사용가능합니다!");
      this.$router.replace("/mem/mvlogin");
    }
    if (this.type === "modify") {
      axios.get(`http://localhost/article/${this.$route.params.no}`).then(({ data }) => {
        this.articleno = data.articleno;
        this.subject = data.subject;
        this.content = data.content;
        if(data.userId != this.$store.state.loginId) {
          alert("본인만 수정 가능합니다!");
          this.$router.replace("/article");
        }
      });
    }
  },
};
</script>

<style></style>
