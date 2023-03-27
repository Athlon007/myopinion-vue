import { defineStore } from 'pinia'
import axios from '../axios_auth.js';

export const useUserSessionStore = defineStore('usersession', {
    state: () => ({
        token: '',
        username: '',
    }),
    getters: {
        isAuthenticated: (state) => state.token !== ''
    },
    actions: {
        localLogin() {
            if (!localStorage['jwt'] || !localStorage['username'] || !localStorage['jwt'].length || !localStorage['username'].length) {
                return;
            }

            this.token = localStorage['jwt'];
            this.username = localStorage['username'];
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;

            // Check if logged in.
            axios
                .get("/accounts/me")
                .then((response) => {
                    this.username = response.data.username;
                })
                .catch((error) => {
                    console.error(error);
                    this.logout();
                });
        },
        login(username, password) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/accounts/login", {
                        username: username,
                        password: password,
                    })
                    .then((response) => {
                        this.token = response.data.jwt;
                        this.username = response.data.username;

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                        localStorage['jwt'] = this.token;
                        localStorage['username'] = this.username;

                        console.log(response);

                        resolve();
                    })
                    .catch((error) => {
                        reject(error.response.data.errorMessage);
                    });
            });
        },
        logout() {
            this.token = '';
            this.username = '';
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            axios.defaults.headers.common['Authorization'] = '';
        }
    }
})
