<template>
  <div>
    <table>
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 50%" />
          <col style="width: 15%" />
          <col style="width: 25%" />
        </colgroup>
      <tr>
        <th>글번호</th>
        <th>제목</th>
        <!-- <th>조회수</th> -->
        <th>작성자</th>
        <th>날짜</th>
      </tr>
      <tr v-for="p in paginatedData" :key="p.qnano">
        <td>{{ p.qnano }}</td>
        <td><router-link :to="'view/' + p.qnano">{{ p.subject }}</router-link></td>
        <td>{{ p.id }}</td>
        <td>{{ p.regtime }}</td>
      </tr>
    </table>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="btn btn-secondary">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn btn-secondary">
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginated-list',
  data () {
    return {
      option: 'qnano',
      searchText: '',
      pageNum: 0,
    }
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 10
    }
  },

  methods: {
    nextPage () {
      this.pageNum += 1;
    },

    prevPage () {
      this.pageNum -= 1;
    },
  },

  computed: {
    qnaData() {
      return this.$store.state.qnas.list.reverse();
    },

    pageCount () {
      let listLeng = this.qnaData.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      
      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },

    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      return this.qnaData.slice(start, end);
    },
  },
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 20px;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
th {
  background-color: #F5F5F5;
}
</style>