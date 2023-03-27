<template>
    <div class="card">
        <div class="row">
        </div>
        <div class="row">
            <div class="col-6 card">
                <h4>Reaction Entities</h4>
                <button type="button" class="btn btn-success add-new-btn" @click="createNewMode">Create New</button>
                <div class="card" v-for="reaction in reactions" :key="reaction.id" @click="this.edit(reaction)">
                    <div class="emoji" v-html="reaction.htmlEntity"></div>
                </div>
            </div>
            <div class="col-6 card">
                <h4>Data</h4>
                <form class="editor">
                    <label for="title">Emoji</label>
                    <input type="text" id="title" class="form-control" v-model="editedReaction.htmlEntity">
                    <button type="button" class="btn btn-success" @click="addOrEditReaction">Save</button>
                    <button type="button" class="btn btn-danger" @click="deleteReaction">Delete</button>
                    <button type="button" class="btn btn-secondary" @click="clearEditor">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios_auth.js';

export default {
    name: "ReactionsList",
    data() {
        return {
            reactions: [],
            editedReaction: {
                id: 0,
                htmlEntity: ""
            },
            createMode: false
        }
    },
    methods: {
        async getReactions() {
            try {
                const response = await axios.get('/reactions');
                this.reactions = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        createNewMode() {
            this.createMode = true;
            this.editedReaction = {
                id: 0,
                htmlEntity: ""
            };
        },
        edit(reaction) {
            this.createMode = false;
            this.editedReaction = reaction;
        },
        addOrEditReaction() {
            if (this.createMode) {
                this.addReaction();
            } else {
                this.editReaction();
            }
        },
        async addReaction() {
            try {
                const response = await axios.post('/reactions', this.editedReaction);
                this.reactions.push(response.data);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async editReaction() {
            try {
                const response = await axios.put('/reactions/' + this.editedReaction.id, this.editedReaction);
                this.reactions = this.reactions.map(reaction => reaction.id == this.editedReaction.id ? response.data : reaction);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async deleteReaction() {
            try {
                await axios.delete('/reactions/' + this.editedReaction.id);
                this.reactions = this.reactions.filter(reaction => reaction.id != this.editedReaction.id);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        clearEditor() {
            this.createMode = false;
            this.editedReaction = {
                id: 0,
                htmlEntity: ""
            };
        }
    },
    mounted() {
        this.getReactions();
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

.emoji {
    font-size: 48px;
}
</style>