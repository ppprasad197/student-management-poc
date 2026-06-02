export interface FineItem {

    borrowRecordId: number;

    bookName: string;

    dueDate: string;

    returnDate: string;

    daysLate: number;

    fineAmount: number;

    paidDate: string;

}

export interface FineResponse {

    fines: FineItem[];

    totalAmount: number;

    totalFines: number;

}

export interface FineSummary {

    totalFine: number;

    paid: number;

    remaining: number;
}

export interface FinePaymentRequest {

    amount: number;

}

export interface FinePaymentResponse {

    message: string;

    totalPaid: number;

    finesCleared: number;

}