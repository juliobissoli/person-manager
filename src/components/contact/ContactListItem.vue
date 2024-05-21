<script setup>
import Avatar from '../common/Avatar.vue';


defineProps({
    contact: Object,
})

</script>

<template>

    <div class="flex items-center gap-2">
        <div class="w-20 h-20">
            <Avatar :imageID="contact.pessoa.id" />
        </div>
        <div class="ml-2 w-[calc(100%-100px)]">
            <p class="truncate">{{ contact.pessoa.nome }}</p>
            <p class="text-gray-500 truncate">
                {{ contact.email }}
                {{ contact.telefone }}
            </p>
            <div class="flex">
                <p class=" rounded-full p-1 px-2 text-white text-xs" :class="{
                'border border-blue-500/50 text-blue-500/60': !contact.privado,
                'border border-gray-500/50 text-gray-500/60': contact.privado
            }">
                    {{ contact.privado ? 'privado' : 'pblico' }}
                </p>
            </div>
        </div>
    </div>
</template>
