<script setup>
import OpinionsList from "../components/AdminComponents/OpinionsList.vue";
import TopicList from "../components/AdminComponents/TopicList.vue";
import AccountsList from "../components/AdminComponents/AccountsList.vue";
</script>

<template>
  <main>
    <nav class="small-nav">
      <a href="#" class="nav-link" @click="this.selectedPage = 'opinions'">Opinions</a>
      <a href="#" class="nav-link" @click="this.selectedPage = 'topics'" v-if="this.me.accountType.id == 1">Topics</a>
      <a href="#" class="nav-link" @click="this.selectedPage = 'accounts'" v-if="this.me.accountType.id == 1">Accounts</a>
      <a href="#" class="nav-link" @click="logout">Logout ({{ this.me.username }})</a>
    </nav>
    <div class="row">
      <OpinionsList v-if="this.selectedPage === 'opinions'" class="paper" />
      <TopicList v-else-if="this.selectedPage === 'topics'" class="paper" />
      <AccountsList v-else-if="this.selectedPage === 'accounts'" class="paper" />
    </div>
  </main>
</template>

<script>
import { useUserSessionStore } from "../stores/usersession.js";
import axios from "../axios_auth.js";

export default {
  name: "LoginView",
  data() {
    return {
      selectedPage: "opinions",
      me: {
        id: null,
        username: "",
        email: "",
        accountType: {
          id: null,
          name: ""
        }
      }
    };
  },
  methods: {
    showOpinions() {
      this.selectedPage = "opinions";
    },
    logout() {
      useUserSessionStore().logout();
      this.$router.push("/login");
    },
    async getThisAccountInfo() {
      const response = await axios.get("/accounts/me");
      this.me = response.data;
    }
  },
  mounted() {
    if (!useUserSessionStore().isAuthenticated) {
      this.$router.push("/login");
    }

    this.getThisAccountInfo();
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