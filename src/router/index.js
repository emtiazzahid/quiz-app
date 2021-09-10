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

import Homepage from "@/views/guest/Homepage.vue";
import Login from "@/views/guest/Login.vue";
import Register from "@/views/guest/Register.vue";

const routes = [
    {
        path: "/",
        component: GuestWrapper,
        beforeEnter: guest,
        children: [
            {
                path: "/",
                name: "Homepage",
                component: Homepage,
            },
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
            // Dashboard
            {
                name: 'Dashboard',
                path: '/dashboard',
                component: () => import('@/views/dashboard/Dashboard'),
            },
            // Pages
            {
                name: 'User Profile',
                path: 'pages/user',
                component: () => import('@/views/dashboard/pages/UserProfile'),
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
                path: 'tables/regular-tables',
                component: () => import('@/views/dashboard/tables/RegularTables'),
            },
            // Maps
            {
                name: 'Google Maps',
                path: 'maps/google-maps',
                component: () => import('@/views/dashboard/maps/GoogleMaps'),
            },
            // Upgrade
            {
                name: 'Upgrade',
                path: 'upgrade',
                component: () => import('@/views/dashboard/Upgrade'),
            },
        ]
    },
    {
        path: '/',
        component: () => import('@/views/dashboard/Index'),
        children: [

        ],
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
