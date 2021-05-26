<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <br>
      <h1>비밀번호 찾기</h1>
      <input type="text" class="inputLogin" v-model="id" placeholder="id"/>
      <input type="text" class="inputLogin" v-model="name" placeholder="name"/>
      <input type="text" class="inputLogin" v-model="email" placeholder="email"/>
      <input type="submit" @click.prevent="findPassword" class="loginBtn" value="검색"/>
      <div class="text-danger">{{ msg }}</div>
      <br>
      <div id="formFooter">
        <router-link to="/" class="underlineHover">취소</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      name: "",
      email: "",
      msg: "",
    };
  },

  methods: {
    findPassword() {
      const addr = "http://localhost/mem/findpassword";

      axios
        .post(addr, { id: this.id, name: this.name, email: this.email })
        .then((response) => {
          // console.log(response);
          this.msg = response.data.msg;
        })
        .catch((error) => {
          this.msg = response.data.msg;
          console.dir(error);
        });
    },
  },

  created() {
    this.msg = "";
  },
};
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
