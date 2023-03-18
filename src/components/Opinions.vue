<script setup>
import Opinion from './Opinion.vue';
</script>

<template>
    <div class="sort-methods">
        <select v-model="sortMethod" @change="loadOpinions">
            <option v-for="option in sortOptions" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
    <div class="container paper">
        <div class="opinions">
            <Opinion v-if="opinions.length > 0" v-for="opinion in opinions" :key="opinion.id" :id="opinion.id"
                :title="opinion.title" :content="opinion.content" :reactions="opinion.reactions" />
            <div v-else>
                <h2>No opinions yet</h2>
                <p style="text-align: center;">Share your thoughts now!</p>
            </div>
        </div>
        <div class="button-container" v-if="displayMore">
            <button @click="loadMore">Load More...</button>
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
            displayMore: true,
            sortOptions: [
                { text: 'Popular', value: 'popular' },
                { text: 'Newest', value: 'new' }
            ],
            sortMethod: '',
            lastSortMethod: ''
        }
    },
    methods: {
        async loadOpinions() {
            let parameters = {
                limit: this.limit,
                offset: this.offset,
                sort: this.sortMethod
            };

            if (this.lastSortMethod != this.sortMethod) {
                this.opinions = [];
                this.offset = 0;
            }
            this.lastSortMethod = parameters['sort'];

            try {
                const response = await axios.get('/topics/today/opinions', { params: parameters });
                this.opinions = this.opinions.concat(response.data);

                // If the response is less than the limit, there are no more opinions to load.
                if (response.data.length < this.limit || response.data.length == 0) {
                    this.displayMore = false;
                }
            } catch (error) {
                console.error(error);
            }
        },
        loadMore() {
            this.offset += this.limit;
            this.loadOpinions();
        }
    },
    mounted() {
        this.sortMethod = this.sortOptions[0].value;
        this.lastSortMethod = this.sortMethod;
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
    flex-basis: auto;
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