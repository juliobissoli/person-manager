<template>
    <nav
        class="flex md:flex-col   items-center md:items-end  justify-between h-full border-r dark:border-zinc-700 overflow-x-auto px-[1vw] py-4 md:py-12">

        <div class="w-full">
         
            <ul class="flex md:flex-col md:items-end  ">
                <li v-for="btnRoute in btnRoutersFiltered" v-bind:key="btnRoute" class="p-1 md:p-3">
                    <router-link :to="{ name: btnRoute.name }">
                        <button class="p-2 rounded-xl border-solid flex gap-2 items-center" :class="routerNameSelected.includes(btnRoute.path)
                    ? 'text-zinc-800 dark:text-white'
                    : 'text-zinc-400 hover:text-zinc-500'
                    ">
                            <span class="hidden md:contents">
                                {{ btnRoute.label }}
                            </span>
                            <i class="text-[18px]" :class="[btnRoute.icon]"></i>
                        </button>
                    </router-link>
                </li>
            </ul>
        </div>

        <button @click="logout" class="w-full flex items-center  justify-end gap-2 px-8 text-zinc-400 hover:text-zinc-500">
            <span class="hidden md:contents">Sair</span>
            <i class="ph ph-sign-out"></i>
            <!-- <i class="ph ph-arrow-left"></i> -->
        </button>
    </nav>
</template>

<script>
import { useRoute } from "vue-router";
// import { mapGetters } from "vuex";
// import { useRoute, useRouter } from "vue-router";
import Auth from "../utils/auth";

export default {
    name: "MainMenu",
    data: () => ({
        routerNameSelected: "",
        btnRoutes: [
            {
                label: "Home",
                path: '/home',
                name: 'Home',
                icon: "ph-light ph-house",
            },
            {

                label: "Pessoas",
                path: '/persons',
                name: 'Persons',
                icon: "ph-light ph-user-list",
                onlyAdmin: false,
            },
            {
                label: "Contatos",
                path: '/contacts',
                name: 'Contacts',
                icon: "ph-light ph-phone",
                onlyAdmin: false,
            },
            {
                label: "Usuários",
                path: '/users',
                name: 'Users',
                icon: "ph-light ph-user",
                onlyAdmin: true,
            },
            {
                label: "Configuraçes",
                path: '/settings',
                name: 'Settings',
                icon: "ph-light ph-gear",
                onlyAdmin: false,
            },
        ],
    }),
    created() {
        this.routerNameSelected = useRoute().path;
    },
    watch: {
        $route(to) {
            this.routerNameSelected = to.path;
        },
    },
    computed: {
        isAdmin() {
            return Auth.isAdmin();
        },
        btnRoutersFiltered() {
            // return this.btnRoutes;
            return this.btnRoutes.filter((el) => this.isAdmin || !el.onlyAdmin);
        },
    },
    methods: {
        logout() {
            Auth.logout();
            this.$router.push({ name: "Login" });
        },
    },
};
</script>

<style scoped></style>