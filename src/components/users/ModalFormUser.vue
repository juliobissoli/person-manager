<script setup>

import Modal from "../common/Modal.vue"
import { ref } from "vue"

import { maskCpf, maskPhone, validateEmail, validatePassword } from "../../utils/inputsHelpers"
import api from "../../service/api";



const formData = ref({
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    cpf: '',
    username: '',
    password: '',
    confirmPassword: '',
    error: [],
    isValid: false,
})


const setValue = (e, entity) => {
    if (entity === 'cpf') {
        e.target.value = maskCpf(e.target.value)
        formData.value.cpf = maskCpf(e.target.value)
    } else if (entity === 'phone') {
        e.target.value = maskPhone(e.target.value)
        formData.value.phone = maskPhone(e.target.value)
    }
    validateValues(e.target.value, entity)

}

const validateValues = (value, entity) => {
    formData.value.error = formData.value.error.filter(item => item !== entity)
    if (entity === 'email' && !validateEmail(value)) {
        formData.value.error.push(entity)
    }
    if (entity === 'cpf' && value.length < 11) {
        formData.value.error.push(entity)
    }
    if (entity === 'password' && !validatePassword(value)) {
        formData.value.error.push(entity)
    }
    if (entity === 'confirmPassword' && formData.value.password !== value) {
        formData.value.error.push(entity)
    }
    if (entity === 'phone' && value.length < 10) {
        formData.value.error.push(entity)
    }

    const entities = Object.keys(formData.value).filter(item => item !== 'error' && item !== 'isValid')
    formData.value.isValid = formData.value.error.length === 0 && entities.every(entity => formData.value[entity] !== '')
}


const handleSave = () => {
    console.log(formData.value)
    const data = {
        tipos: ["string"],
        usuario: {
            cpf: formData.value.cpf,
            dataNascimento: formData.value.birthDate,
            email: formData.value.email,
            nome: formData.value.name,
            password: formData.value.password,
            telefone: formData.value.phone,
            username: formData.value.username
        }
    }
    api.post('/usuario/salvar', data.usuario).then(response => {
        console.log(response)
    })
        .catch(error => {
            console.log(error)
        })
}



</script>


<template>
    <Modal>
        <template v-slot:header>
            <h1>Modal Form User</h1>
        </template>

        <form @submit.prevent="handleSave" class="flex flex-col gap-4">

            <div class="flex gap-2">

                <label class="w-2/3 flex flex-col">
                    Nome
                    <input class="input-primary" :class="{ 'border-red-500': formData.error.includes('name') }"
                        type="text" v-model="formData.name" @input="setValue($event, 'name')" />
                </label>


                <label class="flex w-1/3 flex-col">
                    Telefone
                    <input class="input-primary" :class="{ 'border-red-500': formData.error.includes('phone') }"
                        type="text" v-model="formData.phone" @input="setValue($event, 'phone')" />
                </label>

            </div>
            <label class="flex flex-col">
                Email
                <input class="input-primary" :class="{ 'border-red-500': formData.error.includes('email') }"
                    type="email" v-model="formData.email" @input="setValue($event, 'email')" />
            </label>
            <div class="flex gap-2">
                <label class="w-full flex flex-col">
                    Data de Nascimento
                    <input class="input-primary" type="date"
                        :class="{ 'border-red-500': formData.error.includes('birthDate') }" v-model="formData.birthDate"
                        @input="setValue($event, 'birthDate')" />
                </label>
                <label class="w-full flex flex-col">
                    CPF
                    <input class="input-primary" :class="{ 'border-red-500': formData.error.includes('cpf') }"
                        type="text" @input="setValue($event, 'cpf')" v-model="formData.cpf" />
                </label>
            </div>
            <h3 class="text-zinc-500 py-2 border-b-primary ">Dados de acesso:</h3>
            <label class="flex flex-col">
                Username
                <input class="input-primary" :class="{ 'border-red-500': formData.error.includes('username') }"
                    type="text" v-model="formData.username" @input="setValue($event, 'username')" />
            </label>
            <div class="flex gap-2">
                <label class="flex flex-col w-full">
                    Password
                    <input class="input-primary" :class="{ 'border-red-500': formData.error.includes('password') }"
                        type="password" v-model="formData.password" @input="setValue($event, 'password')" />
                </label>
                <label class="flex flex-col w-full">
                    Confirmar senha
                    <input class="input-primary"
                        :class="{ 'border-red-500': formData.error.includes('confirmPassword') }" type="password"
                        v-model="formData.confirmPassword" @input="setValue($event, 'confirmPassword')" />
                </label>
            </div>
        </form>
        <template v-slot:footer>

            <div class="flex justify-between">
                <button class="btn-danger border-transparent">
                    Cancelar
                </button>
                <button 
                @click="handleSave"
                :disabled="!formData.isValid" 
                class="btn-dark">
                    Salvar
                </button>
            </div>
        </template>
    </Modal>
</template>../../utils/inputsHelpers