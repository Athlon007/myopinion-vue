<template>
    <div class="card">
        <div class="row">
            <div class="col-12">
                <select class="form-control" v-model="selectedTopic" @change="this.getOpinions()">
                    <option value="null" disabled>-- Select Topic --</option>
                    <option v-for="topic in topics" :key="topic.id" :value="topic">{{ topic.name }}</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-6 card">
                <h4>Opinions</h4>
                <div class="card" v-for="opinion in opinions" :key="opinion.id">
                    <h3>{{ opinion.title }}</h3>
                    <p>{{ opinion.content }}</p>
                </div>
            </div>
            <div class="col-6 card">
                <h4>Stats</h4>
                <p>fuck</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios_auth.js';

export default {
    name: "OpinionsList",
    data() {
        return {
            topics: [],
            selectedTopic: null,
            opinions: [],
            editedOpinion: null
        }
    },
    methods: {
        async getOpinions() {
            try {
                const response = await axios.get('/topics/' + this.selectedTopic.id + '/opinions');
                this.opinions = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getTopics() {
            try {
                const response = await axios.get('/topics');
                this.topics = response.data;
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.getTopics();
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-grow: 1;
    padding: 1rem;
}

.row {
    width: 100%;
}
</style>