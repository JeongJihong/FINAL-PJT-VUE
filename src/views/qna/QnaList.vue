<template>
  <div>
    <div class="col-lg-8 container-fluid" align="center">
      <h2>Q&A</h2>
      <router-link to="/qna/write" class="btn btn-primary m-2">글쓰기</router-link>
      <table class="table table-borderless">
        <tr>
          <td class="p-0">
            <select class="form-control" name="key" v-model="option">
              <option value="qnano" selected="selected">글번호</option>
              <option value="subject">제목</option>
              <option value="content">내용</option>
              <option value="answer" >답변</option>
            </select>
          </td>
          <td class="p-0">
            <input type="text" class="form-control" placeholder="검색어 입력." v-model="searchText"/>
          </td>
          <td class="p-0">
            <button class="btn btn-primary" @click.prevent="searchQnaByOption">검색</button>
            <button class="btn btn-primary" @click.prevent="getQnaList">전체 목록</button>
          </td>
        </tr>
      </table>

      <!-- 작성한 글이 없을경우 출력 -->
      <table v-if="qnaData.list === 'null'" class="table table-active">
        <tbody>
          <tr class="table-info" align="center">
            <td>작성된 글이 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <!-- 작성한 글이 있을경우 목록출력 -->
      <table v-if="qnaData.list !== 'null'" class="table table-active">
        <qna-list-item v-for="(qna, index) in qnaData.list" :key="index" :qna="qna">
        </qna-list-item>
      </table>
      <!-- <table align="center">
        <tr>
          <td>${navigation.navigator}</td>
        </tr>
      </table> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QnaListItem from '../../components/qna/QnaListItem.vue';
import { mapActions, mapMutations } from 'vuex';
export default {
  components: { QnaListItem },

  data() {
    return {
      option: 'qnano',
      searchText: '',
    };
  },

  methods: {
    ...mapActions({
      getQnaList: "getQnaList",
			searchQnaList: "searchQnaList",
    }),

    ...mapMutations({
      GET_QNA_LIST: "GET_QNA_LIST",
    }),

    searchQnaByOption() {
			// console.log(this.selectGugun + "|" + this.selectDong);
			this.searchQnaList({ key: this.option, word: this.searchText });
		},

    searchQna() {
			// console.log(this.selectGugun + "|" + this.selectDong);
			this.getQnaList();
		},
  },

  computed: {
    qnaData() {
      return this.$store.state.qnas;
    }
  },

  created() {
      const addr = 'http://localhost/qna/list';

      axios
      .get(addr)
      .then((response) => {
          console.log(response.data);
          this.GET_QNA_LIST(response.data);
      })
      .catch((error) => {
          console.dir(error);
      });
  }
};
</script>

<style></style>
