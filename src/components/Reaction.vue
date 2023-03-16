<template>
    <button class="paper-btn btn-primary emoji emoji-lg">
        <div v-html="reactionEntity.htmlEntity"></div>
        <span>{{ count }}</span>
    </button>
</template>

<script>
export default {
    name: "Reaction",
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
        }
    }

}
</script>

<style scoped>
@import url('https://unpkg.com/emoji.css/dist/emoji.min.css');
</style>