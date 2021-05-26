<template>
  <div class="container" align="center">
    <div class="col-lg-8" align="center">
      <h2 v-if="type == 'create'">QnA 작성</h2>
      <h2 v-else>QnA 수정</h2>
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
      <div class="form-group" align="left">
        <label for="content">답변</label>
        <textarea v-if="id == 'admin'" class="form-control" rows="10" v-model="answer"></textarea>
        <textarea v-else class="form-control" rows="10" v-model="answer" readonly></textarea>
      </div>
      <router-link to="/qna/list" style="float: right" class="btn btn-warning">취소</router-link>
      <button v-if="type == 'create'" style="float: right" class="btn btn-primary" @click.prevent="writeQna">질문작성</button>
      <button v-else class="btn btn-primary" style="float: right" @click.prevent="updateQna">수정</button>
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
  name: "qnawrite",
  props: {
    type: { type: String },
  },
  data() {
    return {
      qnano: "",
      id: this.$store.state.loginId,
      subject: "",
      content: "",
      answer: "",
    };
  },

  computed: {
    ...mapGetters(["loginState"]),
  },

  methods: {
    ...mapActions({
      registerQna: "registerQna",
      getQnaList: "getQnaList",
      modifyQna: "modifyQna",
    }),

    writeQna() {
      this.registerQna({ id: this.id, subject: this.subject, content: this.content, answer: this.answer });
      this.$router.replace("/qna");
    },

    updateQna() {
      this.modifyQna({
        qnano: this.qnano,
        subject: this.subject,
        content: this.content,
        answer: this.answer,
      });
      this.$router.replace("/qna");
    },
  },
  created() {
    if(!this.loginState) {
      alert("로그인 후 사용가능합니다!");
      this.$router.replace("/mem/mvlogin");
    }
    if (this.type === "modify") {
      axios.get(`http://localhost/qna/${this.$route.params.no}`).then(({ data }) => {
        if(data.id != this.$store.state.loginId) {
          alert("본인만 수정 가능합니다!");
          this.$router.replace("/qna");
        }
        this.qnano = data.qnano;
        this.subject = data.subject;
        this.content = data.content;
        this.answer = data.answer;
      });
    }
  },
};
</script>

<style></style>
