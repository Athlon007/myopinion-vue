<template>
    <div>
        <h3>Today's topic is...</h3>
        <h1>{{ topic.name }}</h1>
        <router-link to="/create"> <button class="btn-success btn-large">Add Opinion</button></router-link>
    </div>
</template>

<script>
import axios from '../axios_auth.js';

export default {
    name: "Topic",
    data() {
        return {
            topic: {
                id: -1,
                name: 'Opinions'
            }
        }
    },
    methods: {
        async loadTopic() {
            try {
                const response = await axios.get('/topics/today');
                this.topic = response.data;
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.loadTopic();
    }
}
</script>

<style scoped>
h1,
h3 {
    text-align: center;
}

h1 {
    margin-top: 0;
}

.btn-success {
    margin-bottom: 1em;
    margin-top: 0em;
    width: 100%;
}
</style>