<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";

import Modal from "../common/Modal.vue";
import TextField from "../common/TextField.vue";
import { validatePassword } from "../../utils/inputsHelpers";
import Spinner from "../common/Spinner.vue";
import api from "../../service/api";

const props = defineProps({
  defaltUsername: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["save"]);
const requestStatus = ref("empty");

const formData = ref({
  username: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
  error: [],
  isValid: false,
});

onMounted(() => {
  if (props.defaltUsername) {
    formData.value.username = props.defaltUsername;
  }
});

watch(props, (newValue, oldValue) => {
  formData.value.username = props.defaltUsername;
});

const fieldsData = [
  {
    name: "username",
    label: "Nome de usuário",
    type: "text",
    width: "w-full",
  },
  {
    name: "password",
    label: "Senha atual",
    type: "password",
    width: "w-full",
  },
  {
    name: "newPassword",
    label: "Nova senha",
    type: "password",
    width: "w-full",
  },
  {
    name: "confirmPassword",
    label: "Confirmar nova senha",
    type: "password",
    width: "w-full",
  },
];

const setValue = (e, entity) => {
  formData.value[entity] = e.target.value;

  validateValues(e.target.value, entity);
};

const validateValues = (value, entity) => {
  formData.value.error = formData.value.error.filter((item) => item !== entity);

  if (entity !== "username" && !validatePassword(value)) {
    formData.value.error.push(entity);
  }
  if (entity === "confirmPassword" && formData.value.newPassword !== value) {
    formData.value.error.push(entity);
  }

  // O formulário esta valido quando não tem nenhum erro e não tem nenhum campo vazio
  const formHaveEmpty =
    formData.value.password !== "" &&
    formData.value.confirmPassword !== "" &&
    formData.value.username !== "";

  formData.value.isValid = formData.value.error.length === 0 && formHaveEmpty;
};

const handleSave = () => {
  const data = {
    newPassword: formData.value.newPassword,
    password: formData.value.password,
    username: formData.value.username,
  };

  api.post("/usuario/alterarSenha", data).then(
    (res) => {
      console.log("res ==> ", res);
    },
    (error) => {
      console.error(error);
      emit("save");
    }
  );
};
</script>

<template>
  <Modal>
    <template v-slot:header>
      <h1>Alterar senha</h1>
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
          :disabled="field.name === 'username'"
          v-model="formData[field.name]"
          @update="setValue($event, field.name)"
          :isError="formData.error.includes(field.name)"
        />
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