<script setup>
import Reaction from './Reaction.vue';
</script>

<template>
    <div class="card paper">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "Opinion",
    data() {

    },
    props: {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    },
}
</script>

<style scoped></style>