<!-- <script setup>
import { onMounted, ref } from "vue";
import api from "../../../service/api";
import Auth from "../../../utils/auth";

import BtnToggle from "../../../components/common/BtnToggle.vue";
import ContactListItem from "../../../components/contact/ContactListItem.vue";
import SearchInput from "../../../components/common/SearchInput.vue";
import ModalFormContact from "../../../components/contact/ModalFormContact.vue";

const contactsList = ref([]);

const search = ref("");

const formContactIsVisible = ref(false);

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
</script>

<template>
  <div class="">
    <ModalFormContact v-show="formContactIsVisible" @save="handleGetContacts, formContactIsVisible = false"
      @close="formContactIsVisible = false" />
    <header class="flex justify-between items-end border-b-primary py-2">
      <h1 class="text-2xl md:text-4xl">Sua agenda</h1>
      <div class="flex items-center gap-2">
        <div class="w-[300px] flex justify-end" v-show="modeView === 'normal'">
          <SearchInput @changeInput="searchContact" />
        </div>
        <div>

          <BtnToggle first="normal" :value="modeView" @select="toggleModeView" :data="[
      { value: 'normal', icon: 'ph ph-list' },
      { value: 'favorite', icon: 'ph ph-star' },
    ]" />
        </div>

        <button @click="formContactIsVisible = true" class="btn text-xl">
          <i class="ph ph-plus"></i>
        </button>
      </div>
    </header>

    <section class="mt-8">
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="contact in contactsList" :key="contact.id">
          <div class="border-primary rounded-xl p-4">
            <ContactListItem :contact="contact" />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template> -->
