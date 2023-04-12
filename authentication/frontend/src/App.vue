<script>

import Cookies from "universal-cookie";

const cookies = new Cookies();
const server_url = "http://localhost:8000";

export default {
    data() {
        return {
            isAuthenticated: false,
            sessionUsername: "",
            username: "",
            password: "",
            csrf: "",
        }
    },

    created() {
        this.getSession();
    },

    methods: {
        getCSRF () {
            fetch(server_url + "/api/csrf/", {
                credentials: "include",
            })
            .then((response) => {
                const csrfToken_ = response.headers.get("x-csrftoken");
                this.csrfToken = csrfToken_;
            })
            .catch((error) => {
                console.log(error);
            });
        },

        getSession() {
            fetch(server_url + "/api/session/", {
                "credentials": "include",
                "X-CSRFToken": this.csrfToken,
            })
            .then((response) => response.json())
            .then((data) => {
                this.isAuthenticated = data.isAuthenticated;
                if (this.isAuthenticated) {
                    this.getWhoAmI();
                } else {
                    this.getCSRF();
                }
            })
            .catch((err) => {
                console.log(err);
            });
        },

        login() {
            const username = this.username;
            const password = this.password;

            fetch(server_url + "/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": this.csrfToken,
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then((response) => {
                this.getSession();
            })
            .catch((err) => console.log(err));
        },

        logout() {
            fetch(server_url + "/api/logout", {
                credentials: "include",
            })
            .then((response) => {
                this.getSession();
                this.getCSRF();
            })
            .catch((err) => console.log(err));
        },

        getWhoAmI() {
            fetch(server_url + "/api/whoami/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            .then((response) => response.json())
            .then((data) => this.sessionUsername = data.username)
            .catch((err) => console.log(err));
        },
    }
}
</script>

<template>
    <div v-if="isAuthenticated">
        You are logged in as {{ sessionUsername }}!<br>
        <button v-on:click="logout">Logout</button><br>
    </div>
    <div v-else>
        <form @submit.prevent="login">
            Username: <input label="username" v-model="username" placeholder="username" required><br>
            Password: <input label="password" v-model="password" type="password" required><br>
            <button>Login</button>
        </form>
    </div>
</template>
