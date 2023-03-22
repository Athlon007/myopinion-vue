<script setup>


</script>

<template>
  <main>
    <div class="alert alert-danger" v-if="this.error">
      {{ this.error }}
    </div>
    <form>
      <label for="email">Email/Username</label>
      <input type="textnpm " id="email" name="email" v-model="this.email" v-on:keyup.enter="login" />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="this.password" v-on:keyup.enter="login" />
      <button type="button" @click="login">Login</button>
    </form>
  </main>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";

export default {
  name: "LoginView",
  setup() {
    return { store: useUserSessionStore() };
  },
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      this.store.login(this.email, this.password)
        .then(() => {
          this.$router.push('/admin');
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
  mounted() {
    console.log(this.store.isAuthenticated);
    if (this.store.isAuthenticated) {
      this.$router.push('/admin');
    }
  }
};
</script>
