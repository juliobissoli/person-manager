<script setup>
import Avatar from '../common/Avatar.vue';


defineProps({
  contact: Object,
})

</script>

<template>

    <div class="flex items-center gap-2">
        <div class="w-16 h-16"> 
            <Avatar  :imageID="contact.pessoa.id" />
        </div>
        <div class="ml-2">
            <p class="">{{ contact.pessoa.nome }}</p>
            <p class="text-gray-500">{{ contact.telefone }}</p>
        </div>
    </div>
</template>

