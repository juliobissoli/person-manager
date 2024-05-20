<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";

import Modal from "../common/Modal.vue";
import TextField from "../common/TextField.vue";
import Spinner from "../common/Spinner.vue";
import BtnToggle from '../common/BtnToggle.vue'

import { validateByEntity, maskPhone } from "../../utils/inputsHelpers";

const requestStatus = ref("empty");

const emit = defineEmits(["save"]);

const formData = ref({
  type: "TELEFONE",
  phone: "",
  email: "",
  private: false,
  tag: "",

  error: [],
  isValid: false,
});

const setValue = (e, entity) => {
  if (entity === "phone") {
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

  // O formulário esta valido quando não tem nenhum erro e não tem nenhum campo vazio
  const formHaveEmpty = true;

  formData.value.isValid = formData.value.error.length === 0 && formHaveEmpty;
};

function handleSave() {
  console.log("Salvar");
}
</script>


<template>
  <Modal>
    <template v-slot:header>Cadastrar contato</template>
    <div>
      <BtnToggle
          first="normal"
          :data="[
            { value: 'TELEFONE', label: 'Telefone' },
            { value: 'EMAIL', label: 'Email' },
          ]"
          @select="formData.type = $event"
        />
      <form class="flex gap-2">
        {{formData.type}}
        <div class="w-2/3">
          <TextField
            label="Email"
            type="email"
            v-model="formData.email"
            @update="setValue($event, 'email')"
            :isError="formData.error.includes('email')"
          />
        </div>
        <div class="w-1/3">
          <TextField
            label="Telefone"
            type="text"
            v-model="formData.phone"
            @update="setValue($event, 'phone')"
            :isError="formData.error.includes('phone')"
          />
        </div>
      </form>
    </div>

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