<template>
  <div>
    <b-row class="border rounded">
      <h3 class="font-weight-bold my-4 mx-auto">아파트 검색 결과</h3>
    </b-row>
    <b-row class="border rounded">
      <div v-if="apts.length == 0" class="col-sm-3 mx-auto p-2">
        <div class="card">
          <div class="card-header">결과 없음</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <h6>해당하는 검색 결과가 없습니다</h6>
            </blockquote>
          </div>
        </div>
      </div>

      <template v-for="(deal, index) in paginatedData">
        <div class="col-sm-3 mx-auto p-2" :key="index">
          <div class="card">
            <div class="card-header">{{ deal.아파트 }}</div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <h6>동 : {{ deal.법정동 }}</h6>
                <h6>지번 : {{ deal.지번 }}</h6>
                <h6>층 : {{ deal.층 }}</h6>
                <h6>전용면적 : {{ deal.전용면적 }}</h6>
                <h6>가격 : {{ deal.거래금액 }}</h6>
                <h6>날짜 : {{ deal.년 }}.{{ deal.월 }}.{{ deal.일 }}</h6>
              </blockquote>
            </div>
          </div>
        </div>
      </template>
    </b-row>
    <b-row class="border rounded p-2">
      <div class="mx-auto">
        <button class="btn btn-secondary" :disabled="pageNum === 0" @click="prevPage">이전</button>
        <span class="m-2">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
        <button class="btn btn-secondary" :disabled="pageNum >= pageCount - 1" @click="nextPage">다음</button>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'SearchApt',

  data() {
    return {
      pageNum: 0,
      pageSize: 12,
    };
  },

  computed: {
    apts() {
      return this.$store.state.apts;
    },

    pageCount () {
      let listLength = this.$store.state.apts.length;
      let listSize = this.pageSize;
      return Math.floor((listLength - 1) / listSize) + 1;
    },

    paginatedData () {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.$store.state.apts.slice(start, end);
    },
  },

  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
  },
}
</script>

<style>

</style>