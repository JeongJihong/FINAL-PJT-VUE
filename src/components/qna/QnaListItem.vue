<template>
  <div class="table col-lg-8 container-fluid" align="center">
    <table>
      <tr>
        <th>번호</th>
        <td>{{ qna.qnano }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td>{{ qna.subject }}</td>
      </tr>
      <tr>
        <th>작성일</th>
        <td>{{ qna.regtime }}</td>
      </tr>
      <tr>
        <th>내용</th>
        <td>{{ qna.content }}</td>
      </tr>
      <!-- <tr>
        <th>답변</th>
        <td>{{ qna.answer }}</td>
      </tr> -->
      <tr>
        <td colspan="2" align="center" class="tfoot tspacial">
          <router-link :to="'/qna/modify/' + qna.qnano" class="btn btn-sm btn-warning mr-2"
            >수정</router-link
          >
          <button class="btn btn-sm btn-danger mr-2" @click.prevent="removeQna" :name="qna.qnano">
            삭제
          </button>
        </td>
      </tr>
    </table>
    <br>
    <div v-if="qna.answer != ''" class="regist_form">
      <!-- <textarea id="comment" name="comment" v-model="modifyComment.comment" cols="35" rows="2"></textarea> -->
      <textarea id="comment" name="comment" v-model="qna.answer" cols="35" rows="2"></textarea>
      <button style="float: right;" class="small" @click="updateCommentCancel">취소</button>
      <button style="float: right;" class="small" @click="updateComment">수정</button>
    </div>
    <div v-else class="regist_form">
      <textarea id="comment" name="comment" v-model="qna.answer" cols="35" rows="2"></textarea>
      <button style="float: right;" @click="registComment">등록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "QnaListItem",
  data() {
    return {
      no: "",
    };
  },
  computed: {
    ...mapGetters(["qna"]),
  },
  created() {
    this.no = this.$route.params.no;
    // 도서 정보 얻기.
    this.$store.dispatch("getQna", `http://localhost/qna/${this.no}`);
  },
  methods: {
    ...mapActions({
      deleteQna: "deleteQna",
    }),

    removeQna() {
      console.log(this.qna);
      this.deleteQna(this.qna.qnano);
      this.$router.replace("/");
    },

    removeQna() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        axios.delete(`http://localhost/qna/${this.no}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/qna");
        });
      }
    },

    registComment() {
      this.registerQna({ subject: this.subject, content: this.content, answer: this.answer});
      this.$router.replace("/qna");
    },

  },
};
</script>

<style scoped>
.regist {
  padding: 10px;
}
.regist_form {
  text-align: left;
  border-radius: 5px;
  background-color: #d6e7fa;
  padding: 20px;
}

textarea {
  width: 90%;
  padding: 10px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: large;
}

button.small {
  width: 50px;
  font-size: small;
  font-weight: bold;
}
</style>
