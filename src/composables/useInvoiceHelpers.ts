import { InvoiceStatus, PaymentMethod } from '@/types/Invoice';

export function useInvoiceHelpers() {
    const getStatusLabel = (status: InvoiceStatus): string => {
        switch (status) {
            case InvoiceStatus.PAID:    return 'Платена';
            case InvoiceStatus.PENDING: return 'Издадена';
            case InvoiceStatus.DRAFT:   return 'Чернова';
            default:                    return 'Неизвестен';
        }
    };

    const getStatusClass = (status: InvoiceStatus): string => {
        switch (status) {
            case InvoiceStatus.PAID:    return 'status-paid';
            case InvoiceStatus.PENDING: return 'status-issued';
            case InvoiceStatus.DRAFT:   return 'status-draft';
            default:                    return '';
        }
    };

    const getPaymentMethodLabel = (method: PaymentMethod): string => {
        switch (method) {
            case PaymentMethod.BANK_TRANSFER: return 'Банков превод';
            case PaymentMethod.CARD:          return 'Карта';
            case PaymentMethod.CASH:          return 'В брой';
            default:                          return method;
        }
    };

    const formatCurrency = (amount: number, currency: string): string =>
        new Intl.NumberFormat('bg-BG', { style: 'currency', currency }).format(amount);

    return { getStatusLabel, getStatusClass, getPaymentMethodLabel, formatCurrency };
}