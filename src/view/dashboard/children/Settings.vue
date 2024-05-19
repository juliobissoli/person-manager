<script setup>
import { onMounted, ref } from "vue";
import api from "../../../service/api";
import Auth from "../../../utils/auth";
import ModalFormUser from "../../../components/users/ModalFormUser.vue";
import ModalChangePassword from "../../../components/users/ModalChangePassword.vue";
import moment from "moment";

const userList = ref([]);

const modalFormUserIsVisible = ref(false);
const modalChangePassIsVisible = ref(false);

const user = ref({
  cpf: "",
  dataNascimento: "",
  email: "",
  id: "",
  nome: "",
  password: "",
  telefone: "",
  username: "",
});

const entitiesShow = [
  {
    label: "Nome",
    name: "nome",
  },
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Telefone",
    name: "telefone",
  },
  {
    label: "CPF",
    name: "cpf",
  },
  // {
  //     label: 'Nome de usuário',
  //     name: 'username'
  // },
];

const handleSaveUser = async () => {
  modalFormUserIsVisible.value = false;
  await handleGetUser();
};

const handleGetUser = async () => {
  api.get(`usuario/buscar/${Auth.userId()}`).then((res) => {
    user.value = res.data.object.usuario;
    console.log(res.data);
  });
};

onMounted(async () => {
  await handleGetUser();
});
</script>

<template>
  <div class="">
    <ModalFormUser
      @close="modalFormUserIsVisible = false"
      @save="handleSaveUser"
      v-show="modalFormUserIsVisible"
      :defaultValue="user"
      :editMode="true"
    />

    <ModalChangePassword
      v-show="modalChangePassIsVisible"
      @close="modalChangePassIsVisible = false"
      @save="modalChangePassIsVisible = false"
      :defaltUsername="user.username"

    />
    <header class="flex justify-between items-end border-b-primary py-2">
      <h1 class="text-2xl md:text-2xl text-zinc-500">Dados de acesso</h1>
    </header>

    <section class="my-8">
      <div class="block md:flex gap-4">
        <div class="w-full gap-2 mb-8">
          <h1 class="text-zinc-500">Username</h1>
          <p class="text-2xl">{{ user.username }}</p>
        </div>
        <div class="w-full gap-2 mb-8">
          <h1 class="text-zinc-500">Senha</h1>
          <p class="text-2xl">************</p>
          <button @click="modalChangePassIsVisible = true" class="btn">
            Trocar senha
          </button>
        </div>
      </div>
    </section>

    <header class="flex justify-between items-end border-b-primary py-2">
      <h1 class="text-2xl md:text-2xl text-zinc-500">Dados pessoais</h1>
      <div class="flex items-center gap-2">
        <button class="btn text-xl" @click="modalFormUserIsVisible = true">
          <i class="ph ph-pencil-simple-line"></i>
        </button>
      </div>
    </header>

    <section class="mt-8">
      <div class="md:flex flex-wrap">
        <div
          class="mb-8 w-full md:w-1/2"
          v-for="entity in entitiesShow"
          :key="entity.name"
        >
          <h1 class="text-zinc-500">{{ entity.label }}</h1>
          <p class="text-2xl">{{ user[entity.name] }}</p>
        </div>

        <div class="mb-8">
          <h1 class="text-zinc-500">Data de nascimento</h1>
          <p class="text-2xl">
            {{ moment(user.dataNascimento).format("DD/MM/YYYY") }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
