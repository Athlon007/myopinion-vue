<template>
    <div>
        <h3>Today's topic is...</h3>
        <h1>{{ topic.name }}</h1>
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
</style>