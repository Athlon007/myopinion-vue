<template>
    <button class="paper-btn btn-secondary" @click="showPicker = !showPicker">
        <p>+</p><span>&nbsp;</span>
    </button>
    <div class="reactions-container">
        <div v-if="showPicker" class="reactions" :class="{ 'reactions-visible': showPicker }">
            <button v-for="reactionEntity in reactionEntities" @click="$event => addReaction(reactionEntity)">
                <div v-html="reactionEntity.htmlEntity"></div>
            </button>
        </div>
        <div v-else></div>
    </div>
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
.reactions-container {
    overflow-y: hidden;
    margin-top: 1em;
}

.reactions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: var(--secondary-light);
    padding: 0.5em;
}

.reactions-visible {
    animation: show 0.5s ease-in-out;
}

@keyframes show {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }

}
</style>