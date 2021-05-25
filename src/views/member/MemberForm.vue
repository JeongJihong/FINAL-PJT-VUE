<template>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Login Form -->
    <br>
    <h1 v-if="!loginState">회원가입</h1>
    <h1 v-else>회원수정</h1>
    <input v-if="!loginState" type="text" class="inputLogin" v-model="id" placeholder="ID">
    <input v-else type="text" class="inputLogin" v-model="id" placeholder="ID" readonly>
    <input type="password" class="inputLogin" v-model="password" placeholder="password">
    <input type="text" class="inputLogin" v-model="name" placeholder="name">
    <input type="text" class="inputLogin" v-model="email" placeholder="email">
    <input type="text" class="inputLogin" v-model="address" placeholder="address">
    <input v-if="!loginState" type="submit" class="loginBtn" @click.prevent="registMember" value="가입">
    <input v-else type="submit" class="loginBtn" @click.prevent="changeMember" value="수정">
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from "axios";

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

  computed: {
    ...mapGetters(["loginState", "member"]),
  },

  methods: {
    ...mapActions({
      insertMember: "insertMember",
      modifyMember: "modifyMember",
    }),

    registMember() {
      // console.log(member);
      const addr = "http://localhost/mem/insert";
      axios
        .post(addr, { address: this.address, email: this.email, id:this.id, name:this.name, password:this.password})
        .then((response) => {
          console.log(response.data.msg)
          if(response.data.msg === "") {
            this.insertMember(response.data);
            alert("회원가입을 완료했습니다");
            this.$router.replace("/");
          } else {
            alert(response.data.msg);
          }

          // console.log(response.data);
          // this.$router.replace("/");
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    changeMember() {
      this.modifyMember({ address: this.address, email: this.email, id:this.id, name:this.name, password:this.password});
      alert("회원정보를 수정했습니다");
      this.$router.replace("/");
    }
  },

  created() {
    if(this.loginState) {
      this.id = this.member.id;
      this.password = this.member.password;
      this.name = this.member.name;
      this.email = this.member.email;
      this.address = this.member.address;
    }
  },
};
</script>
