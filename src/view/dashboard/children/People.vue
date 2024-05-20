
    <script setup>
import { onMounted, ref } from "vue";
import api from "../../../service/api";
import Auth from "../../../utils/auth";

import BtnToggle from "../../../components/common/BtnToggle.vue";
import ContactListItem from "../../../components/contact/ContactListItem.vue";
import SearchInput from "../../../components/common/SearchInput.vue";
import PeopleListItem from "../../../components/person/PeopleListItem.vue"

const peopleList = ref([]);

const search = ref("");

const formPersonIsVisible = ref(false);

const modeView = ref("normal");

onMounted(async () => {
  handleGetContacts();
});
const toggleModeView = (value) => {
  modeView.value = value;

  handleGetContacts();
};

const searchContact = (value) => {
  search.value = value.trim();

  handleGetContacts();
};

const handleGetContacts = async () => {
  peopleList.value = [];

  let handleFunction = api.get(`/pessoa/buscar/${Auth.userId()}`);

  if (modeView.value === "favorite") {
    handleFunction = api.get(`/favorito/pesquisar`);
  } else if (search.value.length > 0) {
    handleFunction = api.post(`/pessoa/pesquisar`, { nome: search.value });
  }

  handleFunction
    .then((response) => {
      peopleList.value = [response.data.object];
      console.log('res => ', response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  // const response = await api.get(url)
};
</script>

<template>
  <div class="">
    <!-- <ModalFormContact
      v-show="formPersonIsVisible"
      @close="formPersonIsVisible = false"
    /> -->
    <header class="flex justify-between items-end border-b-primary py-2">
      <h1 class="text-2xl md:text-4xl">Sua lista de pessoas</h1>
      <div class="flex items-center gap-2">
        <button class="btn text-xl">
          <i class="ph ph-plus"></i>
        </button>
      </div>
    </header>

    <section class="mt-8">
      <ul class="space-y-4 divider-y">
        <li
          v-for="person in peopleList"
          :key="person.id"
          class="border-b-primar pb-4"
        >
        <PeopleListItem :person="person" />
         
          <!-- <ContactListItem :contact="contact" /> -->
        </li>
      </ul>
    </section>
  </div>
</template>


