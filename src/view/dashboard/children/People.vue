<script setup>
import { onMounted, ref } from "vue";
import api from "../../../service/api";
import Auth from "../../../utils/auth";

import BtnToggle from "../../../components/common/BtnToggle.vue";
import ContactListItem from "../../../components/contact/ContactListItem.vue";
import SearchInput from "../../../components/common/SearchInput.vue";
import PeopleListItem from "../../../components/person/PeopleListItem.vue"
import ModalFormPerson from "../../../components/person/ModalFormPerson.vue";

const peopleList = ref([]);

const search = ref("");

const formPersonIsVisible = ref(false);

const modeView = ref("normal");

onMounted(async () => {
  handleGetContacts();
});


const searchContact = (value) => {
  search.value = value.trim();

  handleGetContacts();
};

const handleGetContacts = async () => {
  peopleList.value = [];

  let handleFunction = api.post(`/pessoa/pesquisar`, { nome: '' });


  handleFunction
    .then((response) => {
      peopleList.value = response.data;
      console.log('res => ', response.data)
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleSavePerson = async (data) => {
  handleGetContacts()
  formPersonIsVisible.value = false
}
</script>

<template>
  <div class="pb-8">
    <ModalFormPerson v-show="formPersonIsVisible" @close="formPersonIsVisible = false" @save="handleSavePerson" />
    <header class="flex justify-between items-end border-b-primary py-2">
      <h1 class="text-2xl md:text-4xl">Sua lista de pessoas</h1>
      <div class="flex items-center gap-2">
        <button @click="formPersonIsVisible = true" class="btn text-xl">
          <i class="ph ph-plus"></i>
        </button>
      </div>
    </header>

    <section class="mt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div v-for="person in peopleList" :key="person.id" class="hover:bg-secondary border-primary p-4 rounded-xl">
          <router-link :to="`/persons/${person.id}`">

            <PeopleListItem :person="person" size="20" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
