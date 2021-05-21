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

        <!-- 비밀번호 찾기 -->
        <article class="col-sm-8">
          <!-- 비밀번호 찾기 창-->
          <div id="head" class="border rounded">
            <form method="post" action="/mem/findpassword" class="container-container-fluid">
              <table class="table">
                <thead>
                  <tr>
                    <td class="caption" colspan="2">비밀번호 찾기</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tbasic">아 이 디</td>
                    <td class="tbasic"><input type="text" name="id" id="id" value="" /></td>
                  </tr>
                  <tr>
                    <td class="tbasic">이 &nbsp;름</td>
                    <td class="tbasic"><input type="text" name="name" id="name" value="" /></td>
                  </tr>
                  <tr>
                    <td class="tbasic">이메일</td>
                    <td class="tbasic"><input type="text" name="email" id="email" value="" /></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" align="center" class="tfoot tspacial">
                      <!-- <input class="btn btn-outline-primary" type="submit" value="검색" /> -->
                      <router-link to="/" class="btn btn-outline-primary">검색</router-link>
                      <router-link to="/" class="btn btn-outline-secondary">취소</router-link>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <span v-if="msg != null" class="text-danger">${msg}</span>
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
