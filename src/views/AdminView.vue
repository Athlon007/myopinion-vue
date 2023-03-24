<script setup>


</script>

<template>
  <main>
    <p></p>
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
    };
  },
  methods: {
  },
  mounted() {
    if (!this.store.isAuthenticated) {
      this.$router.push("/login");
    }
  }
};
</script>
