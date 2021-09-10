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

// import Login from "@/views/guest/Login.vue";
import Login from "@/views/guest/Auth.vue";
import SignUp from "@/views/guest/SignUp.vue";
import Dashboard from "@/views/auth/Dashboard.vue";
import UserList from "@/views/auth/user/List.vue";
import UserForm from "@/views/auth/user/Form.vue";
import UserConfig from "@/views/auth/user/Configure.vue";

const routes = [
    {
        path: "/",
        component: GuestWrapper,
        beforeEnter: guest,
        children: [
            {
                path: "/",
                name: "Login",
                component: Login,
            },
            {
                path: "/signup/user",
                name: "SignUp",
                component: SignUp,
            }
        ]
    },
    {
        path: '/dashboard',
        component: AuthWrapper,
        beforeEnter: auth,
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard,
            },
            {
                path: "/users",
                name: "UserList",
                component: UserList,
            },
            {
                path: 'user/create',
                name: 'UserForm',
                component: UserForm
            },
            {
                path: "/user-configuration",
                name: "UserConfig",
                component: UserConfig,
            },
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
