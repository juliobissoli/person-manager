<script setup>
import { onMounted, ref, computed } from "vue";
import api from "../../../service/api";

import BtnToggle from "../../../components/common/BtnToggle.vue";
import ContactListItem from "../../../components/contact/ContactListItem.vue";
import SearchInput from "../../../components/common/SearchInput.vue";
import ModalFormContact from "../../../components/contact/ModalFormContact.vue";
import ConfirmationByInput from '../../../components/common/ConfirmationByInput.vue';
import Tooltip from '../../../components/common/Tooltip.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
const isOnContactsRoute = computed(() => route.path === '/contacts');
const isOnHomeRoute = computed(() => route.path === '/home');


const contactsList = ref([]);

const search = ref("");

const formContactIsVisible = ref(false);

const modeView = ref("normal");

const contactToDelete = ref(undefined);

const contactToEdit = ref(undefined);

const deleteContactIsLoading = ref(false);


onMounted(async () => {
    if (isOnHomeRoute.value) {
        modeView.value = "favorite"
    }
    handleGetContacts();
});


const searchContact = (value) => {
    search.value = value.trim();

    handleGetContacts();
};

const toggleModeView = (value) => {
  modeView.value = value;

  handleGetContacts();
};

const handleGetContacts = async () => {
    contactsList.value = [];
    
    let requestResponse = undefined
    if (modeView.value === "favorite") {
        requestResponse = await api.get(`/favorito/pesquisar`, { termo: search.value });
    } else {
        requestResponse = await api.post(`/contato/pesquisar`, { termo: search.value });
    }
    if (requestResponse.status === 200) {
        contactsList.value = requestResponse.data
    }
    // const response = await api.get(url)
};

const handleDeleteContact = async () => {
    deleteContactIsLoading.value = true;

    let requestResponse = await api.delete(`/contato/remover/${contactToDelete.value.id}`);

    deleteContactIsLoading.value = false;
    if (requestResponse.status === 200) {
        contactToDelete.value = undefined;
        handleGetContacts();
    }
}

const handleSaveFormContact = () => {
    formContactIsVisible.value = false;
    contactToEdit.value = undefined;
    handleGetContacts();
}


const handleAddFavorite = async (contact) => {
    let requestResponse = await api.post(`/favorito/salvar`, contact);

    if (requestResponse.status === 200) {
        contactToEdit.value = undefined;
        // modeView.value = "favorite"
        handleGetContacts();
    }
}

const handleRemoveFavorite = async (contact) => {
    let requestResponse = await api.delete(`/favorito/remover/${contact.id}`);

    if (requestResponse.status === 200) {
        contactToEdit.value = undefined;
        handleGetContacts();
    }
}
</script>

<template>
    <div class="pb-8">
        <template v-if="formContactIsVisible">
            <ModalFormContact 
            :defaultValue="contactToEdit"
            :editMode="contactToEdit !== undefined"
            @save="handleSaveFormContact"
            @close="formContactIsVisible = false" />
        </template>

        <template v-if="contactToDelete !== undefined">
            <ConfirmationByInput 
            :modalTitle="'Deletar pessoa'"
            :confirmationMessage="`Tem certeza que você deseja deletar o contato de ${contactToDelete?.pessoa?.nome}? Caso tenha certeza, habilite a opção de salvar e escreva:`"
            :checkToken="`${contactToDelete.id}`"
            :isLoading="deleteContactIsLoading"
            @save="handleDeleteContact"
            @close="contactToDelete = undefined" />
        </template>

        <header class="flex flex-col md:flex-row justify-between md:items-end border-b-primary py-2">
            <h1 class="text-2xl md:text-4xl">{{ modeView === 'favorite' ? 'Contatos Favoritos' : 'Todos contatos' }}</h1>
            <div class="flex items-center gap-2">
                <div class="w-[300px] flex justify-end" v-show="modeView === 'normal'">
                    <SearchInput @changeInput="searchContact" />
                </div>
                <button v-show="modeView === 'normal'" @click="formContactIsVisible = true" class="btn text-xl">
                    <i class="ph ph-plus"></i>
                </button>
                <div>
                    <BtnToggle 
                        :first="isOnHomeRoute ? 'favorite' : 'normal'" 
                        :value="modeView"
                        @select="toggleModeView" :data="[
                            { value: 'normal', icon: 'ph ph-list' },
                            { value: 'favorite', icon: 'ph ph-star' },
                        ]" />
                </div>
              
            </div>
        </header>

        <section class="mt-8">
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li v-for="contact in contactsList" :key="contact.id" class="relative border-primary rounded-xl p-4 flex flex-col gap-2">
                   
                    <ContactListItem :contact="contact" />
                    
                    <div v-if="modeView === 'normal'"  class="flex justify-end absolute -m-2 bottom-0 right-0 gap-2">
                        <Tooltip text="Deletar">

                            <button 
                                @click="contactToDelete = contact"
                                class="btn btn-danger border-primary bg-primary ">
                                <i class="ph ph-trash"></i>
                            </button>
                        </Tooltip>
                        <Tooltip text="Editar">
                            <button 
                                @click="contactToEdit = contact;
                                formContactIsVisible = true"
                                class="btn btn-primary border-primary bg-primary ">
                                    <i class="ph ph-pencil-simple-line"></i>
                            </button>
                        </Tooltip>
                        <Tooltip text="Favoritar">

                            <button  
                                @click="handleAddFavorite(contact)"
                                class="btn btn-primary border-primary bg-primary ">
                                    <i class="ph ph-star"></i>
                            </button>
                        </Tooltip>
                    </div>

                    <div v-else class="flex justify-end absolute -m-2 bottom-0 right-0 gap-2">
                        <Tooltip text="Remover favorito">
                            <button  
                                @click="handleRemoveFavorite(contact)"
                                class="btn btn-primary border-primary bg-primary ">
                                <i class="ph ph-star-half"></i>                       
                            </button>
                        </Tooltip>
                    </div>

                </li>
            </ul>
        </section>
    </div>
</template>
