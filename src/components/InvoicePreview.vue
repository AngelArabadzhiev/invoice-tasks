<script setup lang="ts">
import { Invoice } from '@/types/Invoice';
import { useInvoiceHelpers } from '@/composables/useInvoiceHelpers';

defineProps<{ invoice: Invoice }>();

const { getStatusLabel, getStatusClass, getPaymentMethodLabel, formatCurrency } = useInvoiceHelpers();
</script>

<template>
  <div class="invoice-card">

    <div class="invoice-band">
      <div>
        <span class="band-label">ФАКТУРА</span>
        <span class="band-number">INV-{{ invoice.invoiceNumber }}</span>
      </div>
      <span :class="['status-badge', getStatusClass(invoice.status)]">
        {{ getStatusLabel(invoice.status) }}
      </span>
    </div>

    <div class="invoice-meta">
      <div class="meta-block">
        <span class="meta-label">Клиент</span>
        <strong class="meta-name">{{ invoice.client.name }}</strong>
        <span>{{ invoice.client.email }}</span>
        <span>{{ invoice.client.phone }}</span>
        <span>{{ invoice.client.address }}</span>
      </div>
      <div class="meta-block">
        <span class="meta-label">Детайли</span>
        <div class="meta-row">
          <span class="meta-key">Дата на издаване</span>
          <span>{{ invoice.issueDate }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-key">Падеж</span>
          <span>{{ invoice.dueDate }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-key">Валута</span>
          <span>{{ invoice.currency }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-key">Плащане</span>
          <span>{{ getPaymentMethodLabel(invoice.paymentMethod) }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-key">Шаблон</span>
          <span>{{ invoice.template }}</span>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
        <tr>
          <th>УСЛУГА</th>
          <th>ОПИСАНИЕ</th>
          <th class="text-right">КОЛ.</th>
          <th class="text-right">ЕД. ЦЕНА</th>
          <th class="text-right">ОБЩО</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="service in invoice.services" :key="service.id">
          <td class="font-medium">{{ service.name }}</td>
          <td class="text-muted">{{ service.description }}</td>
          <td class="text-right">{{ service.quantity }}</td>
          <td class="text-right">{{ formatCurrency(service.unitPrice, invoice.currency) }}</td>
          <td class="text-right font-medium">
            {{ formatCurrency(service.quantity * service.unitPrice, invoice.currency) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="totals-wrapper">
      <div class="totals">
        <div class="totals-row">
          <span>Сума без ДДС</span>
          <span>{{ formatCurrency(invoice.subtotal, invoice.currency) }}</span>
        </div>
        <div class="totals-row">
          <span>ДДС ({{ invoice.vatRate }}%)</span>
          <span>{{ formatCurrency(invoice.vatAmount, invoice.currency) }}</span>
        </div>
        <div class="totals-row totals-final">
          <span>Общо за плащане</span>
          <span>{{ formatCurrency(invoice.total, invoice.currency) }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.invoice-card {
  background-color: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

.invoice-band {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background-color: #F8FAFC;
  border-bottom: 1px solid #E5E7EB;
}

.band-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: #9CA3AF;
  letter-spacing: 0.08em;
  margin-bottom: 2px;
}

.band-number {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.invoice-meta {
  display: flex;
  gap: 64px;
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
}

.meta-block {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.875rem;
  color: #374151;
}

.meta-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #9CA3AF;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.meta-name {
  font-size: 0.95rem;
  color: #111827;
}

.meta-row {
  display: flex;
  gap: 12px;
}

.meta-key {
  color: #6B7280;
  min-width: 130px;
}

.table-wrapper {
  border-bottom: 1px solid #E5E7EB;
}

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
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;
}

.data-table td {
  padding: 14px 16px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #E5E7EB;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.font-medium { font-weight: 500; color: #111827; }
.text-right   { text-align: right; }
.text-muted   { color: #6B7280; }

.totals-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 20px 24px;
}

.totals {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 280px;
}

.totals-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #374151;
}

.totals-final {
  font-weight: 700;
  font-size: 1rem;
  color: #111827;
  padding-top: 10px;
  border-top: 2px solid #E5E7EB;
  margin-top: 4px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}

.status-paid   { background-color: #DCFCE7; color: #166534; }
.status-issued { background-color: #DBEAFE; color: #1E40AF; }
.status-draft  { background-color: #FEF3C7; color: #92400E; }
</style>