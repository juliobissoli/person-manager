<script setup>
import Avatar from '../common/Avatar.vue';


defineProps({
  person: Object,
})

</script>

<template>

    <div class="flex items-center gap-2">
        <div class="w-16 h-16"> 
            <Avatar  :imageID="person.id" />
        </div>
        <div class="ml-2">
            <p class="">{{ person.nome }}</p>
            <!-- <p class="text-gray-500">{{ person.telefone }}</p> -->
        </div>
    </div>
</template>

