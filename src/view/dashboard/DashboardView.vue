<script setup>
import { ref } from 'vue';
import MainMenu from '../../components/MainMenu.vue';

</script>

<template>
    <div class="flex md:flex-row flex-col text-zinc-700 dark:text-zinc-50">
        <aside class="h-[5vh] md:h-[100vh] w-[100vw] md:w-[18vw] bg-zinc-50 dark:bg-zinc-950">
            <MainMenu />
            <!-- <h1>Aqui</h1> -->
        </aside>
        <aside
            class="relative w-[100vw] md:w-[82vw] h-[95vh] md:h-[100vh] px-4 pb-8 box-limited bg-white dark:bg-zinc-900">
            <router-view></router-view>
        </aside>
    </div>
</template>
