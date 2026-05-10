import { createRouter, createWebHistory } from 'vue-router';
import InvoiceView from "../views/InvoiceView.vue";
import DashboardView from "../views/DashboardView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/dashboard' // Redirect the home page to invoices
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/invoices',
            name: 'invoices',
            component: InvoiceView
        }

    ]
});

export default router;