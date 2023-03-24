<template>
    <a v-if="!this.isSent" @click="isVisible = !isVisible">
        Report...
    </a>
    <p v-else>Report sent!</p>
    <div class="reactions-container">
        <div v-if="isVisible" class="reactions paper" :class="{ 'reactions-visible': isVisible }">
            <label v-for="reportType in this.reportTypes" class="paper-radio" @click="this.selectedReportType = reportType">
                <input type="radio" name="reportTypeId" id="rt-{{ reportType.id }}" value="{{ reportType.id }}"
                    @click="this.selectedReportType = reportType">
                <span>&nbsp;{{ reportType.name }}</span>
            </label>
            <button @click="report">Report</button>
        </div>
        <div v-else></div>
    </div>
</template>

<script>
import axios from '../axios_auth.js';

export default {
    name: "Report",
    data() {
        return {
            isVisible: false,
            reportTypes: [],
            selectedReportType: null,
            isSent: false
        }
    },
    props: {
        opinionID: {
            type: Number,
            required: true
        }
    },
    methods: {
        async report() {
            try {
                const response = await axios.post('/opinions/report/' + this.opinionID,
                    this.selectedReportType
                );

                this.$emit('reaction-added', response.data);
                this.isVisible = false;
                this.isSent = true;
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.reportTypes = window.reportTypes;
    }
}
</script>

<style scoped>
a {
    background-image: none;
}

a:hover {
    cursor: pointer;
}

label>input {
    display: inline;
}

label {
    display: block;
}
</style>