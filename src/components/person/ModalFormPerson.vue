<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";
import api from "../../service/api";
import Modal from "../common/Modal.vue";
import TextField from "../common/TextField.vue";
import Spinner from "../common/Spinner.vue";
import BtnToggle from '../common/BtnToggle.vue'
import { validateByEntity, maskCpf, maskCep } from "../../utils/inputsHelpers";

const requestStatus = ref("empty");

const emit = defineEmits(["save"]);

const formData = ref({
    name: "",
    cpf: '',
    //   referente ao endereço
    neighborhood: '',
    city: '',
    state: '',
    country: '',
    number: '',
    cep: '',
    street: '',


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

onMounted(() => {
  if (props.defaultValue) {
    setDefaultValue();
  }
});

watch(props, (newValue, oldValue) => {
  setDefaultValue();
});

const fieldsData = [
    // {
    //     name: "name",
    //     label: "Nome",
    //     type: "text",
    //     width: "w-2/3",
    // },
    // {
    //     name: "cpf",
    //     label: "CPF",
    //     type: "text",
    //     width: "w-1/3",
    // },
    {
        name: "street",
        label: "Rua",
        type: "text",
        width: "w-4/5",
    },
    {
        name: "number",
        label: "Número",
        type: "number",
        width: "w-1/5",
    },
    {
        name: "neighborhood",
        label: "Bairro",
        type: "text",
        width: "w-full",
    },
    {
        name: "city",
        label: "Cidade",
        type: "text",
        width: "w-2/5",
    },
    {
        name: "state",
        label: "Estado",
        type: "text",
        width: "w-1/5",
    },
    {
        name: "country",
        label: "País",
        type: "text",
        width: "w-2/5",
    },

    {
        name: "cep",
        label: "CEP",
        type: "text",
        width: "w-1/2",
    },






];


const setDefaultValue = () => {
    formData.value.name = props.defaultValue.nome;
    formData.value.cpf = props.defaultValue.cpf;
    formData.value.neighborhood = props.defaultValue.endereco.bairro;
    formData.value.city = props.defaultValue.endereco.cidade;
    formData.value.state = props.defaultValue.endereco.estado;
    formData.value.country = props.defaultValue.endereco.pais;
    formData.value.number = props?.defaultValue?.endereco?.numero.toString();
    formData.value.cep = props.defaultValue.endereco.cep;
    formData.value.street = props.defaultValue.endereco.logradouro;
}

const setValue = (e, entity) => {
    if (entity === "cpf") {
        e.target.value = maskCpf(e.target.value);
    } else if (entity === "cep") {
        e.target.value = maskCep(e.target.value);
    }
    formData.value[entity] = e.target.value;

    validateValues(e.target.value, entity);
};

const validateValues = (value, entity) => {
    formData.value.error = formData.value.error.filter((item) => item !== entity);
    if (!validateByEntity(value, entity)) {
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

function handleSave() {
    console.log("Salvar");

    const data = {
        cpf: formData.value.cpf,
        nome: formData.value.name,
        endereco: {
            bairro: formData.value.neighborhood,
            cep: formData.value.cep,
            cidade: formData.value.city,
            estado: formData.value.state,
            logradouro: formData.value.street,
            numero: formData.value.number,
            pais: formData.value.country
        },
    }

    requestStatus.value = "loading";
    const url = '/pessoa/salvar';
    if (props.editMode) {
        data.id = props.defaultValue.id;
    }
    api.post(url, data).then((response) => {
        console.log(response);
        requestStatus.value = "success";
        emit("save", response.data);
    }).catch((error) => {
        console.log(error);
        requestStatus.value = "error";
    })
}
</script>


<template>
    <Modal>
        <template v-slot:header>{{props.editMode ? 'Editar' : 'Cadastrar'}} pessoa</template>
        <form @submit="handleSave" class="flex flex-wrap gap-y-4 -mx-2">

            <div class="px-2 w-2/3">
                <TextField label="Nome" type="text" v-model="formData.name" @update="setValue($event, 'name')"
                    :isError="formData.error.includes('name')" />
            </div>
            <div class="px-2 w-1/3">
                <TextField label="CPF" type="text" v-model="formData.cpf" @update="setValue($event, 'cpf')"
                    :isError="formData.error.includes('cpf')" />
            </div>

            <div class="p-2 w-full">
                <h2 class="text-zinc-500 btn-sm border-b-primary ">Endereço</h2>
            </div>
            <div v-for="field in fieldsData" :key="field.name" class="px-2" :class="field.width">
                <TextField :label="field.label" :type="field.type" v-model="formData[field.name]"
                    @update="setValue($event, field.name)" :isError="formData.error.includes(field.name)" />
            </div>



        </form>

        <template v-slot:footer>
            <div class="flex justify-between">
                <button class="btn-danger border-transparent">Cancelar</button>
                <Spinner v-if="requestStatus === 'loading'" />
                <button v-else @click="handleSave" :disabled="!formData.isValid" class="btn-dark">
                    Salvar
                </button>
            </div>
        </template>
    </Modal>
</template>