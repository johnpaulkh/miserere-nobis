export interface SalesDetail {
    id: string | null;
    productId: string;
    productName: string;
    variantId: string;
    variantName: string;
    price: number;
    cogs: number;
    quantity: number;
    adminFee: number;
    packingFee: number;
    packingFeePaid: number;
}

export interface SalesAddOn {
    id: string | null;
    addOnId: string;
    addOnName: string;
    addOnPrice: number;
    quantity: number;
}

export interface Sales {
    id: string | null;
    date: string,
    customer: string;
    address: string;
    logistic: string;
    details: SalesDetail[];
    addOns: SalesAddOn[];
}