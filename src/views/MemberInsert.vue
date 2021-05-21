<template>
  <div>
    <!-- main contents -->
    <section id="main-contents" class="container-fluid">
      <!-- content -->
      <div class="row mb-2">
        <!-- AD -->
        <article class="col-sm-4">
          <img src="../assets/img/sideAD.jpg" class="img-thumbnail" alt="ad" />
        </article>

        <!-- 회원 가입 -->
        <article class="col-sm-8">
          <!--회원가입 창-->
          <div id="head" class="border rounded">
            <!-- <form v-if="id === null" method="post" action="/mem/insert" class="container-container-fluid"> -->
            <form
              method="post"
              action="/mem/update"
              class="container-container-fluid"
            >
              <table class="table">
                <thead>
                  <tr>
                    <td class="caption" colspan="2">회원가입</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tbasic">아 이 디</td>
                      <td class="tbasic">
                        <input type="text" name="id" id="id" value="" />
                      </td>
                  </tr>
                  <tr>
                    <td class="tbasic">비밀번호</td>
                    <td class="tbasic">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="tbasic">이 &nbsp;름</td>
                    <td class="tbasic">
                      <input type="text" name="name" id="name" value="" />
                    </td>
                  </tr>
                  <tr>
                    <td class="tbasic">이메일</td>
                    <td class="tbasic">
                      <input type="text" name="email" id="email" value="" />
                    </td>
                  </tr>
                  <tr>
                    <td class="tbasic">주 &nbsp;소</td>
                    <td class="tbasic">
                      <input type="text" name="address" id="address" value="" />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                      <td colspan="2" align="center" class="tfoot tspacial">
                        <input class="btn btn-outline-primary" type="submit" value="가입" />
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
