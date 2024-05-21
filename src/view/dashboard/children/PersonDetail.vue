<script setup>
import { onMounted, ref, defineProps, computed } from "vue";
import api from "../../../service/api";
import Auth from "../../../utils/auth";
import ModalFormPerson from "../../../components/person/ModalFormPerson.vue";
import Avatar from "../../../components/common/Avatar.vue";
import ModalUploadImage from "../../../components/person/ModalUploadImage.vue";
import ConfirmationByInput from "../../../components/common/ConfirmationByInput.vue";
import Tooltip from "../../../components/common/Tooltip.vue";

import { useRoute, useRouter } from 'vue-router';
const router = useRouter();

import { useStore } from 'vuex';

const store = useStore();


const modalFormPersonIsVisible = ref(false);

const modalUploadImageIsVisible = ref(false);

const modalDeletePersonIsVisible = ref(false);

const deletePersonIsLoading = ref(false);

const person = ref(
    {
        cpf: "",
        nome: "",
        endereco: {
            bairro: "",
            cep: "",
            cidade: "",
            estado: "",
            logradouro: "",
            numero: "",
            pais: "",
        },
    }
)

const contactsToPerson = ref([]);


const personAvatarUrl = computed(() => store.getters['person/personAvatarUrl'](id));


const route = useRoute();
const id = route.params.id;
const addressEntities = [
    {
        label: "Bairro",
        name: "bairro",
    },
    {
        label: "CEP",
        name: "cep",
    },
    {
        label: "Cidade",
        name: "cidade",
    },
    {
        label: "Estado",
        name: "estado",
    },
    {
        label: "Logradouro",
        name: "logradouro",
    },
    {
        label: "Número",
        name: "numero",
    },
    {
        label: "País",
        name: "pais",
    },
];

const handleSaveUser = async () => {
    modalFormPersonIsVisible.value = false;
    await handleGetPerson();
};

const handleGetPerson = async () => {
    api.get(`pessoa/buscar/${id}`).then((res) => {
        person.value = res.data.object;
        console.log(res.data);
    });
};

const getContactsToPerson = async () => {
    api.get(`contato/listar/${id}`).then((res) => {
        contactsToPerson.value = res.data;
        console.log('lista contatos', res.data);
    });
}

onMounted(async () => {
    await handleGetPerson();
    await getContactsToPerson();

});

const handleDeletePerson = async () => {
    deletePersonIsLoading.value = true;
    api.delete(`pessoa/remover/${id}`).then(
        (res) => {
            console.log(res);
            deletePersonIsLoading.value = false;
            router.push('/persons');
        },
        error => {
            deletePersonIsLoading.value = false;
            modalDeletePersonIsVisible.value = false;
            console.log(error);
        }
    );
}
</script>

<template>
    <div class="">
        <template v-if="modalUploadImageIsVisible">
            <ModalUploadImage :currentUrl="personAvatarUrl" :personId="id" @close="modalUploadImageIsVisible = false"
                @save="modalUploadImageIsVisible = false" />
        </template>
        <template v-if="modalFormPersonIsVisible">
            <ModalFormPerson @save="handleSaveUser" @close="modalFormPersonIsVisible = false" :editMode="true"
                :defaultValue="person" />
        </template>
        <template v-if="modalDeletePersonIsVisible">
            <ConfirmationByInput :modalTitle="'Deletar pessoa'"
                :confirmationMessage="`Tem certeza que você deseja deletar a pessoa ${person.nome}? Caso tenha certeza, habilite a opção de salvar e escreva:`"
                :checkToken="`${person.id}`" :isLoading="deletePersonIsLoading" @save="handleDeletePerson"
                @close="modalDeletePersonIsVisible = false" />
        </template>




        <router-link to="/persons" class="mb-8 text-zinc-500 gap-4">
            <i class="ph ph-arrow-left"></i>Voltar
        </router-link>
        <header class="flex justify-between items-end border-b-primary py-2 mt-8">
            <h1 class="text-2xl md:text-4xl ">Dados da pessoa #{{ id }}</h1>
            <div class="flex items-center gap-2">
                <Tooltip text="Editar pessoa">
                    <button class="btn text-xl" @click="modalFormPersonIsVisible = true">
                        <i class="ph ph-pencil-simple-line"></i>
                    </button>
                </Tooltip>
                <Tooltip text="Deletar pessoa">
                    <button class="btn-danger text-xl" @click="modalDeletePersonIsVisible = true">
                        <i class="ph ph-trash"></i>
                    </button>
                </Tooltip>
            </div>
        </header>


        <section class="my-8 md:flex gap-8 ">
            <aside class="w-full md:w-1/3 flex justify-center">
                <div class="w-[200px] h-[200px] relative">
                    <Avatar rounded="full" :imageID="id.toString()" />
           
                        <button class="absolute btn bg-primary border-primary m-4 bottom-0 right-0 "
                            @click="modalUploadImageIsVisible = true">
                            <i class="ph ph-pencil-simple-line"></i>
                        </button>
                </div>
            </aside>
            <aside class="w-full md:w-2/3 mt-4">
                <div class="block md:flex gap-4">
                    <div class="w-full gap-2 mb-8">
                        <h1 class="text-zinc-500">Nome</h1>
                        <p class="text-2xl">{{ person?.nome }}</p>
                    </div>
                    <div class="w-full gap-2 mb-8">
                        <h1 class="text-zinc-500">CPF</h1>
                        <p class="text-2xl">{{ person?.cpf }}</p>
                    </div>
                </div>

                <header class="flex justify-between items-end border-b-primary py-2">
                    <h1 class="text-2xl md:text-2xl text-zinc-500">Endereços</h1>

                </header>

                <div class="mt-8">
                    <div class="md:flex flex-wrap">
                        <div class="mb-8 w-full md:w-1/2" v-for="entity in addressEntities" :key="entity.name">
                            <h1 class="text-zinc-500">{{ entity.label }}</h1>
                            <p class="text-2xl">{{ person?.endereco[entity?.name] }}</p>
                        </div>

                    </div>
                </div>


                <header class="flex justify-between items-end border-b-primary py-2">
                    <h1 class="text-2xl md:text-2xl text-zinc-500">Contatos da pessoa</h1>

                </header>

                <div class="mt-4">
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li v-for="contact in contactsToPerson" :key="contact.id" class="border-primary rounded-xl p-4">
                            <p class="text-gray-500 truncate">
                                {{ contact.email }}
                                {{ contact.telefone }}
                            </p>
                            <div class="flex">
                                <p class=" rounded-full p-1 px-2 text-white text-xs" :class="{
                                        'border border-blue-500/50 text-blue-500/60': !contact.privado,
                                        'border border-gray-500/50 text-gray-500/60': contact.privado
                                    }">
                                    {{ contact.privado ? 'privado' : 'publico' }}
                                </p>
                            </div>
                        </li>
                    </ul>

                </div>
            </aside>

        </section>
    </div>
</template>
