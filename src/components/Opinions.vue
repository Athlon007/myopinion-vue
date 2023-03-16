<script setup>
import Opinion from './Opinion.vue';
</script>

<template>
    <div class="container paper">
        <div class="opinions">
            <Opinion v-for="opinion in opinions" :key="opinion.id" :id="opinion.id" :title="opinion.title"
                :content="opinion.content" :reactions="opinion.reactions" />
        </div>
        <div class="button-container" v-if="displayMore">
            <button>Load More...</button>
        </div>
        <div class="button-container" v-else></div>
    </div>
</template>

<script>
import axios from '../axios_auth.js';

export default {
    name: "Opinions",
    data() {
        return {
            topic: {
                id: -1,
                name: 'Opinions'
            },
            opinions: [],
            limit: 10,
            offset: 0,
            displayMore: true
        }
    },
    methods: {
        async loadOpinions() {
            const response = await axios.get('/topics/today/opinions', {
                params: {
                    limit: this.limit,
                    offset: this.offset
                }
            });
            //this.opinions = response.data;
            // add new opinions to the existing opinions
            let newOpinions = response.data;
            if (this.opinions.length > 0) {
                this.opinions.push(newOpinions);
            } else {
                this.opinions = newOpinions;
            }


            if (this.opinions.length < this.limit) {
                this.displayMore = false;
            }

            this.offset += this.limit;
        }
    },
    mounted() {
        this.loadOpinions();
    }
}
</script>

<style scoped>
.opinions {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: wrap;
    flex-basis: 2;
}

div>* {
    margin: 1em;
}

.button-container {
    widows: 100%;
}

.button-container>button {
    width: 100%;
}
</style>