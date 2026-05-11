import { createRouter, createWebHistory } from 'vue-router';
import InvoiceView from "../views/InvoiceView.vue";
import DashboardView from "../views/DashboardView.vue";
import InvoicePreview from "../views/InvoicePreview.vue";
import InvoiceCreate from "../views/InvoiceCreate.vue";

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
        },
        {
            path: '/invoice-preview/:id',
            name: 'InvoicePreview',
            component: () => import('@/views/InvoicePreview.vue')
        },
        {
            path: '/invoices/create',
            name: 'InvoiceCreate',
            component: InvoiceCreate
        }
    ]
});

export default router;