<script setup>
import Opinion from './Opinion.vue';
</script>

<template>
    <div class="container paper">
        <div class="opinions">
            <Opinion v-for="opinion in opinions" :key="opinion.id" :title="opinion.title" :content="opinion.content" />
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
            'topic': {
                'id': -1,
                'name': 'Opinions'
            },
            'opinions': []
        }
    },
    methods: {
        async loadOpinions() {
            const response = await axios.get('/topics/today/opinions');
            console.log(response.data);
            this.opinions = response.data;
        }
    },
    mounted() {
        this.loadOpinions();
    }
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