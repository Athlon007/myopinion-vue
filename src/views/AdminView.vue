<script setup>
import OpinionsList from "../components/AdminComponents/OpinionsList.vue";
</script>

<template>
  <main>
    <nav class="small-nav">
      <a href="#" class="nav-link" @click="showOpinions">Opinions</a>
      <a href="#" class="nav-link" @click="logout">Logout</a>
    </nav>
    <div class="row">
      <OpinionsList v-if="this.selectedPage === 'opinions'" class="paper" />
    </div>
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
      selectedPage: "opinions"
    };
  },
  methods: {
    showOpinions() {
      this.selectedPage = "opinions";
    },
    logout() {
      useUserSessionStore().logout();
      this.$router.push("/login");
    }
  },
  mounted() {
    if (!useUserSessionStore().isAuthenticated) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.small-nav {
  background-image: none;
}

.small-nav>a {
  border: none;
  padding: 0.5rem 1rem;
}

.small-nav>.active {
  background-color: #f2f2f2;
  text-decoration: underline;
}
</style>