<template>
  <div class="table col-lg-8 container-fluid" align="center">
    <h2>Q&A</h2>
    <br />
    <!-- <div class="mt-3">
      <b-card-group deck>
        <b-card bg-variant="default" header-tag="header" footer-tag="footer" class="text-center">
          <template #header>
            <span class="mb-0" style="font-size:20px; float:left; margin-right: 10px">{{qna.qnano}}.</span>
            <span class="mb-0" style="font-size:20px; float:left;">{{qna.subject}}</span>
            <span class="mb-0" style="font-size:20px; float:right;">{{qna.regtime}}</span>
            <br>
          </template>
          <b-card-text style="height: 400px; font-size:20px; float: left;">{{ qna.content }}</b-card-text>
          <template #footer>
            <span class="mb-0" style="font-size:20px; float:left; width: 70px">답변: </span>
            <span class="mb-0" style="font-size:20px; float:left;">{{qna.answer}}</span>
          </template>
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
        <td style="text-align: left;">{{ qna.qnano }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">등록일</th>
        <td style="text-align: left;">{{ qna.regtime }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">작성자</th>
        <td style="text-align: left;">{{ qna.id }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">제목</th>
        <td style="text-align: left;">{{ qna.subject }}</td>
      </tr>
      <tr>
        <th style="border-right: 1px solid #CCCCCC">내용</th>
        <td style="text-align: left; height: 400px">{{ qna.content }}</td>
      </tr>
    </table>
    <br />    
    <button
      class="btn btn-sm btn-danger mr-2"
      @click.prevent="removeQna"
      :name="qna.qnano"
    >
      삭제
    </button>
    <router-link
      :to="'/qna/modify/' + qna.qnano"
      class="btn btn-sm btn-warning mr-2">수정
    </router-link>
    <br>  
    <div v-if="qna.answer!=''" class="mt-3">
      <b-card-group deck>
        <b-card bg-variant="default" header="답변">
          <b-card-text style="height: 100px; font-size:20px; float: left;">{{qna.answer}}</b-card-text>
        </b-card>
      </b-card-group>
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
      comment: "",
    };
  },
  computed: {
    ...mapGetters(["qna", "loginId"]),
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
      if(this.qna.id != this.loginId) {
        alert("본인만 삭제 가능합니다!");
        this.$router.replace("/qna");
      }

      else {
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
      }
    },

    registComment() {
      this.registerQna({ subject: this.subject, content: this.content, answer: this.answer });
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
th {
  background-color: #F5F5F5;
}
</style>
