<script setup lang="ts">
import { ref } from 'vue';
import {Invoice, InvoiceStatus, PaymentMethod} from "@/types/Invoice";
import {Client} from "@/types/Client";
import {Service} from "@/types/Service";


const invoices = ref<Invoice[]>([
  {
    id: 1,
    invoiceNumber: 2023001,
    issueDate: '15.10.2023',
    dueDate: '25.10.2023',
    status: InvoiceStatus.PAID,
    template: 'Standard',
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    currency: 'BGN',
    vatRate: 20,
    client: { id: 101, name: 'ТехноЛогик ООД', email: 'contact@technologic.bg', phone: '0888123456', address: 'гр. София' } as Client,
    services: [{ id: 1, name: 'Уеб разработка', description: 'Изработка на сайт', quantity: 1, unitPrice: 1041.67 }] as Service[],
    subtotal: 1041.67,
    vatAmount: 208.33,
    total: 1250.00
  },
  {
    id: 2,
    invoiceNumber: 2023002,
    issueDate: '18.10.2023',
    dueDate: '02.11.2023',
    status: InvoiceStatus.PENDING,
    template: 'Standard',
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    currency: 'BGN',
    vatRate: 20,
    client: { id: 102, name: 'Алфа Груп АД', email: 'office@alphagroup.bg', phone: '0888654321', address: 'гр. Пловдив' },
    services: [{ id: 2, name: 'Консултантски услуги', description: 'ИТ Одит', quantity: 40, unitPrice: 70.83 }],
    subtotal: 2833.33,
    vatAmount: 566.67,
    total: 3400.00
  },
  {
    id: 3,
    invoiceNumber: 2023003,
    issueDate: '20.10.2023',
    dueDate: '20.10.2023',
    status: InvoiceStatus.DRAFT,
    template: 'Standard',
    paymentMethod: PaymentMethod.CARD,
    currency: 'BGN',
    vatRate: 20,
    client: { id: 103, name: 'Уеб Дизайн Студио', email: 'hello@webdesign.bg', phone: '0899112233', address: 'гр. Варна' },
    services: [{ id: 3, name: 'Дизайн лого', description: 'Векторно лого', quantity: 1, unitPrice: 708.33 }],
    subtotal: 708.33,
    vatAmount: 141.67,
    total: 850.00
  }
]);

// 4. Helper functions to translate data for the UI
const getStatusLabel = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.PAID: return 'Платена';
    case InvoiceStatus.PENDING: return 'Издадена';
    case InvoiceStatus.DRAFT: return 'Чернова';
    default: return 'Неизвестен';
  }
};

const getStatusClass = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.PAID: return 'status-paid';
    case InvoiceStatus.PENDING: return 'status-issued';
    case InvoiceStatus.DRAFT: return 'status-draft';
    default: return '';
  }
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: currency
  }).format(amount);
};
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-info">
        <h1>Фактури</h1>
        <p>Списък на всички фактури и тяхното състояние.</p>
      </div>
      <button class="btn-primary">
        <i class="pi pi-plus"></i>
        Създай нова фактура
      </button>
    </header>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
        <tr>
          <th>№</th>
          <th>КЛИЕНТ</th>
          <th>ДАТА</th>
          <th>ПАДЕЖ</th>
          <th>СУМА</th>
          <th>СТАТУС</th>
          <th>ДЕЙСТВИЯ</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td class="font-medium">INV-{{ invoice.invoiceNumber }}</td>

          <td>{{ invoice.client.name }}</td>

          <td>{{ invoice.issueDate }}</td>
          <td>{{ invoice.dueDate }}</td>

          <td class="font-medium">{{ formatCurrency(invoice.total, invoice.currency) }}</td>

          <td>
              <span :class="['status-badge', getStatusClass(invoice.status)]">
                {{ getStatusLabel(invoice.status) }}
              </span>
          </td>

          <td class="actions-cell">
            <button class="action-btn" title="Преглед"><i class="pi pi-eye"></i></button>
            <button class="action-btn" title="Редакция"><i class="pi pi-pencil"></i></button>
            <button class="action-btn" title="Изтриване"><i class="pi pi-trash"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-footer">
      <span class="pagination-info">Показани 1 до {{ invoices.length }} от {{ invoices.length }} записа</span>
      <div class="pagination-controls">
        <button class="btn-page" disabled>Предишна</button>
        <button class="btn-page" disabled>Следваща</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 32px;
  color: #1F2937;
  background-color: #f0f0f0;
  height: 100%;
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

.btn-primary:hover {
  opacity: 0.9;
}

/* Table Wrapper */
.table-wrapper {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden; /* Ensures the rounded corners apply to the table inside */
  margin-bottom: 16px;
}

/* Table Styles */
.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  background-color: #F8FAFC;
  color: #6B7280;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.data-table td {
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  font-size: 0.9rem;
  color: #374151;
}

/* Remove bottom border from the last row */
.data-table tbody tr:last-child td {
  border-bottom: none;
}

.font-medium {
  font-weight: 500;
  color: #111827;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 9999px; /* Pill shape */
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}

.status-paid {
  background-color: #DCFCE7;
  color: #166534;
}

.status-issued {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.status-draft {
  background-color: #FEF3C7;
  color: #92400E;
}

/* Action Buttons */
.actions-cell {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
  transition: color 0.2s;
}

.action-btn:hover {
  color: #111827;
}

/* Pagination Footer */
.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.pagination-info {
  font-size: 0.85rem;
  color: #6B7280;
}

.pagination-controls {
  display: flex;
  gap: 8px;
}

.btn-page {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  color: #9CA3AF;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: not-allowed; /* Change to pointer when pagination is active */
}
</style>