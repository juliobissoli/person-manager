<script setup>
import { onMounted, ref } from 'vue';
import api from '../../../service/api';
import Auth from '../../../utils/auth';
import ModalFormUser from '../../../components/users/ModalFormUser.vue'

const userList = ref([])

const modalFormUserIsVisible = ref(false)

const userSelectedToEdit = ref(null)
onMounted(async () => {
    getUsers()
})

const getUsers = async () => {
    api.post(`usuario/pesquisar`, { termo: '' }).then((res) => {
        userList.value = res.data
    })
}

const handleAddUser = () => {
    userSelectedToEdit.value = null
    modalFormUserIsVisible.value = true
}

const handleEditUser = (user) => {
    userSelectedToEdit.value = user
    modalFormUserIsVisible.value = true
}

const handleSaveUser = (user) => {
    modalFormUserIsVisible.value = false
    getUsers()
    
}

</script>

<template>
    <div class="pb-8">
        <template v-if="modalFormUserIsVisible">
            <ModalFormUser 
                @close="modalFormUserIsVisible = false" 
                @save="handleSaveUser"
                :defaultValue="userSelectedToEdit"
                :editMode="userSelectedToEdit !== null" />
        </template>
        <header class="flex justify-between items-end border-b-primary py-2">
            <h1 class="text-2xl md:text-4xl">Usuários</h1>
            <div class="flex items-center gap-2">
                <button class="btn text-xl" @click="handleAddUser">
                    <i class="ph ph-plus"></i>
                </button>
            </div>

        </header>
        <section class="my-8">
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li v-for="user in userList" :key="user.id" class="border-primary p-4 rounded-xl">

                    <div class="ml-2">
                        <div class="flex justify-between w-full">
                            <span class="text-xl font-semibold">{{ user.nome }}</span>

                            <button @click="handleEditUser(user)" class="btn border-transparent">
                                <i class="ph ph-pencil-simple-line"></i>

                            </button>
                        </div>
                        <p><span class="text-zinc-500">Email:</span> {{ user.email }}</p>
                        <p><span class="text-zinc-500">Username:</span> {{ user.username }}</p>
                        <p><span class="text-zinc-500">Telefone:</span> {{ user.telefone }}</p>
                    </div>
                </li>
            </ul>
        </section>


    </div>
</template>
