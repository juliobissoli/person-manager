<script setup>
import { onMounted, ref } from "vue";
import api from "../../../service/api";
import PeopleListItem from "../../../components/person/PeopleListItem.vue"
import ModalFormPerson from "../../../components/person/ModalFormPerson.vue";
import SearchInput from "../../../components/common/SearchInput.vue";
const peopleList = ref([]);

const search = ref("");

const formPersonIsVisible = ref(false);


onMounted(async () => {
  handleGetPeople();
});


const searchPeople = (value) => {
  search.value = value.trim();

  handleGetPeople();
};

const handleGetPeople = async () => {
  peopleList.value = [];

  let handleFunction = api.post(`/pessoa/pesquisar`, { nome: search.value });


  handleFunction
    .then((response) => {
      peopleList.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleSavePerson = async (data) => {
  handleGetPeople()
  formPersonIsVisible.value = false
}
</script>

<template>
  <div class="pb-8">
    <ModalFormPerson v-show="formPersonIsVisible" @close="formPersonIsVisible = false" @save="handleSavePerson" />
    <header class="flex flex-col md:flex-row justify-between md:items-end border-b-primary py-2">
      <h1 class="text-2xl md:text-4xl">Sua lista de pessoas</h1>
      <div class="flex items-center gap-2">
        <div class="w-[300px] flex justify-end">
          <SearchInput @changeInput="searchPeople" />
        </div>
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
