<script setup>
import Modal from "../common/Modal.vue";
import { ref, watch, onMounted, defineEmits } from "vue";

import {
  maskCpf,
  maskPhone,
  validateEmail,
  validatePassword,
  validateByEntity,
} from "../../utils/inputsHelpers";
import api from "../../service/api";
import Auth from "../../utils/auth";
import Spinner from "../common/Spinner.vue";
import TextField from "../common/TextField.vue";


const requestStatus = ref("empty");

const emit = defineEmits(["save"]);

const formData = ref({
  name: "",
  phone: "",
  email: "",
  birthDate: "",
  cpf: "",
  username: "",
  password: "",
  confirmPassword: "",
  error: [],
  isValid: false,
});

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  defaultValue: {
    type: Object,
    required: false,
  },
});

const setValue = (e, entity) => {
  if (entity === "cpf") {
    e.target.value = maskCpf(e.target.value);
  } else if (entity === "phone") {
    e.target.value = maskPhone(e.target.value);
  }
  formData.value[entity] = e.target.value;

  validateValues(e.target.value, entity);
};

const validateValues = (value, entity) => {
  formData.value.error = formData.value.error.filter((item) => item !== entity);
  if (!validateByEntity(value, entity)) {
    formData.value.error.push(entity);
  }
  if (entity === "confirmPassword" && formData.value.password !== value) {
    formData.value.error.push(entity);
  }

  const entities = Object.keys(formData.value).filter(
    (item) => item !== "error" && item !== "isValid"
  );

  // O formulário esta valido quando não tem nenhum erro e não tem nenhum campo vazio
  const formHaveEmpty = entities.every(
    (entity) => formData.value[entity] !== ""
  );

  formData.value.isValid = formData.value.error.length === 0 && formHaveEmpty;
};

const handleSave = () => {
  const data = {
    tipos: ["ROLE_USER"],
    usuario: {
      cpf: formData.value.cpf,
      dataNascimento: formData.value.birthDate,
      email: formData.value.email,
      nome: formData.value.name,
      password: formData.value.password,
      telefone: formData.value.phone,
      username: formData.value.username,
      // id: Auth.userId()
    },
  };

  try {
    let response = undefined;

    requestStatus.value = "loading";

    if (props.editMode) {
      delete data.usuario.password;
      response = api.put(`/usuario/atualizar`, {
        ...data.usuario,
        id: Auth.userId(),
      });
    } else {
      response = api.post("/usuario/salvar", data);
    }
    console.log("respost", response.status);
    if (response.error) {
      requestStatus.value = "error";
      console.log("Emit save");
    } else {
      requestStatus.value = "success";
      emit("save");
    }
  } catch (error) {
    requestStatus.value = "error";
    console.error(error);
  }
};

const setDefaultValue = () => {
  if (props.defaultValue && props.editMode) {
    formData.value = {
      name: props.defaultValue.nome,
      phone: props.defaultValue.telefone,
      email: props.defaultValue.email,
      birthDate: props.defaultValue.dataNascimento,
      cpf: props.defaultValue.cpf,
      username: props.defaultValue.username,
      error: [],
      isValid: false,
    };
  }
};

onMounted(() => {
  if (props.defaultValue) {
    setDefaultValue();
  }
});

watch(props, (newValue, oldValue) => {
  const { defaultValue } = newValue;
  setDefaultValue();
});

const fieldsData = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    width: "w-2/3",
  },
  {
    name: "phone",
    label: "Telefone",
    type: "text",
    width: "w-1/3",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    width: "w-full",
  },
  {
    name: "birthDate",
    label: "Data de nacimento",
    type: "date",
    width: "w-1/2",
  },
  {
    name: "cpf",
    label: "CPF",
    type: "text",
    width: "w-1/2",
  },
  {
    name: "username",
    label: "Nome de usuário",
    type: "text",
    width: "w-full",
  },
];
</script>


<template>
  <Modal>
    <template v-slot:header>
      <h1>{{ props.editMode ? "Editar" : "Cadastrar" }} usuário</h1>
    </template>

    <form @submit="handleSave" class="flex flex-wrap gap-y-4 -mx-2">
      <div
        v-for="field in fieldsData"
        :key="field.name"
        class="px-2"
        :class="field.width"
      >
        <TextField
          :label="field.label"
          :type="field.type"
          v-model="formData[field.name]"
          @update="setValue($event, field.name)"
          :isError="formData.error.includes(field.name)"
        />
      </div>

      <div v-show="!props.editMode" class="w-full gap-2">
        <h3 class="text-zinc-500 p-2 mb-4 border-b-primary">
          Dados de acesso:
        </h3>

        <div class="px-2 w-full">
          <TextField
            label="Nome de usuário"
            type="text"
            v-model="formData.username"
            @update="setValue($event, 'username')"
            :isError="formData.error.includes('username')"
          />
        </div>
        <div class="flex gap-2 px-2 mt-4">
          <div class="w-1/2">
            <TextField
              label="Senha"
              type="password"
              v-model="formData.password"
              @update="setValue($event, 'password')"
              :isError="formData.error.includes('password')"
            />
          </div>
          <div class="w-1/2">
            <TextField
              label="Confirme a senha"
              type="password"
              v-model="formData.confirmPassword"
              @update="setValue($event, 'confirmPassword')"
              :isError="formData.error.includes('confirmPassword')"
            />
          </div>
        </div>
      </div>
    </form>
    <template v-slot:footer>
      <div class="flex justify-between">
        <button class="btn-danger border-transparent">Cancelar</button>
        <Spinner v-if="requestStatus === 'loading'" />
        <button
          v-else
          @click="handleSave"
          :disabled="!formData.isValid"
          class="btn-dark"
        >
          Salvar
        </button>
      </div>
    </template>
  </Modal>
</template>
