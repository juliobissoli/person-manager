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
            router.push({ name: "Dashboard" });
        }
    }
    else {
        requestStatus.value = 'error';
    }
}

</script>

<template>
    <div class="h-screen flex justify-center relative bg-gradient-to-r from-indigo-500/10  via-30% to-purple-500/10 to-90%">
        <div class="w-full md:w-2/5  pt-20">
            <div class="sm:mx-auto sm:w-full sm:max-w-md pt-20 pb-8 px-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-md">
                <h1 class="text-2xl font-bold text-center ">Agenda de Contatos</h1>
                <form @submit.prevent="handleLogin" class="flex flex-col gap-4 pt-8 ">
                    <input type="text" v-model="username" class="input-primary" placeholder="Username" />
                    <input type="password" v-model="password" class="input-primary" placeholder="Password" />

                    <label class="flex items-center gap-2 text-zinc-100 cursor-pointer">
                        <input type="checkbox" v-model="remember" class="input-primary" placeholder="Password" />
                        Lembrar-me
                    </label>

                    <Spinner v-if="requestStatus === 'loading'" />
                    <button v-else class="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-zinc-200 rounded-md p-2">Login</button>
                </form>

                <div v-if="requestStatus === 'error'" class="text-red-500 text-center p-4">
                    Invalid username or password
                </div>
            </div>
        </div>

    </div>
</template>
