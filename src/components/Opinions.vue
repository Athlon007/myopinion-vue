<script setup>
import Opinion from './Opinion.vue';
</script>

<template>
    <h1>Topic</h1>
    <div class="container paper">
        <div class="opinions">
            <Opinion v-for="opinion in opinions" :key="opinion.title" :title="opinion.title" :message="opinion.message" />
        </div>
        <div class="button-container">
            <button>Load More...</button>
        </div>
    </div>
</template>

<script>
import axios from '../axios_auth.js';

export default {
    name: "Opinions",
    data() {
        return {
            'opinions': []
        }
    },
    methods: {
        async loadOpinions() {
            const response = await axios.get('/opinions');
            this.opinions = response.data;
        }
    },
}
</script>

<style scoped>
.opinions {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: wrap;
    flex-basis: 2;
}

div>* {
    margin: 1em;
}

.button-container {
    widows: 100%;
}

.button-container>button {
    width: 100%;
}
</style>