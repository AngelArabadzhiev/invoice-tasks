<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Invoice, InvoiceStatus, PaymentMethod } from '@/types/Invoice';
import { Service } from '@/types/Service';
import InvoicePreview from '@/components/InvoicePreview.vue';

const router = useRouter();

// ── Form state ──────────────────────────────────────────────
const invoiceNumber = ref('INV-2023-001');
const status        = ref<InvoiceStatus>(InvoiceStatus.DRAFT);
const issueDate     = ref('2023-10-25');
const dueDate       = ref('2023-11-08');
const template      = ref<'A' | 'B'>('A');
const currency      = ref('BGN');
const vatRate       = ref(20);

const clientName    = ref('');
const clientEmail   = ref('');
const clientPhone   = ref('');
const clientAddress = ref('');

let nextServiceId = 3;
const services = ref<Service[]>([
  { id: 1, name: 'Уеб дизайн',     description: 'Дизайн на корпоративен уебсайт',        quantity: 1, unitPrice: 1200 },
  { id: 2, name: 'Годишен хостинг', description: 'Споделен хостинг план за 1 година', quantity: 1, unitPrice: 150  },
]);

// ── Computed totals ─────────────────────────────────────────
const subtotal  = computed(() => services.value.reduce((s, x) => s + x.quantity * x.unitPrice, 0));
const vatAmount = computed(() => subtotal.value * (vatRate.value / 100));
const total     = computed(() => subtotal.value + vatAmount.value);

// ── Live invoice object fed into <InvoicePreview> ───────────
const liveInvoice = computed<Invoice>(() => ({
  id:            0,
  invoiceNumber: invoiceNumber.value,
  status:        status.value,
  issueDate:     issueDate.value,
  dueDate:       dueDate.value,
  template:      template.value,
  currency:      currency.value,
  vatRate:       vatRate.value,
  vatAmount:     vatAmount.value,
  subtotal:      subtotal.value,
  total:         total.value,
  paymentMethod: PaymentMethod.BANK_TRANSFER,
  client: {
    id:      0,
    name:    clientName.value    || '[Име на фирма / Клиент]',
    email:   clientEmail.value   || '[Имейл]',
    phone:   clientPhone.value   || '[Телефон]',
    address: clientAddress.value || '[Адрес]',
  },
  services: services.value,
}));

function addService() {
  services.value.push({ id: nextServiceId++, name: '', description: '', quantity: 1, unitPrice: 0 });
}
function removeService(id: number) {
  services.value = services.value.filter(s => s.id !== id);
}

const saved = ref(false);
function handleSave() {
  const stored: Invoice[] = JSON.parse(localStorage.getItem('invoices') || '[]');
  const newId = stored.length ? Math.max(...stored.map(i => i.id)) + 1 : 1;
  stored.push({ ...liveInvoice.value, id: newId });
  localStorage.setItem('invoices', JSON.stringify(stored));

  saved.value = true;
  setTimeout(() => {
    saved.value = false;
    router.push('/invoices');
  }, 1200);
}
</script>

<template>
  <div class="cp-layout">

    <header class="cp-topbar">
      <div class="cp-topbar-left">
        <h1 class="cp-title">Създаване на фактура</h1>
        <span class="cp-status-badge" :class="`status-${status}`">
          {{ status === InvoiceStatus.DRAFT ? 'Чернова' : status === InvoiceStatus.PENDING ? 'Издадена' : 'Платена' }}
        </span>
      </div>
      <div class="cp-topbar-right">
        <button class="cp-icon-btn" title="Помощ">
          <i class="pi pi-question-circle"></i>
        </button>
        <button class="cp-icon-btn" title="Известия">
          <i class="pi pi-bell"></i>
        </button>
        <button class="cp-btn-save" :class="{ saved }" @click="handleSave">
          <i :class="saved ? 'pi pi-check' : 'pi pi-save'"></i>
          {{ saved ? 'Запазено' : 'Запази' }}
        </button>
      </div>
    </header>

    <!-- SPLIT CONTENT -->
    <div class="cp-content">

      <!-- LEFT — FORM -->
      <div class="cp-form-panel">

        <!-- Invoice details -->
        <section class="cp-card">
          <div class="cp-card-title">Данни за фактурата</div>
          <div class="cp-card-body">

            <div class="cp-row">
              <div class="cp-field">
                <label>Номер на фактура</label>
                <input v-model="invoiceNumber" type="text" />
              </div>
              <div class="cp-field">
                <label>Статус</label>
                <select v-model="status">
                  <option :value="InvoiceStatus.DRAFT">Чернова</option>
                  <option :value="InvoiceStatus.PENDING">Издадена</option>
                  <option :value="InvoiceStatus.PAID">Платена</option>
                </select>
              </div>
            </div>

            <div class="cp-row">
              <div class="cp-field">
                <label>Дата на издаване</label>
                <input v-model="issueDate" type="date" />
              </div>
              <div class="cp-field">
                <label>Падеж</label>
                <input v-model="dueDate" type="date" />
              </div>
            </div>

            <div class="cp-field">
              <label>Шаблон</label>
              <div class="cp-template-row">
                <label class="cp-template-opt" :class="{ active: template === 'A' }">
                  <input type="radio" v-model="template" value="A" />
                  Модерен (Template A)
                </label>
                <label class="cp-template-opt" :class="{ active: template === 'B' }">
                  <input type="radio" v-model="template" value="B" />
                  Класически (Template B)
                </label>
              </div>
            </div>

          </div>
        </section>

        <!-- Client details -->
        <section class="cp-card">
          <div class="cp-card-title">Данни за клиента</div>
          <div class="cp-card-body">
            <div class="cp-field">
              <label>Име на фирма / Клиент</label>
              <input v-model="clientName" type="text" placeholder="Въведете име на клиент" />
            </div>
            <div class="cp-row">
              <div class="cp-field">
                <label>Имейл</label>
                <input v-model="clientEmail" type="email" placeholder="client@example.com" />
              </div>
              <div class="cp-field">
                <label>Телефон</label>
                <input v-model="clientPhone" type="text" placeholder="+359..." />
              </div>
            </div>
            <div class="cp-field">
              <label>Адрес</label>
              <textarea v-model="clientAddress" rows="3" placeholder="Град, улица, номер..."></textarea>
            </div>
          </div>
        </section>

        <!-- Services -->
        <section class="cp-card">
          <div class="cp-card-title">Услуги / Продукти</div>
          <div class="cp-card-body" style="padding: 0">

            <table class="cp-services-table">
              <thead>
              <tr>
                <th style="width:22%">Услуга</th>
                <th>Описание</th>
                <th style="width:8%">Кол.</th>
                <th style="width:13%">Ед. цена</th>
                <th style="width:13%">Общо</th>
                <th style="width:36px"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="svc in services" :key="svc.id">
                <td><input v-model="svc.name" placeholder="Услуга" /></td>
                <td><input v-model="svc.description" placeholder="Описание" /></td>
                <td><input v-model.number="svc.quantity" type="number" min="1" style="text-align:right" /></td>
                <td><input v-model.number="svc.unitPrice" type="number" min="0" step="0.01" style="text-align:right" /></td>
                <td class="svc-total">{{ (svc.quantity * svc.unitPrice).toFixed(2) }}</td>
                <td>
                  <button class="cp-btn-del" @click="removeService(svc.id)" title="Изтрий">
                    <i class="pi pi-times"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>

            <div style="padding: 12px 16px;">
              <button class="cp-btn-add" @click="addService">
                <i class="pi pi-plus"></i> Добави услуга
              </button>
            </div>

          </div>
        </section>

        <!-- Financial settings -->
        <section class="cp-card">
          <div class="cp-card-title">Финансови настройки</div>
          <div class="cp-card-body">
            <div class="cp-row">
              <div class="cp-field">
                <label>Валута</label>
                <select v-model="currency">
                  <option value="BGN">BGN – Лев</option>
                  <option value="EUR">EUR – Евро</option>
                  <option value="USD">USD – Долар</option>
                </select>
              </div>
              <div class="cp-field">
                <label>ДДС (%)</label>
                <input v-model.number="vatRate" type="number" min="0" max="100" />
              </div>
            </div>
          </div>
        </section>

      </div><!-- /form panel -->

      <!-- RIGHT — LIVE PREVIEW -->
      <div class="cp-preview-panel">
        <div class="cp-preview-label">
          <span class="cp-live-dot"></span>
          LIVE PREVIEW
        </div>

        <div class="cp-preview-scaler">
          <InvoicePreview :invoice="liveInvoice" />
        </div>
      </div>

    </div><!-- /content -->
  </div>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────── */
.cp-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f0f2f5;
  font-size: 0.875rem;
  color: #111827;
}

/* ── Top bar ─────────────────────────────────────────────── */
.cp-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 52px;
  background: #fff;
  border-bottom: 1px solid #E5E7EB;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}
.cp-topbar-left { display: flex; align-items: center; gap: 10px; }
.cp-topbar-right { display: flex; align-items: center; gap: 10px; }

.cp-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

/* Status badges */
.cp-status-badge {
  padding: 2px 12px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
}
.status-DRAFT, .status-draft   { background: #FEF3C7; color: #92400E; }
.status-PENDING, .status-pending { background: #DBEAFE; color: #1E40AF; }
.status-PAID, .status-paid     { background: #DCFCE7; color: #166534; }

/* Buttons */
.cp-icon-btn {
  width: 34px; height: 34px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  color: #6B7280; background: none; border: none; cursor: pointer;
  transition: background 0.15s;
}
.cp-icon-btn:hover { background: #F9FAFB; }

.cp-btn-save {
  background: #001D6E;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  transition: background 0.2s;
}
.cp-btn-save:hover   { background: #002a9e; }
.cp-btn-save.saved   { background: #166534; }

/* ── Split content ───────────────────────────────────────── */
.cp-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* ── Form panel ──────────────────────────────────────────── */
.cp-form-panel {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 1px solid #E5E7EB;
  background: #f0f2f5;
}

.cp-card {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}
.cp-card-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #111827;
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;
  background: #F8FAFC;
}
.cp-card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Fields */
.cp-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.cp-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.cp-field label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cp-field input,
.cp-field select,
.cp-field textarea {
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 0.8125rem;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: inherit;
}
.cp-field input:focus,
.cp-field select:focus,
.cp-field textarea:focus {
  border-color: #001D6E;
  box-shadow: 0 0 0 3px rgba(0, 29, 110, 0.1);
}
.cp-field textarea { resize: vertical; }

/* Template selector */
.cp-template-row {
  display: flex;
  gap: 12px;
}
.cp-template-opt {
  flex: 1;
  border: 2px solid #D1D5DB;
  border-radius: 6px;
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
  transition: border-color 0.15s, background 0.15s;
}
.cp-template-opt.active {
  border-color: #001D6E;
  background: #e8ecf8;
  color: #001D6E;
}
.cp-template-opt input[type="radio"] {
  accent-color: #001D6E;
  width: auto;
  padding: 0;
  border: none;
  box-shadow: none;
}

/* Services table */
.cp-services-table {
  width: 100%;
  border-collapse: collapse;
}
.cp-services-table th {
  font-size: 0.7rem;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 10px;
  border-bottom: 1px solid #E5E7EB;
  background: #F8FAFC;
  text-align: left;
}
.cp-services-table td {
  padding: 6px 8px;
  border-bottom: 1px solid #F3F4F6;
  vertical-align: middle;
}
.cp-services-table tbody tr:last-child td { border-bottom: none; }
.cp-services-table td input {
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  padding: 5px 7px;
  font-size: 0.8rem;
  background: #fff;
  outline: none;
  font-family: inherit;
}
.cp-services-table td input:focus { border-color: #001D6E; }
.svc-total {
  text-align: right;
  font-weight: 600;
  font-size: 0.8rem;
  color: #111827;
  white-space: nowrap;
  padding-right: 10px;
}
.cp-btn-del {
  width: 26px; height: 26px;
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  color: #9CA3AF; cursor: pointer;
  transition: background 0.15s, color 0.15s;
  font-size: 0.7rem;
  background: none;
  border: none;
}
.cp-btn-del:hover { background: #FEE2E2; color: #DC2626; }

.cp-btn-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #001D6E;
  border: 1px dashed #001D6E;
  border-radius: 6px;
  padding: 7px 14px;
  cursor: pointer;
  transition: background 0.15s;
  background: none;
  font-family: inherit;
}
.cp-btn-add:hover { background: #e8ecf8; }

/* ── Preview panel ───────────────────────────────────────── */
.cp-preview-panel {
  padding: 24px;
  overflow-y: auto;
  background: #e4e6ea;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cp-preview-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6B7280;
}
.cp-live-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
  flex-shrink: 0;
}

.cp-preview-scaler {
  background: transparent;
}
</style>