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
    <input type="submit" class="loginBtn" value="가입">
  </div>
</div>
</template>

<script>
export default {};
</script>
