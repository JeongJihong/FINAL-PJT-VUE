<template>
  <div>
    <div class="col-lg-8 container-fluid" align="center">
      <h2>자유게시판</h2>

      <table class="table table-borderless">
        <tr>
          <td v-if="id === 'admin'" align="right">
            <button type="button" class="btn btn-link" onclick="javascript:movewrite();">
              글쓰기
            </button>
          </td>
        </tr>
      </table>

      <form id="searchform" method="get" class="form-inline" action="">
        <input type="hidden" name="act" id="act" value="list" />
        <table class="table table-borderless">
          <tr>
            <td align="right">
              <select class="form-control" name="key" id="key">
                <option value="id" selected="selected">아이디</option>
                <option value="articleno">글번호</option>
                <option value="subject">제목</option>
                <option value="content">내용</option>
              </select>
              <input
                type="text"
                class="form-control"
                placeholder="검색어 입력."
                name="word"
                id="word"
              />
              <button type="button" class="btn btn-primary" onclick="javascript:searchArticle();">
                검색
              </button>
              <input class="btn btn-primary my-2 my-sm-0" type="submit" value="전체 목록" />
            </td>
          </tr>
        </table>
      </form>

      <!-- 작성한 글이 없을경우 출력 -->
      <table v-if="list == null" class="table table-active">
        <tbody>
          <tr class="table-info" align="center">
            <td>작성된 글이 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <!-- 작성한 글이 있을경우 목록출력 -->
      <table v-if="list !== null" class="table table-active">
        <v-forEach var="list" items="${list}">
          <tr>
            <th>번호</th>
            <td>${list.articleno}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>${list.subject}</td>
          </tr>
          <tr>
            <th>작성일</th>
            <td>${list.regtime}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>${list.content}</td>
          </tr>

            <tr v-if="id === 'admin'">
              <td colspan="2" align="center" class="tfoot tspacial">
                <a
                  class="btn btn-sm btn-warning mr-2"
                  href="/article/modify?articleno=${list.articleno}"
                  >수정</a
                >
                <a
                  class="btn btn-sm btn-danger mr-2"
                  href="/article/delete?articleno=${list.articleno}"
                  >삭제</a
                >
              </td>
            </tr>
        </v-forEach>
      </table>
      <table align="center">
        <tr>
          <td>${navigation.navigator}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#form-control {
    margin-right: 5px;
}
.btn {
	margin-left: 5px;
}
</style>
