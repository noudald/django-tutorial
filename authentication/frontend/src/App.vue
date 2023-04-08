<script>

import Cookies from "universal-cookie";

const cookies = new Cookies();

export default {
    data() {
        return {
            isAuthenticated: false,
            sessionUsername: "",
        }
    },

    created() {
        this.getSession();
    },

    methods: {
        getSession() {
            fetch("/api/session/", {
                "credentials": "same-origin",
            })
            .then((response) => response.json())
            .then((data) => {
                this.isAuthenticated = data.isAuthenticated;
                if (this.isAuthenticated) {
                    this.getWhoAmI();
                }
            })
            .catch((err) => console.log(err));
        },

        login() {
            const username = this.username;
            const password = this.password;

            fetch("/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies.get("csrftoken"),
                },
                credentials: "same-origin",
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
            fetch("/api/logout", {
                credentials: "same-origin",
            })
            .then((response) => {
                this.getSession();
            })
            .catch((err) => console.log(err));
        },

        getWhoAmI() {
            fetch("/api/whoami/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
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
