<template>
    <div class="card">
        <div class="row">
        </div>
        <div class="row">
            <div class="col-6 card">
                <h4>Topics</h4>
                <button type="button" class="btn btn-success add-new-btn" @click="createNewMode">Create New</button>
                <div class="card" v-for="topic in topics" :key="topic.id" @click="startEdit(topic)">
                    <h3>{{ topic.name }}</h3>
                </div>
            </div>
            <div class="col-6 card">
                <h4>Data</h4>
                <form class="editor">
                    <label for="title">Name</label>
                    <input type="text" id="title" class="form-control" v-model="editedTopic.name">
                    <button type="button" class="btn btn-success" @click="addOrEditTopic">Save</button>
                    <button type="button" class="btn btn-danger" @click="deleteTopic">Delete</button>
                    <button type="button" class="btn btn-secondary" @click="clearEditor">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios_auth.js';

export default {
    name: "TopicList",
    data() {
        return {
            topics: [],
            editedTopic: {
                id: null,
                name: null
            },
            creationMode: false
        }
    },
    methods: {
        async getTopics() {
            try {
                const response = await axios.get('/topics');
                this.topics = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async createNewMode() {
            this.editedTopic = {
                id: null,
                name: null
            }
            this.creationMode = true;
        },
        startEdit(topic) {
            console.log(topic);
            this.editedTopic = JSON.parse(JSON.stringify(topic));
            this.creationMode = false;
        },
        clearEditor() {
            this.topic = {
                id: null,
                name: null
            }
            this.creationMode = false;
        },
        addOrEditTopic() {
            if (this.creationMode) {
                this.addTopic();
            } else {
                this.editTopic();
            }
        },
        async addTopic() {
            try {
                this.editedTopic.id = 0;
                const response = await axios.post('/topics', this.editedTopic);
                console.log(response);
                this.topics.push(response.data);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async editTopic() {
            try {
                const response = await axios.put('/topics/' + this.editedTopic.id, this.editedTopic);
                const index = this.topics.findIndex(topic => topic.id === this.editedTopic.id);
                this.topics.splice(index, 1, response.data);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async deleteTopic() {
            try {
                await axios.delete('/topics/' + this.editedTopic.id);
                const index = this.topics.findIndex(topic => topic.id === this.editedTopic.id);
                this.topics.splice(index, 1);
                this.clearEditor();
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

.editor>input,
textarea {
    width: 100%;
}

.add-new-btn {
    width: 100%;
}
</style>