<script setup>
import Reaction from './Reaction.vue';
</script>

<template>
    <div class="card paper">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
    </div>
</template>

<script>
export default {
    name: "Opinion",
    data() {
        return {
            id: -1
        }
    },
    props: {
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
}
</script>

<style scoped></style>