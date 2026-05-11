import {Client} from "./Client";
import {Service} from "./Service";

export interface Invoice {
    id: number;
    invoiceNumber: number;
    issueDate: string;
    dueDate: string;
    status: InvoiceStatus;
    template: string;
    paymentMethod: PaymentMethod;
    currency: string;
    vatRate: number;
    client: Client;
    services: Service[];
    subtotal: number;
    vatAmount: number;
    total: number;
}

export enum PaymentMethod {
    CARD,
    CASH,
    BANK_TRANSFER
}

export enum InvoiceStatus {
    DRAFT,
    PENDING,
    PAID
}
