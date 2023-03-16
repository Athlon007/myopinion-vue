<script setup>
import Reaction from './Reaction.vue';
import NewReaction from './NewReaction.vue';
</script>

<template>
    <div class="card paper">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div class="reactions">
            <Reaction v-for="reaction in reactions" :key="reaction.id" :id="reaction.id"
                :reactionEntity="reaction.reaction_entity" :count="reaction.count" :opinionID="this.id" />
            <NewReaction />
        </div>
    </div>
</template>

<script>
export default {
    name: "Opinion",
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
    }
}
</script>

<style scoped></style>