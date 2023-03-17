<template>
  <div>
    <div class="paper">
      <div class="form-group">
        <div class="alert alert-danger" role="alert" v-if="this.error.length > 0">
          <p>{{ this.error }}</p>
        </div>
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
      content: "",
      error: ""
    };
  },
  methods: {
    updateCounter() {
      this.counterDisplay = this.content.length + "/" + this.maxContentLength;
    },
    async sendOpinion() {
      try {
        this.error = "";
        await axios.post("/opinions", {
          id: -1,
          title: this.title,
          content: this.content
        });

        // navigate to /
        this.$router.push('home');
      } catch (error) {
        console.log(error);
        if (error.response) {
          this.error = error.response.data.errorMessage;
        } else {
          this.error = "An unknown error occurred.";
        }
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