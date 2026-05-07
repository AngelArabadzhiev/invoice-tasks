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

enum PaymentMethod {
    CARD,
    CASH,
    BANK_TRANSFER
}

enum InvoiceStatus {
    DRAFT,
    PENDING,
    PAID
}
