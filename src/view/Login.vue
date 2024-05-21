<script setup>
import { ref } from 'vue';
import auth from '../utils/auth'
import { useRouter, useRoute } from 'vue-router'
import Spinner from '../components/common/Spinner.vue';

const username = ref('');
const password = ref('');
const remember = ref(true);
const requestStatus = ref('empty');

const route = useRoute();
const router = useRouter();

const handleLogin = async () => {

    requestStatus.value = 'loading';
    const res = await auth.login(username.value, password.value, remember.value)
    console.log(res)

    if (res.status === 200) {
        requestStatus.value = 'success';
        if (router.query && router.query.redirect) {
            router.push(router.query.redirect);
        } else {
            // this.setUserLogin(this.isLogged);
            router.push({ name: "Dashboard" });
        }
    }
    else {
        requestStatus.value = 'error';
    }
}

</script>

<template>
    <div class="h-screen flex justify-center ">
        <!-- <div class="hidden md:block w-3/5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div> -->
        <div class="w-full md:w-2/5  bg-zinc-900 py-20">
            <div class="sm:mx-auto sm:w-full sm:max-w-md py-20 px-4">
                <h1 class="text-2xl font-bold text-center ">Agenda de Contatos</h1>
                <form @submit.prevent="handleLogin" class="flex flex-col gap-4 pt-8 ">
                    <input type="text" v-model="username" class="input-primary" placeholder="Username" />
                    <input type="password" v-model="password" class="input-primary" placeholder="Password" />

                    <label class="flex items-center gap-2 text-zinc-100 cursor-pointer">
                        <input type="checkbox" v-model="remember" class="input-primary" placeholder="Password" />
                        Lembrar-me
                    </label>

                    <Spinner v-if="requestStatus === 'loading'" />
                    <button v-else class="bg-zinc-800 text-zinc-100 rounded-md p-2">Login</button>
                </form>

                <div v-if="requestStatus === 'error'" class="text-red-500 text-center p-4">
                    Invalid username or password
                </div>
            </div>
        </div>
    </div>
</template>
