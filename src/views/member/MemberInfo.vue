<template>
  <div>
    <!-- main contents -->
    <section id="main-contents" class="container-fluid">
      <!-- content -->
      <div class="row mb-2">
        <!-- AD -->
        <article class="col-sm-4">
          <img src="@/assets/img/sideAD.jpg" class="img-thumbnail" alt="ad" />
        </article>

        <!-- 회원 수정 -->
        <article class="col-sm-8">
          <!--회원수정 창-->
          <!-- <h3 class="text-secondary">${mem.id}</h3> -->
          <h3 class="text-secondary">ssafy</h3>
          <div id="head" class="border rounded">
            <form method="post" action="/mem/update" class="container-container-fluid">
              <table class="table">
                <thead>
                  <tr>
                    <td class="caption" colspan="2">회원수정</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tbasic">아 이 디</td>
                    <td class="tbasic">
                      <!-- <input disabled type="text" name="id" id="id" value="${mem.id }" /> -->
                      <input disabled type="text" name="id" id="id" value="ssafy" />
                    </td>
                  </tr>
                  <tr>
                    <td class="tbasic">비밀번호</td>
                    <td class="tbasic">
                      <input type="password" name="password" id="password" value="ssafy" />
                    </td>
                  </tr>
                  <tr>
                    <td class="tbasic">이 &nbsp;름</td>
                    <td class="tbasic">
                      <input type="text" name="name" id="name" value="이싸피" />
                    </td>
                  </tr>
                  <tr>
                    <td class="tbasic">이메일</td>
                    <td class="tbasic">
                      <input type="text" name="email" id="email" value="ssafy@ssafy.com" />
                    </td>
                  </tr>
                  <tr>
                    <td class="tbasic">주 &nbsp;소</td>
                    <td class="tbasic">
                      <input type="text" name="address" id="address" value="대전시 노은동" />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" align="center" class="tfoot tspacial">
                      <!-- <input class="btn btn-outline-primary" type="submit" value="수정" /> -->
                      <router-link to="/" class="btn btn-outline-primary">수정</router-link>
                      <router-link to="/" class="btn btn-outline-secondary">취소</router-link>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <!-- <span v-if="msg !== null" class="text-danger">${msg}</span> -->
            </form>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
#head {
  width: 450px;
}

form {
  margin: 0 auto;
  padding: 20px;
  width: 400px;
  text-align: center;
}
</style>
