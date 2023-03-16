<template>
    <button class="paper-btn btn-secondary" @click="showPicker = !showPicker">
        <p>+</p><span>&nbsp;</span>
    </button>
    <div v-if="showPicker" class="reactions">
        <p>lololo</p>
    </div>
    <div v-else></div>
</template>

<script>
export default {
    name: "NewReaction",
    data() {
        return {
            showPicker: false,
            reactions: []
        }
    },
}
</script>

<style scoped></style>