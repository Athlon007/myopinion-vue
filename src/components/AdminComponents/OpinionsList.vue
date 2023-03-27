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
                <div class="card" v-for="opinion in opinions" :key="opinion.id" @click="this.editOpinion(opinion)">
                    <h3>{{ opinion.title }}</h3>
                    <p>{{ opinion.content }}</p>
                </div>
            </div>
            <div class="col-6 card">
                <h4>Stats</h4>
                <form class="editor">
                    <label for="title">Title</label>
                    <input type="text" id="title" class="form-control" v-model="editedOpinion.title">
                    <label for="content">Content</label>
                    <textarea id="content" class="form-control" v-model="editedOpinion.content"></textarea>
                    <button type="button" class="btn btn-success" @click="saveOpinion">Save</button>
                    <button type="button" class="btn btn-danger" @click="deleteOpinion">Delete</button>
                    <button type="button" class="btn btn-secondary" @click="clearEditor">Cancel</button>
                </form>
                <div v-for="report in editedOpinionReports" :key="report.id">
                    <p><strong>Name: {{ report.name }}</strong></p>
                    <p :class="{ warn: report.count > 0 }">Count: {{ report.count ?? 0 }}</p>
                </div>
                <button type="button" class="btn btn-success" @click="pardonOpinion">Pardon</button>
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
            editedOpinion: {
                id: null,
                title: null,
                content: null
            },
            editedOpinionReports: [],
            user: {
                id: null,
                accountType: {
                    id: 1,
                    name: null
                }
            }
        }
    },
    methods: {
        async getOpinions() {
            try {
                let url = this.user.accountType.id == 1 ? '/topics/' + this.selectedTopic.id + '/opinions' : '/topics/today/opinions';
                const response = await axios.get(url);
                this.opinions = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getTopics() {
            try {
                let url = this.user.accountType.id == 1 ? '/topics' : '/topics/today';
                const response = await axios.get(url);
                if (this.user.accountType.id == 1) {
                    this.topics = response.data;
                } else {
                    this.topics.push(response.data);
                    this.selectedTopic = response.data;
                    this.getOpinions();
                }
            } catch (error) {
                console.error(error);
            }
        },
        clearEditor() {
            this.editedOpinion = {
                id: null,
                title: null,
                content: null
            }
        },
        async deleteOpinion() {
            try {
                await axios.delete('/opinions/' + this.editedOpinion.id);
                this.getOpinions();
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async saveOpinion() {
            try {
                await axios.put('/opinions/' + this.editedOpinion.id, this.editedOpinion);
                this.getOpinions();
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async editOpinion(opinion) {
            this.editedOpinion = JSON.parse(JSON.stringify(opinion));
            this.getOpinionReports();
        },
        async getOpinionReports() {
            try {
                const response = await axios.get('/opinions/' + this.editedOpinion.id + '/reports');
                this.editedOpinionReports = response.data;

                console.log(this.editedOpinionReports);
            } catch (error) {
                console.error(error);
            }
        },
        async pardonOpinion() {
            try {
                await axios.delete('/opinions/report/' + this.editedOpinion.id);
                this.getOpinionReports();
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        axios.get('/accounts/me')
            .then(response => {
                this.user = response.data;
                this.getTopics();
            })
            .catch(error => {
                console.error(error);
            });
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

.card {
    flex-grow: 1;
}

.warn {
    color: red;
}
</style>