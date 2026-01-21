import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/contracts',
            name: 'contracts',
            component: () => import('../views/Contracts.vue')
        },
        {
            path: '/create',
            name: 'create',
            component: () => import('../views/Create.vue')
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: () => import('../views/Statistics.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/Profile.vue')
        },
        {
            path: '/profile/info',
            name: 'profileLink',
            component: () => import('../views/ProfileInfo.vue')
        },
        {
            path: '/profile/rating',
            name: 'profileRating',
            component: () => import('../views/StarRating.vue')
        },
        {
            path: '/profile/evaluations',
            name: 'evaluationRecords',
            component: () => import('../views/EvaluationRecords.vue')
        },
        {
            path: '/messages',
            name: 'messages',
            component: () => import('../views/Messages.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        }
    ]
})

export default router
