<script setup>
import { onMounted, ref } from 'vue';
import api from '../../../service/api';
import Auth from '../../../utils/auth';
import ModalFormUser from '../../../components/users/ModalFormUser.vue'
import moment from 'moment';

const userList = ref([])

const modalFormUserIsVisible = ref(false)

const user = ref({
    cpf: '',
    dataNascimento: '',
    email: '',
    id: '',
    nome: '',
    password: '',
    telefone: '',
    username: '',
})

const entitiesShow = [
    {
        label: 'Nome',
        name: 'nome'
    },
    {
        label: 'Email',
        name: 'email'
    },
    {
        label: 'Telefone',
        name: 'telefone'
    },
    {
        label: 'CPF',
        name: 'cpf'
    },
    {
        label: 'Nome de usuário',
        name: 'username'
    },
]

const handleSaveUser = async () => {
    console.log('=================== handleSaveUser ===================')
    modalFormUserIsVisible.value = false
    await handleGetUser()
}

const handleGetUser = async () => {
    api.get(`usuario/buscar/${Auth.userId()}`).then((res) => {
        user.value = res.data.object.usuario
        console.log(res.data)
    })
}

onMounted(async () => {
    await handleGetUser()
})

</script>

<template>
    <div class="">
        <ModalFormUser 
        @close="modalFormUserIsVisible = false"
        @save="handleSaveUser"
        v-show="modalFormUserIsVisible" :defaultValue="user" :editMode="true" />
        <header class="flex justify-between items-end border-b-primary py-2">
            <h1 class="text-2xl md:text-2xl text-zinc-500">Seus dados</h1>
            <div class="flex items-center gap-2">
                <button class="btn text-xl" @click="modalFormUserIsVisible = true">
                    <i class="ph ph-pencil-simple-line"></i>
                </button>
            </div>
        </header>

        <section class="mt-8">

            <div class=" gap-4">
                <div class="gap-2 mb-8" v-for="entity in entitiesShow" :key="entity.name">
                    <h1 class="text-xl text-zinc-500">{{ entity.label }}</h1>
                    <p class="text-4xl">{{ user[entity.name] }}</p>
                </div>

                <div class="gap-2 mb-8">
                    <h1 class="text-xl text-zinc-500">Data de nascimento</h1>
                    <p class="text-4xl">{{ moment(user.dataNascimento).format('DD/MM/YYYY') }}</p>
                </div>
            </div>
        </section>


    </div>
</template>
