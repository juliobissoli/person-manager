<script setup>
import { onMounted, ref } from 'vue';
import api from '../../../service/api';
import Auth from '../../../utils/auth';

import BtnToggle from '../../../components/common/BtnToggle.vue';
import ContactListItem from '../../../components/contact/ContactListItem.vue';
import SearchInput from '../../../components/common/SearchInput.vue';


const contactsList = ref([])

const search = ref('')

const modeView = ref('normal')

onMounted(async () => {
    handleGetContacts()
})
const toggleModeView = (value) => {
    modeView.value = value

    handleGetContacts()
}

const searchContact = (value) => {
    search.value = value.trim()

    handleGetContacts()
}

const handleGetContacts = async () => {

    contactsList.value = []

    let handleFunction = api.get(`/contato/listar/${Auth.userId()}`)

    if (modeView.value === 'favorite') {
        handleFunction = api.get(`/favorito/pesquisar`)

    } else if (search.value.length > 0) {
        handleFunction = api.get(`/contato/pesquisar`, { nome: search.value })
    }



    handleFunction.then((response) => {
        contactsList.value = response.data
    }).catch((error) => {
        console.log(error)
    })
    // const response = await api.get(url)
}
</script>

<template>
    <div class="">
        <header class="flex justify-between items-end border-b-primary py-2">
            <h1 class="text-2xl md:text-4xl">Sua agenda</h1>
            <div class="flex items-center gap-2">
                <button class="btn text-xl"> <i class="ph ph-plus"></i> </button>
                <div class="flex" v-show="modeView === 'normal'">
                    <SearchInput @changeInput="searchContact" />
                </div>

                <BtnToggle first="normal"
                    :data="[{ value: 'normal', icon: 'ph ph-list' }, { value: 'favorite', icon: 'ph ph-star' },]"
                    :value="modeView" @select="toggleModeView" />
                </div>
        </header>

        <section class="mt-8">
            <ul class="space-y-4  divider-y ">
                <li v-for="contact in contactsList" :key="contact.id" class="border-b-primar pb-4">
                    <ContactListItem :contact="contact" />
                </li>
            </ul>
        </section>
    </div>
</template>
