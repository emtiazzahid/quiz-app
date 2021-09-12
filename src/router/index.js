import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'

Vue.use(VueRouter);

const guest = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }

    next(`/dashboard`)
}

const auth = (to, from, next) => {
    if (store.getters.isAuthenticated) {-
        next();
        return
    }
    next('/')
}

const GuestWrapper = () => import('@/views/guest/GuestWrapper.vue'),
    AuthWrapper = () => import('@/views/auth/AuthWrapper.vue')

import Homepage from "@/views/Homepage.vue";
import Login from "@/views/guest/Login.vue";
import Register from "@/views/guest/Register.vue";

const routes = [
    {
        path: "/",
        name: "Homepage",
        component: Homepage,
    },
    {
        path: "/",
        component: GuestWrapper,
        beforeEnter: guest,
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
            },
            {
                path: "/register",
                name: "Register",
                component: Register,
            }
        ]
    },
    {
        path: '/dashboard',
        component: AuthWrapper,
        beforeEnter: auth,
        children: [
            {
                name: 'Dashboard',
                path: '/dashboard',
                component: () => import('@/views/dashboard/Dashboard'),
            },
            {
                name: 'AddQuiz',
                path: '/quizzes/add',
                component: () => import('@/views/dashboard/pages/AddQuiz'),
            },
            {
                name: 'Quiz\'s',
                path: '/quizzes',
                component: () => import('@/views/dashboard/pages/Quizzes'),
            },
            {
                name: 'AddMCQ',
                path: '/mcq/add',
                component: () => import('@/views/dashboard/pages/AddMCQ'),
            },
            {
                name: 'MCQ\'s',
                path: '/mcq',
                component: () => import('@/views/dashboard/pages/MCQs'),
            },
            {
                name: 'Notifications',
                path: 'components/notifications',
                component: () => import('@/views/dashboard/component/Notifications'),
            },
            {
                name: 'Icons',
                path: 'components/icons',
                component: () => import('@/views/dashboard/component/Icons'),
            },
            {
                name: 'Typography',
                path: 'components/typography',
                component: () => import('@/views/dashboard/component/Typography'),
            },
            // Tables
            {
                name: 'Regular Tables',
                path: '/tables/regular-tables',
                component: () => import('@/views/dashboard/tables/RegularTables'),
            }
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
