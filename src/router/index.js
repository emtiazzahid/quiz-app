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
    next('/login?redirect=' + to.path);
}

const GuestWrapper = () => import('@/views/guest/GuestWrapper.vue'),
    AuthWrapper = () => import('@/views/auth/AuthWrapper.vue')

import Homepage from "@/views/Homepage.vue";
import Login from "@/views/guest/Login.vue";
import Register from "@/views/guest/Register.vue";

const routes = [
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
                component: () => import('@/views/dashboard/pages/Quiz/AddQuiz'),
            },
            {
                name: 'Quiz',
                path: '/quizzes/:id',
                component: () => import('@/views/dashboard/pages/Quiz/Quiz'),
            },
            {
                name: 'RunningQuiz',
                path: '/quizzes/:id/running',
                component: () => import('@/views/dashboard/pages/Quiz/Running'),
            },
            {
                name: 'TestResult',
                path: '/attempts/:id',
                component: () => import('@/views/dashboard/pages/Quiz/TestResult'),
            },
            {
                name: 'AttachMCQ',
                path: '/quizzes/:id/attach',
                component: () => import('@/views/dashboard/pages/Quiz/AttachMCQ'),
            },
            {
                name: 'Quiz\'s',
                path: '/quizzes',
                component: () => import('@/views/dashboard/pages/Quiz/Quizzes'),
            },
            {
                name: 'AddMCQ',
                path: '/mcq/add',
                component: () => import('@/views/dashboard/pages/MCQ/AddMCQ'),
            },
            {
                name: 'MCQ\'s',
                path: '/mcq',
                component: () => import('@/views/dashboard/pages/MCQ/MCQs'),
            },
            {
                name: 'TestAttempts',
                path: '/attempts',
                component: () => import('@/views/dashboard/pages/Quiz/Attempts'),
            },

        ]
    },
    {
        path: "/",
        name: "Homepage",
        component: Homepage,
    },
    {
        path: "/",
        component: GuestWrapper,
        // beforeEnter: guest,
        children: [
            {
                path: "/quiz-view/:id",
                name: "HomepageQuizView",
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
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
