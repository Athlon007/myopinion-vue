<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <nav>
      <router-link class="nav-link" active-class="active" to="/">Home</router-link>
      <router-link class="nav-link" active-class="active" to="/about">Admin</router-link>
      <router-link class="nav-link" active-class="active" to="/404">404</router-link>
      <router-link class="nav-link" active-class="active" to="/about">About</router-link>
    </nav>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<script>
import axios from "./axios_auth.js";

export default {
  name: "App",
  async mounted() {
    // Load reaction entities into global value.
    const response = await axios.get("/reactions");
    window.reactionEntities = response.data;
  },
};
</script>

<style>
@import "../node_modules/papercss/dist/paper.css";
</style>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.active {
  border-bottom: 2px solid #000;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-bottom: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
