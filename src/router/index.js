import { createWebHistory, createRouter } from 'vue-router'
import store from '../store'
import Auth from '../utils/auth'
import Login from "../view/Login.vue";
import Dashboard from "../view/dashboard/DashboardView.vue";
import Error from "../view/Error.vue";
import Settings from '../view/dashboard/children/Settings.vue';
import Persons from '../view/dashboard/children/People.vue';
import PersonDetail from '../view/dashboard/children/PersonDetail.vue';
import Contacts from '../view/dashboard/children/Contacts.vue';
import Users from '../view/dashboard/children/Users.vue';


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/error/:code",',
        name: 'Error',
        component: Error
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Contacts
            },
            {
                path: '/persons',
                name: 'Persons',
                component: Persons
            },
            {
                path: '/persons/:id',
                name: 'PersonDetail',
                component: PersonDetail
            },
            {
                path: '/contacts',
                name: 'Contacts',
                component: Contacts
            },
            {
                path: '/users',
                name: 'Users',
                component: Users
            },
            {
                path: '/settings',
                name: 'Settings',
                component: Settings
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    // Se não está logado redireciona pra login
    if (to.matched.some((record) => record.meta.requiresAuth) && !Auth.loggedIn()) {
        next({
            path: "/login",
            query: { redirect: to.fullPath },
        });
    // se um usuário não admin tentar acerssar a tela de usuários redireciona para dashboard
    } else if (Auth.loggedIn() && !Auth.isAdmin() && to.name !== 'Error' && ['Users'].includes(to.name)) {
        next({ name: "Dashboard" });
    // se um usuário logado tentar acessar a tela de login redireciona para dashboard
    } else if (
        to.matched.some((record) => record.name === "Login") &&
        Auth.loggedIn()
    ) {
        next({ name: "Dashboard" });
    } else {
        next();
    }
});

export default router;
