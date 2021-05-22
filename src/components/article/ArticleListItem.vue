<template>
  <div class="col-lg-8 container-fluid" align="center">
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
      <tr>
        <th>답변</th>
        <td>{{ qna.answer }}</td>
      </tr>
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

    // removeQna() {
    //   console.log(this.qna);
    //   this.deleteQna(this.qna.qnano);
    //   this.$router.replace("/");
    // },

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
  },
};
</script>
