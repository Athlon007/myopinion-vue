<template>
  <div>
    <div class="paper">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" placeholder="Enter title" v-model="title" />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control" id="content" rows="3" v-model="content"
          :maxlength="this.maxContentLength"></textarea>
        <small>{{ this.content.length }}/{{ this.maxContentLength }}</small>
      </div>
      <button class="btn-success" @click="sendOpinion">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "../axios_auth.js";

export default {
  name: "CreateView",
  data() {
    return {
      maxContentLength: 512,
      title: "",
      content: ""
    };
  },
  methods: {
    updateCounter() {
      this.counterDisplay = this.content.length + "/" + this.maxContentLength;
    },
    async sendOpinion() {
      try {
        await axios.post("/opinions", {
          id: -1,
          title: this.title,
          content: this.content
        });

        // navigate to /
        this.$router.push('home');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
textarea {
  width: 20em;
  height: 20em;
  min-width: 100%;
  resize: none;
}

input {
  width: 100%;
}

.btn-success {
  width: 100%;
}
</style>