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

        <!-- 로그인 -->
        <article class="col-sm-8">
          <div id="loginform" class="border rounded">
            <h4>Login</h4>
            <div class="form-group mx-auto">
              <label for="usr">ID </label>
              <input type="text" v-model="id" />
            </div>
            <div class="form-group mx-auto">
              <label for="pwd">Password </label>
              <input type="text" v-model="password" />
            </div>
            <div v-if="msg != null" class="text-danger">{{ msg }}</div>
            <div class="form-group">
              <!-- <button class="btn btn-primary" onclick="javascript:login();">로그인</button> -->
              <button class="btn btn-primary" @click="login">로그인</button>
              <router-link class="btn btn-secondary" to="/">메인으로</router-link>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      id: "",
      password: "",
      msg: "",
    };
  },

  methods: {
    ...mapActions({
      loginMember: "loginMember",
    }),

    login() {
      const addr = "http://localhost/mem/login";
      const params = {
        id: this.id,
        password: this.password
      };

      axios
        .get(addr, {
          params,
        })
        .then((response) => {
          console.log(response.data.id);
          if(response.data.id !== "") {
            this.loginMember(response.data, { id: response.data.id });
            this.$router.replace("/");
          
          } else {
            this.msg = response.data.msg;

          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },

  
};
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
