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

        <!-- 로그인 -->
        <article class="col-sm-8">
          <form id="loginform" class="border rounded container-fluid" method="post" action="">
            <h4>Login</h4>
            <div class="form-group">
              <label for="usr">ID </label>
              <input type="text" name="id" id="id" />
            </div>
            <div class="form-group">
              <label for="pwd">Password </label>
              <input type="text" name="password" id="password" />
            </div>
            <div v-if="msg != null" class="text-danger">${msg}</div>
            <div class="form-group">
              <!-- <button class="btn btn-primary" onclick="javascript:login();">로그인</button> -->
              <router-link class="btn btn-primary" to="/">로그인</router-link>
              <router-link class="btn btn-secondary" to="/">메인으로</router-link>
            </div>
          </form>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
#loginform {
  margin: 0 auto;
  padding: 20px;
  width: 400px;
  text-align: center;
}

#loginform label {
  width: 100px;
}

#loginform input {
  width: 240px;
}
.btn {
	margin-left: 5px;
}
</style>
