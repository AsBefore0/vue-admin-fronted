import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserManagement from '../components/home/UserManagement.vue'
import DashBoard from '../components/home/Dashboard.vue'
import RoleManagement from '../components/home/RoleManagement.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true, // 这个页面需要登录才能访问
        },
        children: [
            {
                path: 'user',
                name: 'UserManagement',
                component: UserManagement,
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: DashBoard,
            },
            {
                path: 'role',
                name: 'RoleManagement',
                component: RoleManagement,
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        // 如果没有登录，且目标路由需要认证，重定向到登录页面
        next({ name: 'Login', replace: true })
    } else {
        next()
    }
})

export default router
