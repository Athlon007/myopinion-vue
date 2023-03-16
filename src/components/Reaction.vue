<template>
    <button class="paper-btn btn-primary emoji emoji-lg" @click="addReaction">
        <div v-html="reactionEntity.htmlEntity"></div>
        <span>{{ this.displayedCount }}</span>
    </button>
</template>

<script>
import axios from '../axios_auth.js';

export default {
    name: "Reaction",
    data() {
        return {
            displayedCount: 0
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        reactionEntity: {
            type: Object,
            required: true
        },
        count: {
            type: Number,
            required: false
        },
        opinionID: {
            type: Number,
            required: true
        }
    },
    methods: {
        async addReaction() {
            try {
                const response = await axios.post('/react/' + this.opinionID,
                    this.reactionEntity
                );
                this.displayedCount = response.data.count;
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.displayedCount = this.count;
    },
    watch: {
        count: function (newCount) {
            this.displayedCount = newCount;
        }
    }

}
</script>

<style scoped>
@import url('https://unpkg.com/emoji.css/dist/emoji.min.css');
</style>