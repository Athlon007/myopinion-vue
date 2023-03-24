<script setup>


</script>

<template>
  <main>
    <div class="alert alert-danger" v-if="this.error">
      <p>{{ this.error }}</p>
    </div>
    <form>
      <label for="email">Email/Username</label>
      <input type="textnpm " id="email" name="email" v-model="this.email" v-on:keyup.enter="login"
        :disabled="this.isProcessed" />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="this.password" v-on:keyup.enter="login"
        :disabled="this.isProcessed" />
      <button type="button" @click="login" :disabled="this.isProcessed">Login</button>
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
      error: "",
      isProcessed: false,
    };
  },
  methods: {
    async login() {
      this.isProcessed = true;
      this.store.login(this.email, this.password)
        .then(() => {
          this.$router.push('/admin');
          this.isProcessed = false;
        })
        .catch((error) => {
          this.error = error;
          this.isProcessed = false;
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

<style scoped>
input,
form,
main {
  width: 100%;
}

main {
  display: flex;
  flex-wrap: wrap;
}

input {
  display: block;
}

.alert {
  display: inline-block;
  max-width: 20em;
  min-width: 100%;
  margin-left: auto;
  margin-right: auto;
  /* align self t center */
  align-self: center;
}

.alert>p {
  word-wrap: break-word;
}
</style>
