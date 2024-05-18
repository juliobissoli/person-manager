<script setup>
import { onMounted, ref } from 'vue';
import api from '../../../service/api';
import Auth from '../../../utils/auth';
import ModalFormUser from '../../../components/users/ModalFormUser.vue'

const userList = ref([])

const modalFormUserIsVisible = ref(false)

onMounted(async () => {
    // data-path="/api/usuario/pesquisar"
    api.get(`usuario/buscar/${Auth.userId()}`).then((res) => {
        userList.value = res.data
        console.log(res.data)
    })
})

</script>

<template>
    <div class="">
        <ModalFormUser
        @close="modalFormUserIsVisible = false"
        v-show="modalFormUserIsVisible" />
        <header class="flex justify-between items-end border-b-primary py-2">
            <h1 class="text-2xl md:text-4xl">Usuários</h1>
            <div class="flex items-center gap-2">
                <button class="btn text-xl" @click="modalFormUserIsVisible = true">
                    <i class="ph ph-plus"></i>
                </button>
            </div>
        </header>


    </div>
</template>
