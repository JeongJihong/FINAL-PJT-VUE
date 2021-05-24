<template>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Login Form -->
    <br>
    <h1>회원가입</h1>
    <input type="text" class="inputLogin" v-model="id" placeholder="ID">
    <input type="text" class="inputLogin" v-model="password" placeholder="password">
    <input type="text" class="inputLogin" v-model="name" placeholder="name">
    <input type="text" class="inputLogin" v-model="email" placeholder="email">
    <input type="text" class="inputLogin" v-model="address" placeholder="address">
    <input type="submit" class="loginBtn" @click.prevent="registMember" value="가입">
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      address: "",
      email: "",
      id: "",
      name: "",
      password: "",
      msg: "",
    };
  },

  methods: {
    ...mapActions({
      insertMember: "insertMember",
    }),

    registMember() {
      this.insertMember({ address: this.address, email: this.email, id:this.id, name:this.name, password:this.password});
      alert("회원가입을 완료했습니다");
      this.$router.replace("/");
    },
  },
};
</script>
