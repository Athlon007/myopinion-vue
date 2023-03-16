<template>
    <button class="paper-btn btn-secondary" @click="showPicker = !showPicker">
        <p>+</p><span>&nbsp;</span>
    </button>
    <div v-if="showPicker" class="reactions">
        <button v-for="reactionEntity in reactionEntities" @click="$event => addReaction(reactionEntity)">
            <div v-html="reactionEntity.htmlEntity"></div>
        </button>
    </div>
    <div v-else></div>
</template>

<script>
import axios from '../axios_auth.js';

export default {
    name: "NewReaction",
    data() {
        return {
            showPicker: false,
            reactionEntities: []
        }
    },
    props: {
        opinionID: {
            type: Number,
            required: true
        }
    },
    methods: {
        async addReaction(reactionEntity) {
            try {
                const response = await axios.post('/react/' + this.opinionID,
                    reactionEntity
                );

                this.$emit('reaction-added', response.data);
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.reactionEntities = window.reactionEntities;
    }
}
</script>

<style scoped>
.reactions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
</style>