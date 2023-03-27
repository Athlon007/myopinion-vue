<template>
    <div class="container card row">
        <div class="col-6 card">
            <h4>Accounts</h4>
            <button type="button" class="btn btn-success add-new-btn" @click="createNewMode">Create New</button>
            <div class="card" v-for="account in accounts" :key="account.id" @click="startEditAccount(account)">
                <h3>{{ account.username }}</h3>
                <p>Email: {{ account.email }}</p>
                <p>Account Type: {{ account.accountType.name }}</p>
            </div>
        </div>
        <div class="col-6 card">
            <h4>Data</h4>
            <form class="editor">
                <label for="username">Username</label>
                <input type="text" id="username" class="form-control" v-model="editedAccount.username">
                <label for="email">Email</label>
                <input type="text" id="email" class="form-control" v-model="editedAccount.email">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="editedAccount.password">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" class="form-control" v-model="editedAccount.confirmPassword">
                <label for="accountType">Account Type</label>
                <select id="accountType" class="form-control" v-model="editedAccount.accountType">
                    <option v-for="accountType in accountTypes" :key="accountType.id" :value="accountType">
                        {{ accountType.name }}
                    </option>
                </select>
                <button type="button" class="btn btn-success" @click="addOrEditAccount">Save</button>
                <button type="button" class="btn btn-danger" @click="deleteAccount">Delete</button>
                <button type="button" class="btn btn-secondary" @click="clearEditor">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '../../axios_auth.js';

export default {
    name: "AccountsList",
    data() {
        return {
            accounts: [],
            accountTypes: [],
            editMode: false,
            editedAccount: {
                id: null,
                username: null,
                email: null,
                password: null,
                confirmPassword: null,
                accountType: {
                    id: null,
                    name: null
                },
            }
        }
    },
    methods: {
        async getAccounts() {
            try {
                const response = await axios.get('/accounts');
                this.accounts = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        startEditAccount(account) {
            this.editedAccount = JSON.parse(JSON.stringify(account));
            this.editMode = true;
        },
        addOrEditAccount() {
            if (this.editMode) {
                this.editAccount();
            } else {
                this.addAccount();

            }
        },
        createNewMode() {
            this.editMode = false;
            this.editedAccount = {
                id: null,
                username: null,
                email: null,
                password: null,
                confirmPassword: null,
                accountType: {
                    id: null,
                    name: null
                },
            }
        },
        clearEditor() {
            this.editedAccount = {
                id: null,
                username: null,
                email: null,
                password: null,
                confirmPassword: null,
                accountType: {
                    id: null,
                    name: null
                },
            }
        },
        async addAccount() {
            try {
                const response = await axios.post('/accounts', this.editedAccount);
                this.accounts.push(response.data);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async editAccount() {
            try {
                const response = await axios.put('/accounts/' + this.editedAccount.id, this.editedAccount);
                const index = this.accounts.findIndex(account => account.id === this.editedAccount.id);
                this.accounts.splice(index, 1, response.data);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        },
        async deleteAccount() {
            try {
                await axios.delete('/accounts/' + this.editedAccount.id);
                const index = this.accounts.findIndex(account => account.id === this.editedAccount.id);
                this.accounts.splice(index, 1);
                this.clearEditor();
            } catch (error) {
                console.error(error);
            }
        }
    },
    async mounted() {
        this.getAccounts();

        const response = await axios.get('/account-types');
        this.accountTypes = response.data;
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    padding: 1rem;
    width: 100%;
}

.row {
    width: 100%;
}

.editor>input,
textarea,
select {
    width: 100%;
}


.add-new-btn {
    width: 100%;
}

.container {
    min-width: 75vw;
}
</style>