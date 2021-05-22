<template>
  <div class="container" align="center">
    <div class="col-lg-6" align="center">
      <h2 v-if="type == 'create'">QnA 작성</h2>
      <h2 v-else>QnA 수정</h2>
      <div class="form-group" align="left">
        <label for="subject">제목:</label>
        <input type="text" class="form-control" v-model="subject" />
      </div>
      <div class="form-group" align="left">
        <label for="content">내용:</label>
        <textarea class="form-control" rows="7" v-model="content"></textarea>
      </div>
      <div class="form-group" align="left">
        <label for="content">답변:</label>
        <textarea class="form-control" rows="10" v-model="answer"></textarea>
      </div>
      <button v-if="type == 'create'" vclass="btn btn-primary" @click.prevent="writeQna">글작성</button>
      <button v-else vclass="btn btn-primary" @click.prevent="updateQna">글수정</button>
      <router-link to="/qna/list" class="btn btn-warning">취소</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "qnawrite",
  props: {
    type: { type: String },
  },
  data() {
    return {
      qnano: "",
      id: "",
      subject: "",
      content: "",
      answer: "",
    };
  },

  methods: {
    ...mapActions({
      registerQna: "registerQna",
      getQnaList: "getQnaList",
      modifyQna: "modifyQna",
    }),

    writeQna() {
      this.registerQna({ subject: this.subject, content: this.content, answer: this.answer });
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
    if (this.type === "modify") {
      axios.get(`http://localhost/qna/${this.$route.params.no}`).then(({ data }) => {
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
