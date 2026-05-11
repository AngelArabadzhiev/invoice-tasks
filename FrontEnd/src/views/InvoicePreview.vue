<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Invoice } from '@/types/Invoice';
import InvoicePreview from '@/components/InvoicePreview.vue';

const route = useRoute();
const router = useRouter();
const invoiceId = Number(route.params.id);

const allInvoices: Invoice[] = JSON.parse(localStorage.getItem('invoices') || '[]');
const invoice = computed(() => allInvoices.find(inv => inv.id === invoiceId) ?? null);
</script>

<template>
  <div class="page-container">

    <div v-if="!invoice" class="empty-state">
      <i class="pi pi-file-excel empty-icon"></i>
      <h2>Фактурата не е намерена</h2>
      <p>Фактура с този номер не съществува.</p>
      <button class="btn-primary" @click="router.push('/invoices')">
        <i class="pi pi-arrow-left"></i> Назад към фактури
      </button>
    </div>

    <template v-else>
      <header class="page-header">
        <div class="header-info">
          <h1>INV-{{ invoice.invoiceNumber }}</h1>
          <p>Преглед на фактура</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="router.push('/invoices')">
            <i class="pi pi-arrow-left"></i> Назад
          </button>
          <button class="btn-primary">
            <i class="pi pi-download"></i> Изтегли PDF
          </button>
        </div>
      </header>

      <InvoicePreview :invoice="invoice" />
    </template>

  </div>
</template>

<style scoped>
.page-container {
  padding: 32px;
  color: #1F2937;
  background-color: #f0f0f0;
  min-height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.header-info h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #111827;
}

.header-info p {
  color: #6B7280;
  font-size: 0.9rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-primary {
  background-color: #001D6E;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.9; }

.btn-secondary {
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #E5E7EB;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}
.btn-secondary:hover { background-color: #F9FAFB; }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 32px;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  color: #D1D5DB;
}

.empty-state h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.empty-state p {
  color: #6B7280;
  font-size: 0.9rem;
  margin: 0 0 8px;
}
</style>