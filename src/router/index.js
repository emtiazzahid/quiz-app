import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

// eslint-disable-next-line no-unused-vars
const guest = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next(`/dashboard`)
}

const auth = (to, from, next) => {
    if (store.getters.isAuthenticated) {
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
            { name: 'Dashboard', path: '/dashboard', component: () => import('@/views/dashboard/Dashboard.vue') },
            { name: 'AddQuiz', path: '/quizzes/add', component: () => import('@/views/dashboard/pages/Quiz/ManageQuiz.vue') },
            { name: 'EditQuiz', path: '/quizzes/:id/edit', component: () => import('@/views/dashboard/pages/Quiz/ManageQuiz.vue') },
            { name: 'Quiz', path: '/quizzes/:id', component: () => import('@/views/dashboard/pages/Quiz/Quiz.vue') },
            { name: 'RunningQuiz', path: '/quizzes/:id/running', component: () => import('@/views/dashboard/pages/Quiz/Running.vue') },
            { name: 'TestResult', path: '/attempts/:id', component: () => import('@/views/dashboard/pages/Quiz/TestResult.vue') },
            { name: 'AttachMCQ', path: '/quizzes/:id/attach', component: () => import('@/views/dashboard/pages/Quiz/AttachMCQ.vue') },
            { name: "Quiz's", path: '/quizzes', component: () => import('@/views/dashboard/pages/Quiz/Quizzes.vue') },
            { name: 'AddMCQ', path: '/mcq/add', component: () => import('@/views/dashboard/pages/MCQ/ManageMCQ.vue') },
            { name: 'EditMCQ', path: '/mcq/:id/edit', component: () => import('@/views/dashboard/pages/MCQ/ManageMCQ.vue') },
            { name: 'MCQ', path: '/mcq/:id', component: () => import('@/views/dashboard/pages/MCQ/MCQ.vue') },
            { name: "MCQ's", path: '/mcq', component: () => import('@/views/dashboard/pages/MCQ/MCQs.vue') },
            { name: 'TestAttempts', path: '/attempts', component: () => import('@/views/dashboard/pages/Quiz/Attempts.vue') },
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
        children: [
            { path: "/quiz-view/:id", name: "HomepageQuizView", component: Homepage },
            { path: "/login", name: "Login", component: Login },
            { path: "/register", name: "Register", component: Register },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
