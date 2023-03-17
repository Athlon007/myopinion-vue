<script setup>
import Reaction from './Reaction.vue';
import NewReaction from './NewReaction.vue';
</script>

<template>
    <div class="card paper">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div class="reactions">
            <Reaction v-for="reaction in reactionsDisplayed" :key="reaction.id" :id="reaction.id"
                :reactionEntity="reaction.reaction_entity" :count="reaction.count" :opinionID="this.id" />
            <NewReaction :opinionID="this.id" @reaction-added="r => refreshReactions(r)" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Opinion",
    data() {
        return {
            reactionsDisplayed: []
        }
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        reactions: {
            type: Array,
            required: false,
        }
    },
    methods: {
        async refreshReactions(reaction) {
            // Check if reactionDisplayed already contains reaction
            for (let r of this.reactionsDisplayed) {
                console.log(r.id + " " + reaction.id);
                if (r.id == reaction.id) {
                    r.count = reaction.count;
                    return;
                }
            }
            this.reactions.push(reaction);
        }
    },
    mounted() {
        this.reactionsDisplayed = this.reactions;
    }
}
</script>

<style scoped></style>