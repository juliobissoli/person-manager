<script setup>
import { ref, watch, onMounted, defineEmits, computed } from "vue";

import Modal from "../common/Modal.vue";
import TextField from "../common/TextField.vue";
import Spinner from "../common/Spinner.vue";
import BtnToggle from '../common/BtnToggle.vue'
import SearchInput from '../common/SearchInput.vue'

import api from "../../service/api";

import { validateByEntity, maskPhone } from "../../utils/inputsHelpers";
import PeopleListItem from "../person/PeopleListItem.vue";
import Auth from "../../utils/auth";

const requestStatus = ref("empty");

const emit = defineEmits(["save"]);

const contactMode = ref('normal')

const formData = ref({
  type: "TELEFONE",
  phone: "",
  email: "",
  private: false,
  tag: "",

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

const formIsValid = computed(() => {
  const checkType = formData.value.type === 'EMAIL' ? formData.value.email : formData.value.phone

  return checkType && personSelected.value && formData.value.tag
});

const personList = ref([]);
const personSelected = ref(null);



onMounted(() => {
  if (props.defaultValue) {
    setDefaultValue();
  }
});

watch(props, (newValue, oldValue) => {
  setDefaultValue();
});

const setDefaultValue = () => {
  formData.value.type = props.defaultValue.tipoContato
  formData.value.phone = props.defaultValue.telefone
  formData.value.email = props.defaultValue.email
  formData.value.private = props.defaultValue.privado
  formData.value.tag = props.defaultValue.tag

  personSelected.value = props.defaultValue.pessoa
}

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

function searchPerson(token) {
  console.log("Pesquisar pessoa");

  api.post(`/pessoa/pesquisar`, { nome: token.trim() })
    .then(
      res => {
        console.log(res)
        personList.value = res.data
      },
      err => {
        console.log(err)
      }
    )
}
const handleSelectPerson = (person) => {
  if (personSelected.value?.id === person.id) {
    personSelected.value = null
  } else {
    personSelected.value = person
  }
}

function handleSave() {
  const data = {
    email: formData.value.email,
    pessoa: personSelected.value.id,
    privado: formData.value.private,
    tag: formData.value.tag,
    telefone: formData.value.phone,
    tipoContato: formData.value.type,
    usuario: Auth.userId()
  }

  if (props.editMode) {
    data.id = props.defaultValue.id
  }

  const url = contactMode.value === 'favorito' ? '/favorito/salvar' : '/contato/salvar'
  
  requestStatus.value = 'loading'
  api.post(url, data).then(
    res => {
      console.log(res)
      requestStatus.value = 'success'
      emit('save')
    },
    err => {
      requestStatus.value = 'error'
      console.log(err)
    }
  )
}
</script>


<template>
  <Modal>
    <template v-slot:header>Cadastrar contato</template>
    <div class="space-y-4">

      <div class=" gap-4">

        <div class="mb-4">
          <label class="w-full">
            <p class="text-sm text-gray-500">Tipo de contato</p>
            <BtnToggle first="TELEFONE" :data="[
              { value: 'TELEFONE', label: 'Telefone' },
              { value: 'EMAIL', label: 'Email' },
            ]" @select="formData.type = $event" />
          </label>
        </div>

        <div v-if="formData.type === 'EMAIL'" class="w-full">
          <TextField label="Email" type="email" v-model="formData.email" @update="setValue($event, 'email')"
            :isError="formData.error.includes('email')" />
        </div>
        <div v-else class="w-full">
          <TextField label="Telefone" type="text" v-model="formData.phone" @update="setValue($event, 'phone')"
            :isError="formData.error.includes('phone')" />
        </div>

      </div>
      <div>
        <label class="flex items-center">
          <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded-md" v-model="formData.private" />
          <span class="ml-2">Contato privado</span>
        </label>
      </div>
      <div class="w-full">
        <TextField label="Tag" type="text" v-model="formData.tag" @update="setValue($event, 'tag')"
          :isError="formData.error.includes('tag')" />
      </div>
      <div class="text-gray-500 py-1 mt-4 border-b-primary">
        <span> {{personSelected ? 'Pessoa selecionada' : 'Selecione uma pessa'}} </span>
        <span v-show="personSelected" class="mx-4 rounded-xl bg-blue-500 p-1 px-2 text-sm text-white">
          {{ personSelected?.nome  }}
          <button @click="personSelected = null" class="text-white">
            <i class="ph ph-x-circle"></i>


          </button>
        </span>
      </div>

      <div class="w-full mt-4">
        <SearchInput :defaultExpanded="true" @changeInput="searchPerson" />
      </div>

      <ul class="grid grid-cols-2 gap-2 mt-4">
        <li v-for="person in personList" :key="person.id">
          <button @click="handleSelectPerson(person)" class="border-primary  rounded-xl p-1 p-2 cursor-pointer w-full  "
            :class="personSelected?.id === person.id ? 'bg-blue-500' : 'hover:bg-secondary'">
            <PeopleListItem size="10" :person="person" />

          </button>
        </li>
      </ul>


    </div>

    <template v-slot:footer>
      <div class="flex justify-between">
        <button class="btn-danger border-transparent">Cancelar</button>
        <Spinner v-if="requestStatus === 'loading'" />
        <button v-else @click="handleSave" :disabled="!formIsValid" class="btn-dark">
          Salvar
        </button>
      </div>
    </template>
  </Modal>
</template>